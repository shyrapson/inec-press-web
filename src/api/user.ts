import axios from "axios";
import http from "../common/http";
import {
  IAuth,
  IAuthResponse,
  ILoginRequest,
  IRegisteredUser,
  IRegistrationRequest,
  IResponse,
  IUser,
  IVerifyOtpRequest,
} from "../common/types";
import { UploadMediaEndpoint } from "@/lib/constants";

export const loginRequest = async (payload: ILoginRequest): Promise<IResponse<IAuthResponse>> => {
  const res = await http.post<ILoginRequest>({
    url: "/v1/user/login",
    body: payload,
  });

  return res.payload?.result;
};

export const registerRequest = async (
  payload: IRegistrationRequest
): Promise<IResponse<IRegisteredUser>> => {
  const res = await http.post<IRegistrationRequest>({
    url: "/v1/user/registration",
    body: payload,
  });

  return res.payload?.result;
};

export const verifyOtpRequest = async (payload: IVerifyOtpRequest): Promise<IResponse<IAuth>> => {
  const res = await http.post<IVerifyOtpRequest>({
    url: "/v1/user/verify_otp",
    body: payload,
  });

  return res.payload?.result;
};

export const getStates = async (): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/get-states",
  });
  return res.payload?.result?.data;
};

export const getLgaOfStates = async ({code}: {code: string}): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/get-local-governments",
    query: { code },
  });
  return res.payload?.result?.data;
};

export const getStateUniversities = async (): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/get-universities?type=state",
  });
  return res.payload?.result?.data;
};
export const getFederalUniversities = async (): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/get-universities?type=federal",
  });
  return res.payload?.result?.data;
};

export const getMdas = async (): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/get-mdas",
  });
  return res.payload?.result?.data;
};

export const getDesignation = async ({
  user_id,
}: {
  user_id: string;
}): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/applicant/get-designation",
    query: { user_id },
  });
  return res.payload?.result?.data;
};

export const getQualificationList = async (): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/applicant/get-highest-qualification",
  });
  return res.payload?.result?.data;
};

export const getPreferredElectionState = async (): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/profile/preferred_election_states",
  });
  return res.payload?.result?.data;
};

export const uploadMediaFile = async ({ file }: { file: File }): Promise<IResponse | unknown> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(UploadMediaEndpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.data?.payload?.result?.data;
};

export const createProfile = async ({ data }: { data: unknown }): Promise<IResponse | unknown> => {
  const res = await http.post({
    url: "/v1/profile/complete_registration",
    body: data,
  });
  console.log({ res });
  return res?.payload?.result;
};
