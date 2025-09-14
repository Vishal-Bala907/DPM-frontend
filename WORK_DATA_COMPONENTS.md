# Work Data Visualization System

This document outlines the comprehensive work data visualization system created for displaying user work analytics.

## 📁 Component Structure

All components are located in `/src/components/view-data/normaluser/`

### 🎯 Main Components

#### 1. **WorkDashboard.tsx**

- **Purpose**: Main dashboard combining overview and daily analysis
- **Features**:
  - Tabbed interface (Category Overview / Daily Analysis)
  - Summary statistics header
  - Quick stats footer
- **Routes**: `/view-work-data`

#### 2. **WorkDataOverview.tsx**

- **Purpose**: Display category cards with work statistics
- **Features**:
  - Category cards with total hours, work count, daily average
  - Star ratings based on working hours
  - "View More Details" buttons
  - Empty state handling
- **Navigation**: Links to `/category-data?name={categoryName}`

#### 3. **DateWiseTable.tsx**

- **Purpose**: Paginated table showing daily work summary
- **Features**:
  - Sortable date column
  - Pagination (15 items per page)
  - Star ratings per day
  - Category tags
  - "View More" buttons for detailed day analysis
- **Navigation**: Links to `/view-date-data?date={date}`

### 📊 Detail Pages

#### 4. **CategoryDetails.tsx**

- **Purpose**: Detailed view for specific category data
- **Features**:
  - Statistics cards (total time, entries, daily average)
  - Sortable data table
  - Pagination
  - Date range analysis
- **Route**: `/category-data?name={categoryName}`

#### 5. **DateDetails.tsx**

- **Purpose**: Comprehensive daily work analysis
- **Features**:
  - Summary statistics
  - Two pie charts (work hours distribution & 24-hour analysis)
  - Timeline view
  - Detailed work log table
- **Route**: `/view-date-data?date={date}`

### 📈 Chart Components

#### 6. **WorkHoursPieChart.tsx**

- **Purpose**: Display work hours distribution by category
- **Features**:
  - Color-coded categories
  - Custom tooltips
  - Legend with hours
  - Responsive design

#### 7. **TimeDistributionPieChart.tsx**

- **Purpose**: Show 24-hour time distribution
- **Features**:
  - Work time vs free time visualization
  - Percentage calculations
  - Custom tooltips
  - Summary statistics

### 🛠️ Utility Components

#### 8. **StarRating.tsx**

- **Purpose**: Display star ratings based on working hours
- **Rating System**:
  - ≥16 hours → 5 stars
  - 14-16 hours → 4.5 stars
  - 10-14 hours → 4 stars
  - 6-10 hours → 3.5 stars
  - 4-6 hours → 3 stars
  - Default → 2.5 stars
- **Features**: Customizable size, optional text display

## 🔗 Routing Structure

### Main Routes Added:

- `/view-work-data` → WorkDashboard (main analytics page)
- `/category-data?name={categoryName}` → CategoryDetails
- `/view-date-data?date={date}` → DateDetails

### Page Components:

- `ViewWorkData.tsx` → Main work analytics page
- `CategoryDataPage.tsx` → Category-specific analysis
- `ViewDateDataPage.tsx` → Date-specific analysis

## 🎨 Design Features

### Visual Elements:

- **Gradient themes**: Blue to purple gradients matching existing design
- **Star ratings**: Color-coded performance indicators
- **Card layouts**: Clean, organized information display
- **Responsive design**: Mobile-friendly layouts
- **Empty states**: Meaningful messages when no data exists

### Interactive Features:

- **Sortable tables**: Click headers to sort data
- **Pagination**: Navigate through large datasets
- **Tooltips**: Hover for additional information
- **Navigation buttons**: Breadcrumb-style back navigation

## 📊 Data Flow

### Mock Data Generation:

- Components include realistic mock data generators
- Categories with color coding
- Random but realistic work hours
- Date-based data generation

### Props Interface:

- Components accept optional mock data props
- Fallback to generated data if none provided
- Type-safe interfaces throughout

## 🚀 Key Features Implemented

### ✅ Category Management:

- Display all categories with total working hours
- Color-coded category identification
- Performance metrics and averages

### ✅ Pagination:

- Date-wise table with 15 items per page
- Navigation controls
- Item count display

### ✅ Star Rating System:

- Hour-based performance calculation
- Visual star display with colors
- Consistent rating across all components

### ✅ Pie Charts:

- Work hours distribution by category
- 24-hour time allocation analysis
- Interactive tooltips and legends

### ✅ Query Parameter Routing:

- Category filtering via URL parameters
- Date-specific analysis routing
- Breadcrumb navigation

## 🛡️ Technical Implementation

### Libraries Used:

- **React Router**: For navigation and query parameters
- **Recharts**: For pie chart visualizations
- **Lucide React**: For consistent iconography
- **Tailwind CSS**: For responsive styling

### Type Safety:

- Full TypeScript implementation
- Interface definitions for all data structures
- Type-safe component props

### Performance:

- Responsive design for all screen sizes
- Efficient data rendering
- Optimized chart performance

## 🎯 Usage Examples

### Navigate to Category Details:

```typescript
navigate(`/category-data?name=${encodeURIComponent(categoryName)}`);
```

### Navigate to Date Details:

```typescript
navigate(`/view-date-data?date=${date}`);
```

### Use Components:

```typescript
import { WorkDashboard, StarRating } from '../components/view-data/normaluser';

// Main dashboard
<WorkDashboard />

// Star rating
<StarRating workingHours={8.5} size={16} showText />
```

This comprehensive system provides users with detailed insights into their work patterns, productivity metrics, and time management analytics through an intuitive and visually appealing interface.
