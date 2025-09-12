const PricingHeader = () => {
  // const [isAnnual, setIsAnnual] = useState(false);

  // const handleToggle = () => {
  //   const newValue = !isAnnual;
  //   setIsAnnual(newValue);
  //   onBillingToggle?.(newValue);
  // };

  return (
    <div className="text-center mb-16">
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl mb-8">
        <span className="text-4xl">💎</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
        Choose Your Perfect Plan
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
        Unlock your productivity potential with our comprehensive work tracking
        and team management solutions
      </p>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {/* <span
          className={`font-medium transition-colors duration-300 ${
            !isAnnual ? "text-gray-900" : "text-gray-500"
          }`}
        >
          Monthly
        </span> */}
        {/* 
        <button
          onClick={handleToggle}
          className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          style={{
            backgroundColor: isAnnual ? "#8B5CF6" : "#D1D5DB",
          }}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
              isAnnual ? "translate-x-9" : "translate-x-1"
            }`}
          />
        </button> */}

        {/* <div className="flex items-center space-x-2">
          <span
            className={`font-medium transition-colors duration-300 ${
              isAnnual ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Annual
          </span>
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Save 20%
          </span>
        </div> */}
      </div>

      {/* Features Highlight */}
      {/* <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-sm max-w-4xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-green-500">✅</span>
          <span>14-Day Free Trial</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-blue-500">🔒</span>
          <span>Enterprise Security</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-purple-500">⚡</span>
          <span>Instant Setup</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-orange-500">📞</span>
          <span>24/7 Support</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-red-500">↩️</span>
          <span>30-Day Money Back</span>
        </div>
      </div> */}

      {/* Trust Indicators */}
      {/* <div className="mt-8">
        <p className="text-sm text-gray-500 mb-4">
          Trusted by thousands of individuals and organizations worldwide
        </p>
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
            Logo 1
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
            Logo 2
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
            Logo 3
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
            Logo 4
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PricingHeader;
