import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Eye, TrendingUp } from "lucide-react";
import StarRating from "./StarRating";

interface CategoryWorkData {
  id: string;
  name: string;
  color: string;
  totalMinutes: number;
  totalHours: number;
  workCount: number;
  averageDaily: number;
}

interface WorkDataOverviewProps {
  categoryData: CategoryWorkData[];
}

const WorkDataOverview: React.FC<WorkDataOverviewProps> = ({
  categoryData,
}) => {
  const navigate = useNavigate();

  const handleViewMore = (categoryName: string) => {
    navigate(`/category-data?name=${encodeURIComponent(categoryName)}`);
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const getTotalStats = () => {
    const totalMinutes = categoryData.reduce(
      (sum, cat) => sum + cat.totalMinutes,
      0
    );
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
    const totalWorkCount = categoryData.reduce(
      (sum, cat) => sum + cat.workCount,
      0
    );

    return { totalMinutes, totalHours, totalWorkCount };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Work Data Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatTime(stats.totalMinutes)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalWorkCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <StarRating workingHours={stats.totalHours} size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overall Rating</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalHours}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Category Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h3 className="text-lg font-semibold text-gray-900 flex-1">
                {category.name}
              </h3>
            </div>

            {/* Category Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Time:</span>
                <span className="font-medium text-gray-900">
                  {formatTime(category.totalMinutes)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Work Entries:</span>
                <span className="font-medium text-gray-900">
                  {category.workCount}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Daily Average:</span>
                <span className="font-medium text-gray-900">
                  {Math.round(category.averageDaily * 10) / 10}h
                </span>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Performance:</span>
              <StarRating
                workingHours={category.totalHours}
                size={16}
                showText
              />
            </div>

            {/* View More Button */}
            <button
              onClick={() => handleViewMore(category.name)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Eye size={16} />
              <span>View More Details</span>
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categoryData.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Work Data Available
          </h3>
          <p className="text-gray-600">
            Start logging your work to see analytics here.
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkDataOverview;
