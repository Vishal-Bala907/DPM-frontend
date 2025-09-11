import React, { useState } from "react";
import { User, Plus, Database, Menu, X } from "lucide-react";

const MobileNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="md:hidden bg-white shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Logo */}
        <div className="text-xl font-bold text-blue-600">YourLogo</div>

        {/* Right Section - Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Dropdown */}
      {isMenuOpen && (
        <div className="border-t bg-white">
          <div className="px-4 py-2 space-y-1">
            <button className="flex items-center space-x-3 w-full px-3 py-3 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer">
              <Plus size={20} />
              <span>Add Work</span>
            </button>

            <button className="flex items-center space-x-3 w-full px-3 py-3 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer">
              <Database size={20} />
              <span>View Data</span>
            </button>

            <button className="flex items-center space-x-3 w-full px-3 py-3 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer">
              <User size={20} />
              <span>View Profile</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
