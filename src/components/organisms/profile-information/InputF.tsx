import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, UseFormRegister } from "react-hook-form";

interface InputFProps {
  name: string;
  label: string;
  bottomLabel?: string;
  register: UseFormRegister<FieldValues>;
  options?: Partial<UseFormRegister<FieldValues>>;
  isSelect?: boolean;
  dropdownList?: Array<{ value: string; label: string }>;
  control?: Control<FieldValues>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const InputF = ({
  label,
  register,
  name,
  options,
  isSelect = false,
  dropdownList,
  control,
  inputProps,
  bottomLabel,
}: InputFProps) => {
  return (
    <>
      <Label className="text-text-1 font-light text-xs">{label}</Label>
      {!isSelect ? (
        <Input
          {...register(name, options)}
          type="text"
          className="rounded-none border-[0.5px] border-text-1"
          {...inputProps}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="rounded-none border-[0.5px] border-text-1" ref={field.ref}>
                <SelectValue placeholder="-:Select:-" />
              </SelectTrigger>
              <SelectContent>
                {dropdownList?.map((item, index) => (
                  <SelectItem value={item.value} key={index}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}
      {bottomLabel && (
        <Label className="text-text-1 font-light italic text-[9px]">{bottomLabel}</Label>
      )}
    </>
  );
};

export default InputF;
