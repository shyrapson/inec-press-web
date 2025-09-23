import { Button } from "@/components/ui/button";
import useStore from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileFooter = ({
  gotoNext,
  gotoPrev,
  isValid = true,
  end,
  isLoading = false,
  btnText = "Next",
}: {
  gotoNext?: () => void;
  gotoPrev: () => void;
  isValid?: boolean;
  end?: boolean;
  isLoading?: boolean;
  btnText?: string;
}) => {
  const { store, updateStore } = useStore();
  const { push } = useRouter();

  const handleLogOut = () => {
    updateStore({
      auth: null,
      registeredUser: null,
      isLocalStorageLoaded: false,
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("registeredUser");
    push("/login");
  };
  return (
    <footer
      className={cn("flex gap-5", !end ? "justify-end" : "justify-center")}
    >
      <Button
        onClick={handleLogOut}
        className="w-[150px] text-sm border border-text-2"
        variant="outline"
        type="button"
      >
        Cancel
      </Button>
      <Button
        disabled={!isValid || isLoading}
        type="submit"
        className="w-[150px] text-sm disabled:!cursor-not-allowed disabled:opacity-50 disabled:!pointer-events-auto"
      >
        {isLoading ? "Loading..." : btnText}
      </Button>
    </footer>
  );
};

export default ProfileFooter;
