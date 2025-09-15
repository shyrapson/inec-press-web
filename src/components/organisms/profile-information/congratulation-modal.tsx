import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SuccessIcon from "@/components/atoms/successIcon";
import { useRouter } from "next/router";
import { PAGE_ROUTES } from "@/common/types";

const CongratulationModal = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="flex flex-col justify-center items-center gap-4">
        <DialogTitle className="text-center flex flex-col justify-center items-center gap-4">
          <SuccessIcon />
          <p className="text-gray-4">Congratulations!</p>
        </DialogTitle>
        <DialogDescription className="text-xs my-0 text-center font-light">
          Application successful! <br /> An acknowledgement slip has been sent
          to your email
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button
          type="submit"
          onClick={onSubmit}
          className="w-full text-sm text-white font-light"
        >
          Proceed
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CongratulationModal;
