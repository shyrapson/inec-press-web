"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Navbar from "../navbar";
import HelpSection, { FAQItem } from "../faq-help";
import {
  IForgotPasswordRequest,
  IResetPasswordRequest,
  PAGE_ROUTES,
} from "@/common/types";
import useLocalMutation from "@/hooks/useLocalMutation";
import { forgotPasswordRequest, resetPasswordRequest } from "@/api/user";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetPasswordFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  otp: z.string().min(6, "OTP must be at least 6 digits"),
});

export const loginPageFAQData: FAQItem[] = [
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
    content:
      "To register for the 2024 Edo and Ondo State Governorship Election engagement, ",
    link: {
      href: "#",
      text: "CLICK HERE",
      className: "text-green-600 hover:text-[#448220]",
    },
    afterLink: " to get started.",
  },
  {
    value: "have-question",
    title: "Have a Question",
    content:
      "If you are facing any challenge or have a question then click here to contact us.",
  },
];

export default function ResetPasswordPage(): JSX.Element {
  const router = useRouter();
  const [step, setStep] = useState<"forgot" | "reset">("forgot");
  const [email, setEmail] = useState("");

  const forgotForm = useForm<{
    email: string;
  }>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  });

  const { isPending: isForgotPending, mutate: forgotPasswordMutate } =
    useLocalMutation<any, IForgotPasswordRequest>({
      mutationFn: ({ email }) => forgotPasswordRequest({ email }),
      onSuccess: (res, variables) => {
        if (res.status) {
          setEmail(variables.email);
          resetForm.setValue("email", variables.email);
          setStep("reset");
          toast.success("Forgot password request successful");
          console.log("Forgot password request successful", res.status);
        } else {
          console.log("Failed to send OTP. Please try again.");
        }
      },
      onError: (error) => {
        console.error("Forgot password error:", error);
      },
    });

  const { isPending: isResetPending, mutate: resetPasswordMutate } =
    useLocalMutation<any, IResetPasswordRequest>({
      mutationFn: ({ email, password, otp }) =>
        resetPasswordRequest({ email, password, otp }),
      onSuccess: (res) => {
        if (res.status) {
          toast.success("Reset password request successful");
          setTimeout(() => {
            router.push(PAGE_ROUTES.LOGIN_PAGE);
          }, 2000);
        } else {
          console.log("Failed to reset password. Please try again.");
        }
      },
      onError: (error) => {
        console.error("Reset password error:", error);
      },
    });

  const handleForgotPasswordSubmit = (data: { email: string }) => {
    forgotPasswordMutate({ email: data.email });
  };

  const handleResetPasswordSubmit = (
    data: z.infer<typeof resetPasswordFormSchema>
  ) => {
    resetPasswordMutate({
      email: email || data.email,
      password: data.password,
      otp: data.otp,
    });
  };

  const handleGoBack = () => {
    setStep("forgot");
    forgotForm.reset();
    resetForm.reset();
    setEmail("");
  };

  if (step === "reset") {
    return (
      <div className="min-h-screen relative">
        <Navbar isSticky={false} />
        <div className="h-screen w-full absolute -top-4 flex justify-between z-0 mt-10">
          <div className="p-4 md:p-20 flex-1 bg-[#448220] bg-[url('/svgs/group-items.svg')] bg-cover bg-no-repeat flex items-center justify-center p-20">
            <Card className="w-full max-w-[461px] shadow-lg ">
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Reset Your Password
                </CardTitle>
                <p className="text-[11px] text-[#607087] mt-2">
                  Enter the OTP sent to {email} and your new password
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...resetForm}>
                  <form
                    onSubmit={resetForm.handleSubmit(handleResetPasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={resetForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            isRequired
                            className="text-sm font-medium text-[#607087]"
                          >
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              className="w-full"
                              {...field}
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resetForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            isRequired
                            className="text-sm font-medium text-[#607087]"
                          >
                            OTP Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="otp"
                              type="text"
                              placeholder="Enter 4-digit OTP"
                              className="w-full"
                              minLength={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resetForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            isRequired
                            className="text-sm font-medium text-[#607087]"
                          >
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter new password"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoBack}
                        className="flex-1 h-[40px]"
                        disabled={isResetPending}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-[#448220] hover:bg-[#448220] text-white h-[40px]"
                        disabled={isResetPending}
                      >
                        {isResetPending ? <Spinner /> : "Reset Password"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="md:flex hidden flex-1 mt-32">
            <HelpSection items={loginPageFAQData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Navbar isSticky={false} />
      <div className="h-screen w-full absolute -top-4 flex justify-between z-0">
        <div className="p-4 md:p-20 flex-1 bg-[#448220] bg-[url('/svgs/group-items.svg')] bg-cover bg-no-repeat flex items-center justify-center p-20">
          <Card className="w-full max-w-[461px] shadow-lg py-10 mt-16">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Forgot Password
              </CardTitle>
              <p className="text-[11px] text-[#607087] mt-2">
                Enter your email address to receive a reset code
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...forgotForm}>
                <form
                  onSubmit={forgotForm.handleSubmit(handleForgotPasswordSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={forgotForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          isRequired
                          className="text-sm font-medium text-[#607087]"
                        >
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#448220] hover:bg-[#448220] text-white mt-8 h-[40px]"
                    disabled={isForgotPending}
                  >
                    {isForgotPending ? <Spinner /> : "Send Reset Code"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="md:flex hidden flex-1 mt-32">
          <HelpSection items={loginPageFAQData} />
        </div>
      </div>
    </div>
  );
}
