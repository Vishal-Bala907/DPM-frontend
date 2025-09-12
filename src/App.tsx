import { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add a small delay to show the loader before navigating
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-4 animate-pulse">
            <span className="text-3xl font-bold text-white">DPM</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Daily Progress Manager
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Take control of your day</p>
        </div>

        {/* Animated Loader */}
        <div className="flex flex-col items-center space-y-6">
          {/* Spinning Circles */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animate-reverse"></div>
          </div>

          {/* Progress Dots */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>

          {/* Loading Text */}
          <div className="text-gray-600 font-medium">
            Loading your workspace...
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-sm text-gray-500">
          Preparing your productivity dashboard
        </div>
      </div>
    </div>
  );
}

export default App;
