import React from "react";
import PricingCard from "./PricingCard";
import type { PricingPlan } from "./PricingCard";

interface PricingGridProps {
  plans: PricingPlan[];
  category: "individual" | "organization";
  onSelectPlan: (planId: string) => void;
}

const PricingGrid: React.FC<PricingGridProps> = ({
  plans,
  category,
  onSelectPlan,
}) => {
  const filteredPlans = plans.filter((plan) => plan.category === category);

  return (
    <div className="space-y-12">
      {/* Category Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/20">
          <span className="text-3xl">
            {category === "individual" ? "👤" : "🏢"}
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            {category === "individual"
              ? "Individual Plans"
              : "Organization Plans"}
          </h2>
        </div>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          {category === "individual"
            ? "Perfect for personal productivity and individual work tracking"
            : "Designed for teams and organizations of all sizes"}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} onSelectPlan={onSelectPlan} />
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-6 text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <span>No Setup Fees</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>↩️</span>
            <span>30-Day Money Back</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📞</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingGrid;
