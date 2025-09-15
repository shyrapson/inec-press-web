"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HelpSection, { FAQItem } from "../faq-help";
import Navbar from "../navbar";
import {
  IAuth,
  IRegisteredUser,
  IRegistrationRequest,
  PAGE_ROUTES,
  profileSchema,
} from "@/common/types";
import { useForm } from "react-hook-form";
import useLocalMutation from "@/hooks/useLocalMutation";
import { registerRequest } from "@/api/user";
import { Spinner } from "@/components/ui/spinner";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getElectionsRequest } from "@/api/elections";
import { getPositionSourceRequest } from "@/api/adhoc-positions";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/hooks/useStore";
import Footer from "../footer";
import { loginPageFAQData } from "../login/main";
import { Eye, EyeOff } from "lucide-react";

type ProfileFormValues = z.infer<typeof profileSchema>;

const profilePageFAQData: FAQItem[] = [
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

export default function CreateProfilePage() {
  const navigate = useRouter();
  const { updateStore } = useStore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      electionId: "",
      position_id: "",
      source_id: "",
      email: "",
      confirmEmail: "",
      password: "",
    },
  });

  const { data: elections } = useQuery({
    queryKey: ["elections"],
    queryFn: () => getElectionsRequest(),
  });

  const positionId = form.watch("position_id");
  const electionId = form.watch("electionId");

  const positions = useMemo(() => {
    const pos = elections?.data?.find((el) => el._id === electionId);
    return pos ? pos.positions : [];
  }, [electionId, elections?.data]);

  const { data: positionSources } = useQuery({
    queryKey: ["position-source", positionId],
    queryFn: () => getPositionSourceRequest({ id: String(positionId) }),
    enabled: !!positionId,
    retry: false,
  });

  const { isPending, mutate } = useLocalMutation<
    IRegisteredUser,
    IRegistrationRequest
  >({
    mutationFn: ({ electionId, email, password, position_id, source_id }) =>
      registerRequest({ electionId, email, password, position_id, source_id }),
    onSuccess: (res) => {
      console.log({ res, registeredUser: res.data });
      updateStore({ registeredUser: res.data });
      navigate.push(PAGE_ROUTES.VERIFY_OTP_PAGE);
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    mutate(data);
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative">
      <Navbar isSticky={false} />
      <div className="">
        <div className="w-full absolute -top-4  z-0">
          <div className="flex justify-between w-full">
            <div className="w-full md:w-1/2 bg-[url('/images/bg-image.png')] bg-cover bg-no-repeat flex items-center justify-center py-10 md:px-32">
              <Card className="max-w-11/12 w-11/12 md:w-full md:max-w-[461px] shadow-lg py-10 mt-32">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Create Profile
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Before starting your registration, please ensure you read
                    the instructions carefully. Be sure to provide a valid email
                    address during the registration.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="electionId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              isRequired
                              className="text-sm font-medium text-[#607087]"
                            >
                              Name of Election
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="--Select--" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {elections?.data?.map(({ _id, name }) => (
                                  <SelectItem key={_id} value={_id}>
                                    {name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="position_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              isRequired
                              className="text-sm font-medium text-[#607087]"
                            >
                              Available Ad-hoc Position
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="--Select--" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {positions?.map(({ _id, id, position }) => (
                                  <SelectItem key={_id} value={id}>
                                    {position}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="source_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              isRequired
                              className="text-sm font-medium text-[#607087]"
                            >
                              I am eligible because I am/an:
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="--Select--" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {positionSources?.data?.map(
                                  ({ id, source_name }) => (
                                    <SelectItem
                                      key={id + source_name}
                                      value={id}
                                    >
                                      {source_name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                            <p className="text-xs text-gray-500">
                              Your valid and accessible email address e.g
                              xyz@gmail.com
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              isRequired
                              className="text-sm font-medium text-[#607087]"
                            >
                              Confirm Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="confirm-email"
                                type="email"
                                placeholder=""
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
                                  placeholder=""
                                  className="w-full pr-10"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                  onClick={() => setShowPassword(!showPassword)}
                                  aria-label={
                                    showPassword
                                      ? "Hide password"
                                      : "Show password"
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
                            <p className="text-xs text-gray-500">
                              Password should be at least 8 characters
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-[#448220] hover:bg-green-800 text-white mt-6 h-[40px]"
                        disabled={isPending}
                      >
                        {isPending ? <Spinner /> : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            <div className="md:flex hidden md:w-1/2 mt-32">
              <HelpSection items={loginPageFAQData} title="Need help?" />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
