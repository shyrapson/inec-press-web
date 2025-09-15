import Icon from "@/components/atoms/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const ApplicationSections = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-10 mb-10">
          <div>
            <div>
              <h1 className="font-bold text-2xl py-2">
                INEC Portal for Engagement of Election Staff
              </h1>
              <p>
                Welcome to the Independent National Electoral Commission’s
                Portal for Engagement of Election Staff (INECPRES), the
                registration portal for Nigerian citizens who are eligible and
                are interested in serving as ad-hoc staff for electoral duties.
              </p>
            </div>
            <div>
              <h1 className="text-[#181817] font-bold py-8">
                Available Positions
              </h1>
              <ul className="list-disc list-inside space-y-2 text-[#607087] ml-4">
                <li className="marker:text-gray-500 marker:text-lg">
                  Supervisory Presiding Officer (SPO)
                </li>
                <li className="marker:text-gray-500 marker:text-lg">
                  Registration Area Center (RAC) Manager
                </li>
                <li className="marker:text-gray-500 marker:text-lg">
                  Presiding Officer (PO)
                </li>
                <li className="marker:text-gray-500 marker:text-lg">
                  Assistant Presiding Officer (APO)
                </li>
                <li className="marker:text-gray-500 marker:text-lg">
                  Registration Area Technical Support (RATECH)
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Image
              src="/svgs/inec-pres-image.svg"
              alt={""}
              width={1200}
              height={600}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="flex flex-col items-start justify-start border-2 border-[#E5E5E5]  transition-colors">
            <CardHeader className="text-left">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center  mb-4">
                <Icon
                  icon="ix:question-filled"
                  className="w-6 h-6 text-orange-600"
                />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Who Can Apply
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-[#607087] mb-6">
                All Applicants are to visit the Eligibility page before
                commencing the application process.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#E5E5E5]  transition-colors">
            <CardHeader className="text-left">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center  mb-4">
                <Icon
                  icon="streamline-flex:return-square-2-solid"
                  className="w-6 h-6 text-orange-600"
                />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Returning Applicant
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-[#607087] mb-6">
                If you have an existing Registration/Profile from 2019 till date
                kindly update your preferred Ad-hoc position.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#E5E5E5]  transition-colors">
            <CardHeader className="text-left">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center  mb-4">
                <Icon
                  icon="material-symbols:fiber-new"
                  className="w-6 h-6 text-green-600"
                />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                New Applicant
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-[#607087] mb-6">
                Eligible first time (fresh) applicants for the available
                election staff position.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ApplicationSections;
