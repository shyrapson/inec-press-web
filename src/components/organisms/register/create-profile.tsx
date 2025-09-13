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
import { profileSchema } from "@/common/types";
import { useForm } from "react-hook-form";

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CreateProfilePage() {
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

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      election: "",
      position: "",
      eligibility: "",
      email: "",
      confirmEmail: "",
      password: "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-between">
        <div className="flex-1 bg-[#DDDFE4] bg-[url('/svgs/group-items.svg')] bg-cover bg-no-repeat flex items-center justify-center py-10 px-32">
          <Card className="w-full max-w-3xl shadow-lg py-10">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Create Profile
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Before starting your registration, please ensure you read the
                instructions carefully. Be sure to provide a valid email address
                during the registration.
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
                    name="election"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-[#607087]">
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
                            <SelectItem value="edo-2024">
                              2024 Edo State Governorship Election
                            </SelectItem>
                            <SelectItem value="ondo-2024">
                              2024 Ondo State Governorship Election
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-[#607087]">
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
                            <SelectItem value="presiding-officer">
                              Presiding Officer
                            </SelectItem>
                            <SelectItem value="assistant-presiding-officer">
                              Assistant Presiding Officer
                            </SelectItem>
                            <SelectItem value="polling-clerk">
                              Polling Clerk
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eligibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-[#607087]">
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
                            <SelectItem value="citizen">
                              Nigerian Citizen
                            </SelectItem>
                            <SelectItem value="resident">
                              State Resident
                            </SelectItem>
                            <SelectItem value="graduate">
                              University Graduate
                            </SelectItem>
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
                        <FormLabel className="text-sm font-medium text-[#607087]">
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
                        <FormLabel className="text-sm font-medium text-[#607087]">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder=""
                            className="w-full"
                            {...field}
                          />
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
                  >
                    Create Account
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <HelpSection items={profilePageFAQData} />
      </div>
    </div>
  );
}
