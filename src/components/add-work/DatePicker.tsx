import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  minDate?: string;
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  minDate,
  label = "Select Date",
}) => {
  const today = new Date().toISOString().split("T")[0];
  const currentMinDate = minDate || today;

  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Quick date selection helpers
  const getQuickDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }

    return dates;
  };

  const quickDates = getQuickDates();

  // Navigate date by days
  const navigateDate = (direction: "prev" | "next") => {
    const currentDate = new Date(selectedDate + "T00:00:00");
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));

    const newDateString = newDate.toISOString().split("T")[0];
    if (newDateString >= currentMinDate) {
      onDateChange(newDateString);
    }
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Date Input with Navigation */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => navigateDate("prev")}
          disabled={selectedDate <= currentMinDate}
          className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative flex-1">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            min={currentMinDate}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <Calendar
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        <button
          type="button"
          onClick={() => navigateDate("next")}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Quick Date Selection */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 font-medium">Quick Select:</p>
        <div className="flex flex-wrap gap-2">
          {quickDates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => onDateChange(date)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                selectedDate === date
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-105"
              }`}
            >
              {formatDateForDisplay(date)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Date Display */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
        <div className="flex items-center space-x-2">
          <Calendar className="text-blue-600" size={16} />
          <span className="text-sm font-medium text-gray-700">
            Selected:{" "}
            <span className="text-blue-700">
              {formatDateForDisplay(selectedDate)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
