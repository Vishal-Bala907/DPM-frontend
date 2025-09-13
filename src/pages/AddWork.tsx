import React, { useState } from "react";
import { Calendar, ListTodo, FileText } from "lucide-react";
import { Footer, Navbar } from "../components";
import Tabs from "../components/common/Tabs";
import type { Tab } from "../components/common/Tabs";
import TodoList from "../components/work/TodoList";
import WorkDetailsForm from "../components/work/WorkDetailsForm";

// Define WorkEntry type to match backend schema
interface WorkEntry {
  id: string;
  description: string;
  startTime: string; // LocalTime format (HH:mm)
  endTime: string; // LocalTime format (HH:mm)
  minutes: number; // Long - calculated duration
  expectedTime: number; // Long - expected duration in minutes
  date: string; // LocalDate format (YYYY-MM-DD)
  timestamp: number; // Long - creation timestamp
}

const AddWork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("addFromList");
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([]);

  const tabs: Tab[] = [
    {
      id: "addFromList",
      label: "Add From List",
      icon: <ListTodo size={20} />,
    },
    {
      id: "workDetailsForm",
      label: "Work Details Form",
      icon: <FileText size={20} />,
    },
  ];

  const handleWorkComplete = (workData: {
    description: string;
    startTime: string;
    endTime: string;
    expectedTime: number;
    date: string;
  }) => {
    console.log("Work completed from todo:", workData);

    // Calculate minutes
    const [startHours, startMinutes] = workData.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = workData.endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const minutes = endTotalMinutes - startTotalMinutes;

    const workEntry = {
      id: Date.now().toString(),
      description: workData.description,
      startTime: workData.startTime,
      endTime: workData.endTime,
      minutes,
      expectedTime: workData.expectedTime,
      date: workData.date,
      timestamp: Date.now(),
    };

    setWorkEntries((prev) => [...prev, workEntry]);

    // Here you would send to backend
    // sendWorkToBackend(workEntry);
  };

  const handleDirectWorkSubmit = (workData: {
    description: string;
    startTime: string;
    endTime: string;
    date: string;
    expectedTime?: number;
  }) => {
    console.log("Direct work entry:", workData);

    // Calculate minutes
    const [startHours, startMinutes] = workData.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = workData.endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const minutes = endTotalMinutes - startTotalMinutes;

    const workEntry = {
      id: Date.now().toString(),
      description: workData.description,
      startTime: workData.startTime,
      endTime: workData.endTime,
      minutes,
      expectedTime: workData.expectedTime || minutes,
      date: workData.date,
      timestamp: Date.now(),
    };

    setWorkEntries((prev) => [...prev, workEntry]);

    // Here you would send to backend
    // sendWorkToBackend(workEntry);

    alert("Work entry saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white">
              <Calendar size={28} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Add Work Details
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your work progress by managing todos or adding work details
            directly. Choose the method that works best for you.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-6"
          />

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {activeTab === "addFromList" ? (
              <TodoList onWorkComplete={handleWorkComplete} />
            ) : (
              <WorkDetailsForm onSubmit={handleDirectWorkSubmit} />
            )}
          </div>

          {/* Recent Work Entries */}
          {workEntries.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Work Entries
              </h3>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="space-y-3">
                  {workEntries
                    .slice(-5)
                    .reverse()
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {entry.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            {entry.date} • {entry.startTime} - {entry.endTime} •{" "}
                            {Math.floor(entry.minutes / 60)}h{" "}
                            {entry.minutes % 60}m
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">
                            Completed
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddWork;
