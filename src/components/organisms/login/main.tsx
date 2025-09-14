"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  loginSchema,
  PAGE_ROUTES,
} from "@/common/types";
import useLocalMutation from "@/hooks/useLocalMutation";
import { loginRequest } from "@/api/user";
import { useRouter } from "next/navigation";
import useStore from "@/hooks/useStore";
import { Spinner } from "@/components/ui/spinner";
import Footer from "../footer";

type LoginFormValues = z.infer<typeof loginSchema>;

const loginPageFAQData: FAQItem[] = [
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
      }
      navigate.push(
        res.data?.user?.isReturningApplicant
          ? PAGE_ROUTES.DASHBOARD_PAGE
          : PAGE_ROUTES.PROFILE_INFO_PAGE
      );
    },
  });

  const onSubmit = (data: LoginFormValues) => mutate(data);

  return (
    <div className="min-h-screen relative">
      <Navbar isSticky={false} />
      <div className="h-screen w-full absolute -top-4 flex  justify-between z-0">
        <div className="p-20  flex-1 bg-[#448220] bg-[url('/svgs/group-items.svg')] bg-cover bg-no-repeat flex items-center justify-center p-20">
          <Card className="w-full max-w-[461px] shadow-lg py-10 mt-16 ">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Login to your account
              </CardTitle>
              <p className="text-[11px] text-[#607087] mt-2">
                Please fill out the following fields to create your account
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
                        <FormLabel className="text-sm font-medium text-[#607087]">
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
                        {/* <p className="text-xs text-gray-500">
                          Enter the email address your registered with on this
                          platform.
                        </p> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-[#607087]">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full mb-4"
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
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 mt-32">
          <HelpSection items={loginPageFAQData} />
        </div>
      </div>
    </div>
  );
}
