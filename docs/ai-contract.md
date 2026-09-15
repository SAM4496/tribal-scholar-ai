# AI/OCR Service Contract

> ⚠️ **HACKATHON PROTOTYPE** — Mock AI service for MVP. Architecture supports plugging in real providers.

## Architecture

```
Document Upload
      │
      ▼
┌─────────────────────┐
│  AI Service Interface│  ← Common interface
└──────┬──────────────┘
       │
       ├── MockAIProvider     ← Used in MVP/demo (returns realistic fake results)
       ├── GoogleVisionProvider  ← Future: Google Cloud Vision
       ├── AzureAIProvider       ← Future: Azure Document Intelligence
       └── CustomProvider        ← Future: Any other provider
```

The AI service is accessed through a **common interface**. The MVP uses a `MockAIProvider` that returns realistic demo results. When a real AI/OCR service is available, only the provider implementation changes — no other code needs to change.

## AI Service Interface

Every AI provider must implement these operations:

### 1. OCR — Extract Text from Document

**Input:**
```json
{
  "documentId": "uuid",
  "documentType": "ST_CERTIFICATE",
  "filePath": "/uploads/doc-123.pdf",
  "mimeType": "application/pdf"
}
```

**Output:**
```json
{
  "documentId": "uuid",
  "ocrStatus": "SUCCESS",
  "rawText": "Full extracted text from the document...",
  "extractedFields": {
    "candidateName": "Rahul Kumar",
    "fatherName": "Suresh Kumar",
    "certificateNumber": "ST/MP/2024/12345",
    "tribe": "Gond",
    "issuingAuthority": "District Magistrate, Mandla",
    "issueDate": "2024-03-15",
    "district": "Mandla",
    "state": "Madhya Pradesh"
  },
  "confidence": 0.94,
  "processedAt": "2026-09-15T10:30:00Z"
}
```

### 2. Document Verification — Compare Extracted Data with Profile

**Input:**
```json
{
  "documentId": "uuid",
  "documentType": "ST_CERTIFICATE",
  "extractedFields": {
    "candidateName": "Rahul Kumar",
    "tribe": "Gond",
    "certificateNumber": "ST/MP/2024/12345"
  },
  "applicantProfile": {
    "name": "Rahul Kumar",
    "tribe": "Gond",
    "stCertificateNumber": "ST/MP/2024/12345"
  }
}
```

**Output:**
```json
{
  "documentId": "uuid",
  "documentType": "ST_CERTIFICATE",
  "verificationStatus": "PASS",
  "confidenceScore": 0.94,
  "checks": [
    {
      "field": "candidateName",
      "status": "PASS",
      "extracted": "Rahul Kumar",
      "expected": "Rahul Kumar",
      "confidence": 0.98
    },
    {
      "field": "certificateNumber",
      "status": "PASS",
      "extracted": "ST/MP/2024/12345",
      "expected": "ST/MP/2024/12345",
      "confidence": 0.99
    },
    {
      "field": "tribe",
      "status": "PASS",
      "extracted": "Gond",
      "expected": "Gond",
      "confidence": 0.97
    },
    {
      "field": "documentQuality",
      "status": "PASS",
      "score": 0.96,
      "notes": "Document is clear and legible"
    }
  ],
  "requiresHumanReview": false,
  "reviewReasons": [],
  "processedAt": "2026-09-15T10:31:00Z"
}
```

### 3. Document Classification — Identify Document Type

**Input:**
```json
{
  "filePath": "/uploads/doc-unknown.pdf",
  "mimeType": "application/pdf"
}
```

**Output:**
```json
{
  "predictedType": "INCOME_CERTIFICATE",
  "confidence": 0.87,
  "alternativeTypes": [
    { "type": "OTHER_CERTIFICATE", "confidence": 0.08 }
  ]
}
```

## Supported Document Types

| Code | Name | Fields Extracted |
|---|---|---|
| ST_CERTIFICATE | ST/Caste Certificate | candidateName, fatherName, certificateNumber, tribe, issuingAuthority, issueDate, state |
| INCOME_CERTIFICATE | Income Certificate | candidateName, fatherName, annualIncome, issuingAuthority, issueDate, financialYear |
| ADMISSION_LETTER | Admission/Enrollment Letter | candidateName, universityName, courseName, enrollmentDate, enrollmentNumber |
| MARKSHEET | Marksheet/Transcript | candidateName, universityName, examName, yearOfPassing, percentage, subjects |
| PASSPORT | Passport | fullName, passportNumber, dateOfBirth, dateOfExpiry, nationality, placeOfIssue |
| PHOTO | Photograph | faceDetected, quality |
| BANK_PASSBOOK | Bank Passbook | accountHolderName, accountNumber, bankName, branch, ifscCode |
| NET_SET_CERTIFICATE | NET/SET Certificate | candidateName, rollNumber, subject, qualifyingYear |
| ID_PROOF | Government ID | fullName, idNumber, dateOfBirth |

## When AI Should Flag for Human Review

The AI service should set `requiresHumanReview: true` when:

- Overall confidence < 0.70
- Any critical field has confidence < 0.80
- Name mismatch detected between document and profile
- Document appears to be a different type than expected
- Document quality is poor (blurry, partial, dark)
- Suspected duplicate document
- Date inconsistencies (e.g., future dates, expired documents)
- Any extracted field seems implausible

## Mock Provider Behavior

For the MVP, the `MockAIProvider`:

1. Accepts any uploaded file
2. Waits a short delay (simulating processing)
3. Returns realistic pre-configured results based on `documentType`
4. Returns high confidence (0.85-0.98) for most documents
5. Can be configured to return failures/low confidence for demo scenarios
6. Includes realistic extracted fields matching demo applicant profiles

## Important Rules

1. **AI is assistive only** — Never auto-reject based on AI results alone
2. **Confidence scores are transparent** — Always show confidence to reviewing officers
3. **Human review is final** — Officers can override any AI result
4. **All AI results are logged** — Stored in OCRResult and DocumentVerification tables
