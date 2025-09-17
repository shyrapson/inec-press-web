"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import ProfileFooter from "./profile-footer";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { Dialog } from "@/components/ui/dialog";
import CongratulationModal from "./congratulation-modal";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addProfilePicture, uploadMediaFile } from "@/api/user";
import { Spinner } from "@/components/ui/spinner";
import { IToken, IUser, PAGE_ROUTES } from "@/common/types";
import { useRouter } from "next/navigation";
import useStore from "@/hooks/useStore";
import { trackPageView } from "@/lib/mixpanel";

const PassportPhotograph = ({
  gotoNext,
  gotoPrev,
}: {
  gotoNext: () => void;
  gotoPrev: () => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const { updateStore, store } = useStore();
  const [tempData, setTempData] = useState<any | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    trackPageView("Passport Info Page Viewed");
  }, []);

  const { mutateAsync: handleUploadFile, isPending: isUploadingProfile } =
    useMutation({
      mutationFn: (file: File) => uploadMediaFile({ file: file }),
    });
  const { handleSubmit } = useFormContext();
  const { mutateAsync: handleAddProfilePicture, isPending } = useMutation<
    any,
    unknown,
    any
  >({
    mutationFn: (profilePicture: string) =>
      addProfilePicture({ profilePicture }),
  });
  const onSubmit = async () => {
    try {
      if (tempData) {
        const res = await handleAddProfilePicture(tempData?.path?.preview);
        if (res?.status) {
          setUser(res?.data?.user);
          setOpen(true);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center py-20">
          <label
            htmlFor="passport-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="size-[185px] flex items-center justify-center relative rounded-full bg-gray-3">
              <input
                id="passport-upload"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploadingProfile}
                type="file"
                className="hidden"
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
                />
              ) : (
                <UserIcon />
              )}
            </div>

            <p className="mt-4 text-center text-[#E47D05] text-sm font-medium">
              Tap to upload passport
            </p>
          </label>
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
      {open && (
        <CongratulationModal
          onSubmit={() => {
            updateStore({
              auth: {
                currentUser: user,
                token: store?.auth?.token as IToken,
              },
            });
            router.push(PAGE_ROUTES.DASHBOARD_PAGE);
          }}
        />
      )}
    </Dialog>
  );
};

export default PassportPhotograph;
