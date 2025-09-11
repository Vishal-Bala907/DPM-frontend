import React from "react";

interface PricingTier {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonStyle: string;
}

const pricingData: PricingTier[] = [
  {
    title: "Free Tier",
    price: "₹0",
    period: "forever",
    description: "Perfect for individuals getting started",
    features: [
      "Add daily work logs",
      "View 1 month's data",
      "Basic dashboard",
      "Up to 4 employees (organizations)",
    ],
    buttonText: "Start Free",
    buttonStyle:
      "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
  },
  {
    title: "Pro Plan",
    price: "₹59-299",
    period: "per month",
    description: "Unlock full potential for individuals & organizations",
    features: [
      "All Free features included",
      "Edit & adjust work logs",
      "Unlimited time range access",
      "Unlimited employees",
      "Advanced analytics",
      "Priority support",
    ],
    isPopular: true,
    buttonText: "Start Free Trial",
    buttonStyle:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
  },
];

const PricingCTA: React.FC = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-300/15 to-rose-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl mb-6">
            <span className="text-2xl">💰</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-rose-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose your plan and start boosting your productivity today. No
            credit card required for free tier.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingData.map((tier, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border hover:-translate-y-2 ${
                tier.isPopular
                  ? "border-purple-300/50 ring-2 ring-purple-200/30 scale-105"
                  : "border-white/20 hover:border-rose-200/50"
              }`}
            >
              {/* Popular badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-rose-500 to-purple-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg">
                    🔥 Most Popular
                  </div>
                </div>
              )}

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Pricing Header */}
              <div className="relative text-center mb-8">
                <h3
                  className={`text-3xl font-bold mb-4 ${
                    tier.isPopular
                      ? "bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent"
                      : "text-gray-900 group-hover:text-rose-700"
                  } transition-colors duration-300`}
                >
                  {tier.title}
                </h3>

                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold ${
                      tier.isPopular
                        ? "bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent"
                        : "text-gray-900"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span className="text-gray-500 text-lg ml-2">
                    /{tier.period}
                  </span>
                </div>

                <p className="text-gray-600 mb-6">{tier.description}</p>
              </div>

              {/* Features List */}
              <div className="relative space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="relative">
                <button
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${tier.buttonStyle}`}
                >
                  {tier.buttonText}
                </button>
              </div>

              {/* Decorative bottom border */}
              <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 rounded-full group-hover:w-16 transition-all duration-500 ${
                  tier.isPopular
                    ? "bg-gradient-to-r from-rose-500 to-purple-600"
                    : "bg-gradient-to-r from-gray-400 to-gray-600"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 space-y-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>↩️</span>
              <span>30-day Money Back</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Instant Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span>24/7 Support</span>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 text-sm font-medium text-rose-600 bg-rose-50 px-6 py-3 rounded-full shadow-sm">
            <span>🎉</span>
            <span>Join thousands of satisfied users</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
