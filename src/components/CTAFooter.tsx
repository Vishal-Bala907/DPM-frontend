import React from "react";

const CTAFooter: React.FC = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-300/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-8">
            <span className="text-3xl">🙌</span>
          </div>

          {/* Tagline */}
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            Take control of your day.
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-12">
            Start tracking your progress now.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            {/* Sign Up Free Button */}
            <button className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">Sign Up Free</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                  🚀
                </span>
              </div>
            </button>

            {/* Contact Sales Button */}
            <button className="group relative w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-300 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">Contact Sales</span>
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                  📞
                </span>
              </div>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span>✅</span>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Setup in 2 Minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span>100% Secure</span>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;
