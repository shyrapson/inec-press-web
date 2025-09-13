"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HelpSection, { FAQItem } from "../faq-help";
import Navbar from "../navbar";
import { toast } from "react-toastify";

export default function VerifyOTPPage() {
  const [timeLeft, setTimeLeft] = useState(332);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleVerify = () => {
    if (otp === "123456") {
      toast.success("OTP verified successfully! 🎉");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const otpPageFAQData: FAQItem[] = [
    {
      value: "how-to-apply",
      title: "How to Apply",
      content: "Check out eligibility process and find out how you can apply.",
      link: {
        href: "#",
        text: "Click here",
        className: "text-orange-500 hover:text-orange-600",
      },
    },
    {
      value: "new-applicant",
      title: "New Applicant?",
      content: "",
    },
    {
      value: "have-question",
      title: "Have a Question",
      content: "",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-between">
        <div className="flex-1 flex items-start h-screen bg-[#DDDFE4] bg-[url('/svgs/group-items.svg')] bg-cover bg-no-repeat  justify-center px-32 py-10">
          <Card className="w-full max-w-3xl shadow-lg py-10">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Verify OTP
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Enter the 6 digit code sent to{" "}
                <span className="text-orange-500">example@gmail.com</span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="verification-code"
                  className="text-sm font-medium text-[#607087]"
                >
                  Verification Code
                </Label>
                <Input
                  id="verification-code"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder=""
                  className="w-full text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <div className="text-center">
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  Resend code in{" "}
                  <span className="text-orange-500 font-medium">
                    {formatTime(timeLeft)}
                  </span>
                </button>
              </div>

              <Button
                onClick={handleVerify}
                className="w-full bg-[#448220] hover:bg-green-800 text-white mt-6 h-[40px]"
              >
                Proceed
              </Button>
            </CardContent>
          </Card>
        </div>

        <HelpSection items={otpPageFAQData} />
      </div>
    </div>
  );
}
