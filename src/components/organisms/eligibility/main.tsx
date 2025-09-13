import {
  HaveQuestionCard,
  HowToApplyCard,
  NewApplicantCard,
} from "../how-to-apply/sidebar-card";
import JobPosition from "./job-position";

export default function EligibilityPage() {
  const positions = [
    {
      title: "Supervisory Presiding Officer (SPO)",
      requirements: [
        "Requirement: Must be a Public/Civil Servant on Grade Level 10-14 or Registration Area Officers/INEC staff not engaged in other duties (GL 10-14).",
      ],
    },
    {
      title: "Registration Area Center (RAC) Manager",
      requirements: [
        "Requirement: Must be a Head of School or a staff (GL 07 and above) of the school/ institution/ public building hosting the RAC.",
      ],
    },
    {
      title: "Presiding officer (PO) / Assistant Presiding officer (APO)",
      requirements: [
        "Requirement:",
        "Must be a Serving Corps member",
        "or",
        "A penultimate student of a Federal/State tertiary institution in Nigeria with a knowledge of IT",
        "or",
        "A Permanent staff of an MDA with an OND qualification or on GL 07 - 10",
        "or",
        "INEC permanent staff on Grade Level 07 & 08",
        "or",
        "A former corps member (Not later than 2021 (i,e 2021, 2022, 2023, 2024))",
      ],
    },
    {
      title: "Registration Area Technical Support (RATECH)",
      requirements: [
        "Requirement:",
        "Applicants for this category must have an IT background",
        "Must be a suitable INEC ICT Staff (State & HQ) of the Commission not engaged in any other duties",
        "Applicants must not be a political party member.",
        "Applicants must not have demonstrated or expressed support for any candidate or party.",
        "Applicants must reside in the STATE selected except for RATECHs.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Eligibility
              </h1>

              <p className="text-[#607087] mb-8 leading-relaxed">
                Outlined below are the various positions available and their
                requirements. Please ensure you read the instructions below
                before you begin your registration.
              </p>

              <div className="space-y-6">
                {positions.map((position, index) => (
                  <JobPosition
                    key={index}
                    title={position.title}
                    requirements={position.requirements}
                  />
                ))}
              </div>

              <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400">
                <p className="text-red-700 text-sm">
                  <span className="font-medium">Returning Applicants</span>{" "}
                  should enroll based on the appropriate category that currently
                  applies to them.
                </p>
              </div>

              <div className="mt-6">
                <p className="text-[#607087] text-sm">
                  The call for enrollment as 2024 Edo and Ondo State
                  Governorship Election Elections staff has been concluded.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <HowToApplyCard />
            <NewApplicantCard />
            <HaveQuestionCard />
          </div>
        </div>
      </div>
    </div>
  );
}
