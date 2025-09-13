// Types matching backend Java schema
export interface WorkEntry {
  id?: string;
  description: string;
  category: string;
  startTime: string; // Format: "HH:mm"
  endTime: string; // Format: "HH:mm"
  actualMinutes: number; // Duration in minutes
  date: string; // Format: "YYYY-MM-DD"
  notes?: string;
  timestamp?: number;
}

export interface TodoItem {
  id: string;
  description: string;
  expectedTime: number; // in minutes
  date: string; // Format: "YYYY-MM-DD"
  status: "incomplete" | "completed";
  startTime?: string; // Set when completed
  endTime?: string; // Set when completed
  actualMinutes?: number; // Calculated when completed
}

export interface TimeEntry {
  startTime: string;
  endTime: string;
}

export interface WorkFormData {
  description: string;
  startTime: string;
  endTime: string;
  expectedTime: number;
  date: string;
}

export type TabType = "addFromList" | "workDetailsForm";
