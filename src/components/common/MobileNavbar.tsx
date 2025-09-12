import React, { useState, type JSX } from "react";
import {
  User,
  Plus,
  Database,
  Menu,
  X,
  CircleDollarSign,
  House,
} from "lucide-react";
import { navbarOptions } from "../../data/common.data";
import { Link } from "react-router-dom";

const ICON_MAP: Record<string, JSX.Element> = {
  User: <User size={20} />,
  Plus: <Plus size={20} />,
  Database: <Database size={20} />,
  CircleDollarSign: <CircleDollarSign size={20} />,
  House: <House size={20} />,
};

const MobileNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`md:hidden bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DPM</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DPM
          </span>
        </div>

        {/* Right Section - Menu Button */}
        <button
          onClick={toggleMenu}
          className="relative z-50 p-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 cursor-pointer group"
        >
          <div className="relative">
            {isMenuOpen ? (
              <X
                size={24}
                color="black"
                className="transform rotate-0 transition-transform duration-300"
              />
            ) : (
              <Menu
                size={24}
                className="transform rotate-0 transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </div>
          {/* Animated background circle */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
      </div>

      {/* Mobile Menu - Dropdown with enhanced animations */}
      <div
        className={`border-t border-gray-100 bg-white backdrop-blur-sm transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "max-h-96  translate-y-0 absolute z-40 top-20 w-full bg-white"
            : "max-h-0 h-0 opacity-0 -translate-y-2 overflow-hidden"
        }`}
      >
        <div className="px-4 py-2 space-y-1">
          {navbarOptions.map((option, index) => (
            <Link to={`${option.href}`} key={index}>
              <div
                className={`group flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 cursor-pointer transform hover:translate-x-2 hover:shadow-md ${
                  isMenuOpen ? "animate-slideInLeft" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon container with enhanced styling */}
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                    {ICON_MAP[option.icon]}
                  </div>
                </div>

                {/* Label with improved typography */}
                <span className="font-medium text-base group-hover:font-semibold transition-all duration-300">
                  {option.label}
                </span>

                {/* Animated arrow indicator */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom gradient separator */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-50"></div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
