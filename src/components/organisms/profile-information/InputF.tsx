import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputHTMLAttributes, useId } from "react";
import { Control, Controller, FieldValues, UseFormRegister } from "react-hook-form";

interface InputFProps {
  name: string;
  label: string;
  bottomLabel?: string;
  register: UseFormRegister<FieldValues>;
  options?: Partial<UseFormRegister<FieldValues>>;
  isSelect?: boolean;
  dropdownList?: Array<{ value: string; label: string; selected?: boolean }>;
  control?: Control<FieldValues>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  defaultValue?: string;
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
  defaultValue,
}: InputFProps) => {
  const idPrefix = useId();

  return (
    <>
      <Label className="text-text-1 font-light text-xs">{label}</Label>
      {!isSelect ? (
        <Input
          {...register(name, options)}
          type="text"
          defaultValue={defaultValue}
          className="rounded-none border-[0.5px] border-text-1"
          {...inputProps}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => {
            return (
              <Select
                value={field.value ?? defaultValue}
                disabled={!dropdownList?.length}
                onValueChange={field.onChange}
                defaultValue={defaultValue}
              >
                <SelectTrigger
                  className="rounded-none border-[0.5px] border-text-1"
                  ref={field.ref}
                >
                  <SelectValue placeholder="-:Select:-" />
                </SelectTrigger>
                <SelectContent>
                  {dropdownList?.map((item, index) => {
                    return (
                      <SelectItem value={item.value} key={`${idPrefix}-${item.value}+${index}`}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            );
          }}
        />
      )}
      {bottomLabel && (
        <Label className="text-text-1 font-light italic text-[9px]">{bottomLabel}</Label>
      )}
    </>
  );
};

export default InputF;
