# API Contract

> ⚠️ **HACKATHON PROTOTYPE** — API contracts for team coordination.

## General Rules

- All API routes are under `/api/`
- All responses return JSON
- Authentication via session cookie (NextAuth.js)
- Timestamps in ISO 8601 format
- UUIDs for all IDs

### Standard Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message"
  }
}
```

### Standard List Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

## Authentication

### POST /api/auth/register
Register a new applicant account.

**Request:**
```json
{
  "email": "student@example.com",
  "password": "securePassword123",
  "name": "Rahul Kumar"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "student@example.com",
    "name": "Rahul Kumar",
    "role": "APPLICANT"
  }
}
```

### POST /api/auth/login
Login (handled by NextAuth.js credentials provider).

### GET /api/auth/session
Get current user session.

### POST /api/auth/logout
Logout (handled by NextAuth.js).

---

## Applicant Profile

### GET /api/applicant/profile
Get current applicant's profile.

**Auth:** APPLICANT

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "name": "Rahul Kumar",
    "dateOfBirth": "2000-05-15",
    "gender": "MALE",
    "phone": "9876543210",
    "category": "ST",
    "tribe": "Gond",
    "state": "Madhya Pradesh",
    "district": "Mandla",
    "pincode": "481661",
    "profileComplete": false,
    "...": "other fields"
  }
}
```

### PUT /api/applicant/profile
Update applicant profile.

**Auth:** APPLICANT

**Request:**
```json
{
  "dateOfBirth": "2000-05-15",
  "gender": "MALE",
  "phone": "9876543210",
  "tribe": "Gond",
  "state": "Madhya Pradesh",
  "...": "other fields"
}
```

---

## Schemes

### GET /api/schemes
List all active schemes.

**Auth:** Any authenticated user

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "code": "NFST",
      "name": "National Fellowship for Scheduled Tribes",
      "description": "Fellowship for ST students pursuing M.Phil/Ph.D...",
      "isActive": true,
      "applicationStartDate": "2026-01-01",
      "applicationEndDate": "2026-12-31"
    },
    {
      "id": "uuid",
      "code": "NOS",
      "name": "National Overseas Scholarship",
      "description": "Scholarship for ST students studying abroad...",
      "isActive": true,
      "applicationStartDate": "2026-01-01",
      "applicationEndDate": "2026-12-31"
    }
  ]
}
```

### GET /api/schemes/[id]
Get scheme details including eligibility rules, required documents, and form fields.

**Auth:** Any authenticated user

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "code": "NFST",
    "name": "National Fellowship for Scheduled Tribes",
    "description": "...",
    "eligibilityRules": [
      {
        "id": "uuid",
        "ruleCode": "ST_CATEGORY",
        "ruleName": "Must belong to Scheduled Tribe",
        "ruleDescription": "Applicant must be from a recognized Scheduled Tribe",
        "ruleType": "CATEGORY",
        "isMandatory": true
      }
    ],
    "requiredDocuments": [
      {
        "id": "uuid",
        "documentType": "ST_CERTIFICATE",
        "documentName": "ST/Caste Certificate",
        "isMandatory": true,
        "maxSizeMB": 5,
        "allowedFormats": ["pdf", "jpg", "png"]
      }
    ],
    "schemeFields": [
      {
        "id": "uuid",
        "fieldCode": "research_topic",
        "fieldLabel": "Research Topic",
        "fieldType": "TEXT",
        "isRequired": true,
        "section": "Research Details"
      }
    ]
  }
}
```

---

## Applications

### POST /api/applications
Create a new application (draft).

**Auth:** APPLICANT

**Request:**
```json
{
  "schemeId": "uuid"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "applicationNumber": "NFST-2026-00001",
    "status": "DRAFT",
    "currentStage": "Application Form",
    "schemeId": "uuid",
    "createdAt": "2026-09-15T10:00:00Z"
  }
}
```

### GET /api/applications
List applications (filtered by role).

**Auth:** Any authenticated user

**Query Params:** `?status=SUBMITTED&schemeId=uuid&page=1&pageSize=20`

### GET /api/applications/[id]
Get full application details.

**Auth:** Owner (APPLICANT) or SCRUTINY_OFFICER / SELECTION_OFFICER / ADMIN

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "applicationNumber": "NFST-2026-00001",
    "status": "SUBMITTED",
    "currentStage": "Document Verification",
    "applicant": { "...": "profile data" },
    "scheme": { "...": "scheme data" },
    "fields": [ { "fieldCode": "research_topic", "fieldValue": "..." } ],
    "documents": [ { "...": "document data" } ],
    "eligibilityResults": [ { "...": "rule results" } ],
    "deficiencies": [ { "...": "deficiency data" } ],
    "statusHistory": [ { "...": "timeline data" } ],
    "selectionScores": [ { "...": "score data" } ]
  }
}
```

### PUT /api/applications/[id]
Update application fields (only when status = DRAFT).

**Auth:** APPLICANT (owner)

**Request:**
```json
{
  "fields": [
    { "schemeFieldId": "uuid", "fieldValue": "Machine Learning in Healthcare" }
  ]
}
```

### POST /api/applications/[id]/submit
Submit the application.

**Auth:** APPLICANT (owner)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "SUBMITTED",
    "submittedAt": "2026-09-15T12:00:00Z"
  }
}
```

### PUT /api/applications/[id]/status
Update application status (admin action).

**Auth:** SCRUTINY_OFFICER, SELECTION_OFFICER, ADMIN

