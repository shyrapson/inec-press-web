"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useStore from "@/hooks/useStore";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const { store, updateStore } = useStore();

  const handleLogOut = () => {
    updateStore({
      auth: null,
      registeredUser: null,
      isLocalStorageLoaded: false,
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("registeredUser");
    router.push("/login");
  };
  const user = store?.auth?.currentUser;
  const profile = user?.profile;
  const contactInfo = user?.contactInformation;
  const bankDetails = user?.bankDetails;
  const referees = user?.refereeInformation;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <header className="mb-6 rounded-lg bg-[#181817] bg-[url('/svgs/mask-dasboard.svg')] bg-cover bg-no-repeat p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.profilePicture} alt="Profile" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">
                {profile?.firstName} {profile?.surname}
              </h1>
              <p className="text-gray-300">Welcome Back</p>
            </div>
          </div>
          <Button
            onClick={() => handleLogOut()}
            variant="outline"
            className="bg-white text-[#F65151] hover:bg-gray-100"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <section className="mb-6 rounded-lg bg-gray-100 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600">Position Applied</p>
            <p className="font-medium text-[#111216]">Collation Officer</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Election</p>
            <p className="font-medium text-[#111216]">2024 Edo Governorship Election</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-[18px] font-extrabold text-[#111216]">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem label="First Name" value={profile?.firstName} />
              <InfoItem label="Email" value={user?.email} />
              <InfoItem label="Last Name" value={profile?.surname} />
              <InfoItem label="Marital Status" value={profile?.maritalStatus} />
              <InfoItem label="Other Names" value={profile?.other} />
              <InfoItem label="Work Place/Organization" value={profile?.workplace} />
              <InfoItem label="Gender" value={profile?.gender} />
              <InfoItem label="Staff ID No/Student ID No" value="12345678" />
              <InfoItem label="Phone Number" value="+234 803 566 7980" />
              <InfoItem label="Designation" value={profile?.designation} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[18px] font-extrabold text-[#111216]">
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem label="State Of Residence" value={contactInfo?.stateOfResidence} />
              <InfoItem label="State Of Origin" value={contactInfo?.stateOfOrigin} />
              <InfoItem
                label="Registration Of Residence"
                value={contactInfo?.registrationOfResidence}
              />
              <InfoItem label="Address Of Residence" value={contactInfo?.addressOfResidence} />
              <InfoItem label="Permanent Home Address" value={contactInfo?.permanentHomeAddress} />
              <InfoItem label="LGA Of Residence" value={contactInfo?.lgaOfResidence} />
              <InfoItem label="Zone" value={contactInfo?.zone} />
              <InfoItem label="Nearest Landmark" value={contactInfo?.nearestLandmark} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[18px] font-extrabold text-[#111216]">
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem label="Bank Name" value="Moniepoint Microfinance Bank" />
            <InfoItem label="Account Number" value={bankDetails?.accountNumber} />
            <InfoItem label="Account Name" value={bankDetails?.accountName} />
            <InfoItem label="Bank Verification Number (BVN)" value={bankDetails?.bvn} />
            <InfoItem label="BVN Phone Number" value={bankDetails?.bvnPhoneNumber} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[18px] font-extrabold text-[#111216]">My Referees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {referees?.map((referee, i) => (
              <div key={i}>
                <h4 className="mb-3 font-medium text-[#111216]">
                  Referee {["One", "Two", "Three"][i] || i + 1} (#{i + 1})
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoItem label="First Name" value={referee?.firstName} />
                  <InfoItem label="Mobile" value={referee?.mobileNumber} />
                  <InfoItem label="Last Name" value={referee?.surname} />
                  <InfoItem label="Email" value={referee?.emailAddress} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: any }) => (
  <div>
    <p className="text-[11px] text-[#7D7F81]">{label}</p>
    <p className="font-medium text-[#111216]">{value || "N/A"}</p>
  </div>
);

export default DashboardPage;
