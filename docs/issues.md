# GitHub Issues — Initial Sprint

> These are the initial tasks for the team. Copy each issue into GitHub Issues.
> Team Leader (SAM4496) will handle project setup (Phase 1) before assigning these.

---

## PRIORITY 1 — Foundation (Must be done first)

### Issue #1: Project Setup — Next.js, Tailwind, TypeScript, Folder Structure
**Assignee:** SAM4496 (Team Leader)
**Branch:** `development` (direct, since this is initial setup)
**Labels:** `setup`, `priority-high`

**Description:**
Initialize the Next.js project with TypeScript and Tailwind CSS. Create the folder structure as defined in `docs/architecture.md`.

**Goal:**
A running Next.js app with the correct folder structure that all teammates can clone and build upon.

**Acceptance Criteria:**
- [ ] Next.js app created with TypeScript
- [ ] Tailwind CSS configured
- [ ] Folder structure matches `docs/architecture.md`
- [ ] Landing page shows project name and "Hackathon Prototype" label
- [ ] App runs without errors (`npm run dev`)
- [ ] Basic layout component exists (header, footer)

**Testing:**
Run `npm run dev` and open http://localhost:3000 — page loads without errors.

---

### Issue #2: Database Schema — Prisma Setup and Models
**Assignee:** BhavyaKotecha12 (Backend)
**Branch:** `feature/backend`
**Labels:** `backend`, `database`, `priority-high`
**Depends on:** Issue #1 (project must exist first)

**Description:**
Set up Prisma ORM with PostgreSQL. Create all database models as defined in `docs/database.md`. Generate initial migration.

**Goal:**
A complete database schema that the entire team can use.

**Files/Components:**
- `prisma/schema.prisma` — All models, enums, relations
- `src/lib/db.ts` — Prisma client singleton

**Acceptance Criteria:**
- [ ] Prisma installed and configured
- [ ] All models from `docs/database.md` are defined
- [ ] Enums created (Role, ApplicationStatus, Gender, DocumentStatus, etc.)
- [ ] Foreign keys and relations are correct
- [ ] Indexes added on key fields
- [ ] `npx prisma generate` runs without errors
- [ ] `npx prisma migrate dev` creates tables successfully
- [ ] Prisma client singleton exists at `src/lib/db.ts`

**Testing:**
Run `npx prisma studio` — all tables should be visible and empty.

---

### Issue #3: Authentication — Register, Login, Session, Role-Based Access
**Assignee:** BhavyaKotecha12 (Backend)
**Branch:** `feature/backend`
**Labels:** `backend`, `auth`, `priority-high`
**Depends on:** Issue #2 (database must exist)

**Description:**
Implement authentication using NextAuth.js with credentials provider. Support registration, login, logout, and session management. Passwords must be hashed with bcrypt.

**Goal:**
Users can register, login, and the system knows their role.

**Files/Components:**
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth config
- `src/app/api/auth/register/route.ts` — Registration endpoint
- `src/lib/auth.ts` — Auth helper functions
- `src/middleware.ts` — Route protection middleware

**Acceptance Criteria:**
- [ ] Registration endpoint creates user with hashed password
- [ ] Login works with email/password
- [ ] Session contains user ID, email, name, role
- [ ] Middleware protects `/applicant/*` routes (require APPLICANT role)
- [ ] Middleware protects `/admin/*` routes (require SCRUTINY_OFFICER, SELECTION_OFFICER, or ADMIN role)
- [ ] Logout works
- [ ] Invalid credentials return proper error

**Testing:**
1. POST to `/api/auth/register` with test data — user is created
2. Login with credentials — session is returned
3. Access `/applicant/dashboard` without login — redirected to login
4. Access `/admin/dashboard` as APPLICANT — access denied

---

### Issue #4: Login and Register Pages
**Assignee:** Trisha923 (Applicant Frontend)
**Branch:** `feature/applicant`
**Labels:** `frontend`, `auth`, `priority-high`
**Depends on:** Issue #3 (auth API must exist)

**Description:**
Build login and register pages with forms, validation, error handling, and loading states. Style should match a government digital service — clean, professional, accessible.

**Goal:**
Users can register and login through the UI.

