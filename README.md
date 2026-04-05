# Finance Data Access Control Backend

A complete backend implementation for a finance dashboard with Role-Based Access Control (RBAC), financial record management, and summary analytics.

## Features

- **User & Role Management**: Register, login, and admin-only user management (update role/status).
- **Financial Records**: Full CRUD for transactions with filtering by type, category, and date range.
- **Dashboard Analytics**: Summarized data including total income, expenses, net balance, category-wise breakdowns, and **monthly trends**.
- **Access Control**: Strict RBAC (Viewer, Analyst, Admin) enforced via middleware.
- **Validation**: Robust request validation using Zod.
- **Security**: JWT authentication, password hashing (bcrypt), rate limiting, and security headers (Helmet).
- **Architecture**: Clean, modular structure using Controllers, Models, and Middlewares.

## Folder structure

```
src/
├── config/          # env loading, MongoDB connection
├── constants/       # roles and shared enums
├── controllers/     # HTTP handlers (Auth, Finance, User)
├── middlewares/     # auth, RBAC, validation, errors, rate limit, security
├── models/          # Mongoose Models (User, FinancialRecord)
├── routes/          # API Route definitions
├── services/        # Service layer (internal logic)
├── types/           # Type definitions
├── utils/           # Helpers (JWT, Error handling)
├── validators/      # Zod schemas for validation
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Prerequisites

- Node.js 20+
- MongoDB instance (Local or Atlas)

## Setup

1. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Roles & Permissions

- **Viewer**: Can only view summary-level dashboard data (`GET /dashboard/summary`).
- **Analyst**: Can view individual records (`GET /records`) and see analytics.
- **Admin**: Full management access (CRUD on records, user management, status/role updates).

## API Endpoints

- **Auth**
  - `POST /api/v1/auth/register`: Register a new user
  - `POST /api/v1/auth/login`: Login and receive JWT

- **Finance Records**
  - `GET /api/v1/records`: List records (Analyst+) (with filters: `type`, `category`, `startDate`, `endDate`, `page`, `limit`)
  - `POST /api/v1/records`: Create record (Admin)
  - `PUT /api/v1/records/:id`: Update record (Admin)
  - `DELETE /api/v1/records/:id`: Delete record (Admin)

- **Dashboard**
  - `GET /api/v1/dashboard/summary`: Get totals, trends, and analytics (Viewer+)

- **User Management (Admin Only)**
  - `GET /api/v1/users`: List all users
  - `PUT /api/v1/users/:id`: Update user role/status
  - `DELETE /api/v1/users/:id`: Delete user
