# Architecture Overview

> ⚠️ **HACKATHON PROTOTYPE** — This is not an official Government of India application.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL |
| ORM | Prisma |
| Charts | Recharts |
| AI/OCR | Modular service (mock for MVP, pluggable for real providers) |
| Auth | NextAuth.js with credentials provider |

## Project Structure

```
tribal-scholar-ai/
├── docs/                    # Project documentation (you are here)
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma
│   └── seed.ts              # Demo/seed data
├── public/                  # Static assets (images, icons)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Login, Register pages
│   │   ├── applicant/       # Applicant portal pages
│   │   ├── admin/           # Admin portal pages
│   │   └── api/             # API routes
│   │       ├── auth/
│   │       ├── applicants/
│   │       ├── schemes/
│   │       ├── applications/
│   │       ├── documents/
│   │       ├── eligibility/
│   │       ├── deficiencies/
│   │       ├── notifications/
│   │       ├── selection/
│   │       ├── dashboard/
│   │       └── audit/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base UI components (buttons, inputs, cards)
│   │   ├── forms/           # Form components
│   │   ├── layout/          # Layout components (navbar, sidebar, footer)
│   │   ├── applicant/       # Applicant-specific components
│   │   └── admin/           # Admin-specific components
│   ├── lib/                 # Shared utilities
│   │   ├── db.ts            # Prisma client instance
│   │   ├── auth.ts          # Auth configuration
│   │   ├── validators.ts    # Input validation
│   │   └── utils.ts         # General utilities
│   ├── services/            # Business logic services
│   │   ├── ai/              # AI/OCR service (modular, pluggable)
│   │   ├── eligibility/     # Eligibility rules engine
│   │   ├── documents/       # Document processing
│   │   └── notifications/   # Notification service
│   └── types/               # TypeScript type definitions
├── uploads/                 # Uploaded documents (local dev only)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## How the Pieces Connect

```
┌─────────────────────────────────────────────┐
│                  FRONTEND                    │
│                                             │
│  Applicant Portal        Admin Portal       │
│  - Dashboard             - Dashboard        │
│  - Profile               - Applications     │
│  - Apply                 - Scrutiny         │
│  - Documents             - Selection        │
│  - Track Status          - Analytics        │
└──────────────────┬──────────────────────────┘
                   │ API Calls (fetch)
                   ▼
┌─────────────────────────────────────────────┐
│              NEXT.JS API ROUTES             │
│                                             │
│  Auth │ Applications │ Documents │ Schemes  │
│  Eligibility │ Deficiencies │ Selection     │
│  Dashboard │ Notifications │ Audit          │
└──────┬───────────────────┬──────────────────┘
       │                   │
       ▼                   ▼
┌──────────────┐   ┌──────────────────────────┐
│  PostgreSQL  │   │     AI/OCR Service       │
│  (via Prisma)│   │  (Mock → Real provider)  │
└──────────────┘   └──────────────────────────┘
```

## Roles

| Role | Access |
|---|---|
| Applicant | Own profile, applications, documents, notifications |
| Scrutiny Officer | Assigned applications, document review, deficiency creation |
| Selection Officer | Eligible applications, scoring, selection recommendation |
| Administrator | Full access, dashboards, analytics, audit logs, final decisions |

## Key Design Principles

1. **Configurable schemes** — Scheme rules, documents, and fields are stored in the database, not hard-coded
2. **AI assists, humans decide** — AI provides OCR, extraction, and confidence scores; humans make final decisions
3. **Deterministic rules first** — Objective eligibility checks use configurable rules, not AI
4. **Audit everything** — Every important action is logged with who, what, when
5. **Role-based access** — Every API route checks the user's role before proceeding
