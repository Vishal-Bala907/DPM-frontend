import React from "react";

export interface PricingFeature {
  text: string;
  included: boolean;
  premium?: boolean;
}

export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  period: string;
  badge?: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  isPopular?: boolean;
  category: "individual" | "organization";
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelectPlan }) => {
  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border hover:-translate-y-2 ${
        plan.isPopular
          ? "border-purple-300/50 ring-2 ring-purple-200/30 scale-105"
          : "border-white/20 hover:border-purple-200/50"
      }`}
    >
      {/* Popular Badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg">
            {plan.badge}
          </div>
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Plan Header */}
      <div className="relative text-center mb-8">
        <h3
          className={`text-3xl font-bold mb-2 ${
            plan.isPopular
              ? "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              : "text-gray-900 group-hover:text-purple-700"
          } transition-colors duration-300`}
        >
          {plan.title}
        </h3>

        <p className="text-gray-600 text-sm font-medium mb-4">
          {plan.subtitle}
        </p>

        {/* Pricing */}
        <div className="mb-4">
          {plan.originalPrice && (
            <div className="text-gray-400 line-through text-lg mb-1">
              {plan.originalPrice}
            </div>
          )}
          <div className="flex items-baseline justify-center">
            <span
              className={`text-4xl font-bold ${
                plan.isPopular
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                  : "text-gray-900"
              }`}
            >
              {plan.price}
            </span>
            <span className="text-gray-500 text-lg ml-2">/{plan.period}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Features List */}
      <div className="relative space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 transition-all duration-300 ${
              feature.included ? "text-gray-700" : "text-gray-400"
            }`}
          >
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                feature.included
                  ? feature.premium
                    ? "bg-gradient-to-r from-purple-400 to-blue-500 text-white"
                    : "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {feature.included ? (
                <span className="text-xs font-bold">✓</span>
              ) : (
                <span className="text-xs">✕</span>
              )}
            </div>
            <span
              className={`font-medium text-sm ${
                feature.included ? "" : "line-through"
              } ${feature.premium ? "text-purple-700 font-semibold" : ""}`}
            >
              {feature.text}
            </span>
            {feature.premium && (
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium">
                Premium
              </span>
            )}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="relative">
        <button
          onClick={() => onSelectPlan(plan.id)}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer ${
            plan.buttonVariant === "primary"
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              : "bg-white hover:bg-gray-50 text-gray-700 hover:text-purple-700 border-2 border-gray-300 hover:border-purple-300"
          }`}
        >
          {plan.buttonText}
        </button>
      </div>

      {/* Decorative bottom border */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 rounded-full group-hover:w-16 transition-all duration-500 ${
          plan.isPopular
            ? "bg-gradient-to-r from-purple-500 to-blue-600"
            : "bg-gradient-to-r from-gray-400 to-gray-600"
        }`}
      ></div>
    </div>
  );
};

export default PricingCard;
