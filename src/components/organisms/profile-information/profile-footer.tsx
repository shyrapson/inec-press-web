import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const ProfileFooter = ({
  gotoNext,
  gotoPrev,
  isValid,
  end,
  isLoading,
  btnText = "Next",
}: {
  gotoNext?: () => void;
  gotoPrev: () => void;
  isValid?: boolean;
  end?: boolean;
  isLoading?: boolean;
  btnText?: string;
}) => {
  return (
    <footer className={cn("flex gap-5", !end ? "justify-end" : "justify-center")}>
      <Button
        onClick={() => gotoPrev()}
        className="w-[150px] text-sm border border-text-2"
        variant="outline"
        type="button"
      >
        Cancel
      </Button>
      <Button disabled={!isValid || isLoading} type="submit" className="w-[150px] text-sm">
        {isLoading ? "Loading..." : btnText}
      </Button>
    </footer>
  );
};

export default ProfileFooter;
