import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface PricingFAQProps {
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    question: "Can I switch between plans at any time?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and you'll be charged or credited the difference accordingly.",
  },
  {
    id: "2",
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, we offer a 14-day free trial for all paid plans. No credit card required to start your trial. You can experience all premium features before committing to a subscription.",
  },
  {
    id: "3",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our encrypted payment system.",
  },
  {
    id: "4",
    question: "Do you offer discounts for annual subscriptions?",
    answer:
      "Yes! Annual subscriptions come with a 20% discount compared to monthly billing. You'll save even more money while getting uninterrupted access to all features.",
  },
  {
    id: "5",
    question: "What happens to my data if I cancel?",
    answer:
      "Your data remains accessible for 30 days after cancellation. During this period, you can reactivate your account or export your data. After 30 days, data is permanently deleted for security purposes.",
  },
  {
    id: "6",
    question: "Can I add more team members to my organization plan?",
    answer:
      "Absolutely! You can add team members at any time. For paid plans, additional members will be prorated for the current billing cycle. Free plans have a limit of 4 team members.",
  },
  {
    id: "7",
    question: "Is there customer support included?",
    answer:
      "Yes! All plans include customer support. Free plans get community support, while paid plans receive priority email support and dedicated account management for enterprise customers.",
  },
  {
    id: "8",
    question: "Do you offer custom enterprise solutions?",
    answer:
      "Yes, we offer custom enterprise solutions with advanced security features, custom integrations, and dedicated support. Contact our sales team to discuss your specific requirements.",
  },
];

const PricingFAQ: React.FC<PricingFAQProps> = ({ faqs = defaultFAQs }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mb-6">
          <span className="text-2xl">❓</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Everything you need to know about our pricing and plans
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-300 group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                {faq.question}
              </h3>
              <div className="flex-shrink-0 ml-4">
                {openItems.has(faq.id) ? (
                  <ChevronUp className="w-5 h-5 text-purple-600 transform group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transform group-hover:scale-110 transition-all duration-300" />
                )}
              </div>
            </button>

            {/* Animated Answer Section */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                openItems.has(faq.id)
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="px-8 pb-6 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you choose the right plan for your
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Contact Support
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 hover:text-purple-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-purple-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingFAQ;
