'use client'
import React, { useEffect } from "react";
import ProfileFooter from "./profile-footer";
import InputF from "./InputF";
import { useForm, useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createRefereeInfo } from "@/api/user";
import { trackPageView } from "@/lib/mixpanel";

const RefereeInfo = ({
  gotoNext,
  gotoPrev,
}: {
  gotoNext: () => void;
  gotoPrev: () => void;
}) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useFormContext();

  useEffect(() => {
    trackPageView("Personal Info Page Viewed");
  }, []);

  const { mutateAsync: handleCreateReferee, isPending } = useMutation<
    any,
    unknown,
    any
  >({
    mutationFn: (data: any) => createRefereeInfo({ data }),
  });

  const onSubmit = async (data: any) => {
    const { refereeOne, refereeTwo } = data;
    const payload = {
      referees: [
        {
          surname: refereeOne?.lastName,
          firstName: refereeOne?.firstName,
          mobileNumber: refereeOne?.mobileNumber,
          emailAddress: refereeOne?.emailAddress,
        },
        {
          surname: refereeTwo?.lastName,
          firstName: refereeTwo?.firstName,
          mobileNumber: refereeTwo?.mobileNumber,
          emailAddress: refereeTwo?.emailAddress,
        },
      ],
    };
    try {
      const res: any = await handleCreateReferee(payload);
      console.log({ res });
      if (res?.status) {
        gotoNext();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const lastNameOptions = [
    { value: "mr", label: "Mr." },
    { value: "mrs", label: "Mrs." },
    { value: "miss", label: "Miss" },
    { value: "dr", label: "Dr." },
    { value: "prof", label: "Prof." },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-4 pb-8 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Referee One (#1)
        </h2>

        <div className="flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="refereeOne.lastName"
              isRequired
              register={register}
              label="Surname"
              options={{ required: true }}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="refereeOne.firstName"
              isRequired
              register={register}
              label="First Name"
              options={{ required: true }}
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="refereeOne.mobileNumber"
              isRequired
              register={register}
              label="Mobile Number"
              inputProps={{
                type: "text",
                required: true,
                maxLength: 11,
              }}
              options={{
                required: true,
                maxLength: 11,
                minLength: 11,
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must be exactly 11 digits",
                },
              }}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="refereeOne.emailAddress"
              isRequired
              register={register}
              options={{ required: true }}
              label="Email Address"
              inputProps={{ type: "email" }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Referee Two (#2)
        </h2>

        <div className="flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="refereeTwo.lastName"
              isRequired
              register={register}
              label="Surname"
              options={{ required: true }}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="refereeTwo.firstName"
              isRequired
              register={register}
              label="First Name"
              options={{ required: true }}
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="refereeTwo.mobileNumber"
              isRequired
              register={register}
              label="Mobile Number"
              inputProps={{
                type: "text",
                required: true,
                maxLength: 11,
              }}
              options={{
                required: true,
                maxLength: 11,
                minLength: 11,
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must be exactly 11 digits",
                },
              }}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="refereeTwo.emailAddress"
              isRequired
              register={register}
              label="Email Address"
              inputProps={{ type: "email" }}
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

export default RefereeInfo;
