import { IUser, USER_TYPE } from "@/common/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOrganizationDisable(user: IUser) {
  return (
    user?.source_name === "INEC Staff" ||
    user?.source_name ===
      "Staff of School/Institution/Public Building Hosting" ||
    user?.source_name === "NYSC/Former NYSC from 2021"
  );
}

export const dropdownListToShowForWorkplace = (
  user: IUser,
  {
    mdaList,
    federalUniversityList,
    stateUniversityList,
  }: { mdaList: any; federalUniversityList: any; stateUniversityList: any }
) => {
  if (user?.source_name === USER_TYPE.MDA) {
    return Array.isArray(mdaList)
      ? mdaList?.map?.((item) => ({
          label: item?.mda,
          value: `${item?.mda}-${item?.id}`,
        }))
      : undefined;
  }
  if (user?.source_name === USER_TYPE.PENULTIMATE_FEDERAL) {
    return Array.isArray(federalUniversityList)
      ? federalUniversityList?.map?.((item) => ({
          label: item?.name_of_university,
          value: `${item?.name_of_university}-${item?.id}`,
        }))
      : undefined;
  }
  if (user?.source_name === USER_TYPE.PENULTIMATE_STATE) {
    return Array.isArray(stateUniversityList)
      ? stateUniversityList?.map?.((item) => ({
          label: item?.name_of_university,
          value: `${item?.name_of_university}-${item?.id}`,
        }))
      : undefined;
  }
  return undefined;
};

export const containsNysc = (value: string) =>
  value?.toLowerCase()?.includes("nysc");
