import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { LogOut } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className=" bg-[#181817] bg-[url('/svgs/mask-dasboard.svg')] bg-cover text-white p-6  bg-no-repeat  justify-center rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/images/avatar.svg" alt="Profile" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">
                Madeenah Abdulsalam Olarewaju
              </h1>
              <p className="text-gray-300">Welcome Back</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-white text-[#F65151] hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Position Applied</p>
            <p className="font-medium text-[#111216] text-[14px]">
              Collation Officer
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Election</p>
            <p className="font-medium text-[#111216] text-[14px]">
              2024 Edo Governorship Election
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-[#7D7F81]">First Name</p>
                <p className="font-medium">Madeenah</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">Email</p>
                <p className="font-medium">example@gmail.com</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">Last Name</p>
                <p className="font-medium">Madeenah</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">Marital Status</p>
                <p className="font-medium">Single</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">Other Names</p>
                <p className="font-medium">Olarewaju</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">
                  Work Place/Organization
                </p>
                <p className="font-medium">DOINGS</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">Gender</p>
                <p className="font-medium">Female</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">
                  Staff ID No/Student ID No
                </p>
                <p className="font-medium">12345678</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">Phone Number</p>
                <p className="font-medium">+234 803 566 7980</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">Designation</p>
                <p className="font-medium">Place Of Plenty</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-[#7D7F81]">State Of Residence</p>
                <p className="font-medium">Lorem</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7D7F81]">State Of Origin</p>
                <p className="font-medium">Single</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Registration Of Residence*
                </p>
                <p className="font-medium">Lorem</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address Of Residence*</p>
                <p className="font-medium">Lorem</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Permanent Home Address*</p>
                <p className="font-medium">Lorem</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">LGA Of Residence*</p>
                <p className="font-medium">Lorem</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-medium">Moniepoint Microfinance Bank</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-medium">012435925</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="font-medium text-[#111216] text-[14px]">
                  Madeenah Abdulsalam
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Bank Verification Number (BVN)
                </p>
                <p className="font-medium text-[#111216] text-[14px]">
                  22243439545549
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">BVN Phone Number</p>
                <p className="font-medium text-[#111216] text-[14px]">
                  +234 803 566 7980
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Referee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-[#111216] text-[14px] mb-3">
                Referee One (#1)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">First Name</p>
                  <p className="font-medium text-[#111216] text-[14px]">
                    Lorem
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mobile</p>
                  <p className="font-medium text-[#111216] text-[14px]">
                    +234 803 566 7980
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Name</p>
                  <p className="font-medium text-[#111216] text-[14px]">
                    Lorem
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-[#111216] text-[14px]">
                    example@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Referee Two */}
            <div>
              <h4 className="font-medium text-[#111216] text-[14px] mb-3">
                Referee Two (#2)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">First Name</p>
                  <p className="font-medium text-[#111216] text-[14px]">
                    Lorem
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mobile</p>
                  <p className="font-medium text-[#111216] text-[14px]">
                    +234 803 566 7980
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Name</p>
                  <p className="font-medium text-[#111216] text-[14px]">
                    Lorem
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-[#111216] text-[14px]">
                    example@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
