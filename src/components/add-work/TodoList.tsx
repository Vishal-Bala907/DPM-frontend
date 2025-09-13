import React, { useState } from "react";
import { Plus, Clock, CheckCircle, Circle, Trash2, Edit3 } from "lucide-react";
import type { TodoItem, TimeEntry } from "../../types/work.types";
import TimeEntryModal from "./TimeEntryModal";

interface TodoListProps {
  selectedDate: string;
  todos: TodoItem[];
  onAddTodo: (todo: Omit<TodoItem, "id">) => void;
  onUpdateTodo: (id: string, updates: Partial<TodoItem>) => void;
  onDeleteTodo: (id: string) => void;
  onCompleteTodo: (id: string, timeEntry: TimeEntry) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  selectedDate,
  todos,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
  onCompleteTodo,
}) => {
  const [newTodo, setNewTodo] = useState({ description: "", expectedTime: 30 });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState({
    description: "",
    expectedTime: 30,
  });
  const [completingTodo, setCompletingTodo] = useState<TodoItem | null>(null);

  // Filter todos for selected date
  const todosForDate = todos.filter((todo) => todo.date === selectedDate);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.description.trim()) return;

    onAddTodo({
      description: newTodo.description.trim(),
      expectedTime: newTodo.expectedTime,
      date: selectedDate,
      status: "incomplete",
    });

    setNewTodo({ description: "", expectedTime: 30 });
    setIsAdding(false);
  };

  const handleEditTodo = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditingTodo({
      description: todo.description,
      expectedTime: todo.expectedTime,
    });
  };

  const handleUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editingTodo.description.trim()) return;

    onUpdateTodo(editingId, {
      description: editingTodo.description.trim(),
      expectedTime: editingTodo.expectedTime,
    });

    setEditingId(null);
    setEditingTodo({ description: "", expectedTime: 30 });
  };

  const handleCompleteTodo = (todo: TodoItem) => {
    setCompletingTodo(todo);
  };

  const handleTimeEntrySubmit = (timeEntry: TimeEntry) => {
    if (!completingTodo) return;

    onCompleteTodo(completingTodo.id, timeEntry);
    setCompletingTodo(null);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getCompletionStats = () => {
    const completed = todosForDate.filter(
      (todo) => todo.status === "completed"
    ).length;
    const total = todosForDate.length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const stats = getCompletionStats();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Todo List for{" "}
              {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                }
              )}
            </h3>
            <p className="text-sm text-gray-600">
              {stats.completed} of {stats.total} tasks completed (
              {stats.percentage}%)
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-700">
              {stats.percentage}%
            </div>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Todo Form */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-500 group-hover:text-blue-600">
            <Plus size={20} />
            <span className="font-medium">Add New Todo</span>
          </div>
        </button>
      ) : (
        <form
          onSubmit={handleAddTodo}
          className="bg-white rounded-lg border-2 border-blue-200 p-4 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              placeholder="What do you need to do?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Time (minutes)
            </label>
            <input
              type="number"
              value={newTodo.expectedTime}
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  expectedTime: parseInt(e.target.value) || 30,
                })
              }
              min="1"
              max="480"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200"
            >
              Add Todo
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewTodo({ description: "", expectedTime: 30 });
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Todo Items */}
      <div className="space-y-3">
        {todosForDate.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Circle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No todos for this date</p>
            <p className="text-sm">Add your first todo to get started!</p>
          </div>
        ) : (
          todosForDate.map((todo) => (
            <div
              key={todo.id}
              className={`bg-white rounded-lg border p-4 transition-all duration-200 ${
                todo.status === "completed"
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {editingId === todo.id ? (
                <form onSubmit={handleUpdateTodo} className="space-y-3">
                  <input
                    type="text"
                    value={editingTodo.description}
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="number"
                    value={editingTodo.expectedTime}
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        expectedTime: parseInt(e.target.value) || 30,
                      })
                    }
                    min="1"
                    max="480"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => {
                        if (todo.status === "completed") {
                          onUpdateTodo(todo.id, {
                            status: "incomplete",
                            startTime: undefined,
                            endTime: undefined,
                            actualMinutes: undefined,
                          });
                        } else {
                          handleCompleteTodo(todo);
                        }
                      }}
                      className={`transition-colors duration-200 ${
                        todo.status === "completed"
                          ? "text-green-600 hover:text-green-700"
                          : "text-gray-400 hover:text-blue-600"
                      }`}
                    >
                      {todo.status === "completed" ? (
                        <CheckCircle size={24} />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          todo.status === "completed"
                            ? "text-green-800 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {todo.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>Expected: {formatTime(todo.expectedTime)}</span>
                        </div>
                        {todo.status === "completed" && todo.actualMinutes && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle size={14} />
                            <span>
                              Actual: {formatTime(todo.actualMinutes)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {todo.status === "incomplete" && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTodo(todo)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteTodo(todo.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Time Entry Modal */}
      <TimeEntryModal
        isOpen={!!completingTodo}
        onClose={() => setCompletingTodo(null)}
        onSubmit={handleTimeEntrySubmit}
        todoDescription={completingTodo?.description || ""}
      />
    </div>
  );
};

export default TodoList;
