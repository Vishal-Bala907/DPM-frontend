import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import StarRating from "./StarRating";

interface CategoryWorkEntry {
  id: string;
  date: string;
  description: string;
  startTime: string;
  endTime: string;
  minutes: number;
  hours: number;
}

interface CategoryDetailsProps {
  // These would typically come from API calls based on category name
  mockData?: CategoryWorkEntry[];
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ mockData = [] }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryName = searchParams.get("name") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "hours">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 10;

  // Mock data for demonstration
  const generateMockData = (): CategoryWorkEntry[] => {
    const entries: CategoryWorkEntry[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Last 30 days

    for (let i = 0; i < 45; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      const randomHours = Math.random() * 8 + 1; // 1-9 hours
      const randomMinutes = Math.floor(randomHours * 60);

      entries.push({
        id: `entry-${i}`,
        date: date.toISOString().split("T")[0],
        description: `${categoryName} work session ${i + 1}`,
        startTime: "09:00",
        endTime: `${Math.floor(9 + randomHours)}:${String(
          Math.floor((randomHours % 1) * 60)
        ).padStart(2, "0")}`,
        minutes: randomMinutes,
        hours: Math.round(randomHours * 10) / 10,
      });
    }

    return entries;
  };

  const [data] = useState<CategoryWorkEntry[]>(
    mockData.length > 0 ? mockData : generateMockData()
  );

  // Sort and paginate data
  const sortedData = [...data].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;

    if (sortBy === "date") {
      return (
        multiplier * new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      return multiplier * (a.hours - b.hours);
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Calculate statistics
  const totalHours = data.reduce((sum, entry) => sum + entry.hours, 0);
  const totalMinutes = data.reduce((sum, entry) => sum + entry.minutes, 0);
  const averageDaily = totalHours / data.length;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const handleSort = (column: "date" | "hours") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Details</h1>
          <p className="text-gray-600">{categoryName}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Time</p>
              <p className="text-xl font-bold text-gray-900">
                {formatTime(totalMinutes)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Entries</p>
              <p className="text-xl font-bold text-gray-900">{data.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Daily Average</p>
              <p className="text-xl font-bold text-gray-900">
                {Math.round(averageDaily * 10) / 10}h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <StarRating workingHours={totalHours} size={20} />
            <div>
              <p className="text-sm text-gray-600">Performance</p>
              <p className="text-xl font-bold text-gray-900">
                {Math.round(totalHours * 10) / 10}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Work Entries</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    {sortBy === "date" && (
                      <span className="text-blue-500">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Range
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("hours")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Duration</span>
                    {sortBy === "hours" && (
                      <span className="text-blue-500">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stars Earned
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate">{entry.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.startTime} - {entry.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {formatTime(entry.minutes)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StarRating workingHours={entry.hours} size={14} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} entries
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="px-3 py-1 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
