import React, { useState } from "react";
import { Plus, Calendar, Tag } from "lucide-react";
import TodoItem from "./TodoItem";
import DatePicker from "../common/DatePicker";
import type { Category } from "./CategoriesManagement";

interface Todo {
  id: string;
  description: string;
  expectedTime: number;
  date: string;
  status: "incomplete" | "completed";
  category?: string;
  startTime?: string;
  endTime?: string;
}

interface TodoListProps {
  categories: Category[];
  onWorkComplete: (workData: {
    description: string;
    startTime: string;
    endTime: string;
    expectedTime: number;
    date: string;
    category?: string;
  }) => void;
}

const TodoList: React.FC<TodoListProps> = ({ categories, onWorkComplete }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState({
    description: "",
    expectedTime: 60,
    category: "",
  });

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const todosForDate = todos.filter((todo) => todo.date === selectedDate);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.description.trim()) return;

    const todo: Todo = {
      id: generateId(),
      description: newTodo.description.trim(),
      expectedTime: newTodo.expectedTime,
      date: selectedDate,
      status: "incomplete",
      category: newTodo.category || undefined,
    };

    setTodos((prev) => [...prev, todo]);
    setNewTodo({ description: "", expectedTime: 60, category: "" });
    setIsAddingTodo(false);
  };

  const handleEditTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setNewTodo({
        description: todo.description,
        expectedTime: todo.expectedTime,
        category: todo.category || "",
      });
      setEditingTodo(id);
      setIsAddingTodo(true);
    }
  };

  const handleUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTodo || !newTodo.description.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingTodo
          ? {
              ...todo,
              description: newTodo.description.trim(),
              expectedTime: newTodo.expectedTime,
              category: newTodo.category || undefined,
            }
          : todo
      )
    );

    setNewTodo({ description: "", expectedTime: 60, category: "" });
    setEditingTodo(null);
    setIsAddingTodo(false);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleStatusChange = (
    id: string,
    status: "incomplete" | "completed",
    timeData?: { startTime: string; endTime: string }
  ) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    if (status === "completed" && timeData) {
      // Send work completion data to parent
      onWorkComplete({
        description: todo.description,
        startTime: timeData.startTime,
        endTime: timeData.endTime,
        expectedTime: todo.expectedTime,
        date: todo.date,
        category: todo.category,
      });

      // Update todo status
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status,
                startTime: timeData.startTime,
                endTime: timeData.endTime,
              }
            : t
        )
      );
    } else {
      // Just update status
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, status, startTime: undefined, endTime: undefined }
            : t
        )
      );
    }
  };

  const getStats = () => {
    const completed = todosForDate.filter(
      (t) => t.status === "completed"
    ).length;
    const total = todosForDate.length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const stats = getStats();

  const getCategoryDisplay = (categoryId?: string) => {
    if (!categoryId) return null;
    const category = categories.find((c) => c.id === categoryId);
    return category ? (
      <div className="flex items-center space-x-1">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span className="text-xs text-gray-600">{category.name}</span>
      </div>
    ) : null;
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1">
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              label="Select Date for Todos"
              allowPastDates={false}
            />
          </div>

          {todosForDate.length > 0 && (
            <div className="text-center md:text-right">
              <div className="text-2xl font-bold text-blue-700">
                {stats.percentage}%
              </div>
              <div className="text-sm text-gray-600">
                {stats.completed} of {stats.total} completed
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Todo Form */}
      {!isAddingTodo ? (
        <button
          onClick={() => setIsAddingTodo(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-500 group-hover:text-blue-600">
            <Plus size={20} />
            <span className="font-medium">Add New Todo</span>
          </div>
        </button>
      ) : (
        <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
          <form
            onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="What do you need to do?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Time (minutes)
                </label>
                <input
                  type="number"
                  value={newTodo.expectedTime}
                  onChange={(e) =>
                    setNewTodo((prev) => ({
                      ...prev,
                      expectedTime: parseInt(e.target.value) || 60,
                    }))
                  }
                  min="1"
                  max="480"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Tag size={14} className="inline mr-1" />
                  Category (Optional)
                </label>
                <select
                  value={newTodo.category}
                  onChange={(e) =>
                    setNewTodo((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200"
              >
                {editingTodo ? "Update Todo" : "Add Todo"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingTodo(false);
                  setEditingTodo(null);
                  setNewTodo({
                    description: "",
                    expectedTime: 60,
                    category: "",
                  });
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Todo Items */}
      <div className="space-y-3">
        {todosForDate.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No todos for this date</p>
            <p className="text-sm">Add your first todo to get started!</p>
          </div>
        ) : (
          todosForDate.map((todo) => (
            <div key={todo.id} className="space-y-2">
              <TodoItem
                id={todo.id}
                description={todo.description}
                expectedTime={todo.expectedTime}
                status={todo.status}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
                onStatusChange={handleStatusChange}
              />
              {todo.category && (
                <div className="ml-10 mb-2">
                  {getCategoryDisplay(todo.category)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
