import { cn } from "@/lib/utils";
import React from "react";

const HEADER_TITLE = ["Personal Information", "Contact Information", "Bank Details", "Referee", "Passport Photograph"];

const ProfileInfoHeader = ({ currentStep }: { currentStep:  number}) => {
  return (
    <header>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-2">
          {Array.from({ length: 5 }).map((_, index) => {
            const isActive = index + 1 <= currentStep ? "bg-primary" : " bg-gray-1";
            return <div key={index} className={cn("h-3 w-full", isActive)}></div>;
          })}
        </div>
        <div className="flex items-start justify-between mt-3">
          <div className="flex flex-col gap-2">
            <h6 className="text-black font-bold text-2xl">{HEADER_TITLE[currentStep-1]}</h6>
            <p className="text-text-1 text-lg font-light">
              {currentStep < 5
                ? "Fields with * are mandatory"
                : "Upload a recent passport photograph to continue"}
            </p>
          </div>

          <p className="text-text-1 font-medium text-lg">Step {currentStep}/5</p>
        </div>
      </div>
    </header>
  );
};

export default ProfileInfoHeader;
