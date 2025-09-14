import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, TrendingUp } from "lucide-react";
import StarRating from "./StarRating";
import WorkHoursPieChart from "./WorkHoursPieChart";
import TimeDistributionPieChart from "./TimeDistributionPieChart";

interface DateWorkData {
  date: string;
  workEntries: Array<{
    id: string;
    description: string;
    startTime: string;
    endTime: string;
    minutes: number;
    hours: number;
    category: string;
    categoryColor: string;
  }>;
  totalHours: number;
  totalMinutes: number;
}

interface DateDetailsProps {
  // Mock data prop - in real app this would come from API
  mockData?: DateWorkData;
}

const DateDetails: React.FC<DateDetailsProps> = ({ mockData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dateParam = searchParams.get("date") || "";

  // Generate mock data based on date
  const generateMockData = (date: string): DateWorkData => {
    const categories = [
      { name: "Development", color: "#3B82F6" },
      { name: "Design", color: "#10B981" },
      { name: "Testing", color: "#F59E0B" },
      { name: "Meetings", color: "#EF4444" },
      { name: "Research", color: "#8B5CF6" },
    ];

    const workEntries = [];
    let totalMinutes = 0;

    // Generate 3-6 work entries for the day
    const entryCount = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < entryCount; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const hours = Math.random() * 3 + 0.5; // 0.5-3.5 hours per entry
      const minutes = Math.floor(hours * 60);

      const startHour = 9 + i * 2 + Math.floor(Math.random() * 2);
      const startTime = `${startHour.toString().padStart(2, "0")}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, "0")}`;
      const endHour = startHour + Math.floor(hours);
      const endMinute = Math.floor((hours % 1) * 60);
      const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute
        .toString()
        .padStart(2, "0")}`;

      workEntries.push({
        id: `work-${i}`,
        description: `${category.name} work - Project task ${i + 1}`,
        startTime,
        endTime,
        minutes,
        hours: Math.round(hours * 10) / 10,
        category: category.name,
        categoryColor: category.color,
      });

      totalMinutes += minutes;
    }

    return {
      date,
      workEntries,
      totalHours: Math.round((totalMinutes / 60) * 10) / 10,
      totalMinutes,
    };
  };

  const [data] = useState<DateWorkData>(
    mockData || generateMockData(dateParam)
  );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  // Prepare data for work hours pie chart
  const workHoursData = data.workEntries.reduce((acc, entry) => {
    const existing = acc.find((item) => item.name === entry.category);
    if (existing) {
      existing.hours += entry.hours;
    } else {
      acc.push({
        name: entry.category,
        hours: entry.hours,
        color: entry.categoryColor,
      });
    }
    return acc;
  }, [] as Array<{ name: string; hours: number; color: string }>);

  // Prepare data for 24-hour distribution pie chart
  const timeDistributionData = workHoursData.map((item) => ({
    name: item.name,
    hours: item.hours,
    color: item.color,
  }));

  // Calculate work time periods for visual timeline
  const getWorkTimeline = () => {
    return data.workEntries.map((entry) => {
      const [startHour, startMin] = entry.startTime.split(":").map(Number);
      const [endHour, endMin] = entry.endTime.split(":").map(Number);
      const startDecimal = startHour + startMin / 60;
      const endDecimal = endHour + endMin / 60;

      return {
        ...entry,
        startDecimal,
        endDecimal,
        duration: endDecimal - startDecimal,
      };
    });
  };

  const timeline = getWorkTimeline();

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
          <h1 className="text-2xl font-bold text-gray-900">
            Daily Work Analysis
          </h1>
          <p className="text-gray-600">{formatDate(data.date)}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Work Time</p>
              <p className="text-xl font-bold text-gray-900">
                {formatTime(data.totalMinutes)}
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
              <p className="text-sm text-gray-600">Work Sessions</p>
              <p className="text-xl font-bold text-gray-900">
                {data.workEntries.length}
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
              <p className="text-sm text-gray-600">Productivity</p>
              <p className="text-xl font-bold text-gray-900">
                {((data.totalHours / 24) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <StarRating workingHours={data.totalHours} size={20} />
            <div>
              <p className="text-sm text-gray-600">Performance</p>
              <p className="text-xl font-bold text-gray-900">
                {data.totalHours}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkHoursPieChart
          data={workHoursData}
          title="Work Hours by Category"
        />
        <TimeDistributionPieChart
          data={timeDistributionData}
          title="24-Hour Time Distribution"
        />
      </div>

      {/* Work Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Daily Timeline
        </h3>

        <div className="space-y-4">
          {timeline
            .sort((a, b) => a.startDecimal - b.startDecimal)
            .map((entry) => (
              <div key={entry.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-20 text-sm text-gray-600">
                  {entry.startTime}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.categoryColor }}
                    />
                    <span className="font-medium text-gray-900">
                      {entry.category}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">
                      {formatTime(entry.minutes)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {entry.description}
                  </p>
                </div>
                <div className="flex-shrink-0 w-20 text-sm text-gray-600 text-right">
                  {entry.endTime}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Work Entries Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Detailed Work Log
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.workEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.categoryColor }}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {entry.category}
                      </span>
                    </div>
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
      </div>
    </div>
  );
};

export default DateDetails;
