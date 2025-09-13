import React from "react";
import ProfileFooter from "./profile-footer";
import InputF from "./InputF";
import { useForm, useFormContext } from "react-hook-form";

const stateOptions = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "kano", label: "Kano" },
  { value: "rivers", label: "Rivers" },
  { value: "ogun", label: "Ogun" },
];

const lgaOptions = [
  { value: "ikeja", label: "Ikeja" },
  { value: "surulere", label: "Surulere" },
  { value: "yaba", label: "Yaba" },
  { value: "victoria-island", label: "Victoria Island" },
  { value: "lekki", label: "Lekki" },
];

const ContactInfo = ({ gotoNext, gotoPrev }: { gotoNext: () => void; gotoPrev: () => void }) => {
  const {
    register,
    formState: { errors, isValid },
    control,
    handleSubmit,
  } =  useFormContext() 

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    gotoNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 pb-8 flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="stateOfResidence"
            register={register}
            label="State of Residence*"
            isSelect={true}
            dropdownList={stateOptions}
            control={control}
            options={{ required: true }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="lgaOfResidence"
            register={register}
            label="LGA of Residence*"
            isSelect={true}
            dropdownList={lgaOptions}
            control={control}
            options={{ required: true }}
          />
        </div>
      </div>

      <div>
        <InputF
          name="registrationOfResidence"
          register={register}
          label="Registration of Residence*"
          options={{ required: true }}
        />
      </div>

      <div>
        <InputF
          name="nearestLandmark"
          register={register}
          label="Nearest Landmark*"
          options={{ required: true }}
        />
      </div>

      <div>
        <InputF
          name="addressOfResidence"
          register={register}
          label="Address of Residence*"
          options={{ required: true }}
          bottomLabel="This address may be used to contact you"
        />
      </div>

      <div>
        <InputF
          name="permanentHomeAddress"
          register={register}
          label="Permanent Home Address*"
          options={{ required: true }}
        />
      </div>

      <div className="mb-4">
        <InputF
          name="stateOfOrigin"
          register={register}
          label="State of Origin"
          isSelect={true}
          dropdownList={stateOptions}
          control={control}
        />
      </div>

      <ProfileFooter gotoNext={gotoNext} gotoPrev={gotoPrev} isValid={isValid} />
    </form>
  );
};

export default ContactInfo;
