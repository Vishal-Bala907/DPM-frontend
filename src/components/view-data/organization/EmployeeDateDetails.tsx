import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StarRating from "../normaluser/StarRating";

interface CategoryData {
  name: string;
  hours: number;
  color: string;
}

interface DailyData {
  date: string;
  hours: number;
  rating: number;
  description: string;
}

const EmployeeDateDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const employeeId = searchParams.get("employeeId");
  const employeeName = searchParams.get("employeeName") || "Unknown Employee";
  const employeeEmail = searchParams.get("email") || "john.doe@company.com";
  const selectedDate = searchParams.get("date");
  const urlStartDate = searchParams.get("startDate");
  const urlEndDate = searchParams.get("endDate");

  // Convert MM-DD-YYYY format to YYYY-MM-DD if needed
  const convertDateFormat = (dateStr: string | null): string | null => {
    if (!dateStr) return null;

    // Check if it's in MM-DD-YYYY format
    if (dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [month, day, year] = dateStr.split("-");
      return `${year}-${month}-${day}`;
    }

    return dateStr; // Already in YYYY-MM-DD format
  };

  const normalizedSelectedDate = convertDateFormat(selectedDate);

  // Date range state
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(
    urlStartDate ||
      normalizedSelectedDate ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    urlEndDate || new Date().toISOString().split("T")[0]
  );
  const daysPerPage = 30;

  // Default date range functions
  const setDateRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
  };

  const setPreviousDay = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    setStartDate(yesterdayStr);
    setEndDate(yesterdayStr);
  };

  // Mock daily data for the employee
  const allDailyData: DailyData[] = Array.from({ length: 90 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    const hours = Math.round((Math.random() * 10 + 2) * 10) / 10; // 2-12 hours

    const tasks = [
      "Development work on user dashboard",
      "Bug fixes and code review",
      "Meeting with product team",
      "Documentation updates",
      "Testing and quality assurance",
      "UI/UX improvements",
      "Database optimization",
      "API integration work",
      "Code refactoring",
      "Team collaboration and planning",
    ];

    return {
      date: date.toISOString().split("T")[0],
      hours,
      rating: hours >= 8 ? (hours >= 12 ? 5 : 4) : hours >= 6 ? 3 : 2,
      description: tasks[index % tasks.length],
    };
  }).reverse();

  // Filter data based on date range
  const filteredDailyData = allDailyData.filter((day) => {
    const dayDate = new Date(day.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return dayDate >= start && dayDate <= end;
  });

  // Use filtered data or show specific date if selected
  const dailyData = normalizedSelectedDate
    ? allDailyData.filter((day) => day.date === normalizedSelectedDate)
    : filteredDailyData.length > 0
    ? filteredDailyData
    : allDailyData;

  // Category distribution data
  const categoryData: CategoryData[] = [
    { name: "Development", hours: 145.5, color: "#3B82F6" },
    { name: "Meetings", hours: 89.2, color: "#10B981" },
    { name: "Documentation", hours: 67.8, color: "#F59E0B" },
    { name: "Testing", hours: 54.3, color: "#EF4444" },
    { name: "Design", hours: 43.7, color: "#8B5CF6" },
    { name: "Research", hours: 32.1, color: "#06B6D4" },
  ];

  // Prepare line chart data for the current page
  const totalPages = Math.ceil(dailyData.length / daysPerPage);
  const startIndex = (currentPage - 1) * daysPerPage;
  const currentDailyData = dailyData.slice(
    startIndex,
    startIndex + daysPerPage
  );

  const lineChartData = currentDailyData.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    hours: day.hours,
    rating: day.rating,
  }));

  // Calculate statistics for current period
  const totalHours = currentDailyData.reduce((sum, day) => sum + day.hours, 0);
  const averageHours = totalHours / currentDailyData.length;
  const averageRating =
    currentDailyData.reduce((sum, day) => sum + day.rating, 0) /
    currentDailyData.length;
  const workingDays = currentDailyData.filter((day) => day.hours > 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              navigate(
                `/dashboard/view-emp-data?email=${encodeURIComponent(
                  employeeEmail
                )}&employeeId=${employeeId}&employeeName=${encodeURIComponent(
                  employeeName
                )}`
              )
            }
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Date-wise Analytics
            </h1>
            <p className="text-gray-600">{employeeName}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Period: {currentDailyData[0]?.date} to{" "}
          {currentDailyData[currentDailyData.length - 1]?.date}
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Date Range Filter
          </h3>
          {selectedDate && (
            <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
              Viewing data for:{" "}
              {normalizedSelectedDate &&
                new Date(normalizedSelectedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Date Ranges
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={setToday}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Today
            </button>
            <button
              onClick={setPreviousDay}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Previous Day
            </button>
            <button
              onClick={() => setDateRange(6)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setDateRange(29)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Last 30 Days
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                navigate(
                  `/dashboard/view-emp-date-data?email=${encodeURIComponent(
                    employeeEmail
                  )}&startDate=${startDate}&endDate=${endDate}`
                );
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filter
            </button>
            {selectedDate && (
              <button
                onClick={() => {
                  navigate(
                    `/dashboard/view-emp-date-data?email=${encodeURIComponent(
                      employeeEmail
                    )}`
                  );
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Date
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-xl font-semibold text-gray-900">
                {totalHours.toFixed(1)}h
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
              <p className="text-sm text-gray-600">Daily Average</p>
              <p className="text-xl font-semibold text-gray-900">
                {averageHours.toFixed(1)}h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Working Days</p>
              <p className="text-xl font-semibold text-gray-900">
                {workingDays}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <div className="flex items-center space-x-2">
                <StarRating workingHours={averageHours} />
                <span className="text-sm text-gray-500">
                  ({averageRating.toFixed(1)})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Hours Line Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Work Hours Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value}h`, "Hours"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Work Distribution by Category
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="hours"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toFixed(1)}h`,
                    "Hours",
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Daily Details Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Daily Work Summary
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Showing {startIndex + 1}-
              {Math.min(startIndex + daysPerPage, dailyData.length)} of{" "}
              {dailyData.length} days
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours Worked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentDailyData.map((day) => (
                <tr key={day.date} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      weekday: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {day.hours.toFixed(1)}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <StarRating workingHours={day.hours} />
                      <span className="text-sm text-gray-500">
                        ({day.rating})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate" title={day.description}>
                      {day.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        day.hours >= 8
                          ? "bg-green-100 text-green-800"
                          : day.hours >= 6
                          ? "bg-yellow-100 text-yellow-800"
                          : day.hours > 0
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {day.hours >= 8
                        ? "Full Day"
                        : day.hours >= 6
                        ? "Partial"
                        : day.hours > 0
                        ? "Short"
                        : "No Work"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDateDetails;
