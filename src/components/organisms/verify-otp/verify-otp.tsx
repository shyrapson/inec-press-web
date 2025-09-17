"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HelpSection, { FAQItem } from "../faq-help";
import Navbar from "../navbar";
import { toast } from "react-toastify";
import useLocalMutation from "@/hooks/useLocalMutation";
import { IAuth, IVerifyOtpRequest, PAGE_ROUTES } from "@/common/types";
import { resendOtpRequest, verifyOtpRequest } from "@/api/user";
import { useRouter } from "next/navigation";
import useStore from "@/hooks/useStore";
import { Spinner } from "@/components/ui/spinner";

export default function VerifyOTPPage() {
  const [timeLeft, setTimeLeft] = useState(100);
  const [otp, setOtp] = useState("");

  const navigate = useRouter();
  const {
    store: { registeredUser },
    updateStore,
  } = useStore();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
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

  const { isPending: isVerifying, mutate: verifyOtp } = useLocalMutation<
    IAuth,
    IVerifyOtpRequest
  >({
    mutationFn: ({ email, otp }) => verifyOtpRequest({ email, otp }),
    onSuccess: () => {
      if (registeredUser) {
        updateStore({
          registeredUser: { ...registeredUser, isOtpVerified: true },
        });
      }
      navigate.push(PAGE_ROUTES.LOGIN_PAGE);
    },
  });

  const { isPending: isResending, mutate: resendOtp } = useLocalMutation<
    IAuth,
    IVerifyOtpRequest
  >({
    mutationFn: ({ email }) => resendOtpRequest({ email }),
    onSuccess: () => {
      toast.success("OTP resent successfully!");
      setTimeLeft(100);
    },
  });

  const handleVerify = () => {
    if (!registeredUser?.email) {
      navigate.push(PAGE_ROUTES.REGISTER_PAGE);
      return;
    }
    verifyOtp({ email: registeredUser.email, otp });
  };

  const handleResend = () => {
    if (!registeredUser?.email) {
      navigate.push(PAGE_ROUTES.REGISTER_PAGE);
      return;
    }
    resendOtp({ email: registeredUser.email, otp: "" });
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
        <div className="flex-1 flex items-start h-screen bg-[#DDDFE4] bg-[url('/svgs/group-items.svg')] bg-cover bg-no-repeat justify-center px-32 py-10">
          <Card className="w-full max-w-3xl shadow-lg py-10">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Verify OTP
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Enter the 6 digit code sent to{" "}
                <span className="text-orange-500">{registeredUser?.email}</span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="verification-code"
                  className="text-sm font-medium text-[#607087]"
                >
                  Verification Code<span className="text-red-500 ml-1">*</span>
                </Label>

                <Input
                  id="verification-code"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <div className="text-center">
                {timeLeft > 0 ? (
                  <span className="text-sm text-gray-600">
                    Resend code in{" "}
                    <span className="text-orange-500 font-medium">
                      {formatTime(timeLeft)}
                    </span>
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sm text-orange-500 hover:text-orange-600 disabled:opacity-50"
                    disabled={isResending}
                  >
                    {isResending ? "Resending..." : "Resend Code"}
                  </button>
                )}
              </div>

              <Button
                onClick={handleVerify}
                className="w-full bg-[#448220] hover:bg-green-800 text-white mt-6 h-[40px]"
                disabled={!otp || isVerifying}
              >
                {isVerifying ? <Spinner /> : "Proceed"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <HelpSection items={otpPageFAQData} />
      </div>
    </div>
  );
}
