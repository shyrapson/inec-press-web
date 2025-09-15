"use client";
import React, { useEffect, useState } from "react";
import ProfileInfoHeader from "@/components/organisms/profile-information/profile-header";
import PersonalInfo from "@/components/organisms/profile-information/personal-info";
import ContactInfo from "@/components/organisms/profile-information/contact-info";
import BankDetails from "@/components/organisms/profile-information/bank-details";
import RefereeInfo from "@/components/organisms/profile-information/referee-info";
import PassportPhotograph from "@/components/organisms/profile-information/passport-photograph";
import { FormProvider, useForm } from "react-hook-form";
import useCommonData from "@/hooks/useCommonData";
import { PAGE_ROUTES, ProfileStatus } from "@/common/types";
import { useRouter } from "next/navigation";

const Page = () => {
    const {push} = useRouter()
    const [currentStep, setCurrentStep] = useState(1);
    const {userDetails} = useCommonData()
    useEffect(() => {
        if (userDetails?.profileStatus === ProfileStatus.PROFILE) {
            setCurrentStep(1)
        }
        if (userDetails?.profileStatus === ProfileStatus.CONTACT) {
            setCurrentStep(2)
        }
        if (userDetails?.profileStatus === ProfileStatus.CONTACT) {
            setCurrentStep(3)
        }
        if (userDetails?.profileStatus === ProfileStatus.COMPLETE) {
           push(PAGE_ROUTES.DASHBOARD_PAGE);
        }
    }, [push, userDetails?.profileStatus])
    const methods = useForm();
    const gotoNext = () => {
        setCurrentStep((prev) => {
            if (prev === 5) return prev;
            return prev = prev + 1
        })
    }
    const gotoPrev = () => {
          setCurrentStep((prev) => {
            if (prev === 1) return prev;
            return prev = prev - 1;
          });
    }
  return (
    <FormProvider {...methods}>
      <ProfileInfoHeader currentStep={currentStep} />
      {currentStep === 1 && <PersonalInfo gotoNext={gotoNext} gotoPrev={gotoPrev} />}
      {currentStep === 2 && <ContactInfo gotoNext={gotoNext} gotoPrev={gotoPrev} />}
      {currentStep === 3 && <BankDetails gotoNext={gotoNext} gotoPrev={gotoPrev} />}
      {currentStep === 4 && <RefereeInfo gotoNext={gotoNext} gotoPrev={gotoPrev} />}
      {currentStep === 5 && <PassportPhotograph gotoNext={gotoNext} gotoPrev={gotoPrev} />}
    </FormProvider>
  );
};

export default Page;
