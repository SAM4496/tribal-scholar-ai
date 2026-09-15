# Database Schema

> ⚠️ **HACKATHON PROTOTYPE** — Demo data only. Not production schema.

## Entity Relationship Overview

```
User ──────────── ApplicantProfile
 │                     │
 │                     ├── Application ──── ApplicationField
 │                     │       │
 │                     │       ├── Document ──── DocumentVerification
 │                     │       │                      │
 │                     │       │                  OCRResult
 │                     │       │
 │                     │       ├── EligibilityResult
 │                     │       ├── Deficiency
 │                     │       ├── SelectionScore
 │                     │       └── ApplicationStatusHistory
 │                     │
 │                     └── Notification
 │
 └── AuditLog

Scheme ──── SchemeVersion
              ├── EligibilityRule
              ├── RequiredDocument
              └── SchemeField
```

## Core Entities

### User
Stores login credentials and role information.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| email | String | Unique, login identifier |
| passwordHash | String | Bcrypt hashed password |
| name | String | Display name |
| role | Enum | APPLICANT, SCRUTINY_OFFICER, SELECTION_OFFICER, ADMIN |
| isActive | Boolean | Account status |
| createdAt | DateTime | Auto-set |
| updatedAt | DateTime | Auto-updated |

### ApplicantProfile
Extended profile for applicants (1:1 with User where role = APPLICANT).

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| userId | UUID | FK → User |
| dateOfBirth | DateTime | |
| gender | Enum | MALE, FEMALE, OTHER |
| phone | String | |
| aadhaarLast4 | String | Last 4 digits only (security) |
| category | String | Scheduled Tribe |
| tribe | String | Specific tribe name |
| fatherName | String | |
| motherName | String | |
| address | String | |
| district | String | |
| state | String | |
| pincode | String | |
| stCertificateNumber | String | |
| annualFamilyIncome | Decimal | |
| bankAccountNumber | String | |
| bankName | String | |
| ifscCode | String | |
| currentEducationLevel | String | |
| institution | String | |
| course | String | |
| profileComplete | Boolean | Default false |

### Scheme
Configurable scholarship/fellowship scheme.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| code | String | Unique code (NFST, NOS) |
| name | String | Full scheme name |
| description | Text | Scheme description |
| isActive | Boolean | Whether accepting applications |
| applicationStartDate | DateTime | Window opens |
| applicationEndDate | DateTime | Window closes |
| createdAt | DateTime | |

### SchemeVersion
Versioned configuration for a scheme (allows rule changes over time).

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| schemeId | UUID | FK → Scheme |
| version | Int | Version number |
| isActive | Boolean | Current active version |
| createdAt | DateTime | |

### EligibilityRule
Configurable rules attached to a scheme version.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| schemeVersionId | UUID | FK → SchemeVersion |
| ruleCode | String | Machine-readable code |
| ruleName | String | Human-readable name |
| ruleDescription | String | What this rule checks |
| ruleType | Enum | AGE, INCOME, EDUCATION, CATEGORY, DOCUMENT, CUSTOM |
| ruleConfig | JSON | Configurable parameters (thresholds, values) |
| isMandatory | Boolean | Must pass to be eligible |
| orderIndex | Int | Evaluation order |

### RequiredDocument
Documents required for a scheme version.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| schemeVersionId | UUID | FK → SchemeVersion |
| documentType | String | ST_CERTIFICATE, INCOME_CERT, etc. |
| documentName | String | Display name |
| description | String | What to upload |
| isMandatory | Boolean | Required or optional |
| maxSizeMB | Int | Max file size |
| allowedFormats | String[] | ["pdf", "jpg", "png"] |
| orderIndex | Int | Display order |

### SchemeField
Custom fields for a scheme's application form.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| schemeVersionId | UUID | FK → SchemeVersion |
| fieldCode | String | Machine-readable code |
| fieldLabel | String | Display label |
| fieldType | Enum | TEXT, NUMBER, DATE, SELECT, FILE |
| isRequired | Boolean | |
| options | JSON | For SELECT type fields |
| validationRules | JSON | Min, max, pattern, etc. |
| section | String | Form section grouping |
| orderIndex | Int | Display order |

