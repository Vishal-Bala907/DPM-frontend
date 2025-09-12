import React from "react";
import { Link } from "react-router-dom";
import { plansData } from "../data/common.data";

const PlansAndTiers: React.FC = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mb-6">
            <span className="text-2xl">💎</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
            Plans & Tiers Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your needs - whether you're an
            individual or managing an organization
          </p>
        </div>

        {/* Plans Grid */}
        <div className="space-y-16">
          {plansData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              {/* Category Header */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.category}
                  </h3>
                </div>
              </div>

              {/* Plans Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {category.plans.map((plan, planIndex) => (
                  <div
                    key={planIndex}
                    className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border hover:-translate-y-2 ${
                      plan.isPopular
                        ? "border-purple-300/50 ring-2 ring-purple-200/30"
                        : "border-white/20 hover:border-purple-200/50"
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
                          ⭐ Most Popular
                        </div>
                      </div>
                    )}

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Plan Title */}
                    <div className="relative text-center mb-8">
                      <h4
                        className={`text-3xl font-bold mb-2 ${
                          plan.isPopular
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                            : "text-gray-900 group-hover:text-purple-700"
                        } transition-colors duration-300`}
                      >
                        {plan.title}
                      </h4>

                      {/* Price */}
                      {plan.price ? (
                        <div className="mb-3">
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {plan.price}
                          </span>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <span className="text-2xl font-bold text-green-600">
                            Free
                          </span>
                        </div>
                      )}

                      {plan.title === "Free" && (
                        <div className="text-sm text-gray-500 font-medium">
                          Perfect to get started
                        </div>
                      )}
                      {plan.title === "Paid" && (
                        <div className="text-sm text-purple-600 font-medium">
                          Unlock full potential
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="relative space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`flex items-center space-x-3 transition-all duration-300 ${
                            feature.included ? "text-gray-700" : "text-gray-400"
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-6 h-6 rounded-full ${
                              feature.included
                                ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
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
                            className={`font-medium ${
                              feature.included ? "" : "line-through"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
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
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16 space-y-6">
          <div className="inline-flex items-center space-x-2 text-sm font-medium text-purple-600 bg-purple-50 px-6 py-3 rounded-full shadow-sm">
            <span>🎯</span>
            <span>Start with Free • Upgrade anytime</span>
          </div>

          {/* View More Link */}
          <div>
            <Link
              to="/pricing"
              className="group inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 hover:scale-105"
            >
              <span>View Detailed Pricing</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansAndTiers;
