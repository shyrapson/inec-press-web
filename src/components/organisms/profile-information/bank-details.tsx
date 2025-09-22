import React, { useEffect, useRef } from "react";
import ProfileFooter from "./profile-footer";
import { useFormContext } from "react-hook-form";
import InputF from "./InputF";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createBankInfo,
  getBankList,
  verifyBankAccountRequest,
} from "@/api/user";
import { QUERY_KEYS } from "@/lib/constants";

const BankDetails = ({
  gotoNext,
  gotoPrev,
}: {
  gotoNext: () => void;
  gotoPrev: () => void;
}) => {
  const {
    register,
    formState: { isValid },
    control,
    getValues,
    setValue,
    watch,
    handleSubmit,
  } = useFormContext();
  console.log(isValid);

  const { mutateAsync: handleCreateBank, isPending } = useMutation<
    any,
    unknown,
    any
  >({
    mutationFn: (data: any) => createBankInfo({ data }),
  });

  const { data: bankList } = useQuery({
    queryFn: getBankList,
    queryKey: [QUERY_KEYS.GET_BANK_LIST],
  });

  const { mutate: verifyBankAccount, isPending: isVerifying } = useMutation<
    any,
    unknown,
    { accountNumber: string; bankCode: string }
  >({
    mutationFn: async ({ accountNumber, bankCode }) => {
      const response = await verifyBankAccountRequest({
        accountNumber,
        bankCode,
      });
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === "success") {
        setValue("accountName", data.account.accountName, {
          shouldValidate: true,
        });
      } else {
        setValue("accountName", "", { shouldValidate: true });
      }
    },
    onError: (error) => {
      console.log({ error });
      setValue("accountName", "", { shouldValidate: true });
    },
  });

  const accountNumber = watch("accountNumber");
  const bankName = watch("bankName");
  const bankCode = bankName?.split("-")[1] ?? "";
  const prevAccountNumber = useRef<string | null>(null);
  const prevBankCode = useRef<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (
        accountNumber?.length === 10 &&
        bankCode &&
        (accountNumber !== prevAccountNumber.current ||
          bankCode !== prevBankCode.current)
      ) {
        verifyBankAccount({ accountNumber, bankCode });
        prevAccountNumber.current = accountNumber;
        prevBankCode.current = bankCode;
      } else if (accountNumber?.length !== 10 || !bankCode) {
        setValue("accountName", "", { shouldValidate: true });
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(handler); // Cleanup timeout on unmount or dependency change
  }, [accountNumber, bankCode, setValue, verifyBankAccount]);

  const onSubmit = async (data: any) => {
    const { accountNumber, accountName, bvn, bvnPhoneNumber } = data;
    const [bankNameStr, bankCode] = bankName?.split("-") ?? [];
    const payload = {
      bankName: bankNameStr,
      bankCode,
      accountNumber,
      accountName,
      bvn,
      bvnPhoneNumber,
    };
    try {
      const res = await handleCreateBank(payload);
      if (res?.status) {
        gotoNext();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const restrictToNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const enforceNumericInput =
    (maxLength: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Remove any non-numeric characters
      const numericValue = value.replace(/[^0-9]/g, "");
      // Truncate to maxLength
      e.target.value = numericValue.slice(0, maxLength);
    };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-4 pb-8 flex flex-col gap-4"
    >
      <div className="flex gap-5">
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="bankName"
            isRequired
            register={register}
            label="Bank Name"
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
            isRequired
            register={register}
            label="Account Number"
            options={{
              required: true,
              maxLength: 10,
              minLength: 10,
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Account number must be exactly 10 digits",
              },
            }}
            inputProps={{
              type: "text",
              maxLength: 10,
              onKeyPress: restrictToNumbers,
              onInput: enforceNumericInput(10),
            }}
          />
        </div>
      </div>

      <div>
        <InputF
          name="accountName"
          isRequired
          register={register}
          label="Account Name"
          options={{ required: true }}
          inputProps={{ readOnly: true, disabled: true }}
        />
      </div>

      <div className="flex gap-5 mb-5">
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="bvn"
            register={register}
            isRequired
            label="Bank Verification Number (BVN)"
            inputProps={{
              type: "text",
              required: true,
              maxLength: 11,
              onKeyPress: restrictToNumbers,
              onInput: enforceNumericInput(11),
            }}
            options={{
              required: true,
              maxLength: 11,
              minLength: 11,
              pattern: {
                value: /^[0-9]{11}$/,
                message: "BVN must be exactly 11 digits",
              },
            }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <InputF
            name="bvnPhoneNumber"
            register={register}
            isRequired
            label="BVN Phone Number"
            bottomLabel="This is the verified phone number used in registering your BVN"
            inputProps={{
              type: "text",
              required: true,
              maxLength: 11,
              onKeyPress: restrictToNumbers,
              onInput: enforceNumericInput(11),
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
      </div>

      <ProfileFooter
        gotoNext={gotoNext}
        isValid={isValid && !isVerifying}
        isLoading={isPending || isVerifying}
        gotoPrev={gotoPrev}
      />
    </form>
  );
};

export default BankDetails;
