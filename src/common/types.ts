import { AxiosHeaders, AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import * as z from "zod";
export const profileSchema = z
  .object({
    electionId: z.string().min(1, "Please select an election"),
    position_id: z.string().min(1, "Please select a position"),
    source_id: z.string().min(1, "Please select an eligibility criteria"),
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
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .email("Enter the email address your registered with on this platform."),
});

export const personalInfoSchema = z.object({
  surname: z.string().min(1, "Surname is required"),
  firstName: z.string().min(1, "First Name is required"),
  others: z.string().optional(),

  gender: z.enum(["MALE", "FEMALE"]),
  maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),

  email: z.string().email("Invalid email address").min(1, "Email is required"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?\d+$/, "Phone number must contain only digits"),

  workplace: z.string().min(1, "Workplace/Organisation is required"),
  designation: z.string().min(1, "Designation is required"),
  othersWorkplace: z.string().optional(),

  callUpNumber: z
    .string()
    .min(1, "Call-Up Number or Staff/Student ID is required"),

  stateOfDeployment: z
    .string()
    .optional()
    .refine((val) => val !== undefined, "State of Deployment is required"),

  preferredElectionState: z
    .string()
    .optional()
    .refine((val) => val !== undefined, "Preferred Election State is required"),
  preferredElectionLga: z
    .string()
    .optional()
    .refine((val) => val !== undefined, "Preferred Election State is required"),
  gradeLevel: z.string().optional,

  identificationCategory: z
    .string()
    .min(1, "Identification Category is required"),

  highestQualification: z.string().min(1, "Highest Qualification is required"),

  dateOfBirth: z
    .string()
    .min(1, "Date of Birth is required")
    .refine(
      (date) => {
        const dob = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        return age >= 18;
      },
      { message: "You must be at least 18 years old" }
    ),

  nyscPassOutDate: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        const passOutDate = new Date(date);
        return passOutDate <= new Date();
      },
      { message: "NYSC Pass Out Date must be in the past" }
    ),
});

export enum PAGE_ROUTES {
  DASHBOARD_PAGE = "/dashboard",
  LOGIN_PAGE = "/login",
  PROFILE_INFO_PAGE = "application",
  REGISTER_PAGE = "/register",
  VERIFY_OTP_PAGE = "/verify-otp",
}
export enum ProfileStatus {
  CONTACT = "contact",
  PROFILE = "profile",
  BANK = "bank",
  REFEREE = "referee",
  COMPLETE = "complete",
}

export enum USER_TYPE {
  MDA = "Staff of MDAs",
  PENULTIMATE_FEDERAL = "Penultimate students of Federal Tertiary Institutions",
  PENULTIMATE_STATE = "Penultimate students of State Tertiary Institutions",
}

export interface IDelete {
  url: string;
}

export interface IPost<T = Record<string, unknown>> extends IDelete {
  body?: T;
}

export type IPatch<T = Record<string, unknown>> = IPost<T>;

export type IPut<T = Record<string, unknown>> = IPost<T>;

export interface IGet<T = Record<string, unknown>> extends IDelete {
  query?: T;
  responseType?: AxiosRequestConfig["responseType"];
}
export interface IResponse<D = any> {
  user: any;
  data?: D;
  status?: number;
  message?: string;
}

export interface IRegisteredUser {
  _id: string;
  id: string;
  source_name: string;
  adhoc_position: string;
  source_id: string;
  email: string;
  election: string;
  isOtpVerified: boolean;
  isPasswordVerified: boolean;
  isReturningApplicant: boolean;
  password: string;
  position_id: string;
  position_name: string;
  profileStatus: string;
  rawPassword: string;
  refereeInformation: Array<any>;
  role: string;
  userSource: string;
}

export interface IUser {
  _id: string;
  source_id: string;
  position_id: string;
  position_name: string;
  email: string;
  isOtpVerified: boolean;
  role: string;
  password: string;
  election: string;
  isReturningApplicant: false;
  profileStatus: string;
  rawPassword: string;
  refereeInformation: Array<any>;
  source_name: string;
  userSource: string;
  user_id: string;
  applicationStatus: string;
  lastApplication: any;
  contactInformation?: any;
  bankDetails?: any;
  profile?: any;
}

interface ITokenData {
  token: string;
  expiresIn: string;
}

export interface IToken {
  accessToken: ITokenData;
  refreshToken: ITokenData;
}

export interface IAuth {
  currentUser: IUser | null;
  token: IToken | null;
}

export interface IAuthResponse {
  user: IUser | any;
  token: IToken | null;
}

export interface IStore {
  auth: IAuth | null;
  registeredUser: IRegisteredUser | null;
  isLocalStorageLoaded: boolean;
}

export interface IStoreContext {
  store: IStore;
  updateStore: (payload: Partial<IStore>) => void;
  handleLogOut: () => void;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegistrationRequest {
  email: string;
  password: string;
  position_id: string;
  source_id: string;
  electionId: string;
}

export interface IVerifyOtpRequest {
  email: string;
  otp: string;
}
export interface IResendOtpRequest {
  email: string;
}
export interface IResendOtpRequest {
  email: string;
}
export interface IResetPasswordRequest {
  email: string;
  password: string;
  otp: string;
}
export interface IForgotPasswordRequest {
  email: string;
}

export interface IPosition {
  _id: string;
  id: string;
  position: string;
}

export interface IPositionSource {
  id: string;
  source_name: string;
  adhoc_position: string;
}

export interface IElection {
  _id: string;
  name: string;
  positions: Array<IPosition>;
  year: 2025;
  state: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetElectionsRequest {
  year?: string;
}

export interface IGetPositionSourceRequest {
  id: string;
}
