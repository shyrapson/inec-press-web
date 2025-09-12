import React from "react";

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 md:w-[40%] text-center">
          INECPRES Privacy Policy
        </h1>
      </div>

      <Section title="1.0 Personal Data INECPRES Collects">
        <p className="mb-2 text-gray-600 ">
          INECPRES collects data from you through our interactions with you and
          through our services. The data we collect depends on the context of
          your interactions with INECPRES and the choices you make, including
          your privacy settings and the features you use. You provide some data
          directly (e.g., contact information, job application details), we
          collect data about your interactions with and use of our platform
          (e.g., cookies or other electronic trackers), and we may obtain data
          about you from third parties (e.g., verification from government
          agencies).
        </p>
        <p className="mb-2 text-gray-600 ">
          When you interact with us, we collect information sent to us by your
          device. The information may include data about the pages you access,
          your computer IP address, device ID or unique identifier, device type,
          geolocation information, connection information, and mobile network
          details.
        </p>
        <p className="mb-2 text-gray-600 ">
          You have choices about the data you share with us. When we ask you to
          provide personal data, you may decline. However, many INECPRES
          features require some personal data to provide you with services. If
          you choose not to provide necessary data, you may not be able to use
          certain features of the platform.
        </p>
      </Section>

      <Section title="1.1 Users Personal Data">
        <p className="mb-2 text-gray-600 ">
          The INECPRES platform provides functionality to apply for positions as
          ad-hoc staff during elections. If you are applying through INECPRES,
          we collect additional information related to your application.
        </p>
        <h1 className="mb-2 text-gray-600 font-bold">
          Processing of your personal data when you apply directly to INECPRES:
        </h1>
        <p className="mb-2 text-gray-600 ">
          When you apply through INECPRES, we process the following personal
          data: your email address, first and last name, phone number, and any
          other information relevant to the application (such as NYSC details,
          employment history, or identification documents).
        </p>
        <p className="mb-2 text-gray-600 ">
          We use the personal data you provide to evaluate your eligibility,
          manage the recruitment process, and comply with applicable laws. We
          may also use aggregated and anonymised data for workforce planning and
          analysis.
        </p>
      </Section>

      <Section title="1.2 How INECPRES Uses Personal Data">
        <p className="mb-2 text-gray-600 ">
          INECPRES uses the data collected to provide you with secure and
          reliable services. In particular, we use data to:
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600 ">
          <li>
            Provide services such as registration, login, and application
            submission.
          </li>
          <li>Respond to your inquiries and provide support.</li>
          <li>Verify eligibility and process applications.</li>
          <li>Improve and develop our platform and services.</li>
          <li>
            Communicate with you about updates, notifications, or requirements.
          </li>
          <li>Comply with legal and regulatory obligations.</li>
        </ul>
      </Section>

      <Section title="1.3 Legal Bases for Processing">
        <p className="mb-2 text-gray-600 ">
          INECPRES processes your personal data based on:
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600 ">
          <li>Your consent where required.</li>
          <li>
            Performance of a contract (application and engagement as ad-hoc
            staff).
          </li>
          <li>Compliance with legal obligations under Nigerian law.</li>
          <li>
            Legitimate interest in ensuring secure and effective recruitment.
          </li>
        </ul>
      </Section>

      <Section title="1.4 Reasons We Share Personal Data">
        <p className="mb-2 text-gray-600 ">
          We may share your personal data with INEC departments, authorized
          service providers, or government agencies for verification purposes.
          We may also share data when required by law or legal process, to
          protect the integrity of the electoral process, or to provide support
          services.
        </p>
      </Section>

      <Section title="1.5 Your Data Rights">
        <p className="mb-2 text-gray-600 ">
          You have rights regarding your personal data, including the right to:
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600 ">
          <li>Access your personal information.</li>
          <li>Correct or update your information.</li>
          <li>Request deletion of your data (subject to legal obligations).</li>
          <li>Object to certain processing activities.</li>
          <li>Withdraw your consent where applicable.</li>
        </ul>
        <p className="mb-2 text-gray-600 ">
          To exercise your rights, please contact us using the details below.
        </p>
      </Section>

      <Section title="1.6 Cookies and Tracking">
        <p className="mb-2 text-gray-600 ">
          INECPRES may use cookies or similar technologies to enhance user
          experience, remember preferences, and collect usage data. You can
          control cookies through your browser settings.
        </p>
      </Section>

      <Section title="1.7 Contact Us">
        <p className="mb-2 text-gray-600 ">
          If you have any questions about this Privacy Policy or how your data
          is handled, please contact us at:
        </p>
        <ul className="list-disc list-inside text-gray-600 ">
          <li>Email: support@inecnigeria.org</li>
          <li>Phone: 0700-CALL-INEC</li>
          <li>
            Address: Independent National Electoral Commission (INEC), Abuja,
            Nigeria
          </li>
        </ul>
      </Section>

      <Section title="1.8 Updates to this Policy">
        <p className="mb-2 text-gray-600 ">
          We may update this Privacy Policy from time to time. The “last
          updated” date at the top of this document indicates when changes were
          made. Significant changes will be communicated through the INECPRES
          app or INEC website.
        </p>
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

export default PrivacyPage;
