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
  IAuthResponse,
  ILoginRequest,
  IResetPasswordRequest,
  loginSchema,
  PAGE_ROUTES,
} from "@/common/types";
import useLocalMutation from "@/hooks/useLocalMutation";
import { loginRequest, resetPasswordRequest } from "@/api/user";
import { useRouter } from "next/navigation";
import useStore from "@/hooks/useStore";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  trackPageView,
  trackLoginAttempt,
  trackLoginSuccess,
  trackLoginError,
  identifyUser,
} from "@/lib/mixpanel";

type LoginFormValues = z.infer<typeof loginSchema>;

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

export default function LoginPage(): JSX.Element {
  const navigate = useRouter();
  const {
    store: { auth },
    updateStore,
  } = useStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useLocalMutation<IAuthResponse, ILoginRequest>({
    mutationFn: ({ email, password }) => loginRequest({ email, password }),
    onSuccess: (res) => {
      if (res.data) {
        updateStore({
          auth: { token: res.data?.token, currentUser: res.data?.user },
        });
        console.log(res.data);
        trackLoginSuccess(res?.data?.user?.name);
        identifyUser(res?.data?.user?.name, {
          email: res.data?.user?.email,
        });
      }

      navigate.push(
        res.data?.user?.isReturningApplicant
          ? PAGE_ROUTES.DASHBOARD_PAGE
          : PAGE_ROUTES.PROFILE_INFO_PAGE
      );
    },
    onError: (err) => {
      trackLoginError((err as Error).message);
    },
  });

  const handleResetPassword = () => {
    navigate.push("/reset-password");
  };

  const onSubmit = (data: LoginFormValues) => {
    trackLoginAttempt(data.email);
    mutate(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative">
      <Navbar isSticky={false} />
      <div className="h-screen w-full absolute -top-4 flex justify-between z-0">
        <div className="p-4 md:p-20 flex-1 bg-[#448220] bg-[url('/svgs/group-items.svg')] bg-cover bg-no-repeat flex items-center justify-center p-20">
          <Card className="w-full max-w-[461px] shadow-lg py-10 mt-16">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Login to your account
              </CardTitle>
              <p className="text-[11px] text-[#607087] mt-2">
                Please fill out the following fields to login to your account
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
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

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          isRequired
                          className="text-sm font-medium text-[#607087]"
                        >
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="w-full mb-4 pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                              onClick={() => {
                                setShowPassword(!showPassword);
                              }}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-[#607087]" />
                              ) : (
                                <Eye className="h-4 w-4 text-[#607087]" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full text-xs text-right">
                    Forgot Password?{" "}
                    <span
                      className="hover:underline text-[#448220] cursor-pointer"
                      onClick={handleResetPassword}
                    >
                      Reset It
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#448220] hover:bg-[#448220] text-white mt-8 h-[40px]"
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Login"}
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
