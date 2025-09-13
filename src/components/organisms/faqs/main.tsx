import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HaveQuestionCard,
  HowToApplyCard,
  NewApplicantCard,
} from "../how-to-apply/sidebar-card";

export default function FAQsPage() {
  const faqs = [
    {
      question: "What position am I eligible to apply for?",
      answer:
        "Your eligibility depends on your current status and qualifications. Please review the position requirements in the Eligibility section to determine which positions match your background and qualifications.",
    },
    {
      question: "Can I apply for more than one Election Staff position?",
      answer:
        "No, you can only apply for one position per election cycle. Choose the position that best matches your qualifications and experience.",
    },
    {
      question: "Can I retrieve my lost password?",
      answer:
        "Yes, you can retrieve your lost password by clicking on the 'Forgot Password' link on the login page. You will receive instructions via email to reset your password.",
    },
    {
      question: "Why can't I upload my passport photograph?",
      answer:
        "Ensure your passport photograph meets the requirements: JPEG format, maximum 2MB file size, clear image quality, and proper passport photo dimensions. If issues persist, try using a different browser or device.",
    },
    {
      question: "How do I know my application is completed?",
      answer:
        "Once you submit your application, you will receive a confirmation email and see a completion status on your dashboard. You can also download your acknowledgement slip as proof of submission.",
    },
    {
      question: "How can I Print out my Acknowledgement slip?",
      answer:
        "After completing your application, go to your dashboard and click on 'Download Acknowledgement Slip'. You can then print the PDF document for your records.",
    },
    {
      question: "I cannot find my Passport on my Preview Page?",
      answer:
        "If your passport information is not showing on the preview page, ensure you have properly uploaded your passport photograph and filled in all passport-related fields. Contact support if the issue persists.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">FAQs</h1>

              <Accordion type="single" collapsible className="w-full h-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="py-2"
                  >
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#607087] leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
