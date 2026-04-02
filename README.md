# Finance Data Access Control Backend (scaffold)

Express + TypeScript + MongoDB (Mongoose) starter for a finance dashboard API with **RBAC-oriented middleware**, **JWT auth helpers**, **password hashing**, **rate limiting**, and **security headers**. This repository contains **project setup and boilerplate only**—business logic (login, CRUD, aggregations) is left as `501 Not Implemented` placeholders so you can implement the assignment cleanly on top.

## Folder structure

```
src/
├── config/          # env loading, MongoDB connection
├── constants/       # roles and shared enums
├── controllers/     # HTTP handlers (stubs)
├── middlewares/     # auth, RBAC, validation, errors, rate limit, security
├── models/          # User, FinancialRecord (Mongoose)
├── routes/          # `/api/v1` grouping
├── services/        # domain logic (empty — add here)
├── types/           # Express `Request.user` augmentation
├── utils/           # ApiError, asyncHandler, jwt, password
├── validators/      # Zod schemas (example auth bodies)
├── app.ts           # Express app factory
└── server.ts        # bootstrap + DB connect
```

## Prerequisites

- Node.js 20+
- MongoDB running locally (or update `MONGODB_URI`)

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

- API base: `http://localhost:4000/api/v1`
- Health: `GET /api/v1/health`

## Assumptions (for full implementation)

- **Roles**: ordered `viewer` → `analyst` → `admin` (see hierarchy in `src/constants/roles.ts`).
- **JWT**: Access token in `Authorization: Bearer <token>`; payload includes `sub`, `email`, `role`, `isActive`.
- **Registration**: Assignment-style systems often restrict who can create users; the stub `POST /auth/register` is for you to wire to **admin-only** or public signup as you prefer.
- **Finance routes** (`src/routes/v1/finance.routes.ts`): Example policy wiring—adjust to match your exact matrix (e.g. whether viewers may list raw records).

## Security included (boilerplate)

- `helmet`, `compression`, configurable `cors`
- Global + stricter **rate limits** (`auth` routes use a lower cap)
- **bcrypt** hashing utilities (`src/utils/password.ts`)
- **JWT** verify/sign helpers (`src/utils/jwt.ts`)
- **Zod** request validation wrapper (`validateRequest`)
- **Centralized errors** (`ApiError` + `errorHandler`)

## Scripts

| Script        | Description              |
| ------------- | ------------------------ |
| `npm run dev` | `tsx watch` development  |
| `npm run build` | Compile to `dist/`   |
| `npm start`   | Run compiled output      |
| `npm run typecheck` | `tsc --noEmit`   |

## Next steps for the assignment

1. Implement `authController` (login, optional refresh pattern, user provisioning).
2. Add finance validators + finance service with filters and dashboard aggregations.
3. Flesh out RBAC in routes/controllers (e.g. block viewers from mutating records).
4. Add tests and API docs (OpenAPI) if you want extra credit.

## Tradeoffs

- **Single access token** only (no refresh-token collection)—keeps the scaffold small; add refresh flow when you implement auth fully.
- **In-memory rate limiting** by default (`express-rate-limit`); replace with Redis for multi-instance deployments.
