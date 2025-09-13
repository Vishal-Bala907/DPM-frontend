import React, { useState } from "react";
import { Save, Clock, FileText } from "lucide-react";
import DatePicker from "../common/DatePicker";

interface WorkDetailsFormProps {
  onSubmit: (workData: {
    description: string;
    startTime: string;
    endTime: string;
    date: string;
    expectedTime?: number;
  }) => void;
}

const WorkDetailsForm: React.FC<WorkDetailsFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    description: "",
    startTime: "",
    endTime: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description cannot be empty";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (formData.startTime && formData.endTime) {
      const startMinutes = timeToMinutes(formData.startTime);
      const endMinutes = timeToMinutes(formData.endTime);

      if (endMinutes <= startMinutes) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const calculateDuration = () => {
    if (!formData.startTime || !formData.endTime) return 0;

    const startMinutes = timeToMinutes(formData.startTime);
    const endMinutes = timeToMinutes(formData.endTime);

    if (endMinutes <= startMinutes) return 0;

    return endMinutes - startMinutes;
  };

  const formatDuration = (minutes: number) => {
    if (minutes === 0) return "0 minutes";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      description: formData.description.trim(),
      startTime: formData.startTime,
      endTime: formData.endTime,
      date: formData.date,
      expectedTime: calculateDuration(),
    });

    // Reset form
    setFormData({
      description: "",
      startTime: "",
      endTime: "",
      date: new Date().toISOString().split("T")[0],
    });
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const duration = calculateDuration();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FileText className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">
            Work Details Form
          </h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Enter details for completed work directly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Date */}
        <DatePicker
          value={formData.date}
          onChange={(date) => handleInputChange("date", date)}
          label="Work Date"
          allowPastDates={true}
        />
        {errors.date && (
          <p className="text-red-600 text-sm mt-1">{errors.date}</p>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText size={16} className="inline mr-1" />
            Work Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe what work was completed..."
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Time Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock size={16} className="inline mr-1" />
              Start Time *
            </label>
            <div className="flex space-x-2">
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.startTime ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => handleInputChange("startTime", getCurrentTime())}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors duration-200"
              >
                Now
              </button>
            </div>
            {errors.startTime && (
              <p className="text-red-600 text-sm mt-1">{errors.startTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock size={16} className="inline mr-1" />
              End Time *
            </label>
            <div className="flex space-x-2">
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.endTime ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => handleInputChange("endTime", getCurrentTime())}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors duration-200"
              >
                Now
              </button>
            </div>
            {errors.endTime && (
              <p className="text-red-600 text-sm mt-1">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Duration Display */}
        {duration > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-blue-800">
              <Clock size={16} />
              <span className="font-medium">
                Duration: {formatDuration(duration)}
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={duration === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            <span>Save Work Entry</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkDetailsForm;
