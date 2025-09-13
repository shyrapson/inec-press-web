import React from "react";
import ProfileFooter from "./profile-footer";
import { useForm, useFormContext } from "react-hook-form";
import InputF from "./InputF";

const bankOptions = [
  { value: "access", label: "Access Bank" },
  { value: "gtb", label: "Guaranty Trust Bank" },
  { value: "zenith", label: "Zenith Bank" },
  { value: "first", label: "First Bank" },
  { value: "uba", label: "United Bank for Africa" },
];

const bvnOptions = [
  { value: "bvn1", label: "BVN Option 1" },
  { value: "bvn2", label: "BVN Option 2" },
  { value: "bvn3", label: "BVN Option 3" },
];

const BankDetails = ({ gotoNext, gotoPrev }: { gotoNext: () => void; gotoPrev: () => void }) => {
  const {
    register,
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useFormContext(); ;

  const onSubmit = (data: any) => {
      console.log("Banking form data:", data);
      gotoNext();
  };
  console.log({ errors, isValid });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 pb-8 flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="bankName"
            register={register}
            label="Bank Name*"
            isSelect={true}
            dropdownList={bankOptions}
            control={control}
            options={{ required: true }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="accountNumber"
            register={register}
            label="Account Number*"
            options={{ required: true }}
          />
        </div>
      </div>

      <div>
        <InputF
          name="accountName"
          register={register}
          label="Account Name*"
          options={{ required: true }}
        />
      </div>

      <div className="flex gap-5 mb-5">
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="bvn"
            register={register}
            label="Bank Verification Number (BVN)*"
            isSelect={true}
            dropdownList={bvnOptions}
            control={control}
            options={{ required: true }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="bvnPhoneNumber"
            register={register}
            label="BVN Phone Number"
            bottomLabel="This is the verified phone number used in registering your BVN"
          />
        </div>
      </div>

      <ProfileFooter gotoNext={gotoNext} isValid={isValid} gotoPrev={gotoPrev} />
    </form>
  );
};

export default BankDetails;
