import * as z from "zod";
export const profileSchema = z
  .object({
    election: z.string().min(1, "Please select an election"),
    position: z.string().min(1, "Please select a position"),
    eligibility: z.string().min(1, "Please select an eligibility criteria"),
    email: z.string().email("Please enter a valid email address"),
    confirmEmail: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email addresses must match",
    path: ["confirmEmail"],
  });
export const loginSchema = z.object({
  email: z
    .string()
    .email("Enter the email address your registered with on this platform."),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
