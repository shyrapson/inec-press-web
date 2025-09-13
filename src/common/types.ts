import * as z from 'zod'
export const profileSchema = z
  .object({
    election: z.string().min(1, 'Please select an election'),
    position: z.string().min(1, 'Please select a position'),
    eligibility: z.string().min(1, 'Please select an eligibility criteria'),
    email: z.string().email('Please enter a valid email address'),
    confirmEmail: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine(data => data.email === data.confirmEmail, {
    message: 'Email addresses must match',
    path: ['confirmEmail'],
  })
export const loginSchema = z.object({
  email: z
    .string()
    .email('Enter the email address your registered with on this platform.'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export enum PAGE_ROUTES {
  DASHBOARD_PAGE = '/dashboard',
  REGISTER_PAGE = '/register',
  LOGIN_PAGE = '/login',
}

export interface IDelete {
  url: string
}

export interface IPost<T = Record<string, unknown>> extends IDelete {
  body?: T
}

export type IPatch<T = Record<string, unknown>> = IPost<T>

export type IPut<T = Record<string, unknown>> = IPost<T>

export interface IGet<T = Record<string, unknown>> extends IDelete {
  query?: T
}
export interface IResponse<D = any> {
  data?: D
  status?: number
  message?: string
}

export interface IUser {
  _id: string
  source_id: string
  position_id: string
  position_name: string
  email: string
  isOtpVerified: boolean
  role: string
  password: string
  election: string
  isReturningApplicant: false
  profileStatus: string
  rawPassword: string
  refereeInformation: Array<any>
  source_name: string
  userSource: string
  user_id: string
  lastApplication: string | null
}

interface ITokenData {
  token: string
  expiresIn: string
}

export interface IToken {
  accessToken: ITokenData
  refreshToken: ITokenData
}

export interface IAuth {
  currentUser: IUser | null
  token: IToken | null
}

export interface IStore {
  auth: IAuth
}

export interface IStoreContext {
  store: IStore
  updateStore: (payload: Partial<IStore>) => void
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface IRegistrationRequest {
  email: string
  password: string
  position_id: string
  source_id: string
  electionId: string
}
