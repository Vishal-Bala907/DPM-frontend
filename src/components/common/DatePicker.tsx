import React from "react";
import { Calendar } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
  className?: string;
  allowPastDates?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label = "Select Date",
  className = "",
  allowPastDates = true,
}) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          <Calendar size={16} className="inline mr-2" />
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={allowPastDates ? undefined : today}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
      />
      <div className="text-xs text-gray-500">
        {allowPastDates
          ? "You can select any date"
          : "Only future dates allowed"}
      </div>
    </div>
  );
};

export default DatePicker;