**Request:**
```json
{
  "status": "UNDER_SCRUTINY",
  "remarks": "All documents verified successfully"
}
```

---

## Documents

### POST /api/applications/[id]/documents
Upload a document.

**Auth:** APPLICANT (owner)

**Request:** multipart/form-data
- `file`: The file
- `documentType`: "ST_CERTIFICATE"

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "documentType": "ST_CERTIFICATE",
    "fileName": "st_certificate.pdf",
    "status": "UPLOADED",
    "uploadedAt": "2026-09-15T10:30:00Z"
  }
}
```

### GET /api/applications/[id]/documents
List documents for an application.

### GET /api/documents/[id]
Get document details including verification and OCR results.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "documentType": "ST_CERTIFICATE",
    "fileName": "st_certificate.pdf",
    "status": "VERIFIED",
    "verification": {
      "verificationType": "AI",
      "verificationStatus": "PASS",
      "confidenceScore": 0.94,
      "verificationDetails": {
        "nameMatch": { "status": "PASS", "extracted": "Rahul Kumar", "expected": "Rahul Kumar" },
        "certificateNumber": { "status": "PASS", "value": "ST/MP/2024/12345" },
        "documentQuality": { "status": "PASS", "score": 0.96 }
      }
    },
    "ocrResult": {
      "ocrStatus": "SUCCESS",
      "extractedFields": {
        "candidateName": "Rahul Kumar",
        "certificateNumber": "ST/MP/2024/12345",
        "tribe": "Gond",
        "issuingAuthority": "District Magistrate, Mandla",
        "issueDate": "2024-03-15"
      },
      "confidence": 0.94
    }
  }
}
```

### POST /api/documents/[id]/verify
Trigger AI verification for a document.

**Auth:** SCRUTINY_OFFICER, ADMIN

### POST /api/documents/[id]/manual-verify
Submit manual verification result.

**Auth:** SCRUTINY_OFFICER, ADMIN

**Request:**
```json
{
  "verificationStatus": "PASS",
  "remarks": "Document verified manually"
}
```

---

## Eligibility

### POST /api/applications/[id]/check-eligibility
Run eligibility rules for an application.

**Auth:** APPLICANT (owner — at submission), SCRUTINY_OFFICER, ADMIN

**Response (200):**
```json
{
  "success": true,
  "data": {
    "overallResult": "PASS",
    "results": [
      {
        "ruleCode": "ST_CATEGORY",
        "ruleName": "Must belong to Scheduled Tribe",
        "result": "PASS",
        "details": "Applicant category: ST (Gond)"
      },
      {
        "ruleCode": "EDUCATION_LEVEL",
        "ruleName": "Must have required educational qualification",
        "result": "PASS",
        "details": "Qualification: M.Phil — meets requirement"
      }
    ]
  }
}
```

---

## Deficiencies

### POST /api/applications/[id]/deficiencies
Create a deficiency.

**Auth:** SCRUTINY_OFFICER, ADMIN

**Request:**
```json
{
  "documentId": "uuid",
  "description": "Income certificate is unclear. Please upload a clearer copy."
}
```

### GET /api/applications/[id]/deficiencies
List deficiencies for an application.

### PUT /api/deficiencies/[id]/respond
Applicant responds to a deficiency.

**Auth:** APPLICANT (owner)

**Request:** multipart/form-data
- `responseText`: "Uploading clearer copy"
- `file`: replacement document (optional)

### PUT /api/deficiencies/[id]/resolve
Admin resolves a deficiency.

**Auth:** SCRUTINY_OFFICER, ADMIN

**Request:**
```json
{
  "status": "RESOLVED",
  "remarks": "Replacement document is clear and verified"
}
```

---

## Selection

### POST /api/applications/[id]/score
Add selection score.

**Auth:** SELECTION_OFFICER, ADMIN

**Request:**
```json
{
  "criteriaName": "Academic Score",
  "score": 85,
  "maxScore": 100,
  "remarks": "Based on verified academic records"
}
```

### GET /api/selection/merit-list
Get merit/selection list.

**Auth:** SELECTION_OFFICER, ADMIN

**Query Params:** `?schemeId=uuid`

---

## Notifications

### GET /api/notifications
Get notifications for current user.

**Auth:** Any authenticated user

### PUT /api/notifications/[id]/read
Mark notification as read.

---

## Dashboard

### GET /api/dashboard/stats
Get dashboard statistics.

**Auth:** SCRUTINY_OFFICER, SELECTION_OFFICER, ADMIN

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalApplications": 150,
    "byStatus": {
      "SUBMITTED": 45,
      "UNDER_VERIFICATION": 30,
      "ELIGIBLE": 25,
      "DEFICIENT": 15,
      "SELECTED": 10,
      "REJECTED": 5,
      "DRAFT": 20
    },
    "byScheme": {
      "NFST": 90,
      "NOS": 60
    },
    "recentApplications": [ "..." ]
  }
}
```

---

## Audit Log

### GET /api/audit
Get audit logs.

**Auth:** ADMIN

**Query Params:** `?userId=uuid&action=APPLICATION_SUBMITTED&entity=Application&page=1`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "userName": "Admin User",
      "action": "APPLICATION_STATUS_CHANGED",
      "entity": "Application",
      "entityId": "uuid",
      "previousValue": { "status": "SUBMITTED" },
      "newValue": { "status": "UNDER_VERIFICATION" },
      "timestamp": "2026-09-15T14:00:00Z"
    }
  ],
  "pagination": { "...": "..." }
}
```
