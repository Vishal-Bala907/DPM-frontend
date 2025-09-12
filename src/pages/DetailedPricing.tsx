// import { useState } from "react";
import {
  PricingHeader,
  PricingGrid,
  // ComparisonTable,
  PricingFAQ,
} from "../components/detailed-pricing";
import { detailedPricingData } from "../data/pricing.data";
import { Footer, Navbar } from "../components";

const DetailedPricing = () => {
  // const [, setIsAnnual] = useState(false);

  const handlePlanSelect = (planId: string) => {
    console.log("Selected plan:", planId);
    // Handle plan selection logic here
  };

  // const handleBillingToggle = (annual: boolean) => {
  //   setIsAnnual(annual);
  //   // You can modify pricing data based on billing cycle here
  // };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-300/10 to-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative">
          {/* Header Section */}
          <section className="pt-20 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
              <PricingHeader />
            </div>
          </section>

          {/* Individual Plans Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <PricingGrid
                plans={detailedPricingData}
                category="individual"
                onSelectPlan={handlePlanSelect}
              />
            </div>
          </section>

          {/* Individual Comparison Table */}
          {/* <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <ComparisonTable
              plans={detailedPricingData}
              category="individual"
            />
          </div>
        </section> */}

          {/* Organization Plans Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <PricingGrid
                plans={detailedPricingData}
                category="organization"
                onSelectPlan={handlePlanSelect}
              />
            </div>
          </section>

          {/* Organization Comparison Table */}
          {/* <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <ComparisonTable
              plans={detailedPricingData}
              category="organization"
            />
          </div>
        </section> */}

          {/* FAQ Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <PricingFAQ />
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Join thousands of users who are already boosting their
                  productivity with DPM
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handlePlanSelect("individual-pro")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Start Free Trial
                  </button>
                  <button className="bg-white hover:bg-gray-50 text-gray-700 hover:text-purple-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-300 hover:border-purple-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailedPricing;
