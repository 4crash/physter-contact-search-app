# Contact Search App

A modern React-based contact search application with search functionality, persistent history, and a mock backend server.

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18.x or later
- **npm** v9.x or later

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-way-sample-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Start the backend server**
   ```bash
   # From the server directory
   npm run dev
   ```
   Server runs on `http://localhost:3001`

4. **Start the frontend (in a new terminal)**
   ```bash
   # From the client directory
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

## 📦 Tech Stack

### Frontend
- **⚛️ React 18.2** - UI library with concurrent features
- **⚡ Vite 5.4** - Lightning-fast build tool with HMR
- **🎨 Tailwind CSS 3.4** - Utility-first CSS framework
- **📘 TypeScript 4.9** - Type-safe development
- **🔄 React Query 5.90** - Server state management & caching
- **🛣️ React Router 6.20** - Client-side routing

### Backend
- **🟢 Node.js** with ES modules
- **🚂 Express 5.2** - Web server framework
- **📘 TypeScript** - Type-safe backend
- **🔀 CORS** - Cross-origin resource sharing

### Testing & Quality
- **🧪 Jest 30.2** - Test runner
- **🎯 React Testing Library 14.3** - React component testing
- **✅ ts-jest 29.4** - TypeScript preprocessor
- **🔍 ESLint** - Code quality and linting

## 📁 Project Structure

```
e-way-sample-app/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ContactActionButtons.tsx
│   │   │   ├── ContactAvatar.tsx
│   │   │   ├── ContactCard.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── Layout.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useContactHistory.ts
│   │   │   └── useContactQuery.ts
│   │   ├── pages/           # Page components
│   │   │   ├── ContactDetailPage.tsx
│   │   │   ├── HistoryPage.tsx
│   │   │   └── SearchPage.tsx
│   │   ├── utils/           # Utility functions
│   │   │   └── contactService.ts
│   │   ├── App.tsx          # Root component
│   │   └── index.tsx        # Application entry point
│   ├── package.json
│   └── vite.config.ts
│
├── server/                   # Backend Express server
│   ├── src/
│   │   ├── data/
│   │   │   └── contacts.json # Mock contact data
│   │   ├── index.ts         # Server entry point
│   │   └── __tests__/       # Server tests
│   └── package.json
│
├── common/                   # Shared TypeScript types
│   └── types/
│       └── PhysterContact.ts
│
└── package.json             # Root package.json
```

## ✨ Features

### 🔍 Contact Search
- Search contacts by email address
- Real-time validation and feedback
- Display contact information in a clean card format
- Automatic profile picture or fallback gradient avatar with initials
- Handles not-found and error states gracefully

### 📝 Contact Details
- View comprehensive contact information:
  - Name, email, phone number
  - Company and department
  - Business and home addresses
  - Last activity timestamp
- Refresh contact data from the server
- Navigate back to search or history

### 💾 Contact History
- Automatically saves searched contacts to browser localStorage
- Persists across browser sessions
- View list of previously searched contacts
- Quick actions:
  - **View** - Navigate to contact details
  - **Refresh** - Update contact data from server
  - **Remove** - Delete from history
- Prevents duplicates (same email appears once)
- Sorted by most recent first

### ⚡ Performance & Caching
- React Query for intelligent server state management
- 5-minute stale time for cached data
- 10-minute garbage collection
- Automatic request deduplication
- Single retry on network errors

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Mobile-first approach
- Smooth transitions and animations
- Gradient avatars with initials fallback
- Clean, intuitive navigation

## 🛠️ Available Scripts

### Client (Frontend)
```bash
cd client

npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run lint:fix     # Auto-fix linting issues
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Server (Backend)
```bash
cd server

npm run dev          # Start development server (http://localhost:3001)
npm run build        # Compile TypeScript to JavaScript
npm start            # Run compiled server
npm test             # Run server tests
npm run lint         # Check code quality
```

## 🏗️ Architecture

### Frontend Components

#### Pages
- **SearchPage** - Main search interface with email input form
- **ContactDetailPage** - Full contact information display
- **HistoryPage** - List of previously searched contacts