**Files/Components:**
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/components/forms/LoginForm.tsx`
- `src/components/forms/RegisterForm.tsx`

**Acceptance Criteria:**
- [ ] Login page with email/password fields
- [ ] Register page with name/email/password fields
- [ ] Form validation (required fields, email format, password length)
- [ ] Loading state while submitting
- [ ] Error messages displayed (wrong password, email taken, etc.)
- [ ] Success redirects to appropriate dashboard
- [ ] "Hackathon Prototype" disclaimer visible
- [ ] Responsive on mobile
- [ ] Link between login and register pages

**Testing:**
1. Open `/login` — form renders correctly
2. Submit empty form — validation errors shown
3. Register new user — redirected to dashboard
4. Login with wrong password — error shown
5. Login with correct credentials — redirected to dashboard

---

## PRIORITY 2 — Core Features (After foundation is ready)

### Issue #5: Seed Data — Demo Users and Scheme Configuration
**Assignee:** RiddhiNagar (Analytics + QA)
**Branch:** `feature/analytics`
**Labels:** `data`, `priority-high`
**Depends on:** Issue #2 (database must exist)

**Description:**
Create seed script with demo users (all 4 roles), NFST and NOS scheme configurations (eligibility rules, required documents, form fields) as defined in `docs/scheme-rulebook.md`.

**Goal:**
After running seed, the database has demo users and both schemes fully configured.

**Files/Components:**
- `prisma/seed.ts`
- Update `package.json` with seed command

**Acceptance Criteria:**
- [ ] 4 demo users created (applicant, scrutiny, selection, admin)
- [ ] 10-15 additional demo applicants with profiles
- [ ] NFST scheme with all eligibility rules from scheme-rulebook.md
- [ ] NFST scheme with all required documents
- [ ] NFST scheme with all form fields
- [ ] NOS scheme with all eligibility rules
- [ ] NOS scheme with all required documents
- [ ] NOS scheme with all form fields
- [ ] Selection criteria configured for both schemes
- [ ] `npx prisma db seed` runs without errors
- [ ] All demo data clearly labeled as prototype data

**Testing:**
Run `npx prisma db seed` then `npx prisma studio` — verify users, schemes, rules, documents exist.

---

### Issue #6: Applicant Profile Page
**Assignee:** Trisha923 (Applicant Frontend)
**Branch:** `feature/applicant`
**Labels:** `frontend`, `priority-medium`
**Depends on:** Issue #3 (auth), Issue #7 (profile API)

**Description:**
Build the applicant profile page where users can view and edit their personal details, ST information, academic details, and bank details.

**Goal:**
Applicant can fill and save their complete profile.

**Files/Components:**
- `src/app/applicant/profile/page.tsx`
- `src/components/forms/ProfileForm.tsx`
- Reusable form input components

**Acceptance Criteria:**
- [ ] Profile form with sections: Personal, Contact, ST/Tribal, Academic, Bank
- [ ] Pre-fills existing data
- [ ] Validation on required fields
- [ ] Save button with loading state
- [ ] Success/error feedback
- [ ] Shows profile completion indicator
- [ ] Responsive layout

**Testing:**
1. Navigate to `/applicant/profile`
2. Fill in all sections
3. Click save — data persists
4. Refresh page — data is still there

---

### Issue #7: Profile and Schemes API Routes
**Assignee:** BhavyaKotecha12 (Backend)
**Branch:** `feature/backend`
**Labels:** `backend`, `api`, `priority-medium`
**Depends on:** Issue #2, Issue #3

**Description:**
Create API routes for applicant profile CRUD and scheme listing/details as defined in `docs/api.md`.

**Goal:**
Frontend can fetch/update profiles and browse schemes.

**Files/Components:**
- `src/app/api/applicant/profile/route.ts`
- `src/app/api/schemes/route.ts`
- `src/app/api/schemes/[id]/route.ts`

**Acceptance Criteria:**
- [ ] GET `/api/applicant/profile` — returns current user's profile
- [ ] PUT `/api/applicant/profile` — updates profile with validation
- [ ] GET `/api/schemes` — lists active schemes
- [ ] GET `/api/schemes/[id]` — returns scheme with rules, documents, fields
- [ ] Auth checks on all routes
- [ ] Proper error responses
- [ ] Input validation

**Testing:**
Test with Postman or browser dev tools.

---

### Issue #8: Scheme Discovery Page
**Assignee:** Trisha923 (Applicant Frontend)
**Branch:** `feature/applicant`
**Labels:** `frontend`, `priority-medium`
**Depends on:** Issue #7 (schemes API)

**Description:**
Build the scheme browsing page where applicants can see available schemes (NFST, NOS), view eligibility criteria, required documents, and start an application.

**Goal:**
Applicant can browse schemes and understand requirements before applying.

**Files/Components:**
- `src/app/applicant/schemes/page.tsx`
- `src/components/applicant/SchemeCard.tsx`
- `src/app/applicant/schemes/[id]/page.tsx` (scheme detail)

**Acceptance Criteria:**
- [ ] Lists available schemes as cards
- [ ] Each card shows: name, description, deadline, status
- [ ] Clicking a scheme shows full details
- [ ] Detail page shows eligibility rules, required documents, form fields
- [ ] "Apply Now" button
- [ ] Responsive layout

**Testing:**
1. Navigate to `/applicant/schemes` — NFST and NOS cards visible
2. Click NFST — details page shows rules and documents
3. "Apply Now" button is visible

---

### Issue #9: Application API Routes (Create, Update, Submit)
**Assignee:** BhavyaKotecha12 (Backend)
**Branch:** `feature/backend`
**Labels:** `backend`, `api`, `priority-medium`
**Depends on:** Issue #2, Issue #3, Issue #5

**Description:**
Create API routes for application lifecycle: create draft, update fields, submit, list applications. Follow `docs/api.md` contracts.

**Files/Components:**
- `src/app/api/applications/route.ts`
- `src/app/api/applications/[id]/route.ts`
- `src/app/api/applications/[id]/submit/route.ts`
- `src/app/api/applications/[id]/status/route.ts`

**Acceptance Criteria:**
- [ ] POST `/api/applications` — creates draft application with auto-generated number
- [ ] GET `/api/applications` — lists user's applications (applicant) or all (admin)
- [ ] GET `/api/applications/[id]` — full application details
- [ ] PUT `/api/applications/[id]` — update form fields (only if DRAFT)
- [ ] POST `/api/applications/[id]/submit` — submit application
- [ ] PUT `/api/applications/[id]/status` — admin status change
- [ ] Status change creates ApplicationStatusHistory entry
- [ ] Auth and ownership checks

**Testing:**
Test full flow: create → update → submit via API.

---

### Issue #10: Application Form Page
**Assignee:** Trisha923 (Applicant Frontend)
**Branch:** `feature/applicant`
**Labels:** `frontend`, `priority-medium`
**Depends on:** Issue #7, Issue #9

**Description:**
Build the application form page that dynamically renders fields based on the selected scheme's configuration. Support sections, save draft, and document upload area.

**Files/Components:**
- `src/app/applicant/apply/[schemeId]/page.tsx`
- `src/components/forms/DynamicFormField.tsx`
- `src/components/forms/ApplicationForm.tsx`

**Acceptance Criteria:**
- [ ] Form fields rendered dynamically from scheme configuration
- [ ] Fields grouped by section
- [ ] Personal details pre-filled from profile
- [ ] Required field validation
- [ ] Save draft button
- [ ] Document upload section (integrates with Issue #11)
- [ ] Submit button (only when all required fields and documents are complete)
- [ ] Progress indicator showing form completion

**Testing:**
1. Start NFST application — research fields appear
2. Start NOS application — overseas/passport fields appear
3. Save draft — refresh — data persists

---

### Issue #11: Document Upload API and UI
**Assignee:** BhavyaKotecha12 (Backend) + Trisha923 (Frontend)
**Branch:** `feature/backend` (API) + `feature/applicant` (UI)
**Labels:** `backend`, `frontend`, `priority-medium`
**Depends on:** Issue #9

**Description:**
Backend: Create document upload API with file validation (type, size).
Frontend: Create document upload component with drag-and-drop, progress, and document list.

**Backend Files:**
- `src/app/api/applications/[id]/documents/route.ts`
- `src/app/api/documents/[id]/route.ts`

**Frontend Files:**
- `src/components/forms/DocumentUpload.tsx`
- `src/components/applicant/DocumentList.tsx`

**Acceptance Criteria:**
- [ ] Upload accepts only allowed file types (pdf, jpg, png)
- [ ] File size validation (per document type config)
- [ ] Files stored in `/uploads` directory
- [ ] Document record created in database
- [ ] Upload progress shown in UI
- [ ] Document list shows: name, type, status, date
- [ ] Delete document (only if DRAFT)
- [ ] Shows which required documents are missing

---

### Issue #12: Mock AI/OCR Service
**Assignee:** Riyapatel1707 (AI/OCR)
**Branch:** `feature/ai`
**Labels:** `ai`, `priority-medium`
**Depends on:** Issue #2 (database), Issue #11 (documents)

**Description:**
Create the modular AI service with a MockAIProvider that returns realistic OCR and verification results. Follow the data structures in `docs/ai-contract.md`.

**Goal:**
When a document is uploaded, the mock AI service can "process" it and return realistic extracted fields and confidence scores.

**Files/Components:**
- `src/services/ai/types.ts` — AI service interfaces
- `src/services/ai/ai-service.ts` — Main service interface
- `src/services/ai/providers/mock-provider.ts` — Mock implementation
- `src/app/api/documents/[id]/verify/route.ts` — Trigger verification API

**Acceptance Criteria:**
- [ ] AIService interface defined (OCR, verify, classify)
- [ ] MockAIProvider implements the interface
- [ ] Returns realistic extracted fields per document type (ST cert, income cert, etc.)
- [ ] Confidence scores between 0.85-0.98
- [ ] Simulates processing delay (1-2 seconds)
- [ ] Stores results in OCRResult and DocumentVerification tables
- [ ] Can be configured to return failures for demo scenarios
- [ ] Architecture allows swapping mock for real provider

**Testing:**
1. Upload a document
2. Call verify API
3. Check OCRResult in database — realistic data exists
4. Check DocumentVerification — PASS with confidence score

---

### Issue #13: Eligibility Engine
**Assignee:** Riyapatel1707 (AI/OCR)
**Branch:** `feature/ai`
**Labels:** `ai`, `eligibility`, `priority-medium`
**Depends on:** Issue #2, Issue #5 (seed data with rules)

**Description:**
Create the configurable eligibility engine that reads rules from the database and evaluates them against an application. Each rule returns PASS, FAIL, or NEEDS_REVIEW.

**Files/Components:**
- `src/services/eligibility/eligibility-engine.ts`
- `src/services/eligibility/rule-evaluators.ts` — Evaluator per rule type
- `src/app/api/applications/[id]/check-eligibility/route.ts`

**Acceptance Criteria:**
- [ ] Engine reads rules from EligibilityRule table for the application's scheme
- [ ] Evaluators exist for each rule type: AGE, INCOME, EDUCATION, CATEGORY, DOCUMENT, CUSTOM
- [ ] Each rule returns PASS / FAIL / NEEDS_REVIEW with details
- [ ] Overall result is PASS only if all mandatory rules pass
- [ ] Results stored in EligibilityResult table
- [ ] New rule types can be added without changing engine core
- [ ] API endpoint triggers evaluation and returns results

**Testing:**
1. Create application for eligible applicant → all rules PASS
2. Create application with income too high → INCOME rule FAILS
3. Results visible in database

---

### Issue #14: Applicant Dashboard
**Assignee:** Trisha923 (Applicant Frontend)
**Branch:** `feature/applicant`
**Labels:** `frontend`, `priority-medium`
**Depends on:** Issue #9 (applications API)

**Description:**
Build the main applicant dashboard showing applications, status, notifications, and required actions.

**Files/Components:**
- `src/app/applicant/dashboard/page.tsx`
- `src/components/applicant/ApplicationStatusCard.tsx`
- `src/components/applicant/ApplicationTimeline.tsx`
- `src/components/applicant/NotificationList.tsx`

**Acceptance Criteria:**
- [ ] Shows list of user's applications
- [ ] Each application shows: number, scheme, status, stage, date
- [ ] Status shown with color-coded badge
- [ ] Timeline component showing application journey
- [ ] Notifications section
- [ ] "Action Required" highlighted if deficiency exists
- [ ] Empty state if no applications
- [ ] "Start New Application" button
- [ ] Responsive layout

---

### Issue #15: Admin Dashboard
**Assignee:** bhoomii2012 (Admin Panel)
**Branch:** `feature/admin`
**Labels:** `frontend`, `admin`, `priority-medium`
**Depends on:** Issue #3 (auth), Issue #9 (applications API)

**Description:**
Build the admin dashboard with statistics, application counts by status, and recent applications list.

**Files/Components:**
- `src/app/admin/dashboard/page.tsx`
- `src/components/admin/StatsCards.tsx`
- `src/components/admin/RecentApplications.tsx`
- `src/app/api/dashboard/stats/route.ts`

**Acceptance Criteria:**
- [ ] Stats cards: total, submitted, under verification, eligible, deficient, selected, rejected
- [ ] Recent applications table
- [ ] Filter by scheme
- [ ] Only accessible to admin roles
- [ ] Responsive layout

---

### Issue #16: Admin Application Review Page
**Assignee:** bhoomii2012 (Admin Panel)
**Branch:** `feature/admin`
**Labels:** `frontend`, `admin`, `priority-medium`
**Depends on:** Issue #9, Issue #12, Issue #13

**Description:**
Build the detailed application review page where admins can see applicant details, documents, AI verification results, eligibility results, and take actions.

**Files/Components:**
- `src/app/admin/applications/page.tsx`
- `src/app/admin/applications/[id]/page.tsx`
- `src/components/admin/ApplicationDetail.tsx`
- `src/components/admin/DocumentReview.tsx`
- `src/components/admin/EligibilityResults.tsx`
- `src/components/admin/VerificationResults.tsx`

**Acceptance Criteria:**
- [ ] Application list with filters (scheme, status, date)
- [ ] Detail page shows all applicant information
- [ ] Document list with verification status and confidence scores
- [ ] OCR extracted fields displayed
- [ ] AI verification checks shown (PASS/FAIL per field)
- [ ] Eligibility rule results shown
- [ ] Action buttons: Approve, Reject, Create Deficiency, Move to Screening
- [ ] Status change with confirmation dialog

---

## PRIORITY 3 — Advanced Features

### Issue #17: Deficiency Management API and UI
**Assignee:** bhoomii2012 (Admin) + BhavyaKotecha12 (Backend)
**Branch:** `feature/admin` + `feature/backend`
**Labels:** `admin`, `backend`, `priority-medium`

### Issue #18: Deficiency Response (Applicant Side)
**Assignee:** Trisha923 (Applicant Frontend)
**Branch:** `feature/applicant`
**Labels:** `frontend`, `priority-medium`

### Issue #19: Selection Scoring and Merit List
**Assignee:** bhoomii2012 (Admin Panel)
**Branch:** `feature/admin`
**Labels:** `admin`, `priority-medium`

### Issue #20: Notifications System
**Assignee:** BhavyaKotecha12 (Backend) + Trisha923 (Frontend)
**Branch:** `feature/backend` + `feature/applicant`
**Labels:** `backend`, `frontend`, `priority-medium`

### Issue #21: Analytics Dashboard with Charts
**Assignee:** RiddhiNagar (Analytics)
**Branch:** `feature/analytics`
**Labels:** `analytics`, `priority-medium`

### Issue #22: Audit Log System
**Assignee:** BhavyaKotecha12 (Backend) + RiddhiNagar (Analytics)
**Branch:** `feature/backend` + `feature/analytics`
**Labels:** `backend`, `analytics`, `priority-low`

### Issue #23: Comprehensive Demo Data
**Assignee:** RiddhiNagar (Analytics + QA)
**Branch:** `feature/analytics`
**Labels:** `data`, `priority-low`

### Issue #24: End-to-End Demo Testing
**Assignee:** RiddhiNagar (Analytics + QA)
**Labels:** `testing`, `priority-low`

---

## Dependency Graph

```
Issue #1 (Project Setup) — SAM4496
    │
    ├── Issue #2 (Database) — BhavyaKotecha12
    │       │
    │       ├── Issue #3 (Auth) — BhavyaKotecha12
    │       │       │
    │       │       ├── Issue #4 (Login/Register UI) — Trisha923
    │       │       ├── Issue #7 (Profile + Schemes API) — BhavyaKotecha12
    │       │       │       │
    │       │       │       ├── Issue #6 (Profile Page) — Trisha923
    │       │       │       ├── Issue #8 (Scheme Discovery) — Trisha923
    │       │       │       └── Issue #9 (Application API) — BhavyaKotecha12
    │       │       │               │
    │       │       │               ├── Issue #10 (Application Form) — Trisha923
    │       │       │               ├── Issue #11 (Document Upload) — BhavyaKotecha12 + Trisha923
    │       │       │               ├── Issue #14 (Applicant Dashboard) — Trisha923
    │       │       │               ├── Issue #15 (Admin Dashboard) — bhoomii2012
    │       │       │               └── Issue #16 (Admin Review) — bhoomii2012
    │       │       │
    │       │       └── Issue #15 (Admin Dashboard) — bhoomii2012
    │       │
    │       ├── Issue #5 (Seed Data) — RiddhiNagar
    │       ├── Issue #12 (Mock AI/OCR) — Riyapatel1707
    │       └── Issue #13 (Eligibility Engine) — Riyapatel1707
    │
    └── Priority 3 issues depend on Priority 2 completion
```
