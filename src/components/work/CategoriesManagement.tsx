import React, { useState } from "react";
import { Plus, Edit3, Trash2, Save, X, Tag } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  color: string;
  description?: string;
}

interface CategoriesManagementProps {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
}

const PREDEFINED_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#F97316", // Orange
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#EC4899", // Pink
  "#6B7280", // Gray
];

const CategoriesManagement: React.FC<CategoriesManagementProps> = ({
  categories,
  onCategoriesChange,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    color: PREDEFINED_COLORS[0],
    description: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      color: PREDEFINED_COLORS[0],
      description: "",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      // Update existing category
      const updatedCategories = categories.map((cat) =>
        cat.id === editingId
          ? {
              ...cat,
              name: formData.name.trim(),
              color: formData.color,
              description: formData.description.trim() || undefined,
            }
          : cat
      );
      onCategoriesChange(updatedCategories);
    } else {
      // Add new category
      const newCategory: Category = {
        id: generateId(),
        name: formData.name.trim(),
        color: formData.color,
        description: formData.description.trim() || undefined,
      };
      onCategoriesChange([...categories, newCategory]);
    }

    resetForm();
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      color: category.color,
      description: category.description || "",
    });
    setEditingId(category.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter((cat) => cat.id !== id);
      onCategoriesChange(updatedCategories);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-center space-x-3">
          <Tag className="text-blue-600" size={24} />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              My Categories
            </h2>
            <p className="text-gray-600 mt-1">
              Manage your work categories for better organization
            </p>
          </div>
        </div>
      </div>

      {/* Add Category Form */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-500 group-hover:text-blue-600">
            <Plus size={20} />
            <span className="font-medium">Add New Category</span>
          </div>
        </button>
      ) : (
        <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Development, Meeting, Research..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      formData.color === color
                        ? "border-gray-800 scale-110"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of this category..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>{editingId ? "Update Category" : "Add Category"}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-3">
        {categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Tag size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No categories yet</p>
            <p className="text-sm">
              Create your first category to get started!
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Usage Stats */}
      {categories.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
          <p className="text-sm text-gray-600">
            You have {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} defined. Use
            these categories when creating todos or work entries for better
            organization.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;
