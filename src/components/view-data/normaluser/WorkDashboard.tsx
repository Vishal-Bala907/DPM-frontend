import React, { useState } from "react";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import WorkDataOverview from "./WorkDataOverview";
import DateWiseTable from "./DateWiseTable";

interface CategoryWorkData {
  id: string;
  name: string;
  color: string;
  totalMinutes: number;
  totalHours: number;
  workCount: number;
  averageDaily: number;
}

interface DailyWorkData {
  date: string;
  totalHours: number;
  totalMinutes: number;
  workCount: number;
  categories: string[];
}

interface WorkDashboardProps {
  // In real app, these would come from API
  mockCategoryData?: CategoryWorkData[];
  mockDailyData?: DailyWorkData[];
}

const WorkDashboard: React.FC<WorkDashboardProps> = ({
  mockCategoryData = [],
  mockDailyData = [],
}) => {
  const [activeView, setActiveView] = useState<"overview" | "daily">(
    "overview"
  );

  // Generate mock category data
  const generateMockCategoryData = (): CategoryWorkData[] => {
    const categories = [
      { name: "Development", color: "#3B82F6" },
      { name: "Design", color: "#10B981" },
      { name: "Testing", color: "#F59E0B" },
      { name: "Meetings", color: "#EF4444" },
      { name: "Research", color: "#8B5CF6" },
      { name: "Documentation", color: "#06B6D4" },
    ];

    return categories.map((cat, index) => {
      const totalHours = Math.random() * 40 + 10; // 10-50 hours
      const totalMinutes = Math.floor(totalHours * 60);
      const workCount = Math.floor(Math.random() * 25) + 5; // 5-30 entries

      return {
        id: `cat-${index}`,
        name: cat.name,
        color: cat.color,
        totalMinutes,
        totalHours: Math.round(totalHours * 10) / 10,
        workCount,
        averageDaily: Math.round((totalHours / 30) * 10) / 10, // Assuming 30 days
      };
    });
  };

  const categoryData =
    mockCategoryData.length > 0 ? mockCategoryData : generateMockCategoryData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Work Analytics Dashboard
            </h1>
            <p className="text-blue-100">
              Track your productivity and performance
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {categoryData
                  .reduce((sum, cat) => sum + cat.totalHours, 0)
                  .toFixed(1)}
                h
              </div>
              <div className="text-sm text-blue-100">Total Hours</div>
            </div>
            <div className="w-px h-12 bg-blue-400" />
            <div className="text-center">
              <div className="text-2xl font-bold">
                {categoryData.reduce((sum, cat) => sum + cat.workCount, 0)}
              </div>
              <div className="text-sm text-blue-100">Work Entries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveView("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeView === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <BarChart3 size={18} />
              <span>Category Overview</span>
            </button>
            <button
              onClick={() => setActiveView("daily")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeView === "daily"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Calendar size={18} />
              <span>Daily Analysis</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeView === "overview" && (
            <WorkDataOverview categoryData={categoryData} />
          )}
          {activeView === "daily" && <DateWiseTable mockData={mockDailyData} />}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Most Productive Category</p>
              <p className="font-semibold text-gray-900">
                {categoryData.reduce(
                  (max, cat) => (cat.totalHours > max.totalHours ? cat : max),
                  categoryData[0]
                )?.name || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Daily Hours</p>
              <p className="font-semibold text-gray-900">
                {(
                  categoryData.reduce((sum, cat) => sum + cat.totalHours, 0) /
                  30
                ).toFixed(1)}
                h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <p className="font-semibold text-gray-900">
                {categoryData.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDashboard;