### Application
An applicant's application to a specific scheme.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| applicationNumber | String | Unique, human-readable (e.g., NFST-2026-00001) |
| applicantId | UUID | FK → ApplicantProfile |
| schemeId | UUID | FK → Scheme |
| schemeVersionId | UUID | FK → SchemeVersion |
| status | Enum | DRAFT, SUBMITTED, UNDER_VERIFICATION, etc. |
| currentStage | String | Current workflow stage |
| submittedAt | DateTime | When submitted |
| lastUpdatedBy | UUID | FK → User |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Application Status Enum:**
`DRAFT`, `SUBMITTED`, `UNDER_DOCUMENT_VERIFICATION`, `UNDER_ELIGIBILITY_CHECK`, `ELIGIBLE`, `INELIGIBLE`, `DEFICIENT`, `UNDER_SCRUTINY`, `SCRUTINY_COMPLETE`, `UNDER_SCREENING`, `SELECTED`, `REJECTED`, `APPROVED`, `WITHDRAWN`

### ApplicationField
Stores applicant's answers to scheme-specific form fields.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| applicationId | UUID | FK → Application |
| schemeFieldId | UUID | FK → SchemeField |
| fieldValue | String | The applicant's answer |

### Document
Uploaded document for an application.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| applicationId | UUID | FK → Application |
| documentType | String | ST_CERTIFICATE, INCOME_CERT, etc. |
| fileName | String | Original file name |
| filePath | String | Storage path |
| fileSize | Int | Size in bytes |
| mimeType | String | file MIME type |
| status | Enum | UPLOADED, PROCESSING, VERIFIED, FAILED, NEEDS_REVIEW, REJECTED |
| uploadedAt | DateTime | |
| uploadedBy | UUID | FK → User |

### DocumentVerification
AI/manual verification result for a document.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| documentId | UUID | FK → Document |
| verificationType | Enum | AI, MANUAL |
| verificationStatus | Enum | PASS, FAIL, NEEDS_REVIEW |
| confidenceScore | Decimal | 0.0 to 1.0 |
| verificationDetails | JSON | Detailed results per check |
| verifiedBy | UUID | FK → User (null if AI) |
| verifiedAt | DateTime | |
| remarks | String | Human reviewer remarks |

### OCRResult
OCR extraction results for a document.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| documentId | UUID | FK → Document |
| ocrStatus | Enum | PENDING, PROCESSING, SUCCESS, FAILED |
| rawText | Text | Full extracted text |
| extractedFields | JSON | Structured key-value pairs |
| confidence | Decimal | Overall OCR confidence |
| processedAt | DateTime | |

### EligibilityResult
Result of running eligibility rules for an application.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| applicationId | UUID | FK → Application |
| ruleId | UUID | FK → EligibilityRule |
| result | Enum | PASS, FAIL, NEEDS_REVIEW |
| details | String | Explanation |
| evaluatedAt | DateTime | |

### Deficiency
A deficiency flagged by an admin/officer.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| applicationId | UUID | FK → Application |
| documentId | UUID | FK → Document (optional) |
| description | String | What is deficient |
| status | Enum | OPEN, RESPONDED, RESOLVED, REJECTED |
| createdBy | UUID | FK → User |
| createdAt | DateTime | |
| responseText | String | Applicant's response |
| responseDocumentId | UUID | FK → Document (optional) |
| respondedAt | DateTime | |
| resolvedBy | UUID | FK → User |
| resolvedAt | DateTime | |

### Notification
Notifications sent to users.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| userId | UUID | FK → User |
| applicationId | UUID | FK → Application (optional) |
| title | String | Notification title |
| message | Text | Notification body |
| type | Enum | STATUS_UPDATE, DEFICIENCY, APPROVAL, GENERAL |
| isRead | Boolean | Default false |
| createdAt | DateTime | |

### ApplicationStatusHistory
Tracks every status change for audit/timeline.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| applicationId | UUID | FK → Application |
| fromStatus | String | Previous status |
| toStatus | String | New status |
| changedBy | UUID | FK → User |
| remarks | String | Optional note |
| changedAt | DateTime | |

### SelectionScore
Transparent scoring for selection.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| applicationId | UUID | FK → Application |
| criteriaName | String | What is being scored |
| score | Decimal | Score value |
| maxScore | Decimal | Maximum possible |
| remarks | String | Why this score |
| scoredBy | UUID | FK → User |
| scoredAt | DateTime | |

### AuditLog
Immutable log of all important actions.

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| userId | UUID | FK → User |
| action | String | What happened |
| entity | String | Which table/entity |
| entityId | String | ID of affected record |
| previousValue | JSON | Before (optional) |
| newValue | JSON | After (optional) |
| ipAddress | String | |
| timestamp | DateTime | Auto-set |

## Indexes

Priority indexes for performance:
- `User.email` (unique)
- `Application.applicationNumber` (unique)
- `Application.applicantId`
- `Application.schemeId`
- `Application.status`
- `Document.applicationId`
- `Notification.userId`
- `AuditLog.userId`
- `AuditLog.entity + entityId`
