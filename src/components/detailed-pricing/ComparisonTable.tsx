import React from "react";
import type { PricingPlan } from "./PricingCard";

interface ComparisonTableProps {
  plans: PricingPlan[];
  category: "individual" | "organization";
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  plans,
  category,
}) => {
  const filteredPlans = plans.filter((plan) => plan.category === category);

  // Get all unique features across all plans
  const allFeatures = Array.from(
    new Set(
      filteredPlans.flatMap((plan) =>
        plan.features.map((feature) => feature.text)
      )
    )
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {category === "individual"
            ? "👤 Individual Plans"
            : "🏢 Organization Plans"}
        </h3>
        <p className="text-gray-600 text-center">
          Compare features across all {category} pricing tiers
        </p>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header Row */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 border-r border-gray-200">
                Features
              </th>
              {filteredPlans.map((plan) => (
                <th
                  key={plan.id}
                  className={`px-6 py-4 text-center font-semibold border-r border-gray-200 last:border-r-0 ${
                    plan.isPopular
                      ? "bg-gradient-to-b from-purple-100 to-blue-100 text-purple-800"
                      : "text-gray-900"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="text-lg">{plan.title}</div>
                    <div className="text-2xl font-bold">
                      <span
                        className={
                          plan.isPopular
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                            : "text-gray-900"
                        }
                      >
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-500 font-normal">
                        /{plan.period}
                      </span>
                    </div>
                    {plan.badge && (
                      <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        {plan.badge}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {allFeatures.map((featureText, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-200">
                  {featureText}
                </td>
                {filteredPlans.map((plan) => {
                  const feature = plan.features.find(
                    (f) => f.text === featureText
                  );
                  return (
                    <td
                      key={plan.id}
                      className="px-6 py-4 text-center border-r border-gray-200 last:border-r-0"
                    >
                      {feature ? (
                        <div className="flex items-center justify-center">
                          {feature.included ? (
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                feature.premium
                                  ? "bg-gradient-to-r from-purple-400 to-blue-500"
                                  : "bg-gradient-to-r from-green-400 to-emerald-500"
                              }`}
                            >
                              <span className="text-white text-xs font-bold">
                                ✓
                              </span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">✕</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                          <span className="text-gray-400 text-xs">✕</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer with CTA */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div></div> {/* Empty space for features column */}
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="text-center">
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                  plan.buttonVariant === "primary"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    : "bg-white hover:bg-gray-50 text-gray-700 hover:text-purple-700 border-2 border-gray-300 hover:border-purple-300"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
