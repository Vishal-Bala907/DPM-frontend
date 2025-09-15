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

interface WorkEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  description: string;
  totalHours: number;
}

const EmployeeDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const employeeId = searchParams.get("employeeId");
  const employeeName = searchParams.get("employeeName") || "Unknown Employee";
  const employeeEmail = searchParams.get("email") || "john.doe@company.com";

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Mock data for employee work entries
  const workEntries: WorkEntry[] = Array.from({ length: 45 }, (_, index) => {
    const categories = [
      "Development",
      "Meeting",
      "Documentation",
      "Testing",
      "Design",
      "Research",
    ];
    const category = categories[index % categories.length];
    const startHour = 9 + Math.floor(Math.random() * 4);
    const endHour = startHour + Math.floor(Math.random() * 8) + 1;
    const date = new Date();
    date.setDate(date.getDate() - index);

    return {
      id: index + 1,
      date: date.toISOString().split("T")[0],
      startTime: `${startHour.toString().padStart(2, "0")}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, "0")}`,
      endTime: `${endHour.toString().padStart(2, "0")}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, "0")}`,
      category,
      description: `${category} work for project ${String.fromCharCode(
        65 + Math.floor(Math.random() * 5)
      )}`,
      totalHours: Math.round((endHour - startHour + Math.random()) * 10) / 10,
    };
  });

  // Calculate statistics
  const totalHours = workEntries.reduce(
    (sum, entry) => sum + entry.totalHours,
    0
  );
  const averageHoursPerDay = totalHours / workEntries.length;
  const categoriesData = workEntries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.totalHours;
    return acc;
  }, {} as Record<string, number>);

  // Pagination logic
  const totalPages = Math.ceil(workEntries.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = workEntries.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/dashboard/view-org-data")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Employee Details
            </h1>
            <p className="text-gray-600">{employeeName}</p>
          </div>
        </div>
        <button
          onClick={() =>
            navigate(
              `/dashboard/view-emp-data-datewise?employeeId=${employeeId}&employeeName=${employeeName}`
            )
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Date-wise Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {averageHoursPerDay.toFixed(1)}h
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
              <p className="text-sm text-gray-600">Work Days</p>
              <p className="text-xl font-semibold text-gray-900">
                {workEntries.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Work Distribution by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(categoriesData).map(([category, hours]) => (
            <div key={category} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{category}</p>
              <p className="text-lg font-semibold text-blue-600">
                {hours.toFixed(1)}h
              </p>
              <p className="text-xs text-gray-500">
                {((hours / totalHours) * 100).toFixed(1)}% of total
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Work Entries Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Work Entries</h3>
          <p className="text-sm text-gray-600 mt-1">
            Showing {startIndex + 1}-
            {Math.min(startIndex + entriesPerPage, workEntries.length)} of{" "}
            {workEntries.length} entries
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.startTime} - {entry.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {entry.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {entry.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.totalHours.toFixed(1)}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        // Convert YYYY-MM-DD to MM-DD-YYYY format as requested
                        const [year, month, day] = entry.date.split("-");
                        const formattedDate = `${month}-${day}-${year}`;
                        navigate(
                          `/dashboard/view-emp-date-data?email=${encodeURIComponent(
                            employeeEmail
                          )}&date=${formattedDate}`
                        );
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
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
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>

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
    </div>
  );
};

export default EmployeeDetails;
