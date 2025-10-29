![eWay-CRM Logo](https://www.eway-crm.com/wp-content/themes/eway/img/logo_new-new.svg)

# React Sample App (Interview Assignment v2)

Hello and welcome to eWay-CRM job interview. We are happy to see you playing around with our code!

## Installation

### Prerequisites

To be able to run this project on your own computer, you will need [NPM & Node.JS](https://www.npmjs.com/get-npm).

**Recommended:**
- Node.js v22.x or later
- npm v10.x or later

### Duplicate and Run Non-Publicly

To install and run this project on your computer, please create a private repository and [duplicate](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository) this repository to it.
Once you have all the sources on your computer, open command line in the directory where the repository was cloned into (the directory where `.gitignore` and `README.md` files are located). Run

```
npm install
```

to initialize the project structure and dependencies. Then run

```
npm run dev
```

A new window or tab of your default browser appears and the url is http://localhost:5173. Inside the browser the React web app is running. Feel free to edit the sources and the page will reload as you save the file.

We wish you a happy coding.

### Tech Stack

This project has been updated to use modern development tools:

- **⚡ Vite** - Lightning-fast build tool with HMR (Hot Module Replacement)
- **⚛️ React 18** - Latest React with concurrent rendering features
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **📘 TypeScript** - Type-safe JavaScript development
- **🔌 eWay-CRM Connector** - JavaScript library for eWay-CRM API integration

### Available Scripts

- `npm run dev` - Start the Vite development server (default port: 5173)
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Check code quality with ESLint
- `npm run lint:fix` - Auto-fix ESLint issues

## Your Goal

The standard goal we want you to accomplish is an app consisting of two parts.

First part is a form where the user types contact's email address. After submitting the form, something like a business card containing the contact's info should appear. The profile picture should be shown as well.

You should also handle the states, where wrong user input is given or no contact is found.

Second part of the app is a list of previously visited contacts. This list must preserve browser window/tab close and reopen. The user should be able to click the contacts they previously visited and open their business card again. Keep in mind, that contact info including the email address might change over time. If so, you should update the data in the preserverd list. Items in the list must not sync among other users or devices.

The [library for communication with eWay-CRM API](https://github.com/eway-crm/js-lib) is already included.

Feel free to update or add new dependencies. Using the latest React features is welcome.

## Commit and Push

Once you have your amazing app, commit and [push](https://help.github.com/en/github/using-git/pushing-commits-to-a-remote-repository) the codes to your repo. Give [rstefko](https://github.com/orgs/eway-crm/people/rstefko) and [havri](https://github.com/orgs/eway-crm/people/havri) permissions to your repository.

Let us know when the final revision is pushed (commit/tag/branch). We are looking forward to see your results.

## Solution:


Tested emails:

    mroyster@royster.com 
    ealbares@gmail.com
    oliver@hotmail.com
    michael.ostrosky@ostrosky.com
    kati.rulapaugh@hotmail.com


## Project Structure

```
src/
├── App.tsx                      # Root component with routing setup and React Query provider
├── index.tsx                    # Application entry point
├── index.css                    # Global styles with Tailwind CSS imports
│
├── pages/
│   ├── SearchPage.tsx          # Main search interface for finding contacts by email
│   ├── ContactDetailPage.tsx   # Full contact details page with refresh capability
│   └── HistoryPage.tsx         # List of previously searched contacts
│
├── components/
│   ├── Layout.tsx              # Main layout wrapper with navigation
│   ├── ContactCard.tsx         # Reusable contact display card component
│   ├── ContactForm.tsx         # Email input form for contact search
│   ├── ContactAvatar.tsx       # Avatar component (profile picture or initials)
│   └── ContactForm.tsx         # Search form component
│
├── hooks/
│   ├── useContactHistory.ts    # Local state management with localStorage persistence
│   └── useContactQuery.ts      # React Query hooks for API integration and caching
│
├── utils/
│   └── contactService.ts       # API integration layer and data transformation
│
└── eWayAPI/
    ├── Connector.ts            # eWay-CRM API connector initialization
    └── ContactsResponse.ts     # TypeScript types for API responses
```

## Key Features

### 🔍 Contact Search
- Search for contacts by email address
- Real-time API integration with eWay-CRM
- Automatic profile picture display (Base64 encoded images)
- Fallback gradient avatar with initials when picture unavailable

### 💾 Contact History
- Automatically saves all successfully searched contacts
- Persists data using browser localStorage
- Prevents duplicates (updates existing entries)
- View, refresh, or remove contacts from history
- Survives browser window/tab close and reopen

### 📊 Contact Management
- Display full contact details including:
  - Name, email, phone number
  - Company and department
  - Business and home addresses
  - Website, notes, activity timestamp
- Refresh contact data from eWay-CRM API
- Navigate between search, history, and detail views

### ⚡ Performance & Caching
- **React Query** caching with 5-minute staleTime
- 10-minute garbage collection
- Automatic query deduplication
- Single retry on error

### 🛠️ Developer Experience
- **TypeScript** for type safety throughout the app
- **ESLint** configured for code quality
- **Tailwind CSS** for rapid UI development
- **Vite HMR** for instant development feedback

## Component Architecture

### App.tsx
```tsx
// Root component setup
- QueryClientProvider (React Query caching)
- BrowserRouter (React Router v6 with v7 future flags)
- Routes:
  - / → SearchPage (default)
  - /contact/:id → ContactDetailPage
  - /history → HistoryPage
```

### SearchPage.tsx
- Email form input with validation
- Contact card display with auto-save to history
- Error and not-found state handling
- Navigation to detail page
- Tips sidebar with usage information

### HistoryPage.tsx
- List of previously searched contacts
- Quick actions: View details, Refresh data, Remove from history
- Sorted by most recent first
- No duplicates (same email shows once)

### ContactDetailPage.tsx
- Full contact information display
- Refresh button to update data from API
- Back navigation
- Loading and error states

## Data Model

### Contact Interface
```typescript
interface Contact {
  // Mandatory fields
  itemGUID: string              // Unique identifier
  fileAs: string                // Display name
  email1Address: string         // Primary email
  telephoneNumber1: string      // Primary phone
  lastActivity: string          // ISO timestamp
  profilePicture?: string       // Base64 encoded image or null
  
  // Optional fields
  profilePictureHeight?: number
  profilePictureWidth?: number
  firstName?: string
  lastName?: string
  company?: string
  department?: string
  businessAddressStreet?: string
  businessAddressCity?: string
  businessAddressState?: string
  businessAddressPostalCode?: string
  homeAddressStreet?: string
  homeAddressCity?: string
  homeAddressState?: string
  homeAddressPostalCode?: string
  webPage?: string
  note?: string
  itemChanged?: string
  itemCreated?: string
  
  // Local app field
  lastUpdated: number           // Timestamp when added to history
}
```

## State Management

### Local State (useContactHistory)
- Manages contact history array
- Persists to localStorage with key `'contact_history'`
- Methods:
  - `addContact(contact)` - Add or update contact
  - `removeContact(id)` - Remove by itemGUID
  - `getContact(id)` - Retrieve specific contact
  - `clearHistory()` - Clear all saved contacts

### API State (useContactQuery)
- **useSearchContact(email, enabled)**
  - Searches contact by email
  - Returns: `{ data, isLoading, error }`
  - Cached for performance
  
- **useRefreshContact() mutation**
  - Manually update contact data
  
- **useInvalidateContacts() utility**
  - Clear React Query cache

## Routing

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | SearchPage | Main search interface |
| `/contact/:id` | ContactDetailPage | View full contact details |
| `/history` | HistoryPage | Browse search history |

## Styling

- **Tailwind CSS** v3.4.1 for utility-first styling
- **Responsive design** with mobile-first approach
- **Color scheme**: Blue primary (brand colors), slate for neutral
- **Components**: Rounded cards, gradient backgrounds, smooth transitions

## Browser Support

- Modern browsers with:
  - ES6+ JavaScript support
  - localStorage API
  - Fetch API (via eWay-CRM connector)


