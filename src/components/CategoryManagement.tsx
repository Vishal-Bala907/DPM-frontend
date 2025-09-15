import React, { useState } from "react";
import { Plus, Edit3, Trash2, Save, X, FolderOpen, Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  workEntriesCount: number;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Development",
      description: "Software development and coding tasks",
      color: "#3B82F6",
      createdAt: "2025-01-15",
      updatedAt: "2025-01-15",
      workEntriesCount: 45,
    },
    {
      id: "2",
      name: "Meetings",
      description: "Team meetings and client calls",
      color: "#10B981",
      createdAt: "2025-01-15",
      updatedAt: "2025-02-01",
      workEntriesCount: 23,
    },
    {
      id: "3",
      name: "Documentation",
      description: "Writing and updating documentation",
      color: "#F59E0B",
      createdAt: "2025-01-20",
      updatedAt: "2025-02-10",
      workEntriesCount: 18,
    },
    {
      id: "4",
      name: "Testing",
      description: "Quality assurance and testing activities",
      color: "#EF4444",
      createdAt: "2025-02-01",
      updatedAt: "2025-02-15",
      workEntriesCount: 12,
    },
    {
      id: "5",
      name: "Design",
      description: "UI/UX design and prototyping",
      color: "#8B5CF6",
      createdAt: "2025-02-05",
      updatedAt: "2025-02-20",
      workEntriesCount: 8,
    },
  ]);

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState<
    Omit<Category, "id" | "createdAt" | "updatedAt" | "workEntriesCount">
  >({
    name: "",
    description: "",
    color: "#3B82F6",
  });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const predefinedColors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#F97316",
    "#84CC16",
    "#EC4899",
    "#6366F1",
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: Category = {
        ...newCategory,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        workEntriesCount: 0,
      };
      setCategories([...categories, category]);
      setNewCategory({ name: "", description: "", color: "#3B82F6" });
      setIsAddingCategory(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditingCategory({ ...category });
  };

  const handleSaveEdit = () => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...editingCategory,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : cat
        )
      );
      setEditingCategoryId(null);
      setEditingCategory(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const handleCancelAdd = () => {
    setIsAddingCategory(false);
    setNewCategory({ name: "", description: "", color: "#3B82F6" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Category Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your work categories and organize your time tracking
          </p>
        </div>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Add Category Form */}
      {isAddingCategory && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                placeholder="Enter category name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex space-x-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCategory({ ...newCategory, color })}
                    className={`w-8 h-8 rounded-full border-2 ${
                      newCategory.color === color
                        ? "border-gray-400"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
              placeholder="Enter category description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddCategory}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Category
            </button>
            <button
              onClick={handleCancelAdd}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Categories ({filteredCategories.length})
          </h2>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="p-8 text-center">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm
                ? "No categories found matching your search."
                : "No categories found. Add your first category to get started."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <div key={category.id} className="p-6">
                {editingCategoryId === category.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={editingCategory?.name || ""}
                          onChange={(e) =>
                            setEditingCategory((prev) =>
                              prev ? { ...prev, name: e.target.value } : null
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color
                        </label>
                        <div className="flex space-x-2">
                          {predefinedColors.map((color) => (
                            <button
                              key={color}
                              onClick={() =>
                                setEditingCategory((prev) =>
                                  prev ? { ...prev, color } : null
                                )
                              }
                              className={`w-8 h-8 rounded-full border-2 ${
                                editingCategory?.color === color
                                  ? "border-gray-400"
                                  : "border-gray-200"
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editingCategory?.description || ""}
                        onChange={(e) =>
                          setEditingCategory((prev) =>
                            prev
                              ? { ...prev, description: e.target.value }
                              : null
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="inline-flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {category.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{category.workEntriesCount} work entries</span>
                          <span>
                            Created:{" "}
                            {new Date(category.createdAt).toLocaleDateString()}
                          </span>
                          <span>
                            Updated:{" "}
                            {new Date(category.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit category"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <p className="text-2xl font-semibold text-gray-900">
                {categories.length}
              </p>
            </div>
            <FolderOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Work Entries</p>
              <p className="text-2xl font-semibold text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.workEntriesCount, 0)}
              </p>
            </div>
            <Plus className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Most Used Category</p>
              <p className="text-2xl font-semibold text-gray-900">
                {categories.reduce(
                  (max, cat) =>
                    cat.workEntriesCount > max.workEntriesCount ? cat : max,
                  categories[0]
                )?.name || "None"}
              </p>
            </div>
            <Edit3 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
