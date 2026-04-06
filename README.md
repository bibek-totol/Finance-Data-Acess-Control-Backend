# Finance Data Access Control Backend

A complete backend implementation for a finance dashboard with Role-Based Access Control (RBAC), financial record management, and summary analytics.

## Features

- **User & Role Management**: Register, login, and admin-only user management (create/update role/status).
- **Security Restricted Admin**: Only specific pre-defined emails can register as "admin". Others default to "viewer".
- **Financial Records**: Full CRUD for transactions with filtering by type, category, and date range.
- **Dashboard Analytics**: Summarized data including total income, expenses, net balance, category-wise breakdowns, and **monthly trends**.
- **Access Control**: Strict RBAC (Viewer, Analyst, Admin) enforced via middleware.
- **Validation**: Robust request validation using Zod.
- **Security**: JWT authentication, password hashing (bcrypt), rate limiting, and security headers (Helmet).

---

## Setup

1. **Copy environment variables**: `cp .env.example .env`
2. **Install dependencies**: `npm install`
3. **Run in development**: `npm run dev`
   - Default Server URL: `http://localhost:4000/api/v1`

---

## 🛠 Postman Manual Testing Guide

Follow these steps to test every feature of the API.

### 1. Authentication (Identity & Security)

#### A. Register a Primary Admin
- **Method**: `POST`
- **URL**: `http://localhost:4000/api/v1/auth/register`
- **Body (JSON)**:
  ```json
  {
    "email": "admin1@example.com",
    "password": "Password123",
    "role": "admin"
  }
  ```
- **Note**: Only `admin1@example.com` or `admin2@example.com` can register as admin.

#### B. Register a Restricted User (Role Check)
- **Method**: `POST`
- **URL**: `http://localhost:4000/api/v1/auth/register`
- **Body (JSON)**:
  ```json
  {
    "email": "user@test.com",
    "password": "Password123",
    "role": "admin"
  }
  ```
- **Note**: This user will be created with `role: "viewer"` automatically because the email is not in the allowed list.

#### C. Login
- **Method**: `POST`
- **URL**: `http://localhost:4000/api/v1/auth/login`
- **Body (JSON)**:
  ```json
  {
    "email": "admin1@example.com",
    "password": "Password123"
  }
  ```
- **Action**: Copy the `accessToken` from the response. In Postman, go to the **Auth** tab of other requests, select **Bearer Token**, and paste this token.

---

### 2. User Management (Admin Only)
*All requests below require the Admin token.*

#### A. List Users
- **Method**: `GET`
- **URL**: `http://localhost:4000/api/v1/users`

#### B. Add New User (Directly)
- **Method**: `POST`
- **URL**: `http://localhost:4000/api/v1/users`
- **Body (JSON)**:
  ```json
  {
    "email": "analyst1@test.com",
    "password": "Password123",
    "role": "analyst"
  }
  ```

#### C. Promote/Update User
- **Method**: `PUT`
- **URL**: `http://localhost:4000/api/v1/users/USER_ID`
- **Body (JSON)**:
  ```json
  {
    "role": "admin",
    "isActive": true
  }
  ```

#### D. Delete User
- **Method**: `DELETE`
- **URL**: `http://localhost:4000/api/v1/users/USER_ID`

---

### 3. Finance Records (Analyst & Admin)

#### A. Create Record (Admin Only)
- **Method**: `POST`
- **URL**: `http://localhost:4000/api/v1/records`
- **Body (JSON)**:
  ```json
  {
    "amount": 5000,
    "type": "income",
    "category": "Salary",
    "date": "2024-03-01",
    "notes": "Monthly salary"
  }
  ```

#### B. List Records (Analyst & Admin)
- **Method**: `GET`
- **URL**: `http://localhost:4000/api/v1/records`
- **Query Params**:
  - `type`: `income` or `expense`
  - `category`: e.g., `Salary`
  - `startDate`: `2024-01-01`
  - `endDate`: `2024-12-31`
  - `page`: `1`
  - `limit`: `10`

#### C. Update Record (Admin Only)
- **Method**: `PUT`
- **URL**: `http://localhost:4000/api/v1/records/RECORD_ID`
- **Body (JSON)**:
  ```json
  { "amount": 5500 }
  ```

#### D. Delete Record (Admin Only)
- **Method**: `DELETE`
- **URL**: `http://localhost:4000/api/v1/records/RECORD_ID`

---

### 4. Dashboard (Viewer, Analyst & Admin)

#### Get Summary
- **Method**: `GET`
- **URL**: `http://localhost:4000/api/v1/dashboard/summary`

---

### 5. System Health
- **Method**: `GET`
- **URL**: `http://localhost:4000/api/v1/health`

---

## 👥 Role Permissions Breakdown

| Role | Dashboard | View Records | Manage Records | User Management |
| :--- | :---: | :---: | :---: | :---: |
| **Viewer** | ✅ | ❌ | ❌ | ❌ |
| **Analyst** | ✅ | ✅ | ❌ | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ |

---
