import React from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const featuresData: Feature[] = [
  {
    icon: "📅",
    title: "Easy Daily Work Logs",
    description: "Quickly add daily tasks and track your progress with ease.",
  },
  {
    icon: "📊",
    title: "Powerful Analytics",
    description: "View data trends, productivity, and performance insights.",
  },
  {
    icon: "🏢",
    title: "Individual & Team Support",
    description: "Manage your own progress or track an entire team.",
  },
  {
    icon: "🔐",
    title: "Secure & Reliable",
    description:
      "Built with enterprise-grade authentication (JWT & Google SSO).",
  },
];

const Features: React.FC = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the tools that make work tracking and team management
            effortless with our cutting-edge platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 hover:border-blue-200/50 hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon container with gradient background */}
              <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <span className="relative text-3xl filter drop-shadow-sm">
                  {feature.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="relative text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-700 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative text-gray-600 text-center leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Decorative bottom border */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:w-12 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
            <span>🚀</span>
            <span>Ready to boost your productivity?</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