#### Components
- **Layout** - Navigation wrapper with header and outlet
- **ContactCard** - Reusable contact display card
- **ContactForm** - Email search form with validation
- **ContactAvatar** - Profile picture or gradient avatar with initials
- **ContactActionButtons** - Quick action buttons (View, Refresh, Remove)

#### Hooks
- **useContactHistory** - Manages localStorage-based contact history
- **useContactQuery** - React Query hooks for API integration

#### Utils
- **contactService** - API client and data transformation layer

### Backend API (Simple backend, created for frontend showcase)

#### Endpoints

**GET /contacts/search?email={email}**
- Search for a contact by email address
- Returns contact data or empty array if not found
- Case-insensitive search

**GET /contacts/:guid**
- Retrieve a specific contact by GUID
- Returns 404 if contact not found

**Response Format**
```json
{
  "status": "OK",
  "data": [...contacts]
}
```

**Error Format**
```json
{
  "status": "error",
  "message": "Error description"
}
```

## 📊 Data Model

### PhysterContact Interface

```typescript
interface PhysterContact {
  // Required fields
  itemGuid: string              // Unique identifier
  fileAs: string                // Display name
  email1Address: string         // Primary email
  telephoneNumber1: string      // Primary phone
  lastActivity: string          // ISO 8601 timestamp
  
  // Optional fields
  firstName?: string
  lastName?: string
  company?: string | null
  department?: string
  profilePicture?: string | null  // Base64 encoded image

  
  // Address fields
  businessAddressStreet?: string
  businessAddressCity?: string
  businessAddressState?: string
  businessAddressPostalCode?: string
  homeAddressStreet?: string
  homeAddressCity?: string
  homeAddressState?: string
  homeAddressPostalCode?: string
  
  // Additional fields
  webPage?: string
  note?: string
  itemChanged?: string          // ISO 8601 timestamp
  itemCreated?: string          // ISO 8601 timestamp
}
```

### Contact History (Local Storage)
```typescript
interface PhysterContactHistory extends PhysterContact {
  lastUpdated: number           // Unix timestamp
}
```

## 🧪 Testing

### Test Coverage
- **Component Tests** - ContactAvatar, ContactForm
- **Hook Tests** - useContactHistory
- **Service Tests** - contactService
- **Server Tests** - API endpoints

### Running Tests
```bash
# Client tests
cd client
npm test

# Server tests
cd server
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🎯 Routing

| Path | Component | Description |
|------|-----------|-------------|
| `/` | SearchPage | Main search interface |
| `/contact/:id` | ContactDetailPage | Full contact details |
| `/history` | HistoryPage | Contact history list |
| `/*` | Redirect to `/` | Catch-all route |

## 🔐 State Management

### Server State (React Query)
- API response caching
- Background refetching
- Optimistic updates
- Query invalidation

### Local State (localStorage)
- Contact history persistence
- Survives page refresh and browser restart
- Managed by `useContactHistory` hook
- Key: `contact_history`

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom gradients** for avatar backgrounds
- **Responsive breakpoints** for mobile/tablet/desktop
- **Color palette**:
  - Primary: Blue shades
  - Secondary: Slate/gray for neutral elements
  - Accents: Green (success), Red (error), Yellow (warning)

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)  
- Safari (latest 2 versions)
- Requires ES6+ support and localStorage API

## 📝 Sample Contacts

The mock server includes sample contacts with these email addresses:
- `john.doe@example.com`
- `jane.smith@royster.com`
- `alice.j@test.com`
- Additional contacts available in `server/src/data/contacts.json`

## 🚧 Development Notes

### Code Style
- **camelCase** for all variables, functions, and properties
- **PascalCase** for React components and TypeScript interfaces
- **TypeScript strict mode** enabled
- **ESLint** configured for consistent code quality

### API Integration
- Base URL: `http://localhost:3001`
- Axios for HTTP requests
- Automatic error handling and retries
- Type-safe responses with TypeScript


## 📄 License

This project is private and proprietary.

## 👤 Author

Created as a sample application for contact management demonstration.

---

