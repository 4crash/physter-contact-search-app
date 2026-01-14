# Physter Sample App - Mock Server (QUICK SOLUTION FOR TESTING CLIENT)

This is a simple mock server for the Physter Sample Application. It provides a REST API to simulate fetching contact information from a backend.

## 🚀 Features

- **Express.js API**: Lightweight server built with Express.
- **TypeScript**: Type-safe development.
- **Mock Data**: Serves contact data from a local JSON file.
- **Search Capabilities**: Find contacts by email or GUID.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

#### Development Mode (with hot-reload)
```bash
npm run dev
```
The server will be available at `http://localhost:3001`.

#### Production Build
```bash
npm run build
npm start
```

## 📡 API Endpoints

### 🔍 Search Contacts
Find a contact by their email address.

**Request:** `GET /contacts/search?email={email}`

**Response:**
```json
{
  "Status": "OK",
  "Data": [
    {
      "ItemGUID": "...",
      "FileAs": "...",
      "Email1Address": "...",
      "ProfilePicture": "..."
    }
  ]
}
```

### 👤 Get Contact by GUID
Retrieve full details for a specific contact.

**Request:** `GET /contacts/{guid}`

**Response:**
```json
{
  "Status": "OK",
  "Data": [{ ... }]
}
```

## 📂 Project Structure

- `src/index.ts`: Main entry point and API route definitions.
- `src/data/contacts.json`: Mock database containing sample contact records.

## ⚙️ Technologies

- **[Express](https://expressjs.com/)**: Fast, unopinionated, minimalist web framework for Node.js.
- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed programming language.
- **[ts-node-dev](https://github.com/wclr/ts-node-dev)**: Development tool for automatic reloading.
