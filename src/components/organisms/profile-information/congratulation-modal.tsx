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

const CongratulationModal = ({ setOpen }: { setOpen: () => void }) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="flex flex-col justify-center items-center gap-4">
        <DialogTitle className="text-center flex flex-col justify-center items-center gap-4">
          <SuccessIcon />
          <p className="text-gray-4">Congratulations!</p>
        </DialogTitle>
        <DialogDescription className="text-xs my-0 text-center font-light">
          Account created successfully! <br /> You can now proceed to complete your profile information
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button type="submit" className="w-full text-sm text-white font-light">Proceed</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CongratulationModal;
