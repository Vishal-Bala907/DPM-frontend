import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface TimeDistributionPieChartProps {
  data: Array<{
    name: string;
    hours: number;
    color: string;
  }>;
  title?: string;
}

const TimeDistributionPieChart: React.FC<TimeDistributionPieChartProps> = ({
  data,
  title = "24-Hour Time Distribution",
}) => {
  // Ensure we have a full 24-hour representation
  const totalWorked = data.reduce((sum, item) => sum + item.hours, 0);
  const freeTime = Math.max(0, 24 - totalWorked);

  const chartData = [
    ...data,
    ...(freeTime > 0
      ? [
          {
            name: "Free Time",
            hours: freeTime,
            color: "#E5E7EB",
          },
        ]
      : []),
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: {
        name: string;
        hours: number;
        color: string;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.hours / 24) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.hours < 1
              ? `${Math.round(data.hours * 60)} minutes`
              : `${data.hours.toFixed(1)} hours`}{" "}
            ({percentage}% of day)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        {title}
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="hours"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">
          Work Time: {totalWorked.toFixed(1)}h • Free Time:{" "}
          {freeTime.toFixed(1)}h
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {((totalWorked / 24) * 100).toFixed(1)}% of day spent working
        </div>
      </div>
    </div>
  );
};

export default TimeDistributionPieChart;
