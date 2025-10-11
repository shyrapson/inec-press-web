"use client";
import { useEffect, useState } from "react";
import ProfileFooter from "./profile-footer";
import { useFormContext } from "react-hook-form";
import InputF from "./InputF";
import FileUploadPage from "./file-uploader";
import useCommonData from "@/hooks/useCommonData";
import { createProfile, getLgaOfStates, getMdas } from "@/api/user";
import {
  INEC_STAFF,
  OTHERS,
  PUBLIC_CIVIL_SERVANT,
  QUERY_KEYS,
  STAFF_OF_RAC,
  STAFF_OFF_MDAs,
} from "@/lib/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { IUser, personalInfoSchema } from "@/common/types";
import { cn, containsNysc, dropdownListToShowForWorkplace } from "@/lib/utils";
import useStore from "@/hooks/useStore";
import { trackPageView } from "@/lib/mixpanel";
import type z from "zod";

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

const PersonalInfo = ({
  gotoNext,
  gotoPrev,
}: {
  gotoNext: () => void;
  gotoPrev: () => void;
}) => {
  const [identificationFile, setIdentificationFile] = useState<string | null>(
    null
  );
  const [highestQualificationFile, setHighestQualificationFile] = useState<
    string | null
  >(null);

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
  console.log(preferredStateOfElectionList, "wahakl");

  console.log(designationList, "designation list");

  const { data: mdaList } = useQuery({
    queryFn: getMdas,
    queryKey: [QUERY_KEYS.MDA_LIST],
  });

  const {
    store: { registeredUser, auth },
  } = useStore();

  const {
    register,
    formState: { isValid, errors },
    control,
    watch,
    setValue,
    handleSubmit,
  } = useFormContext<PersonalInfoFormData>();

  const [stateCode, stateValue, stateValueName] =
    watch("preferredElectionState")?.split("-") ?? [];

  const { data: lgaOfStateList, isLoading: loadingState } = useQuery({
    queryFn: () => getLgaOfStates({ code: stateCode }),
    queryKey: [QUERY_KEYS.LGA_OF_STATE_LIST, stateCode],
    enabled: !!stateCode,
  });
  console.log(lgaOfStateList, "lgaOfStateList");

  const { mutateAsync: handleCreateProfile, isPending } = useMutation({
    mutationFn: (data) => createProfile({ data }),
  });

  const workPlaceDropDownList = dropdownListToShowForWorkplace(
    userDetails as IUser,
    {
      mdaList,
      federalUniversityList,
      stateUniversityList,
    }
  );

  const isWorkPlaceOthers = watch("workplace")?.split("-")?.[0] === OTHERS;
  const isDesignationForINec = watch("designation") === INEC_STAFF;
  const othersWorkplaceValue = watch("othersWorkplace");

  useEffect(() => {
    trackPageView("Personal Info Page Viewed");
  }, []);

  const isGradeLevel =
    watch("designation") === INEC_STAFF ||
    watch("designation") === PUBLIC_CIVIL_SERVANT ||
    watch("designation") === STAFF_OF_RAC ||
    watch("designation") === STAFF_OFF_MDAs;

  const userIsNysc = containsNysc(userDetails?.source_name as string);

  const onSubmit = async (data: any) => {
    const [workplace, workplaceId] = watch("workplace")?.split("-") ?? [];
    const { otherName, email, othersWorkplace, ...rest } = data;

    const payload = {
      ...rest,
      preferredElectionState: stateValue,
      identificationFile,
      highestQualificationFile,
      workplace: isWorkPlaceOthers ? othersWorkplaceValue : workplace,
      workplaceId,
    };

    try {
      const res: any = await handleCreateProfile(payload);
      if (res?.status) {
        gotoNext();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const isDisabled =
    isValid && !!identificationFile && !!highestQualificationFile;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 pb-8">
      <div className=" flex flex-col gap-5 pb-8 mb-8 border-b border-gray-2">
        <div className="w-full flex gap-5">
          <div className="w-full flex flex-col md:flex-row gap-5">
            <div className="flex-1 md:w-1/2">
              <InputF
                name="surname"
                isRequired
                register={register}
                label="Surname"
                error={errors.surname?.message}
              />
            </div>
            <div className="flex-1 md:w-1/2">
              {" "}
              <InputF
                name="firstName"
                isRequired
                register={register}
                label="First Name"
                error={errors.firstName?.message}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <InputF label="Other Names" name="others" register={register} />
        </div>
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="gender"
              isRequired
              register={register}
              dropdownList={[
                { value: "MALE", label: "MALE" },
                { value: "FEMALE", label: "FEMALE" },
              ]}
              isSelect={true}
              options={{ required: true }}
              label="Gender"
              control={control}
              error={errors?.gender?.message}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="maritalStatus"
              isRequired
              options={{ required: true }}
              dropdownList={[
                { value: "SINGLE", label: "SINGLE" },
                { value: "MARRIED", label: "MARRIED" },
                { value: "DIVORCED", label: "DIVORCED" },
                { value: "WIDOWED", label: "WIDOWED" },
              ]}
              isSelect={true}
              control={control}
              label="Marital status"
              register={register}
              error={errors?.maritalStatus?.message}
            />
          </div>
        </div>
        <div className="w-full flex md:flex-row flex-col gap-5">
          <div className="md:w-1/2 flex flex-col gap-2">
            <InputF
              name="email"
              isRequired
              options={{ required: true }}
              register={register}
              label="Email"
              defaultValue={registeredUser?.email || auth?.currentUser?.email}
              inputProps={{ disabled: true }}
              error={errors?.email?.message}
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-2">
            <InputF
              name="phone"
              isRequired
              register={register}
              label="Phone"
              error={errors?.phone?.message}
            />
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-5 pb-8 mb-8 border-b border-gray-2">
        <div className="w-full flex md:flex-row flex-col gap-5">
          <div className="md:w-1/2 flex flex-col gap-2">
            <InputF
              name="workplace"
              isRequired
              options={{ required: true }}
              register={register}
              label="Workplace/Organisation"
              inputProps={{
                disabled: isOrganizationDisabledValue,
              }}
              defaultValue={
                !isOrganizationDisabledValue
                  ? undefined
                  : userDetails?.source_name
              }
              control={control}
              dropdownList={
                isOrganizationDisabledValue ? undefined : workPlaceDropDownList
              }
              isSelect={!isOrganizationDisabledValue}
              error={errors?.workplace?.message}
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-2">
            <InputF
              name="designation"
              isRequired
              options={{ required: true }}
              register={register}
              label="Designation"
              control={control}
              dropdownList={
                Array.isArray(designationList)
                  ? designationList.map((item) => ({
                      label: item?.name,
                      value: item?.name,
                    }))
                  : []
              }
              isSelect
              error={errors?.designation?.message}
            />
          </div>
        </div>
        <div
          className={cn(
            "w-full flex gap-2",
            !isWorkPlaceOthers ? "flex-col" : "flex-row"
          )}
        >
          {userIsNysc ? (
            <div
              className={cn(
                "flex flex-col gap-2",
                isWorkPlaceOthers ? "w-1/2" : "w-full"
              )}
            >
              <InputF
                label="Call-Up Number"
                isRequired
                options={{ required: true }}
                name="callUpNumber"
                register={register}
                error={errors?.callUpNumber?.message}
              />
            </div>
          ) : (
            <div
              className={cn(
                "flex flex-col gap-2",
                isWorkPlaceOthers ? "w-1/2" : "w-full"
              )}
            >
              <InputF
                label="Staff ID No/Student ID No"
                isRequired
                options={{ required: true }}
                name="callUpNumber"
                register={register}
                error={errors?.callUpNumber?.message}
              />
            </div>
          )}
          {isWorkPlaceOthers && (
            <div
              className={cn(
                "flex flex-col gap-2",
                isWorkPlaceOthers ? "w-1/2" : "w-full"
              )}
            >
              <InputF
                label="Other"
                isRequired
                options={{ required: true }}
                name="othersWorkplace"
                register={register}
                error={errors?.othersWorkplace?.message}
              />
            </div>
          )}
        </div>
        {isDesignationForINec && (
          <div className="w-full flex gap-5">
            <div className="w-full flex flex-col gap-2">
              <InputF
                name="stateOfDeployment"
                isRequired
                register={register}
                dropdownList={
                  Array.isArray(stateList)
                    ? stateList.map((state: any) => ({
                        value: state?.name,
                        label: state?.name,
                      }))
                    : []
                }
                isSelect={true}
                options={{ required: true }}
                label="State of Deployment"
                control={control}
                error={errors?.stateOfDeployment?.message}
              />
            </div>
          </div>
        )}
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="preferredElectionState"
              isRequired
              options={{ required: true }}
              dropdownList={
                Array.isArray(preferredStateOfElectionList)
                  ? preferredStateOfElectionList.map((state: any) => ({
                      value: `${state?.code}-${state?.state}`,
                      label: state?.state,
                    }))
                  : []
              }
              isSelect={true}
              control={control}
              label="Preferred Election State"
              register={register}
              error={errors?.preferredElectionState?.message}
            />
          </div>{" "}
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="preferredElectionLga"
              isRequired
              options={{ required: true }}
              dropdownList={
                Array.isArray(lgaOfStateList)
                  ? lgaOfStateList.map((lga: any) => ({
                      value: lga?.name,
                      label: lga?.name,
                    }))
                  : []
              }
              isSelect={true}
              control={control}
              label="Preferred LGA of Deployment"
              register={register}
              error={errors?.preferredElectionLga?.message}
            />
          </div>
        </div>

        {isGradeLevel && (
          <div className="w-full flex flex-col gap-2">
            <InputF
              label="Enter GL"
              isRequired
              options={{ required: true }}
              name="gradeLevel"
              register={register}
              error={errors?.gradeLevel?.message}
            />
          </div>
        )}
        <div className="w-full flex gap-5">
          {userIsNysc && (
            <div className="w-1/2 flex flex-col gap-2">
              <InputF
                name="nyscPassOutDate"
                isRequired
                register={register}
                options={{ required: true }}
                label="NYSC Pass Out Date"
                inputProps={{ type: "date" }}
                bottomLabel="(Month & Year) only pass out applicant are required"
                error={errors?.nyscPassOutDate?.message}
              />
            </div>
          )}
          <div
            className={cn(
              "flex flex-col gap-2",
              userIsNysc ? "w-1/2" : "w-full"
            )}
          >
            <InputF
              name="dateOfBirth"
              isRequired
              options={{ required: true }}
              register={register}
              label="Date of Birth"
              inputProps={{ type: "date" }}
              error={errors?.dateOfBirth?.message}
            />
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-5 pb-8 mb-8">
        <div className="w-full flex md:flex-row flex-col gap-5">
          <div className="md:w-1/2 flex flex-col gap-2">
            <InputF
              name="highestQualification"
              register={register}
              isRequired
              options={{ required: true }}
              label="Highest Level of Qualification"
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
              error={errors?.highestQualification?.message}
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-2">
            <InputF
              name="identificationCategory"
              isRequired
              options={{ required: true }}
              register={register}
              label="Identification Category"
              dropdownList={[
                { value: "Voters Card", label: "Voters Card" },
                {
                  value: "International Passport",
                  label: "International Passport",
                },
                { value: "Drivers License", label: "Drivers License" },
              ]}
              isSelect={true}
              control={control}
              error={errors?.identificationCategory?.message}
            />
          </div>
        </div>
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <FileUploadPage
              file={identificationFile}
              setFile={setIdentificationFile}
            />
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
        isValid={isDisabled}
        gotoPrev={gotoPrev}
      />
    </form>
  );
};

export default PersonalInfo;
