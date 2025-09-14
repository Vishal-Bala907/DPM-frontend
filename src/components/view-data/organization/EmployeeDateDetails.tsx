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
}

const EmployeeDateDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const employeeId = searchParams.get("employeeId");
  const employeeName = searchParams.get("employeeName") || "Unknown Employee";

  // Date range state
  const [currentPage, setCurrentPage] = useState(1);
  const daysPerPage = 30;

  // Mock daily data for the employee
  const dailyData: DailyData[] = Array.from({ length: 90 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    const hours = Math.round((Math.random() * 10 + 2) * 10) / 10; // 2-12 hours

    return {
      date: date.toISOString().split("T")[0],
      hours,
      rating: hours >= 8 ? (hours >= 12 ? 5 : 4) : hours >= 6 ? 3 : 2,
    };
  }).reverse();

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
                `/dashboard/view-emp-data?employeeId=${employeeId}&employeeName=${employeeName}`
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

      {/* Category Cards */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Category Breakdown
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map((category) => (
            <div
              key={category.name}
              className="p-4 bg-gray-50 rounded-lg text-center"
            >
              <div
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: category.color }}
              />
              <p className="text-sm font-medium text-gray-900">
                {category.name}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {category.hours}h
              </p>
              <p className="text-xs text-gray-500">
                {(
                  (category.hours /
                    categoryData.reduce((sum, cat) => sum + cat.hours, 0)) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          ))}
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
