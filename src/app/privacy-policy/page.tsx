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

const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 md:w-[40%] text-center">
          INECPRES Privacy Policy
        </h1>
      </div>

      <Section title="1.0 Personal Data INECPRES Collects">
        <p className="mb-2 text-gray-600 ">
          INECPRES collects data from you through your interactions with the
          portal and its features. The data we collect depends on the context of
          your interactions and the choices you make, including the information
          you provide during registration and application for ad-hoc staff
          positions.
        </p>
        <p className="mb-2 text-gray-600 ">
          When you interact with us, we collect information sent by your device,
          which may include data about the pages you access, your computer IP
          address, device ID, device type, geolocation information, and mobile
          network information.
        </p>
      </Section>

      <Section title="1.1 User Personal Data">
        <p className="mb-2 text-gray-600 ">
          When you apply for a position using INECPRES, we process the following
          personal data: your email address, first and last name, phone number,
          and any other information you provide as part of the application.
        </p>
        <p className="mb-2 text-gray-600 ">
          This data is used by INEC solely for the purpose of evaluating and
          managing your application for electoral duties.
        </p>
      </Section>

      <Section title="1.2 How INECPRES Uses Personal Data">
        <ul className="list-disc list-inside mb-2 text-gray-600 ">
          <li>To process and evaluate applications for ad-hoc staff roles.</li>
          <li>To communicate with applicants regarding their application.</li>
          <li>
            To improve the efficiency and security of the INECPRES portal.
          </li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>
      </Section>

      <Section title="1.3 Legal Basis for Processing">
        <p className="mb-2 text-gray-600 ">
          INECPRES processes personal data on the basis of:
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600 ">
          <li>Your consent when you provide your information.</li>
          <li>
            Compliance with legal obligations related to the conduct of
            elections.
          </li>
          <li>
            INEC’s legitimate interest in ensuring transparency and proper
            management of election staff engagement.
          </li>
        </ul>
      </Section>

      <Section title="1.4 Data Sharing">
        <p className="mb-2 text-gray-600 ">
          Your personal data may be shared within INEC and with authorised
          service providers engaged to support electoral processes. Data will
          not be sold or shared for unrelated third-party marketing purposes.
        </p>
      </Section>

      <Section title="1.5 Your Rights">
        <p className="mb-2 text-gray-600 ">
          You have rights under applicable data protection laws, including:
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600 ">
          <li>Access to the data you have provided.</li>
          <li>Correction of inaccurate information.</li>
          <li>Request for deletion of your data, where applicable.</li>
          <li>
            Withdrawal of consent for processing, subject to legal obligations.
          </li>
        </ul>
      </Section>

      <Section title="1.6 Cookies">
        <p className="mb-2 text-gray-600 ">
          INECPRES may use cookies or similar technologies to improve user
          experience and maintain security of the portal. These will only be
          used where necessary for functionality or with your consent.
        </p>
      </Section>

      <Section title="1.7 Security of Personal Data">
        <p className="mb-2 text-gray-600 ">
          INECPRES implements reasonable administrative, technical, and physical
          safeguards to protect your personal data. While we take these
          measures, no online system is completely secure, and users are advised
          to take precautions when accessing the portal.
        </p>
      </Section>

      <Section title="1.8 Updates to This Policy">
        <p className="mb-2 text-gray-600 ">
          This privacy policy may be updated from time to time to reflect
          changes in practices or legal requirements. Updates will be published
          on this page with a revised “last updated” date.
        </p>
      </Section>

      <Section title="1.9 Contact Us">
        <p className="mb-2 text-gray-600 ">
          If you have any questions or concerns about this privacy policy, you
          can contact INEC at:
        </p>
        <ul className="list-disc list-inside text-gray-600 ">
          <li>
            Email:{" "}
            <a
              href="mailto:support@inecnigeria.org"
              className="text-blue-600 underline"
            >
              support@inecnigeria.org
            </a>
          </li>
          <li>Phone: 0700-CALL-INEC</li>
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
    </div>
  );
};

export default PrivacyPage;
