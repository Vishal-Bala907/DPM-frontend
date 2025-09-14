import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Users, Clock, TrendingUp, Eye } from "lucide-react";
import { StarRating } from "../normaluser";

interface EmployeeWorkData {
  email: string;
  name: string;
  totalHours: number;
  totalMinutes: number;
  workDays: number;
  averageDaily: number;
  categories: string[];
}

interface OrganizationOverviewProps {
  mockData?: EmployeeWorkData[];
}

const OrganizationOverview: React.FC<OrganizationOverviewProps> = ({
  mockData = [],
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Generate mock data for demonstration
  const generateMockData = (): EmployeeWorkData[] => {
    const employees = [
      { name: "John Doe", email: "john.doe@company.com" },
      { name: "Jane Smith", email: "jane.smith@company.com" },
      { name: "Mike Johnson", email: "mike.johnson@company.com" },
      { name: "Sarah Wilson", email: "sarah.wilson@company.com" },
      { name: "David Brown", email: "david.brown@company.com" },
      { name: "Lisa Davis", email: "lisa.davis@company.com" },
      { name: "Tom Anderson", email: "tom.anderson@company.com" },
      { name: "Emma Thompson", email: "emma.thompson@company.com" },
      { name: "Alex Rodriguez", email: "alex.rodriguez@company.com" },
      { name: "Maya Patel", email: "maya.patel@company.com" },
    ];

    const categories = [
      "Development",
      "Design",
      "Testing",
      "Meetings",
      "Research",
    ];

    return employees.map((emp) => {
      const totalHours = Math.random() * 160 + 80; // 80-240 hours
      const workDays = Math.floor(Math.random() * 20) + 15; // 15-35 work days
      const selectedCategories = categories
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 4) + 2);

      return {
        email: emp.email,
        name: emp.name,
        totalHours: Math.round(totalHours * 10) / 10,
        totalMinutes: Math.floor(totalHours * 60),
        workDays,
        averageDaily: Math.round((totalHours / workDays) * 10) / 10,
        categories: selectedCategories,
      };
    });
  };

  const [employees] = useState<EmployeeWorkData[]>(
    mockData.length > 0 ? mockData : generateMockData()
  );

  // Prepare data for pie chart
  const pieChartData = employees.map((emp) => ({
    name: emp.name,
    email: emp.email,
    hours: emp.totalHours,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  }));

  // Prepare data for line chart (monthly trend simulation)
  const lineChartData = Array.from({ length: 12 }, (_, index) => {
    const month = new Date(2024, index).toLocaleDateString("en-US", {
      month: "short",
    });
    const data: { [key: string]: string | number } = { month };

    employees.slice(0, 5).forEach((emp) => {
      data[emp.name] = Math.floor(Math.random() * 40) + 20; // 20-60 hours per month
    });

    return data;
  });

  // Pagination
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewEmployee = (email: string) => {
    navigate(`/dashboard/view-emp-data?email=${encodeURIComponent(email)}`);
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  // Calculate organization stats
  const totalOrgHours = employees.reduce((sum, emp) => sum + emp.totalHours, 0);
  const averageEmployeeHours = totalOrgHours / employees.length;
  const mostProductiveEmployee = employees.reduce(
    (max, emp) => (emp.totalHours > max.totalHours ? emp : max),
    employees[0]
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(totalOrgHours)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average per Employee</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(averageEmployeeHours)}h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <StarRating workingHours={averageEmployeeHours} size={20} />
            <div>
              <p className="text-sm text-gray-600">Top Performer</p>
              <p className="text-lg font-bold text-gray-900">
                {mostProductiveEmployee?.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Work Distribution by Employee
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="hours"
                >
                  {pieChartData.map((entry, index) => (
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

        {/* Line Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Work Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {employees.slice(0, 5).map((emp, index) => (
                  <Line
                    key={emp.email}
                    type="monotone"
                    dataKey={emp.name}
                    stroke={`hsl(${index * 72}, 70%, 50%)`}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Employee Details
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average/Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedEmployees.map((employee) => (
                <tr key={employee.email} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {formatTime(employee.totalMinutes)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.averageDaily.toFixed(1)}h
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-1">
                      {employee.categories
                        .slice(0, 2)
                        .map((category, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {category}
                          </span>
                        ))}
                      {employee.categories.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-600">
                          +{employee.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StarRating
                      workingHours={employee.averageDaily}
                      size={14}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewEmployee(employee.email)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View More
                    </button>
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
            {Math.min(startIndex + itemsPerPage, employees.length)} of{" "}
            {employees.length} employees
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationOverview;
