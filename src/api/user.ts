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

export const loginRequest = async (
  payload: ILoginRequest
): Promise<IResponse<IAuthResponse>> => {
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

export const verifyOtpRequest = async (
  payload: IVerifyOtpRequest
): Promise<IResponse<IAuth>> => {
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

export const getUsersData = async (): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/application/user",
  });
  return res.payload?.result?.data;
};
export const getUsersProfile = async (): Promise<IResponse | any> => {
  const res = await http.get({
    url: "/v1/profile/get_profile",
  });

  return res.payload?.result?.data;
};

export const getLgaOfStates = async ({
  code,
}: {
  code: string;
}): Promise<IResponse | unknown> => {
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
export const getFederalUniversities = async (): Promise<
  IResponse | unknown
> => {
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

export const getNearestLandmark = async ({
  state_id,
  abbreviation,
  ward_id,
}: {
  state_id: string;
  abbreviation: string;
  ward_id: string;
}): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/get-polling-units",
    query: { state_id, abbreviation, ward_id },
  });
  return res.payload?.result?.data;
};

export const getRegistrationWard = async ({
  state_id,
  abbreviation,
}: {
  state_id: string;
  abbreviation: string;
}): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "/v1/get-wards",
    query: { state_id, abbreviation },
  });
  return res.payload?.result?.data;
};

export const getPreferredElectionState = async (): Promise<
  IResponse | unknown
> => {
  const res = await http.get({
    url: "/v1/profile/preferred_election_states",
  });
  return res.payload?.result?.data;
};

export const getBankList = async (): Promise<IResponse | unknown> => {
  const res = await http.get({
    url: "v1/bank/list-of-banks",
  });
  return res?.payload?.result?.data?.banks;
};

export const verifyBankAccountRequest = async ({ accountNumber, bankCode }: { accountNumber: string; bankCode: string }): Promise<IResponse | unknown> => {
  const res = await http.post({
    url: "/v1/bank/verify",
    body: { accountNumber, bankCode },
  });
  return res?.payload?.result?.data;
};

export const uploadMediaFile = async ({
  file,
}: {
  file: File;
}): Promise<IResponse<unknown>> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(UploadMediaEndpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.data?.payload?.result?.data;
};

export const createProfile = async ({
  data,
}: {
  data: unknown;
}): Promise<IResponse | unknown> => {
  const res = await http.post({
    url: "/v1/profile/complete_registration",
    body: data,
  });
  return res?.payload?.result;
};

export const createContact = async ({
  data,
}: {
  data: unknown;
}): Promise<IResponse | unknown> => {
  const res = await http.post({
    url: "/v1/profile/add_contact",
    body: data,
  });
  return res?.payload?.result;
};

export const createBankInfo = async ({
  data,
}: {
  data: unknown;
}): Promise<IResponse | unknown> => {
  const res = await http.post({
    url: "/v1/profile/add_bank",
    body: data,
  });
  return res?.payload?.result;
};

export const createRefereeInfo = async ({
  data,
}: {
  data: unknown;
}): Promise<IResponse | unknown> => {
  const res = await http.post({
    url: "/v1/profile/add_referee",
    body: data,
  });
  return res?.payload?.result;
};

export const addProfilePicture = async ({
  profilePicture,
}: {
  profilePicture: string;
}): Promise<IResponse | unknown> => {
  const res = await http.post({
    url: "/v1/profile/add_profile_picture",
    body: { profilePicture },
  });
  return res?.payload?.result;
};
