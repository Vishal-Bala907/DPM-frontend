import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { defaultFAQs as faqs } from "../../data/pricing.data";

const PricingFAQ = () => {
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
