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
- `npm test` - Run Jest test suite once
- `npm run test:watch` - Run tests in watch mode (re-runs on file changes)
- `npm run test:coverage` - Generate test coverage report

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

## Testing

This project uses **Jest** with **React Testing Library** for comprehensive test coverage.

### Test Framework Setup

- **Jest** v30.2.0 - Test runner with TypeScript support
- **ts-jest** v29.4.5 - TypeScript preprocessor for Jest
- **@testing-library/react** v14.3.1 - React component testing utilities
- **@testing-library/jest-dom** v5.17.0 - Custom Jest matchers for DOM
- **jest-environment-jsdom** v30.2.0 - DOM environment for tests

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

Tests are organized in `__tests__` directories alongside the code they test:

```
src/
├── utils/
│   └── __tests__/
│       └── contactService.test.ts       # Utility function tests
├── hooks/
│   └── __tests__/
│       └── useContactHistory.test.ts    # Custom hook tests
└── components/
    └── __tests__/
        ├── ContactAvatar.test.tsx       # Avatar component tests
        └── ContactForm.test.tsx         # Form component tests
```

### Test Coverage

| Module | Type | Tests | Coverage |
|--------|------|-------|----------|
| contactService.ts | Utility Functions | 6 | Email validation, query factory |
| useContactHistory.ts | Custom Hook | 13+ | CRUD operations, localStorage |
| ContactAvatar.tsx | React Component | 10 | Image rendering, fallback avatar |
| ContactForm.tsx | React Component | 9 | Form validation, submission |
| **Total** | | **39** | **Comprehensive coverage** |

### Test Categories

#### 1. **Utility Function Tests** (`contactService.test.ts`)
Tests for utility functions and API integration:
- ✅ Email validation with various formats
- ✅ Invalid email detection
- ✅ Query key factory for caching
- ✅ Contact search query setup
- ✅ Contact detail query setup

#### 2. **Custom Hook Tests** (`useContactHistory.test.ts`)
Tests for React hooks with state and side effects:
- ✅ Hook initialization with empty history
- ✅ localStorage persistence on mount
- ✅ Adding contacts (add/update behavior)
- ✅ Removing contacts by ID
- ✅ Retrieving specific contacts
- ✅ Clearing entire history
- ✅ Duplicate prevention (update existing)
- ✅ Timestamp updates on re-add
- ✅ Multiple contact management
- ✅ Serialization/deserialization

#### 3. **Component Tests**

**ContactAvatar.test.tsx** - Avatar display component:
- ✅ Profile picture rendering with correct styling
- ✅ Fallback avatar with initials for null pictures
- ✅ First character extraction from name
- ✅ Empty name handling
- ✅ Raw Base64 to data URL conversion
- ✅ Correct alt text for accessibility
- ✅ Custom className prop support
- ✅ Gradient background styling
- ✅ White text color in avatar
- ✅ Responsive sizing (w-12 h-12)

**ContactForm.test.tsx** - Search form component:
- ✅ Email input field rendering
- ✅ Submit button rendering
- ✅ Form submission with email value
- ✅ Button disabled state while loading
- ✅ Button enabled state when not loading
- ✅ Form submission via Enter key
- ✅ Invalid email format rejection
- ✅ Empty email rejection
- ✅ Whitespace trimming from input

### Writing New Tests

#### Test Utilities

```typescript
// Mock Contact Factory
function createMockContact(overrides?: Partial<Contact>): Contact {
    return {
        itemGUID: 'guid-123',
        fileAs: 'John Doe',
        email1Address: 'john@example.com',
        telephoneNumber1: '123-456-7890',
        lastActivity: new Date().toISOString(),
        lastUpdated: Date.now(),
        ...overrides
    }
}
```

#### Testing a Component

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../ContactForm'

describe('ContactForm', () => {
    it('should call onSearch with email on submit', async () => {
        const mockOnSearch = jest.fn()
        const user = userEvent.setup()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        const input = screen.getByPlaceholderText('contact@example.com')
        await user.type(input, 'test@example.com')
        await user.click(screen.getByRole('button', { name: /search/i }))

        expect(mockOnSearch).toHaveBeenCalledWith('test@example.com')
    })
})
```

#### Testing a Hook

```typescript
import { renderHook, act } from '@testing-library/react'
import { useContactHistory } from '../useContactHistory'

describe('useContactHistory', () => {
    it('should add contact to history', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
        })

        expect(result.current.history).toHaveLength(1)
        expect(result.current.history[0]).toEqual(contact)
    })
})
```

### Key Testing Patterns

1. **User Interactions**
   - Use `userEvent` for realistic user behavior
   - Always `await` async operations
   - Use `screen` to query rendered elements by user-visible text

2. **State Testing**
   - Wrap state updates in `act()` for hooks
   - Test initial state and state changes
   - Verify side effects (localStorage, API calls)

3. **Mocking**
   - Mock API responses with jest.fn()
   - Mock localStorage in setupTests.ts
   - Mock user events with userEvent.setup()

4. **Accessibility**
   - Use semantic queries (getByRole, getByLabelText)
   - Test alt text for images
   - Verify button and form states

### Configuration Files

**jest.config.js** - Jest configuration:
- TypeScript support via ts-jest
- jsdom environment for DOM testing
- CSS module mocking
- Coverage thresholds (60% globally)

**src/setupTests.ts** - Test environment setup:
- @testing-library/jest-dom import for custom matchers
- localStorage mock for persistence testing
- act() warning suppression (expected in React 18 + userEvent)

### Test Execution Output

When you run `npm test`, you'll see output like:

```
 PASS  src/utils/__tests__/contactService.test.ts
 PASS  src/hooks/__tests__/useContactHistory.test.ts
 PASS  src/components/__tests__/ContactAvatar.test.tsx
 PASS  src/components/__tests__/ContactForm.test.tsx

Test Suites: 4 passed, 4 total
Tests:       39 passed, 39 total
Time:        ~5 seconds
```

### Troubleshooting Tests

**Issue: "localStorage is not defined"**
- Solution: localStorage is mocked in setupTests.ts for all tests

**Issue: "act() warning in console"**
- Solution: This is expected with React 18 + userEvent. The warning is suppressed in setupTests.ts

**Issue: Test fails with timing issue**
- Solution: Use `userEvent.setup()` and `await` all async operations

**Issue: Component not found in tests**
- Solution: Verify component path in import matches actual file location (case-sensitive on Linux/Mac)


