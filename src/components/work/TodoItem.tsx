import React, { useState } from "react";
import { Clock, CheckCircle, Circle, Edit3, Trash2 } from "lucide-react";

interface TodoItemProps {
  id: string;
  description: string;
  expectedTime: number; // in minutes
  status: "incomplete" | "completed";
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: "incomplete" | "completed",
    timeData?: { startTime: string; endTime: string }
  ) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  description,
  expectedTime,
  status,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [showTimeForm, setShowTimeForm] = useState(false);
  const [timeData, setTimeData] = useState({
    startTime: "",
    endTime: "",
  });

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleStatusToggle = () => {
    if (status === "completed") {
      // Mark as incomplete
      onStatusChange(id, "incomplete");
    } else {
      // Show time form for completion
      setShowTimeForm(true);
    }
  };

  const handleTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeData.startTime && timeData.endTime) {
      onStatusChange(id, "completed", timeData);
      setShowTimeForm(false);
      setTimeData({ startTime: "", endTime: "" });
    }
  };

  const handleTimeCancel = () => {
    setShowTimeForm(false);
    setTimeData({ startTime: "", endTime: "" });
  };

  return (
    <div
      className={`bg-white rounded-lg border p-4 transition-all duration-200 ${
        status === "completed"
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={handleStatusToggle}
            className={`transition-colors duration-200 ${
              status === "completed"
                ? "text-green-600 hover:text-green-700"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            {status === "completed" ? (
              <CheckCircle size={24} />
            ) : (
              <Circle size={24} />
            )}
          </button>

          <div className="flex-1">
            <p
              className={`font-medium ${
                status === "completed"
                  ? "text-green-800 line-through"
                  : "text-gray-900"
              }`}
            >
              {description}
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
              <Clock size={14} />
              <span>Expected: {formatTime(expectedTime)}</span>
            </div>
          </div>
        </div>

        {status === "incomplete" && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(id)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              title="Edit"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Time Entry Form */}
      {showTimeForm && (
        <form
          onSubmit={handleTimeSubmit}
          className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <h4 className="font-medium text-blue-900 mb-3">
            Enter work time details
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={timeData.startTime}
                onChange={(e) =>
                  setTimeData((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={timeData.endTime}
                onChange={(e) =>
                  setTimeData((prev) => ({ ...prev, endTime: e.target.value }))
                }
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200"
            >
              Complete Task
            </button>
            <button
              type="button"
              onClick={handleTimeCancel}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TodoItem;
