# Mail Management System Documentation

## Overview

The Mail Management System provides comprehensive email communication tools for organizations, including the ability to compose and send emails, view sent mail history, and create/manage reusable email templates.

## Features

### 1. Compose Mail

- **Recipients Management**: Add multiple recipients to To, CC, and BCC fields
- **Template Integration**: Select from existing templates to auto-populate subject and body
- **Dynamic Content**: Support for template variables that get replaced with actual values
- **Email Validation**: Basic validation for email addresses and required fields

### 2. Sent Mails

- **Mail History**: View all previously sent emails with status tracking
- **Search & Filter**: Search by subject/recipient and filter by status (sent/pending/failed)
- **Detailed View**: See complete email details including recipients, timestamps, and content
- **Status Tracking**: Visual indicators for email delivery status

### 3. Mail Templates

- **Template Library**: Create and manage reusable email templates
- **Advanced Editor**: Rich template editor with variable support and live preview
- **Variable System**: Use placeholders like `{employee_name}` for dynamic content
- **Categories**: Organize templates by categories (HR, Reports, Meetings, etc.)
- **Template Operations**: Create, edit, delete, and apply templates

## Components

### MailManagement.tsx

Main component that provides the complete mail management interface with three tabs:

- Compose Mail tab for creating and sending emails
- Sent Mails tab for viewing email history
- Templates tab for template management

**Key Features:**

- State management for emails, templates, and UI states
- Email composition with recipient management
- Template selection and application
- Search and filtering capabilities
- CRUD operations for templates

### MailTemplateEditor.tsx

Advanced modal component for creating and editing email templates:

- Three-tab interface (Edit, Preview, Variables)
- Variable insertion tools with dropdown menus
- Live preview with sample data
- Comprehensive variable library with descriptions
- Form validation and error handling

**Template Variables Supported:**

- `{employee_name}` - Employee full name
- `{employee_email}` - Employee email address
- `{manager_name}` - Manager name
- `{company_name}` - Company name
- `{date}` - Current date
- `{time}` - Current time
- `{meeting_title}` - Meeting title
- `{meeting_date}` - Meeting date
- `{meeting_time}` - Meeting time
- `{location}` - Meeting location
- `{office_location}` - Office address
- `{start_date}` - Start date
- `{start_time}` - Start time
- `{project_name}` - Project name
- `{deadline}` - Project deadline

### MailsPage.tsx

Simple wrapper component that renders the MailManagement component within the dashboard layout.

## Data Structures

### MailTemplate Interface

```typescript
interface MailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}
```

### SentMail Interface

```typescript
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
```

### NewMail Interface

```typescript
interface NewMail {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  templateId?: string;
  attachments: File[];
}
```

## Usage Guide

### Accessing Mail Management

Navigate to `/dashboard/mails` to access the mail management interface.

### Composing an Email

1. Click on the "Compose Mail" tab
2. Optionally select a template from the dropdown
3. Add recipients by typing email addresses and pressing Enter
4. Fill in the subject and message body
5. Click "Send Mail" to send the email

### Creating a Template

1. Go to the "Templates" tab
2. Click "Create Template"
3. Fill in template details including name, category, subject, and body
4. Use the Variables tab to see available placeholders
5. Use the Preview tab to see how the template will look
6. Click "Create Template" to save

### Editing a Template

1. In the Templates tab, find the template you want to edit
2. Click the edit icon (green pencil)
3. Modify the template in the editor
4. Click "Update Template" to save changes

### Using Template Variables

- In the template editor, use the dropdown menus to insert variables
- Variables are formatted as `{variable_name}`
- The preview tab shows how variables will be replaced with actual data
- Variables can be used in both subject and body fields

## Navigation Integration

The mail management system is integrated into the dashboard layout with:

- Sidebar navigation item "Manage Mails"
- Route: `/dashboard/mails`
- Icon: Mail (from Lucide React)

## Styling

The components use Tailwind CSS for styling with:

- Consistent color scheme (blue primary, gray secondary)
- Responsive design for mobile and desktop
- Hover states and transitions
- Status indicators with appropriate colors
- Modal overlays for the template editor

## Future Enhancements

Potential areas for expansion:

- Email attachments support
- Rich text editor for email body
- Email scheduling
- Email tracking and analytics
- Bulk email sending
- Contact management integration
- Email signatures
- Advanced filtering and sorting
- Export functionality
- Integration with external email services
