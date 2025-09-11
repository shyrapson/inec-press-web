# ---------- Base deps layer ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Needed by some native modules (e.g., sharp)
RUN apk add --no-cache libc6-compat

# Install npm deps (use package-lock if present for reproducible builds)
COPY package.json package-lock.json* ./
RUN npm ci

# ---------- Build layer ----------
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js (uses your "build" script)
RUN npm run build

# ---------- Runtime layer ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Next listens on 3000 by default
ENV PORT=3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

# Only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# App artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# If you have a next config, copy it (both extensions covered)
COPY --from=builder /app/next.config.* ./

# Ensure correct permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start", "--", "-p", "3000"]