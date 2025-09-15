import React, { useState } from "react";
import {
  Mail,
  Send,
  Eye,
  FileText,
  Plus,
  Search,
  Clock,
  Check,
  X,
  Trash2,
  Edit,
} from "lucide-react";
import MailTemplateEditor from "./MailTemplateEditor";

interface MailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

interface SentMail {
  id: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  sentAt: string;
  status: "sent" | "pending" | "failed";
  templateUsed?: string;
  attachments?: string[];
}

interface NewMail {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  templateId?: string;
  attachments: File[];
}

const MailManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"compose" | "sent" | "templates">(
    "compose"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "sent" | "pending" | "failed"
  >("all");

  // Mail Templates State
  const [mailTemplates, setMailTemplates] = useState<MailTemplate[]>([
    {
      id: "1",
      name: "Weekly Report Request",
      subject: "Weekly Report Submission Required",
      body: "Dear Team,\n\nPlease submit your weekly reports by end of day Friday.\n\nBest regards,\nManagement",
      createdAt: "2025-01-15",
      updatedAt: "2025-01-15",
      category: "Reports",
    },
    {
      id: "2",
      name: "Meeting Reminder",
      subject: "Meeting Reminder: {meeting_title}",
      body: "Hello,\n\nThis is a reminder about our upcoming meeting:\n\nDate: {date}\nTime: {time}\nLocation: {location}\n\nPlease confirm your attendance.\n\nThank you",
      createdAt: "2025-01-20",
      updatedAt: "2025-02-01",
      category: "Meetings",
    },
    {
      id: "3",
      name: "Welcome New Employee",
      subject: "Welcome to the Team!",
      body: "Dear {employee_name},\n\nWelcome to our team! We are excited to have you join us.\n\nYour first day details:\nDate: {start_date}\nTime: {start_time}\nLocation: {office_location}\n\nLooking forward to working with you!\n\nBest regards,\nHR Team",
      createdAt: "2025-02-05",
      updatedAt: "2025-02-10",
      category: "HR",
    },
  ]);

  // Sent Mails State
  const [sentMails, setSentMails] = useState<SentMail[]>([
    {
      id: "1",
      to: ["john.doe@company.com", "jane.smith@company.com"],
      cc: ["manager@company.com"],
      subject: "Project Update Required",
      body: "Please provide updates on your current projects by EOD.",
      sentAt: "2025-09-14T10:30:00Z",
      status: "sent",
      templateUsed: "Weekly Report Request",
    },
    {
      id: "2",
      to: ["team@company.com"],
      subject: "Team Meeting Tomorrow",
      body: "Reminder: We have our weekly team meeting tomorrow at 2 PM.",
      sentAt: "2025-09-13T14:15:00Z",
      status: "sent",
      templateUsed: "Meeting Reminder",
    },
    {
      id: "3",
      to: ["newemployee@company.com"],
      subject: "Welcome to the Team!",
      body: "Welcome aboard! Looking forward to working with you.",
      sentAt: "2025-09-12T09:00:00Z",
      status: "pending",
      templateUsed: "Welcome New Employee",
    },
  ]);

  // New Mail State
  const [newMail, setNewMail] = useState<NewMail>({
    to: [],
    cc: [],
    bcc: [],
    subject: "",
    body: "",
    attachments: [],
  });

  // Template Management State
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MailTemplate | null>(
    null
  );

  // Helper functions
  const addEmailToField = (field: "to" | "cc" | "bcc", email: string) => {
    if (email.trim() && !newMail[field].includes(email.trim())) {
      setNewMail((prev) => ({
        ...prev,
        [field]: [...prev[field], email.trim()],
      }));
    }
  };

  const removeEmailFromField = (field: "to" | "cc" | "bcc", email: string) => {
    setNewMail((prev) => ({
      ...prev,
      [field]: prev[field].filter((e) => e !== email),
    }));
  };

  const applyTemplate = (templateId: string) => {
    const template = mailTemplates.find((t) => t.id === templateId);
    if (template) {
      setNewMail((prev) => ({
        ...prev,
        subject: template.subject,
        body: template.body,
        templateId,
      }));
    }
  };

  const sendMail = () => {
    if (newMail.to.length > 0 && newMail.subject.trim()) {
      const mail: SentMail = {
        id: Date.now().toString(),
        ...newMail,
        sentAt: new Date().toISOString(),
        status: "sent",
        templateUsed: mailTemplates.find((t) => t.id === newMail.templateId)
          ?.name,
        attachments: newMail.attachments.map((f) => f.name),
      };
      setSentMails([mail, ...sentMails]);
      setNewMail({
        to: [],
        cc: [],
        bcc: [],
        subject: "",
        body: "",
        attachments: [],
      });
      alert("Mail sent successfully!");
    } else {
      alert("Please fill in required fields (To and Subject)");
    }
  };

  const deleteTemplate = (templateId: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setMailTemplates(mailTemplates.filter((t) => t.id !== templateId));
    }
  };

  const handleTemplateEditorSave = (template: MailTemplate) => {
    if (editingTemplate) {
      // Update existing template
      setMailTemplates((templates) =>
        templates.map((t) => (t.id === template.id ? template : t))
      );
    } else {
      // Create new template
      setMailTemplates((templates) => [...templates, template]);
    }
    setEditingTemplate(null);
    setIsCreatingTemplate(false);
  };

  const handleTemplateEditorCancel = () => {
    setEditingTemplate(null);
    setIsCreatingTemplate(false);
  };

  const filteredSentMails = sentMails.filter((mail) => {
    const matchesSearch =
      mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.to.some((email) =>
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || mail.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTemplates = mailTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mail Management</h1>
          <p className="text-gray-600 mt-1">
            Compose, send, and manage email communications
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("compose")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "compose"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Mail className="h-4 w-4 inline mr-2" />
              Compose Mail
            </button>
            <button
              onClick={() => setActiveTab("sent")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "sent"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Eye className="h-4 w-4 inline mr-2" />
              Sent Mails ({sentMails.length})
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "templates"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Templates ({mailTemplates.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Compose Mail Tab */}
          {activeTab === "compose" && (
            <div className="space-y-6">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Use Template (Optional)
                </label>
                <select
                  value={newMail.templateId || ""}
                  onChange={(e) =>
                    e.target.value ? applyTemplate(e.target.value) : null
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a template...</option>
                  {mailTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} ({template.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipients */}
              <div className="grid grid-cols-1 gap-4">
                {/* To Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To *
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newMail.to.map((email, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {email}
                        <button
                          onClick={() => removeEmailFromField("to", email)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="email"
                    placeholder="Enter email address and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addEmailToField("to", e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* CC Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CC
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newMail.cc.map((email, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {email}
                        <button
                          onClick={() => removeEmailFromField("cc", email)}
                          className="ml-1 text-gray-600 hover:text-gray-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="email"
                    placeholder="Enter CC email address and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addEmailToField("cc", e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={newMail.subject}
                  onChange={(e) =>
                    setNewMail((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  placeholder="Enter email subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={newMail.body}
                  onChange={(e) =>
                    setNewMail((prev) => ({ ...prev, body: e.target.value }))
                  }
                  placeholder="Enter your message"
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={sendMail}
                  className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Mail
                </button>
                <button
                  onClick={() =>
                    setNewMail({
                      to: [],
                      cc: [],
                      bcc: [],
                      subject: "",
                      body: "",
                      attachments: [],
                    })
                  }
                  className="inline-flex items-center px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Sent Mails Tab */}
          {activeTab === "sent" && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search sent mails..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as "all" | "sent" | "pending" | "failed"
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Sent Mails List */}
              <div className="divide-y divide-gray-200">
                {filteredSentMails.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No sent mails found</p>
                  </div>
                ) : (
                  filteredSentMails.map((mail) => (
                    <div key={mail.id} className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {mail.subject}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                mail.status === "sent"
                                  ? "bg-green-100 text-green-800"
                                  : mail.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {mail.status === "sent" && (
                                <Check className="h-3 w-3 mr-1" />
                              )}
                              {mail.status === "pending" && (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {mail.status === "failed" && (
                                <X className="h-3 w-3 mr-1" />
                              )}
                              {mail.status.charAt(0).toUpperCase() +
                                mail.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              <strong>To:</strong> {mail.to.join(", ")}
                            </p>
                            {mail.cc && mail.cc.length > 0 && (
                              <p>
                                <strong>CC:</strong> {mail.cc.join(", ")}
                              </p>
                            )}
                            <p>
                              <strong>Sent:</strong>{" "}
                              {new Date(mail.sentAt).toLocaleString()}
                            </p>
                            {mail.templateUsed && (
                              <p>
                                <strong>Template:</strong> {mail.templateUsed}
                              </p>
                            )}
                          </div>
                          <div className="mt-2">
                            <p className="text-gray-700 line-clamp-2">
                              {mail.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div className="space-y-6">
              {/* Add Template Button */}
              <div className="flex justify-between items-center">
                <div className="relative flex-1 mr-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setIsCreatingTemplate(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </button>
              </div>

              {/* Templates List */}
              <div className="divide-y divide-gray-200">
                {filteredTemplates.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No templates found</p>
                  </div>
                ) : (
                  filteredTemplates.map((template) => (
                    <div key={template.id} className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {template.name}
                            </h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {template.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Subject:</strong> {template.subject}
                          </p>
                          <p className="text-gray-700 line-clamp-3">
                            {template.body}
                          </p>
                          <div className="mt-2 text-xs text-gray-500">
                            Created:{" "}
                            {new Date(template.createdAt).toLocaleDateString()}{" "}
                            | Updated:{" "}
                            {new Date(template.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => applyTemplate(template.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Use template"
                          >
                            <Mail className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingTemplate(template)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit template"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteTemplate(template.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete template"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mail Template Editor Modal */}
      <MailTemplateEditor
        template={editingTemplate || undefined}
        onSave={handleTemplateEditorSave}
        onCancel={handleTemplateEditorCancel}
        isOpen={isCreatingTemplate || editingTemplate !== null}
      />
    </div>
  );
};

export default MailManagement;
