import React, { useState } from "react";
import { Save, X, Eye, Edit2, Info, Code } from "lucide-react";

interface TemplateVariable {
  name: string;
  description: string;
  example: string;
}

interface MailTemplateEditorProps {
  template?: {
    id?: string;
    name: string;
    subject: string;
    body: string;
    category: string;
    createdAt?: string;
    updatedAt?: string;
  };
  onSave: (template: {
    id: string;
    name: string;
    subject: string;
    body: string;
    category: string;
    createdAt: string;
    updatedAt: string;
  }) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const MailTemplateEditor: React.FC<MailTemplateEditorProps> = ({
  template,
  onSave,
  onCancel,
  isOpen,
}) => {
  const [formData, setFormData] = useState({
    name: template?.name || "",
    subject: template?.subject || "",
    body: template?.body || "",
    category: template?.category || "",
  });

  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "variables">(
    "edit"
  );

  const commonVariables: TemplateVariable[] = [
    {
      name: "employee_name",
      description: "Employee full name",
      example: "John Doe",
    },
    {
      name: "employee_email",
      description: "Employee email address",
      example: "john.doe@company.com",
    },
    {
      name: "manager_name",
      description: "Manager name",
      example: "Jane Smith",
    },
    {
      name: "company_name",
      description: "Company name",
      example: "Acme Corporation",
    },
    { name: "date", description: "Current date", example: "2025-09-15" },
    { name: "time", description: "Current time", example: "2:30 PM" },
    {
      name: "meeting_title",
      description: "Meeting title",
      example: "Weekly Team Meeting",
    },
    {
      name: "meeting_date",
      description: "Meeting date",
      example: "2025-09-16",
    },
    { name: "meeting_time", description: "Meeting time", example: "10:00 AM" },
    {
      name: "location",
      description: "Meeting location",
      example: "Conference Room A",
    },
    {
      name: "office_location",
      description: "Office address",
      example: "123 Business St, City",
    },
    { name: "start_date", description: "Start date", example: "2025-09-20" },
    { name: "start_time", description: "Start time", example: "9:00 AM" },
    {
      name: "project_name",
      description: "Project name",
      example: "Project Alpha",
    },
    {
      name: "deadline",
      description: "Project deadline",
      example: "2025-10-01",
    },
  ];

  const insertVariable = (variableName: string) => {
    const variable = `{${variableName}}`;
    const textarea = document.getElementById(
      "template-body"
    ) as HTMLTextAreaElement;

    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData.body;
      const before = text.substring(0, start);
      const after = text.substring(end);

      setFormData((prev) => ({
        ...prev,
        body: before + variable + after,
      }));

      // Set cursor position after the inserted variable
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + variable.length,
          start + variable.length
        );
      }, 0);
    }
  };

  const insertVariableInSubject = (variableName: string) => {
    const variable = `{${variableName}}`;
    setFormData((prev) => ({
      ...prev,
      subject: prev.subject + variable,
    }));
  };

  const renderPreview = () => {
    let previewSubject = formData.subject;
    let previewBody = formData.body;

    // Replace variables with example values for preview
    commonVariables.forEach((variable) => {
      const placeholder = `{${variable.name}}`;
      previewSubject = previewSubject.replace(
        new RegExp(placeholder, "g"),
        variable.example
      );
      previewBody = previewBody.replace(
        new RegExp(placeholder, "g"),
        variable.example
      );
    });

    return (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-2">Subject Preview:</h4>
          <p className="text-gray-700">{previewSubject || "No subject"}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-2">Body Preview:</h4>
          <div className="text-gray-700 whitespace-pre-wrap">
            {previewBody || "No content"}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Preview Information</h4>
              <p className="text-blue-700 text-sm mt-1">
                This preview shows how your template will look with example
                data. Variables will be replaced with actual values when sending
                emails.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSave = () => {
    if (formData.name.trim() && formData.subject.trim()) {
      onSave({
        ...template,
        ...formData,
        id: template?.id || Date.now().toString(),
        createdAt:
          template?.createdAt || new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      });
    } else {
      alert("Please fill in template name and subject");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {template?.id ? "Edit Template" : "Create Template"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("edit")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "edit"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Edit2 className="h-4 w-4 inline mr-2" />
              Edit
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "preview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Eye className="h-4 w-4 inline mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("variables")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "variables"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Code className="h-4 w-4 inline mr-2" />
              Variables
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "edit" && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter template name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="e.g., Reports, Meetings, HR"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    placeholder="Enter email subject template"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-2 top-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          insertVariableInSubject(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="text-xs bg-transparent border-none focus:ring-0"
                    >
                      <option value="">+ Variable</option>
                      {commonVariables.map((variable) => (
                        <option key={variable.name} value={variable.name}>
                          {variable.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body
                </label>
                <div className="relative">
                  <textarea
                    id="template-body"
                    value={formData.body}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, body: e.target.value }))
                    }
                    placeholder="Enter email body template (use {variable_name} for placeholders)"
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute top-2 right-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          insertVariable(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="text-xs bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">+ Insert Variable</option>
                      {commonVariables.map((variable) => (
                        <option key={variable.name} value={variable.name}>
                          {variable.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Usage Tips */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Template Tips</h4>
                    <ul className="text-blue-700 text-sm mt-1 space-y-1">
                      <li>
                        • Use {`{variable_name}`} to insert dynamic content
                      </li>
                      <li>
                        • Click "Variables" tab to see all available
                        placeholders
                      </li>
                      <li>
                        • Use the dropdown menus to quickly insert variables
                      </li>
                      <li>
                        • Preview your template to see how it will look with
                        sample data
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preview" && renderPreview()}

          {activeTab === "variables" && (
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">
                      How to Use Variables
                    </h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Variables are placeholders that will be replaced with
                      actual values when sending emails. Use the format{" "}
                      {`{variable_name}`} in your subject and body.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {commonVariables.map((variable) => (
                  <div
                    key={variable.name}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{`{${variable.name}}`}</h4>
                      <button
                        onClick={() => insertVariable(variable.name)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Insert
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {variable.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Example:</strong> {variable.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            {template?.id ? "Update Template" : "Create Template"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailTemplateEditor;
