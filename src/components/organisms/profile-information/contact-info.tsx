"use client";
import React, { useEffect } from "react";
import ProfileFooter from "./profile-footer";
import InputF from "./InputF";
import { useFormContext } from "react-hook-form";
import useCommonData from "@/hooks/useCommonData";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createContact,
  getLgaOfStates,
  getNearestLandmark,
  getRegistrationWard,
} from "@/api/user";
import { QUERY_KEYS } from "@/lib/constants";
import { trackPageView } from "@/lib/mixpanel";

const ContactInfo = ({
  gotoNext,
  gotoPrev,
}: {
  gotoNext: () => void;
  gotoPrev: () => void;
}) => {
  const {
    register,
    formState: { errors, isValid },
    control,
    watch,
    handleSubmit,
  } = useFormContext();

  useEffect(() => {
    trackPageView("Contact Info Page Viewed");
  }, []);

  const [stateValue, stateValueName] =
    watch("stateOfResidence")?.split("-") ?? [];
  const [lgaValue, lgaValueName] = watch("lgaOfResidence")?.split("-") ?? [];
  const [registrationOfResidenceValue, registrationOfResidenceValueName] =
    watch("registrationOfResidence")?.split("-") ?? [];

  const { data: lgaOfStateList, isLoading: loadingState } = useQuery({
    queryFn: () => getLgaOfStates({ code: stateValue }),
    queryKey: [QUERY_KEYS.LGA_OF_STATE_LIST, stateValue],
    enabled: !!stateValue,
  });

  const { data: registeredWardList, isLoading: loadingRegisteredWardList } =
    useQuery({
      queryFn: () =>
        getRegistrationWard({ state_id: stateValue!, abbreviation: lgaValue }),
      queryKey: [QUERY_KEYS.WARD_OF_STATE_LIST, stateValue, lgaValue],
      enabled: !!stateValue && !!lgaValue,
    });

  const { data: nearestLandMark, isLoading: loadingNearestLandMark } = useQuery(
    {
      queryFn: () =>
        getNearestLandmark({
          state_id: stateValue!,
          abbreviation: lgaValue,
          ward_id: registrationOfResidenceValue,
        }),
      queryKey: [
        QUERY_KEYS.NEAREST_LANDMARK,
        stateValue,
        lgaValue,
        registrationOfResidenceValue,
      ],
      enabled: !!stateValue && !!lgaValue && !!registrationOfResidenceValue,
    }
  );
  const { mutateAsync: handleCreateContact, isPending } = useMutation<
    any,
    unknown,
    any
  >({
    mutationFn: (data: any) => createContact({ data }),
  });
  const { stateList } = useCommonData();

  const onSubmit = async (data: any) => {
    const {
      addressOfResidence,
      nearestLandmark,
      permanentHomeAddress,
      stateOfOrigin,
    } = data;
    try {
      const payload = {
        addressOfResidence,
        lgaOfResidence: lgaValueName,
        nearestLandmark,
        permanentHomeAddress,
        registrationOfResidence: registrationOfResidenceValueName,
        stateOfOrigin,
        stateOfResidence: stateValueName,
      };
      console.log(payload);
      const res = await handleCreateContact(payload);
      if (res?.status) {
        gotoNext();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-4 pb-8 flex flex-col gap-4"
    >
      <div className="flex gap-5">
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="stateOfResidence"
            register={register}
            isRequired
            label="State of Residence"
            isSelect={true}
            dropdownList={
              Array.isArray(stateList)
                ? stateList.map((state: any) => ({
                    value: `${state?.code}-${state?.name}`,
                    label: state?.name,
                  }))
                : []
            }
            control={control}
            options={{ required: true }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="lgaOfResidence"
            register={register}
            isRequired
            label="LGA of Residence"
            isSelect={true}
            dropdownList={
              Array.isArray(lgaOfStateList)
                ? lgaOfStateList.map((state: any) => ({
                    value: `${state?.abbreviation}-${state?.name}`,
                    label: state?.name,
                  }))
                : []
            }
            control={control}
            options={{ required: true }}
          />
        </div>
      </div>

      <div>
        <InputF
          name="registrationOfResidence"
          register={register}
          isRequired
          label="Registration of Residence"
          isSelect={true}
          dropdownList={
            Array.isArray(registeredWardList)
              ? registeredWardList.map((state: any) => ({
                  value: `${state?.ward_id}-${state?.name}`,
                  label: state?.name,
                }))
              : []
          }
          control={control}
          options={{ required: true }}
        />
      </div>

      <div>
        <InputF
          name="nearestLandmark"
          register={register}
          isRequired
          label="Nearest Landmark"
          isSelect={true}
          dropdownList={
            Array.isArray(nearestLandMark)
              ? nearestLandMark.map((state: any) => ({
                  value: state?.name,
                  label: state?.name,
                }))
              : []
          }
          control={control}
          options={{ required: true }}
        />
      </div>

      <div>
        <InputF
          name="addressOfResidence"
          register={register}
          isRequired
          label="Address of Residence"
          options={{ required: true }}
          bottomLabel="This address may be used to contact you"
        />
      </div>

      <div>
        <InputF
          name="permanentHomeAddress"
          isRequired
          register={register}
          label="Permanent Home Address"
          options={{ required: true }}
        />
      </div>

      <div className="mb-4">
        <InputF
          name="stateOfOrigin"
          isRequired
          register={register}
          label="State of Origin"
          isSelect={true}
          dropdownList={
            Array.isArray(stateList)
              ? stateList.map((state: any) => ({
                  value: state?.name,
                  label: state?.name,
                }))
              : []
          }
          control={control}
        />
      </div>

      <ProfileFooter
        gotoNext={gotoNext}
        isLoading={isPending}
        gotoPrev={gotoPrev}
        isValid={isValid || isPending}
      />
    </form>
  );
};

export default ContactInfo;
