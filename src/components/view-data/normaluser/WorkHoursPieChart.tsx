import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface WorkHoursPieChartProps {
  data: Array<{
    name: string;
    hours: number;
    color: string;
  }>;
  title?: string;
}

const WorkHoursPieChart: React.FC<WorkHoursPieChartProps> = ({
  data,
  title = "Work Hours Distribution",
}) => {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: {
        name: string;
        hours: number;
        total: number;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.hours}h ({((data.hours / data.total) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Add total to each data item for tooltip calculation
  const total = data.reduce((sum, item) => sum + item.hours, 0);
  const chartData = data.map((item) => ({ ...item, total }));

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
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        Total: {total.toFixed(1)} hours
      </div>
    </div>
  );
};

export default WorkHoursPieChart;
