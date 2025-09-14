import React, { useState } from "react";
import ProfileFooter from "./profile-footer";
import { useFormContext } from "react-hook-form";
import InputF from "./InputF";
import FileUploadPage from "./file-uploader";
import useCommonData from "@/hooks/useCommonData";
import { createProfile, getMdas } from "@/api/user";
import {
  INEC_STAFF,
  OTHERS,
  PUBLIC_CIVIL_SERVANT,
  QUERY_KEYS,
  STAFF_OF_RAC,
  STAFF_OFF_MDAs,
} from "@/lib/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IUser, USER_TYPE } from "@/common/types";
import { cn, containsNysc, dropdownListToShowForWorkplace } from "@/lib/utils";

const PersonalInfo = ({ gotoNext, gotoPrev }: { gotoNext: () => void; gotoPrev: () => void }) => {
  const [identificationFile, setIdentificationFile] = useState<string | null>(null);
  const [highestQualificationFile, setHighestQualificationFile] = useState<string | null>(null);
  const {
    stateList,
    stateUniversityList,
    federalUniversityList,
    designationList,
    qualificationList,
    preferredStateOfElectionList,
    isOrganizationDisabledValue,
    userDetails,
  } = useCommonData();
  const { data: mdaList } = useQuery({
    queryFn: getMdas,
    queryKey: [QUERY_KEYS.MDA_LIST],
  });
  const { mutateAsync: handleCreateProfile, isPending } = useMutation({
    mutationFn: (data) => createProfile({ data }),
  });
  const workPlaceDropDownList = dropdownListToShowForWorkplace(userDetails as IUser, {
    mdaList,
    federalUniversityList,
    stateUniversityList,
  });

  const {
    register,
    formState: { errors, isValid },
    control,
    getValues,
    watch,
    handleSubmit,
  } = useFormContext();
  const isWorkPlaceOthers = getValues("workplace")?.split("-")?.[0] === OTHERS;
  const isDesignationForINec = getValues("designation") === INEC_STAFF;
  const isGradeLevel =
    getValues("designation") === INEC_STAFF ||
    getValues("designation") === PUBLIC_CIVIL_SERVANT ||
    getValues("designation") === STAFF_OF_RAC ||
    getValues("designation") === STAFF_OFF_MDAs;
  const userIsNysc = containsNysc(userDetails?.source_name as string);

  const onSubmit = async (data: any) => {
    const [workplace, workplaceId] = getValues("workplace")?.split("-");
    const { otherName, email, ...rest } = data;
    const payload = {
      ...rest,
      identificationFile,
      highestQualificationFile,
      workplace,
      workplaceId,
    };
    console.log(payload);
    try {
      const res: any = await handleCreateProfile(payload);
      console.log({ res });
      if (res?.status) {
        gotoNext();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 pb-8">
      <div className=" flex flex-col gap-5 pb-8 mb-8 border-b border-gray-2">
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF name="firstName" register={register} label="First Name" />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF name="surname" register={register} label="Last Name" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <InputF label="Other Name" name="otherName" register={register} />
        </div>
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="gender"
              register={register}
              dropdownList={[
                { value: "MALE", label: "MALE" },
                { value: "FEMALE", label: "FEMALE" },
              ]}
              isSelect={true}
              options={{ required: true }}
              label="Gender*"
              control={control}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="maritalStatus"
              options={{ required: true }}
              dropdownList={[
                { value: "SINGLE", label: "SINGLE" },
                { value: "MARRIED", label: "MARRIED" },
                { value: "DIVORCED", label: "DIVORCED" },
                { value: "WIDOWED", label: "WIDOWED" },
              ]}
              isSelect={true}
              control={control}
              label="Marital status*"
              register={register}
            />
          </div>
        </div>
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF name="email" register={register} options={{ required: true }} label="Email*" />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF name="phone" register={register} label="Phone*" />
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-5 pb-8 mb-8 border-b border-gray-2">
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="workplace"
              options={{ required: true }}
              register={register}
              label="Workplace/Organisation*"
              inputProps={{
                disabled: isOrganizationDisabledValue,
              }}
              defaultValue={!isOrganizationDisabledValue ? undefined : userDetails?.source_name}
              control={control}
              dropdownList={isOrganizationDisabledValue ? undefined : workPlaceDropDownList}
              isSelect={!isOrganizationDisabledValue}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="designation"
              options={{ required: true }}
              register={register}
              label="Designation*"
              control={control}
              dropdownList={
                Array.isArray(designationList)
                  ? designationList.map((item) => ({
                      label: item?.name,
                      value: item?.name,
                    }))
                  : []
              }
              isSelect={true}
            />
          </div>
        </div>
        <div className={cn("w-full flex gap-2", !isWorkPlaceOthers ? "flex-col" : "flex-row")}>
          {userIsNysc && (
            <div className={cn("flex flex-col gap-2", isWorkPlaceOthers ? "w-1/2" : "w-full")}>
              <InputF
                label="Call-Up Number*"
                options={{ required: true }}
                name="callUpNumber"
                register={register}
              />
            </div>
          )}
          {isWorkPlaceOthers && (
            <div className={cn("flex flex-col gap-2", isWorkPlaceOthers ? "w-1/2" : "w-full")}>
              <InputF
                label="Other*"
                options={{ required: true }}
                name="other"
                register={register}
              />
            </div>
          )}
        </div>
        {isDesignationForINec && (
          <div className="w-full flex gap-5">
            <div className="w-1/2 flex flex-col gap-2">
              <InputF
                name="stateOfDeployment"
                register={register}
                dropdownList={
                  Array.isArray(stateList)
                    ? stateList.map((state: any) => ({ value: state?.name, label: state?.name }))
                    : []
                }
                isSelect={true}
                options={{ required: true }}
                label="State of Deployment*"
                control={control}
              />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <InputF
                name="preferredElectionState"
                options={{ required: true }}
                dropdownList={
                  Array.isArray(preferredStateOfElectionList)
                    ? preferredStateOfElectionList.map((state: any) => ({
                        value: state?.state,
                        label: state?.state,
                      }))
                    : []
                }
                isSelect={true}
                control={control}
                label="Preferred Election State"
                register={register}
              />
            </div>
          </div>
        )}
        {isGradeLevel && (
          <div className="w-full flex flex-col gap-2">
            <InputF
              label="Enter GL*"
              options={{ required: true }}
              name="identificationCategory"
              register={register}
            />
          </div>
        )}
        <div className="w-full flex gap-5">
          {userIsNysc && (
            <div className="w-1/2 flex flex-col gap-2">
              <InputF
                name="nyscPassOutDate"
                register={register}
                options={{ required: true }}
                label="NYSC Pass Out Date*"
                inputProps={{ type: "date" }}
                bottomLabel="(Month & Year) only pass out applicant are required"
              />
            </div>
          )}
          <div className={cn("flex flex-col gap-2", userIsNysc ? "w-1/2" : "w-full")}>
            <InputF
              name="dateOfBirth"
              options={{ required: true }}
              register={register}
              label="Date of Birth*"
              inputProps={{ type: "date" }}
            />
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-5 pb-8 mb-8">
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="highestQualification"
              register={register}
              options={{ required: true }}
              label="Highest Level of Qualification*"
              dropdownList={
                Array.isArray(qualificationList)
                  ? qualificationList.map((item: string) => ({
                      label: item,
                      value: item,
                    }))
                  : []
              }
              isSelect={true}
              control={control}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="identificationCategory"
              options={{ required: true }}
              register={register}
              label="Identification Category*"
              dropdownList={[
                { value: "Voters Card", label: "Voters Card" },
                { value: "International Passport", label: "International Passport" },
                { value: "Drivers License", label: "Drivers License" },
              ]}
              isSelect={true}
              control={control}
            />
          </div>
        </div>
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <FileUploadPage file={identificationFile} setFile={setIdentificationFile} />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <FileUploadPage
              file={highestQualificationFile}
              type="image/*"
              setFile={setHighestQualificationFile}
            />
          </div>
        </div>
      </div>
      <ProfileFooter
        gotoNext={gotoNext}
        isLoading={isPending}
        isValid={isValid || isPending}
        gotoPrev={gotoPrev}
      />
    </form>
  );
};

export default PersonalInfo;
