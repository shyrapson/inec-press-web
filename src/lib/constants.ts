import { BASE_URL } from "@/common/http";

export const QUERY_KEYS = {
  STATE_LIST: "STATE_LIST",
  LGA_OF_STATE_LIST: "LGA_OF_STATE_LIST",
  PREFERRED_STATE_OF_ELECTION_LIST: "PREFERRED_STATE_OF_ELECTION_LIST",
  UNIVERSITIES_FEDERAL_LIST: "UNIVERSITIES_FEDERAL_LIST",
  UNIVERSITIES_STATE_LIST: "UNIVERSITIES_STATE_LIST",
  MDA_LIST: "MDA_LIST",
  DESIGNATION_LIST: "DESIGNATION_LIST",
  QUALIFICATION_LIST: "QUALIFICATION_LIST",
};
export const OTHERS = "Others";
export const INEC_STAFF = "INEC Staff";
export const PUBLIC_CIVIL_SERVANT = "Public/Civil Servant";
export const STAFF_OF_RAC = "Staff of RAC Center";
export const STAFF_OFF_MDAs = "Staff of MDAs";

export const UploadMediaEndpoint = BASE_URL + "/v1/media/upload/profile";
