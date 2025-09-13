import React from "react";
import ProfileFooter from "./profile-footer";
import { FieldValues, useForm, useFormContext, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import InputF from "./InputF";
import FileUploadPage from "./file-uploader";

const PersonalInfo = ({ gotoNext, gotoPrev }: { gotoNext: () => void; gotoPrev: () => void }) => {
  const {
    register,
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useFormContext(); ;
  const onSubmit = (data: any) => {
    console.log({ ...data, isValid });
    gotoNext();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 pb-8">
      <div className=" flex flex-col gap-5 pb-8 mb-8 border-b border-gray-2">
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF name="firstName" register={register} label="First Name" />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF name="lastName" register={register} label="Last Name" />
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
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
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
                { value: "Single", label: "Single" },
                { value: "Married", label: "Married" },
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
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="designation"
              options={{ required: true }}
              register={register}
              label="Designation*"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <InputF
            label="Call-Up Number*"
            options={{ required: true }}
            name="callUpNumber"
            register={register}
          />
        </div>
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="stateOfDeployment"
              register={register}
              dropdownList={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              isSelect={true}
              options={{ required: true }}
              label="State of Deployment*"
              control={control}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="maritalStatus"
              options={{ required: true }}
              dropdownList={[
                { value: "Single", label: "Single" },
                { value: "Married", label: "Married" },
              ]}
              isSelect={true}
              control={control}
              label="Preferred Election State"
              register={register}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <InputF
            label="Enter GL*"
            options={{ required: true }}
            name="identificationCategory"
            register={register}
          />
        </div>
        <div className="w-full flex gap-5">
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
          <div className="w-1/2 flex flex-col gap-2">
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
              dropdownList={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              isSelect={true}
              control={control}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <InputF
              name="identificationOfCategory"
              options={{ required: true }}
              register={register}
              label="Identification Category*"
              dropdownList={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              isSelect={true}
              control={control}
            />
          </div>
        </div>
        <div className="w-full flex gap-5">
          <div className="w-1/2 flex flex-col gap-2">
            <FileUploadPage showBottomLabel={false} />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <FileUploadPage />
          </div>
        </div>
      </div>
      <ProfileFooter gotoNext={gotoNext} isValid={isValid} gotoPrev={gotoPrev} />
    </form>
  );
};

export default PersonalInfo;
