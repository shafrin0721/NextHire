import { ChevronDownIcon, HelpCircleIcon } from "lucide-react";

const faqs = [
  {
    question: "What are your office hours?",
    answer:
      "We're open Monday through Friday, 9:00 AM to 6:00 PM PST. Our support team is available 24/7 via email.",
  },
  {
    question: "How quickly will I receive a response?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. Urgent matters are prioritized.",
  },
  {
    question: "Can I schedule an in-person meeting?",
    answer:
      "Yes! We welcome in-person meetings at our San Francisco office. Please contact us to schedule an appointment.",
  },
  {
    question: "Do you offer support in other languages?",
    answer:
      "Currently, we provide support in English and Spanish. Additional language support is coming soon.",
  },
];

export const FAQSection = (): JSX.Element => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="text-center mb-8">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-gray-900 text-3xl tracking-[-0.50px] leading-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm md:text-base tracking-[-0.50px] leading-6">
            Quick answers to common questions.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl bg-white shadow-[0px_10px_24px_rgba(15,23,42,0.08)] px-5 py-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <HelpCircleIcon className="w-4 h-4" />
                  </div>
                  <h3 className="[font-family:'Inter',Helvetica] font-medium text-gray-900 text-sm md:text-base tracking-[-0.50px] leading-6">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </div>
              <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xs md:text-sm tracking-[-0.50px] leading-6 pl-11">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

