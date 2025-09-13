import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import ProfileFooter from "./profile-footer";
import { User2 } from "lucide-react";
import Image from "next/image";

const PassportPhotograph = ({ gotoNext, gotoPrev }: { gotoNext: () => void; gotoPrev: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <div>
      <div className="my-5 flex items-center justify-center py-20">
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
            <svg
              width="104"
              height="104"
              viewBox="0 0 104 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.2929 43.3162C61.7442 43.3162 69.406 35.6543 69.406 26.203C69.406 16.7517 61.7442 9.08984 52.2929 9.08984C42.8415 9.08984 35.1797 16.7517 35.1797 26.203C35.1797 35.6543 42.8415 43.3162 52.2929 43.3162Z"
                fill="#607087"
              />
              <path
                opacity="0.5"
                d="M86.523 75.4037C86.523 86.0352 86.523 94.656 52.2966 94.656C18.0703 94.656 18.0703 86.0352 18.0703 75.4037C18.0703 64.7721 33.3951 56.1514 52.2966 56.1514C71.1981 56.1514 86.523 64.7721 86.523 75.4037Z"
                fill="#607087"
              />
            </svg>
          )}
        </div>
      </div>
      <ProfileFooter gotoNext={gotoNext} isValid={!!selectedImage} end gotoPrev={gotoPrev} />
    </div>
  );
};

export default PassportPhotograph;
