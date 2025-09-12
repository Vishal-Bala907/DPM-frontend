import React, { type JSX } from "react";
import { User, Plus, Database, CircleDollarSign, House } from "lucide-react";
import { navbarOptions } from "../../data/common.data";
import { Link } from "react-router-dom";
const ICON_MAP: Record<string, JSX.Element> = {
  User: <User size={20} />,
  Plus: <Plus size={20} />,
  Database: <Database size={20} />,
  CircleDollarSign: <CircleDollarSign size={20} />,
  House: <House size={20} />,
};

const DesktopNavbar: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center">
        <div className="text-2xl font-bold text-blue-600">YourLogo</div>
      </div>
      {/* Right Section - Navigation Items */}
      <div className="flex items-center space-x-6">
        {navbarOptions.map((option, index) => (
          <Link to={`${option.href}`} key={index}>
            <div className="flex items-center px-2 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer">
              {ICON_MAP[option.icon]}{" "}
              <span className="ml-2 size={20}">{option.label}</span>{" "}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DesktopNavbar;
