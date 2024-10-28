# Capsule Corp

A modern web application built with Next.js that allows users to manage and view space capsules in an interactive table interface. The application provides features for viewing, adding, editing, and filtering space capsule data.

## Features

### 1. Interactive Data Table

- Displays space capsules data in a organized tabular format
- Pagination for handling large datasets
- Responsive design that works on both desktop and mobile devices

### 2. Capsule Management

- **Add New Capsules**: Users can add new space capsules through a modal form

  - Input validation ensures data integrity
  - Form includes fields for all necessary capsule information
  - Real-time feedback on form submission

- **Edit Existing Capsules**: Modify capsule details through an intuitive edit interface
  - Pre-populated form fields for easy editing
  - Validation to prevent invalid data updates
  - Immediate table update after successful edit

### 3. Search and Filter

- Real-time search functionality
- Filter capsules based on multiple criteria:
  - Status
  - Type
  - Launch Date
- Instant table updates as users type in the search field

### 4. User Interface

- Clean and modern design
- Responsive layout adapting to different screen sizes
- Clear feedback for user actions

## Technology Stack

- **Framework**: Next.js
- **UI Components**: PrimeReact, shadcn/ui
- **Styling**: TailwindCSS
- **State Management**: React Query, Redux Toolkit
- **Form Handling**: Formik, Yup(Schema Validation)
- **Type Safety**: TypeScript
- **Package Management**: [bun](https://bun.sh/)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/binlf/don_CheckitFE.git
```

2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
capsule-corp/
├── components/
│   ├── layout/
│       └── providers.tsx
│   ├── ui/
│       └── dialog/
│        button.tsx
│        calendar.tsx
│        card.tsx
│        input.tsx
│        label.tsx
│        popover.tsx
│        select.tsx
├── app/
│   └── fonts/
│   └── page.tsx
│   └── layout.tsx
│   └── globals.css
│   └── favicon.ico
├── hooks/
│   └── use-capsules.ts
│   └── use-filters.ts
├── lib/
│   └── api.ts
│   └── mock.ts
│   └── utils.ts
├── types/
│   └── index.ts
```

## API Integration

The application integrates with a RESTful API to perform the following CRUD operations:

- `GET /https://api.spacexdata.com/v4/capsules` - Fetch all capsules
- `GET /https://api.spacexdata.com/v4/launches/:flightNumber` - Fetch all launch data about a capsule

## Usage Examples

### Adding a New Capsule

1. Click the "Add Capsule" button
2. Fill in the required information:
   - Serial Number(Capsule ID)
   - Type
   - Status
   - Launch Date
3. Submit the form

### Editing a Capsule

1. Find the capsule in the table
2. Click the edit button
3. Modify the desired fields
4. Save changes

### Viewing a Capsule

1. Find the capsule in the table
2. Click the desired row in which the capsule resides
3. View all relevant information about capsule

### Filtering Capsules

1. Use the search bar at the top of the table
2. Type any search term
3. The table will automatically update to show matching results

[View video walkthrough](https://drive.google.com/file/d/1ov_PNMz3zY42ZkMU9q2Vm3ReWsAS5sny/view?usp=sharing)
