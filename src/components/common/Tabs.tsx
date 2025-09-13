import React from "react";

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      <div className="border-b border-gray-200">
        <nav className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 relative ${
                activeTab === tab.id
                  ? "text-blue-700 bg-blue-50 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {tab.icon && <span className="text-lg">{tab.icon}</span>}
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
