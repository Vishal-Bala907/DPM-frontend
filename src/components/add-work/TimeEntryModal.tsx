import React, { useState } from "react";
import { Clock, X, CheckCircle } from "lucide-react";
import type { TimeEntry } from "../../types/work.types";

interface TimeEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (timeEntry: TimeEntry) => void;
  todoDescription: string;
}

const TimeEntryModal: React.FC<TimeEntryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  todoDescription,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Format: HH:mm
  };

  const setCurrentStartTime = () => {
    setStartTime(getCurrentTime());
    setError("");
  };

  const setCurrentEndTime = () => {
    setEndTime(getCurrentTime());
    setError("");
  };

  const calculateDuration = () => {
    if (!startTime || !endTime) return null;

    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);

    if (end <= start) return null;

    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    return diffMinutes;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!startTime || !endTime) {
      setError("Please enter both start and end times");
      return;
    }

    const duration = calculateDuration();
    if (!duration || duration <= 0) {
      setError("End time must be after start time");
      return;
    }

    onSubmit({ startTime, endTime });

    // Reset form
    setStartTime("");
    setEndTime("");
    setError("");
  };

  const handleClose = () => {
    setStartTime("");
    setEndTime("");
    setError("");
    onClose();
  };

  const duration = calculateDuration();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Clock className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add Work Time
                </h2>
                <p className="text-sm text-gray-600">Mark as completed</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Todo Description */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Task:</h3>
            <p className="text-gray-700">{todoDescription}</p>
          </div>

          {/* Time Entry Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <div className="flex space-x-2">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setError("");
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={setCurrentStartTime}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                >
                  Now
                </button>
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <div className="flex space-x-2">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    setError("");
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={setCurrentEndTime}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                >
                  Now
                </button>
              </div>
            </div>

            {/* Duration Display */}
            {duration && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Duration
                    </p>
                    <p className="text-lg font-bold text-green-700">
                      {formatDuration(duration)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!duration || duration <= 0}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                Complete Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimeEntryModal;
