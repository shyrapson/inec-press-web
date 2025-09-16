import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  disableAutofill?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disableAutofill = false, ...props }, ref) => {
    const autoCompleteValue = disableAutofill
      ? type === "password"
        ? "new-password"
        : "off"
      : props.autoComplete;

    return (
      <input
        type={type}
        className={cn(
          "flex h-[40px] w-full  border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        autoComplete={autoCompleteValue}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
