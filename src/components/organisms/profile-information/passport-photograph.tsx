import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import ProfileFooter from "./profile-footer";
import { User2, UserIcon } from "lucide-react";
import Image from "next/image";
import { Dialog } from "@/components/ui/dialog";
import CongratulationModal from "./congratulation-modal";

const PassportPhotograph = ({
  gotoNext,
  gotoPrev,
}: {
  gotoNext: () => void;
  gotoPrev: () => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files && files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setSelectedImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  console.log({ open });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-center py-20">
        <div className="size-[185px] flex items-center justify-center relative rounded-full bg-gray-3">
          <input
            accept="image/*"
            onChange={handleFileChange}
            type="file"
            className="h-full w-full rounded-full absolute opacity-0"
          />
          {selectedImage ? (
            <Image
              src={selectedImage || ""}
              alt="Selected preview"
              className="w-full h-full object-contain rounded-full"
              width={185}
              height={185}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <UserIcon />
          )}
        </div>
      </div>
      <div className="my-10">
        <ProfileFooter gotoNext={() => setOpen(true)} isValid={true} end gotoPrev={gotoPrev} />
      </div>
      <CongratulationModal setOpen={() => setOpen(false)} />
    </Dialog>
  );
};

export default PassportPhotograph;
