# Finance Data Access Control Backend (scaffold)



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
└── server.ts        # DB connect
```

## Prerequisites

- Node.js 20+


## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

- API base: `http://localhost:4000/api/v1`
- Health: `GET /api/v1/health`



## Security included (boilerplate)

- `helmet`, `compression`, configurable `cors`
- Global + stricter **rate limits** (`auth` routes use a lower cap)
- **bcrypt** hashing utilities (`src/utils/password.ts`)
- **JWT** verify/sign helpers (`src/utils/jwt.ts`)
- **Zod** request validation wrapper (`validateRequest`)
- **Centralized errors** (`ApiError` + `errorHandler`)



