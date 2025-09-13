import React from "react";
import type { TabType } from "../../types/work.types";

interface TabContainerProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  children: React.ReactNode;
}

const TabContainer: React.FC<TabContainerProps> = ({
  activeTab,
  onTabChange,
  children,
}) => {
  const tabs = [
    { id: "addFromList" as TabType, label: "Add From List", icon: "📋" },
    {
      id: "workDetailsForm" as TabType,
      label: "Work Details Form",
      icon: "📝",
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
        <nav className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-blue-700 bg-white border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-blue-600 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">{tab.icon}</span>
                <span className="text-sm md:text-base font-semibold">
                  {tab.label}
                </span>
              </div>

              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default TabContainer;
