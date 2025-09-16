import Breadcrumb from "@/components/organisms/how-to-apply/bread-crumbs";
import {
  HaveQuestionCard,
  HowToApplyCard,
  NewApplicantCard,
} from "@/components/organisms/how-to-apply/sidebar-card";
import { Button } from "@/components/ui/button";

const HowToApply = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "How to Apply" },
  ];

  return (
    <div>
      <div className=" mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div> */}

        {/* Main Container */}
        <div className=" bg-white">
          <div className="flex flex-col justify-center lg:flex-row gap-8 p-8">
            <div className="flex-1 max-w-[648px]">
              <section className="mb-10">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-election-text-primary mb-3 leading-10">
                    What should I have before registering?
                  </h1>
                  <p className="text-sm text-black leading-6">
                    Before you register on this portal, please ensure you have
                    the following ready;
                  </p>
                </div>

                <div className="space-y-2 text-sm text-black leading-6">
                  <p>• A functional email address.</p>
                  <p>• A functioning mobile phone number.</p>
                  <p>• A personal bank account number.</p>
                  <p>
                    • A recent, white background Passport Photograph not larger
                    than 5MB.
                  </p>
                  <p>
                    • Contact details of two referees such as email address and
                    phone number.
                  </p>
                  <p>
                    • A valid Staff ID No./StudentID No (as displayed on your ID
                    Card)
                  </p>
                  <p>
                    • An NYSC Callup Number for former corps members (not
                    earlier than 2018).
                  </p>
                  <p>• NYSC Callup Number for current corps members, 2022.</p>
                  <p>• A copy of highest qualification in .pdf format</p>
                  <p>
                    • A copy of means of identification in .jpg or .jpeg format
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-election-text-primary mb-3 leading-10">
                    How to Apply
                  </h2>
                  <p className="text-sm text-black leading-6">
                    If you are yet to create an account or register on this
                    platform, then follow the steps outlined below:
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-black leading-6 mb-3">
                      1. Review the requirements for the available positions.
                    </h3>
                    <p className="text-sm text-black leading-6">
                      You are expected to go through the requirements for all
                      available Election staff positions to determine your
                      Eligibility
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-black leading-6">
                      2. Click on Register and follow the instructions.
                    </h3>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <h3 className="text-sm font-bold text-black leading-6 mb-3">
                      3. Create your Password
                    </h3>
                    <p className="text-sm text-black leading-6">
                      After creating your password, you are automatically logged
                      into the portal and presented with an application form.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div>
                    <h3 className="text-sm font-bold text-black leading-6 mb-3">
                      4. Fill the Application form.
                    </h3>
                    <div className="text-sm text-[#F65151] leading-6 space-y-1">
                      <p className="text-black">
                        Please NOTE: This form is segmented into three (3)
                        sections; (i) Personal Information, (ii) Contact
                        Information and (iii) Bank Details.
                      </p>
                      <p className="text-[#F65151]">
                        Kindly enter your names as associated with your BVN.
                      </p>
                      <p className="text-[#F65151]">
                        Ensure you fill in your details correctly. You will not
                        be allowed to edit details once the form is submitted.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div>
                    <h3 className="text-sm font-bold text-black leading-6 mb-3">
                      5. Upload your passport photograph.
                    </h3>
                    <p className="text-sm leading-6">
                      <span className="text-black">
                        You are required to upload a recent plain background
                        passport photograph of size not{" "}
                      </span>
                      <span className="text-[#F65151]">larger than 5MB</span>
                    </p>
                  </div>

                  {/* Step 6 */}
                  <div>
                    <h3 className="text-sm font-bold text-black leading-6">
                      6. Fill in the details of your referees
                    </h3>
                  </div>

                  {/* Step 7 */}
                  <div>
                    <h3 className="text-sm font-bold text-black leading-6 mb-3">
                      7. Check the Attestation box
                    </h3>
                    <p className="text-sm text-[#F65151] leading-6">
                      The information provided, will be validated from your
                      institutions/organization/referees
                    </p>
                  </div>

                  {/* Step 8 */}
                  <div>
                    <h3 className="text-sm font-bold text-black leading-6">
                      8. Submit the application
                    </h3>
                  </div>

                  {/* Step 9 */}
                  <div>
                    <h3 className="text-sm font-bold text-black leading-6 mb-3">
                      9. Print your acknowledgement slip.
                    </h3>
                    <p className="text-sm text-black leading-6">
                      This is mandatory as you will need this for the final
                      verification.
                    </p>
                  </div>

                  {/* Final note */}
                  <div className="pt-4">
                    <p className="text-sm text-black leading-6 italic font-normal">
                      All submissions are FINAL. Kindly ensure you review your
                      information thoroughly before you click the submit button.
                    </p>
                  </div>
                </div>
              </section>

              {/* Important Note */}
              <div className="mb-8">
                <p className="text-sm leading-6">
                  <span className="font-bold text-[#F65151]">NOTE: </span>
                  <span className="text-[#F65151]">
                    Deployment would be done based on your selected state of
                    residence.
                  </span>
                </p>
              </div>

              {/* Print Button */}
              <Button className="bg-[#448220] hover:bg-[448220] text-white px-7 py-3 rounded-election-button text-sm font-medium">
                Print
              </Button>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[390px] flex flex-col gap-8">
              <HowToApplyCard />
              <NewApplicantCard />
              <HaveQuestionCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToApply;
