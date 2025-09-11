import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const stepsData: Step[] = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your account as an individual or organization.",
    icon: "👤",
  },
  {
    number: "02",
    title: "Log Your Work",
    description: "Add daily tasks, employees, and track progress.",
    icon: "📝",
  },
  {
    number: "03",
    title: "Analyze & Grow",
    description: "Get insights, edit logs, and scale with your needs.",
    icon: "📈",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300/15 to-emerald-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-6">
            <span className="text-2xl">📱</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started with DPM in just 3 simple steps and transform your
            productivity
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {stepsData.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line (hidden on last item) */}
              {index < stepsData.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 transform translate-x-8 -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-teal-400 rounded-full"></div>
                </div>
              )}

              {/* Step Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 hover:border-emerald-200/50 hover:-translate-y-2 z-10">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Step Number */}
                <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <span className="relative text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-center mb-4">
                  <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 inline-block">
                    {step.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-700 transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="relative text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Decorative bottom border */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full group-hover:w-12 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-6 py-3 rounded-full shadow-sm">
            <span>⚡</span>
            <span>Simple steps • Powerful results</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
