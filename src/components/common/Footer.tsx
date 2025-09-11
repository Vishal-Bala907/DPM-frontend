import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-blue-400 mb-4">DPM</div>
            <p className="text-gray-300 mb-4 max-w-md">
              Take control of your day with our powerful work tracking and team
              management platform. Designed for both individuals and
              organizations.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              >
                <span className="text-xl">📧</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              >
                <span className="text-xl">📱</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              >
                <span className="text-xl">🌐</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#help"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 DPM. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <span>🔒</span>
                <span>Secure & Reliable</span>
              </span>
              <span className="flex items-center space-x-2">
                <span>⚡</span>
                <span>Fast & Efficient</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
