import React from "react";
import { User, Plus, Database } from "lucide-react";

const DesktopNavbar: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center">
        <div className="text-2xl font-bold text-blue-600">YourLogo</div>
      </div>

      {/* Right Section - Navigation Items */}
      <div className="flex items-center space-x-6">
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer">
          <Plus size={20} />
          <span>Add Work</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer">
          <Database size={20} />
          <span>View Data</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer">
          <User size={20} />
          <span>View Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
