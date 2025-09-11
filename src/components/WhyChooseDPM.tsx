import React from "react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const benefitsData: Benefit[] = [
  {
    icon: "🚀",
    title: "Designed for both personal productivity and team collaboration",
    description:
      "Whether you're working solo or managing a team, DPM adapts to your workflow",
  },
  {
    icon: "🔒",
    title: "Secure authentication with JWT & Google SSO",
    description:
      "Enterprise-grade security keeps your data safe and access controlled",
  },
  {
    icon: "🕒",
    title: "Time-saving dashboard for easy log management",
    description:
      "Intuitive interface makes tracking and managing work logs effortless",
  },
  {
    icon: "📈",
    title: "Scales with you as your team or personal goals grow",
    description:
      "From individual tasks to organization-wide tracking, we grow with you",
  },
];

const WhyChooseDPM: React.FC = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-amber-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-300/10 to-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl mb-6">
            <span className="text-2xl">🌟</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-800 to-amber-800 bg-clip-text text-transparent mb-6">
            Why Choose DPM?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover what makes DPM the perfect choice for your productivity and
            team management needs
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 hover:border-orange-200/50 hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon container */}
              <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-600/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <span className="relative text-3xl filter drop-shadow-sm">
                  {benefit.icon}
                </span>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full group-hover:w-12 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm font-medium text-orange-600 bg-orange-50 px-6 py-3 rounded-full shadow-sm">
            <span>💪</span>
            <span>Built for success • Designed for growth</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseDPM;
