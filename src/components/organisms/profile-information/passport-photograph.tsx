'use-client'
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import ProfileFooter from "./profile-footer";
import { Loader, User2, UserIcon } from "lucide-react";
import Image from "next/image";
import { Dialog } from "@/components/ui/dialog";
import CongratulationModal from "./congratulation-modal";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addProfilePicture, uploadMediaFile } from "@/api/user";
import { Spinner } from "@/components/ui/spinner";
import { PAGE_ROUTES } from "@/common/types";
import { useRouter } from "next/navigation";

const PassportPhotograph = ({
  gotoNext,
  gotoPrev,
}: {
  gotoNext: () => void;
  gotoPrev: () => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const [tempData, setTempData] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const { mutateAsync: handleUploadFile, isPending: isUploadingProfile } = useMutation({
    mutationFn: (file: File) => uploadMediaFile({ file: file }),
  });
  const { handleSubmit } = useFormContext();
  const { mutateAsync: handleAddProfilePicture, isPending } = useMutation<any, unknown, any>({
    mutationFn: (profilePicture: string) => addProfilePicture({ profilePicture }),
  });
  const onSubmit = async () => {
    try {
      if (tempData) {
        const res = await handleAddProfilePicture(tempData?.path?.preview);
        if (res?.status) {
          setOpen(true);
          console.log({ tempData, selectedImage, res });
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files && files[0];
    const uploadResponse: any = await handleUploadFile(file as File);
    setTempData(uploadResponse?.[0]);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center py-20">
          <div className="size-[185px] flex items-center justify-center relative rounded-full bg-gray-3">
            <input
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploadingProfile}
              type="file"
              className="h-full w-full rounded-full absolute opacity-0"
            />
            {isUploadingProfile ? (
              <Spinner />
            ) : selectedImage ? (
              <Image
                src={selectedImage || ""}
                alt="Selected preview"
                className="w-full h-full object-cover rounded-full"
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
          <ProfileFooter
            btnText="Submit"
            isLoading={isPending}
            isValid={!!selectedImage || isPending}
            end
            gotoPrev={gotoPrev}
          />
        </div>
      </form>
      {open && <CongratulationModal onSubmit={() => router.push(PAGE_ROUTES.DASHBOARD_PAGE)} />}
    </Dialog>
  );
};

export default PassportPhotograph;
