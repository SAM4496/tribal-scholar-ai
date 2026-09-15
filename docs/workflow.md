# Application Workflow

> ⚠️ **HACKATHON PROTOTYPE** — Workflow for demonstration purposes.

## Application Lifecycle

```
    ┌──────────┐
    │  DRAFT   │  Applicant creates application, fills form, uploads documents
    └────┬─────┘
         │ Applicant clicks "Submit"
         ▼
    ┌──────────┐
    │SUBMITTED │  Application enters the queue
    └────┬─────┘
         │ System auto-triggers
         ▼
┌────────────────────┐
│UNDER_DOCUMENT_     │  AI/OCR processes documents
│VERIFICATION        │  Extracts fields, checks quality, confidence scores
└────────┬───────────┘
         │ All documents processed
         ▼
┌────────────────────┐
│UNDER_ELIGIBILITY_  │  Eligibility engine runs configurable rules
│CHECK               │  Each rule returns PASS / FAIL / NEEDS_REVIEW
└────┬──────────┬────┘
     │          │
     │ All PASS │ Any FAIL or NEEDS_REVIEW
     │          │
     ▼          ▼
┌──────────┐  ┌───────────┐
│ ELIGIBLE │  │INELIGIBLE │ ──→ Applicant notified with reasons
└────┬─────┘  └───────────┘
     │
     │ Assigned to Scrutiny Officer
     ▼
┌──────────────┐
│UNDER_SCRUTINY│  Officer reviews documents, AI results, eligibility
└────┬────┬────┘
     │    │
     │    │ Issue found
     │    ▼
     │  ┌──────────┐
     │  │DEFICIENT │  Officer creates deficiency
     │  └────┬─────┘
     │       │ Applicant notified
     │       │ Applicant responds/uploads corrected document
     │       │ Officer reviews response
     │       │
     │       ├──→ Resolved → back to UNDER_SCRUTINY
     │       └──→ Rejected → stays DEFICIENT / becomes INELIGIBLE
     │
     │ Scrutiny complete, all OK
     ▼
┌──────────────────┐
│SCRUTINY_COMPLETE │
└────────┬─────────┘
         │ Moves to selection pool
         ▼
┌─────────────────┐
│UNDER_SCREENING  │  Selection Officer reviews eligible applications
└────────┬────────┘
         │ Scoring criteria applied (transparent)
         ▼
┌──────────┐
│ SELECTED │  Selection Officer recommends
└────┬─────┘
     │ Admin final review
     ▼
┌──────────┐     ┌──────────┐
│ APPROVED │     │ REJECTED │
└──────────┘     └──────────┘
     │                │
     ▼                ▼
Applicant notified   Applicant notified
with approval        with reason
```

## Status Descriptions

| Status | Description | Who acts next? |
|---|---|---|
| DRAFT | Application started, not yet submitted | Applicant |
| SUBMITTED | Application submitted, awaiting processing | System (auto) |
| UNDER_DOCUMENT_VERIFICATION | AI/OCR processing documents | System (auto) |
| UNDER_ELIGIBILITY_CHECK | Eligibility rules being evaluated | System (auto) |
| ELIGIBLE | All eligibility rules passed | Scrutiny Officer |
| INELIGIBLE | One or more mandatory rules failed | Applicant (view reasons) |
| DEFICIENT | Missing/incorrect information flagged | Applicant (respond) |
| UNDER_SCRUTINY | Scrutiny Officer reviewing | Scrutiny Officer |
| SCRUTINY_COMPLETE | Scrutiny passed | Selection Officer |
| UNDER_SCREENING | In selection pool, being scored | Selection Officer |
| SELECTED | Recommended for selection | Admin |
| REJECTED | Not selected | — |
| APPROVED | Final approval by Admin | — |
| WITHDRAWN | Withdrawn by applicant | — |

## Allowed Status Transitions

| From | To | Who |
|---|---|---|
| DRAFT | SUBMITTED | Applicant |
| DRAFT | WITHDRAWN | Applicant |
| SUBMITTED | UNDER_DOCUMENT_VERIFICATION | System |
| UNDER_DOCUMENT_VERIFICATION | UNDER_ELIGIBILITY_CHECK | System |
| UNDER_ELIGIBILITY_CHECK | ELIGIBLE | System |
| UNDER_ELIGIBILITY_CHECK | INELIGIBLE | System |
| ELIGIBLE | UNDER_SCRUTINY | Scrutiny Officer |
| UNDER_SCRUTINY | DEFICIENT | Scrutiny Officer |
| UNDER_SCRUTINY | SCRUTINY_COMPLETE | Scrutiny Officer |
| DEFICIENT | UNDER_SCRUTINY | System (after response) |
| SCRUTINY_COMPLETE | UNDER_SCREENING | Selection Officer |
| UNDER_SCREENING | SELECTED | Selection Officer |
| UNDER_SCREENING | REJECTED | Selection Officer |
| SELECTED | APPROVED | Admin |
| SELECTED | REJECTED | Admin |

## Notifications Triggered

| Event | Notification To |
|---|---|
| Application submitted | Applicant (confirmation) |
| Document verification complete | Applicant |
| Eligibility result | Applicant |
| Deficiency created | Applicant |
| Deficiency resolved | Applicant |
| Application selected | Applicant |
| Application approved | Applicant |
| Application rejected | Applicant (with reason) |

## Role Permissions per Stage

| Stage | Applicant | Scrutiny Officer | Selection Officer | Admin |
|---|---|---|---|---|
| DRAFT | Edit, Submit | — | — | View |
| SUBMITTED | View | View | — | View |
| UNDER_VERIFICATION | View | View | — | View |
| ELIGIBLE | View | Scrutinize | — | View |
| DEFICIENT | Respond | Review response | — | View |
| UNDER_SCRUTINY | View | Review, Approve | — | View |
| UNDER_SCREENING | View | View | Score, Select | View |
| SELECTED | View | View | View | Approve/Reject |
| APPROVED | View | View | View | View |
