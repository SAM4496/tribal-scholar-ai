# Team Project Status

> Updated by Team Leader (SAM4496). Last updated: 2026-09-17

## Team Roster

| Role | Name | GitHub | Branch |
|---|---|---|---|
| 🏆 Team Leader | Samarth | SAM4496 | `development` |
| 🖥️ Applicant Frontend | Trisha | Trisha923 | `feature/applicant` |
| ⚙️ Backend + Database | Bhavya | BhavyaKotecha12 | `feature/backend` |
| 🤖 AI/OCR + Eligibility | Riya | Riyapatel1707 | `feature/ai` |
| 🛡️ Admin Panel | Bhoomi | bhoomii2012 | `feature/admin` |
| 📊 Analytics + QA | Riddhi | RiddhiNagar | `feature/analytics` |

## Current Sprint — Foundation

| # | Task | Owner | Branch | Status | PR | Tested |
|---|---|---|---|---|---|---|
| 1 | Project Setup | SAM4496 | development | Not Started | — | — |
| 2 | Database Schema | BhavyaKotecha12 | feature/backend | Not Started | No | No |
| 3 | Authentication | BhavyaKotecha12 | feature/backend | Not Started | No | No |
| 4 | Login/Register Pages | Trisha923 | feature/applicant | Not Started | No | No |
| 5 | Seed Data | RiddhiNagar | feature/analytics | Not Started | No | No |

## Upcoming Tasks

| # | Task | Owner | Branch | Blocked By |
|---|---|---|---|---|
| 6 | Applicant Profile Page | Trisha923 | feature/applicant | #3, #7 |
| 7 | Profile + Schemes API | BhavyaKotecha12 | feature/backend | #2, #3 |
| 8 | Scheme Discovery Page | Trisha923 | feature/applicant | #7 |
| 9 | Application API | BhavyaKotecha12 | feature/backend | #2, #3, #5 |
| 10 | Application Form | Trisha923 | feature/applicant | #7, #9 |
| 11 | Document Upload | BhavyaKotecha12 + Trisha923 | backend + applicant | #9 |
| 12 | Mock AI/OCR | Riyapatel1707 | feature/ai | #2, #11 |
| 13 | Eligibility Engine | Riyapatel1707 | feature/ai | #2, #5 |
| 14 | Applicant Dashboard | Trisha923 | feature/applicant | #9 |
| 15 | Admin Dashboard | bhoomii2012 | feature/admin | #3, #9 |
| 16 | Admin Review Page | bhoomii2012 | feature/admin | #9, #12, #13 |

## Admin Panel Progress — bhoomii2012 (`feature/admin`)

> Built against mock data pending backend APIs (see `docs/api.md` for target contracts).
> All items below pass `tsc --noEmit`, targeted ESLint, and `next build`.

| # | Task | Status | Commit | Notes |
|---|---|---|---|---|
| 15 | Admin Dashboard | ✅ Done | `98100c5` | Stats cards, recent applications, status distribution chart (pure CSS/SVG, no chart lib) |
| 16 | Admin Application Review | ✅ Done | `55630d2` | Application list + filters, detail view, document/AI verification, eligibility results, status-change dialog |
| 17 | Deficiency Management (admin UI) | ✅ Done | `7e909a8` | Create deficiency, list/filter, review panel with resolve/reject. *Backend API + applicant response (#18) still pending* |
| 19 | Selection Scoring & Merit List | ✅ Done | `8db5793` | Scheme-wise criteria scoring, auto totals, ranked merit list, bulk select/reject |

Pushed to `origin/feature/admin` (latest `8db5793`).

## Integration Milestones

- [ ] **Milestone 1:** Auth works end-to-end (register → login → see dashboard)
- [ ] **Milestone 2:** Applicant can create and submit an application
- [ ] **Milestone 3:** Documents uploaded and AI-verified
- [ ] **Milestone 4:** Admin can see and review applications *(admin UI done with mock data; awaiting APIs #9/#12/#13)*
- [ ] **Milestone 5:** Deficiency → Response → Resolution flow works *(admin UI done; awaiting applicant response #18 + API)*
- [ ] **Milestone 6:** Selection scoring and approval works *(admin UI done with mock data; awaiting API)*
- [ ] **Milestone 7:** Full demo scenario runs end-to-end

## Blockers

| Blocker | Reported By | Status |
|---|---|---|
| (none yet) | — | — |
