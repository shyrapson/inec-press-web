import React from "react";
import ProfileFooter from "./profile-footer";
import { useFormContext } from "react-hook-form";
import InputF from "./InputF";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBankInfo, getBankList } from "@/api/user";
import { QUERY_KEYS } from "@/lib/constants";

const BankDetails = ({ gotoNext, gotoPrev }: { gotoNext: () => void; gotoPrev: () => void }) => {
  const {
    register,
    formState: { isValid },
    control,
    getValues,
    handleSubmit,
  } = useFormContext();

  const { mutateAsync: handleCreateBank, isPending } = useMutation<any, unknown, any>({
    mutationFn: (data: any) => createBankInfo({ data }),
  });
  const { data: bankList } = useQuery({
    queryFn: getBankList,
    queryKey: [QUERY_KEYS.GET_BANK_LIST],
  });
  const bankDetails = getValues("bankName")?.split("-") ?? [];
  const onSubmit = async (data: any) => {
      const { accountNumber, accountName, bvn, bvnPhoneNumber } = data;
      const [bankName, bankCode] = bankDetails;
    const payload = { bankName, bankCode, accountNumber, accountName, bvn, bvnPhoneNumber };
    try {
      const res = await handleCreateBank(payload);
      if (res?.status) {
        gotoNext();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 pb-8 flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="bankName"
            register={register}
            label="Bank Name*"
            options={{ required: true }}
            isSelect={true}
            dropdownList={
              Array.isArray(bankList)
                ? bankList.map((state: any) => ({
                    value: `${state?.bankName}-${state?.bankCode}`,
                    label: state?.bankName,
                  }))
                : []
            }
            control={control}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="accountNumber"
            register={register}
            label="Account Number*"
            options={{ required: true }}
            inputProps={{ type: "number" }}
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
            inputProps={{ type: "number", required: true }}
            options={{ required: true }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="bvnPhoneNumber"
            register={register}
            label="BVN Phone Number"
            bottomLabel="This is the verified phone number used in registering your BVN"
            inputProps={{ type: "number", required: true }}
            options={{ required: true }}
          />
        </div>
      </div>

      <ProfileFooter
        gotoNext={gotoNext}
        isValid={isValid || isPending}
        isLoading={isPending}
        gotoPrev={gotoPrev}
      />
    </form>
  );
};

export default BankDetails;
