import React, { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

const SupportPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 md:w-[50%] text-center">
          INECPRES Support Page
        </h1>
      </div>

      <Section title="1.0 About INECPRES">
        <p className="mb-2 text-gray-600">
          The Independent National Electoral Commission’s Portal for Engagement
          of Election Staff (INECPRES) is the official registration portal for
          Nigerian citizens who are eligible and interested in serving as ad-hoc
          staff for electoral duties. This support page provides help and
          resources to guide you through the registration and application
          process.
        </p>
      </Section>

      <Section title="1.1 Getting Started">
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>
            Visit the INECPRES portal at{" "}
            <a
              href="https://pres.inecnigeria.org"
              className="text-blue-600 underline"
            >
              https://pres.inecnigeria.org
            </a>
            .
          </li>
          <li>Create an account or log in with your existing details.</li>
          <li>Fill in your personal information accurately.</li>
          <li>
            Submit your application to be considered for ad-hoc staff roles.
          </li>
        </ul>
      </Section>

      <Section title="1.2 Frequently Asked Questions">
        <p className="mb-2 text-gray-600">
          Here are answers to some of the most common issues:
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>
            <strong>Who can apply?</strong> Nigerian citizens who meet the
            eligibility requirements set by INEC.
          </li>
          <li>
            <strong>I forgot my password.</strong> Use the "Forgot Password"
            link on the login page to reset it.
          </li>
          <li>
            <strong>Can I edit my application after submission?</strong> No,
            please review your details carefully before submitting.
          </li>
          <li>
            <strong>How will I know if I’m selected?</strong> INEC will notify
            successful applicants via the contact details provided.
          </li>
        </ul>
      </Section>

      <Section title="1.3 Contact Support">
        <p className="mb-2 text-gray-600">
          If you encounter any difficulties while using the INECPRES portal,
          please reach out using the details below:
        </p>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            Email:{" "}
            <a
              href="mailto:support@inecnigeria.org"
              className="text-blue-600 underline"
            >
              support@inecnigeria.org
            </a>
          </li>
          <li>Phone: +234 (0) 809 509 1359</li>
          <li>
            Website:{" "}
            <a
              href="https://www.inecnigeria.org"
              className="text-blue-600 underline"
            >
              www.inecnigeria.org
            </a>
          </li>
        </ul>
      </Section>

      <Section title="1.4 Updates to This Support Page">
        <p className="mb-2 text-gray-600">
          INEC may update this page periodically to reflect new support
          resources, changes to the registration process, or improvements to the
          portal. Please check back regularly for the latest information.
        </p>
      </Section>
    </div>
  );
};

export default SupportPage;
