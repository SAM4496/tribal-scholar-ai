# Hackathon Demo Script

> ⚠️ **HACKATHON PROTOTYPE** — This demo scenario uses fictional data.

## Demo Duration
Target: 10-15 minutes

## Demo Accounts

| Role | Email | Password | Name |
|---|---|---|---|
| Applicant | applicant@demo.com | demo1234 | Rahul Kumar |
| Scrutiny Officer | scrutiny@demo.com | demo1234 | Priya Sharma |
| Selection Officer | selection@demo.com | demo1234 | Vikram Singh |
| Administrator | admin@demo.com | demo1234 | Anita Patel |

> These are demo accounts with prototype data only.

---

## Demo Flow

### Act 1: Applicant Journey (4 min)

**Step 1 — Login**
- Open application → Landing page shows system overview
- Login as applicant (applicant@demo.com)
- Show applicant dashboard (empty or with existing applications)

**Step 2 — Complete Profile**
- Navigate to profile
- Show profile form with personal details, ST information, academic details
- Profile is pre-filled for demo

**Step 3 — Discover Scheme**
- Navigate to "Schemes" page
- Show NFST and NOS schemes with descriptions
- Select NFST → Show eligibility criteria, required documents
- Click "Apply Now"

**Step 4 — Fill Application**
- Show application form with sections:
  - Personal details (pre-filled from profile)
  - Academic details
  - Research details (scheme-specific)
- Fill in required fields
- Show save draft functionality

**Step 5 — Upload Documents**
- Upload ST Certificate → Show upload progress
- Upload Income Certificate
- Upload Admission Letter
- Upload Marksheet
- Show document list with statuses

**Step 6 — AI Document Processing (KEY DEMO MOMENT)**
- Trigger document verification
- Show AI/OCR processing animation
- Show extracted information from ST Certificate:
  - Name: Rahul Kumar ✅
  - Certificate Number: ST/MP/2024/12345 ✅
  - Tribe: Gond ✅
  - Confidence: 94%
- Show verification results for each document

**Step 7 — Eligibility Check**
- Run eligibility check
- Show each rule result:
  - ST Category: PASS ✅
  - Education: PASS ✅
  - Income: PASS ✅
  - Institution: PASS ✅

**Step 8 — Submit**
- Click Submit → Confirmation dialog
- Application status changes to SUBMITTED
- Show application timeline

---

### Act 2: Admin Scrutiny (4 min)

**Step 9 — Admin Dashboard**
- Login as Scrutiny Officer (scrutiny@demo.com)
- Show admin dashboard:
  - Total applications count
  - Applications by status chart
  - Applications by scheme chart
  - Recent applications list

**Step 10 — Open Application**
- Click on Rahul Kumar's NFST application
- Show detailed application view:
  - Applicant profile
  - Application form responses
  - Uploaded documents
  - AI verification results (with confidence scores)
  - Eligibility results

**Step 11 — Create Deficiency (KEY DEMO MOMENT)**
- Review income certificate
- AI flagged: "Document quality: 72% — may be unclear"
- Officer creates deficiency: "Income certificate is unclear. Please upload a clearer copy."
- Application status → DEFICIENT
- Notification sent to applicant

---

### Act 3: Applicant Responds (2 min)

**Step 12 — Deficiency Notification**
- Switch to applicant account
- Show notification: "Action Required — Income certificate deficiency"
- Open deficiency details

**Step 13 — Respond to Deficiency**
- Upload clearer income certificate
- Add response text: "Uploading clearer scanned copy"
- Submit response

---

### Act 4: Selection & Approval (3 min)

**Step 14 — Review Resubmission**
- Switch to Scrutiny Officer
- Open resubmission → New document verified ✅
- Resolve deficiency → Status: SCRUTINY_COMPLETE

**Step 15 — Selection Screening**
- Login as Selection Officer (selection@demo.com)
- View eligible applications for screening
- Show merit/selection table:
  - Academic Score: 85/100
  - Research Proposal: 28/30
  - NET Score: 18/20
  - Total: 131/150
- Show transparent scoring breakdown
- Recommend selection

**Step 16 — Final Approval**
- Login as Administrator (admin@demo.com)
- View selected applications
- Review complete application history
- Approve final decision
- Notification sent to applicant

**Step 17 — Applicant Sees Result**
- Switch to applicant
- Dashboard shows: APPROVED ✅
- Show complete application timeline

---

### Act 5: Analytics (1 min)

**Step 18 — Analytics Dashboard**
- Switch to admin
- Show:
  - Applications by scheme (bar chart)
  - Applications by status (pie chart)
  - Applications by state (map or bar chart)
  - Verification turnaround time
  - Deficiency rate
- Show audit trail of all actions taken

---

## Key Points to Highlight During Demo

1. **Configurable schemes** — "Adding a new scheme requires only database configuration, no code changes"
2. **AI-assisted verification** — "AI extracts and verifies, but humans make all final decisions"
3. **Transparent selection** — "Every score has a clear reason — no black-box decisions"
4. **Complete audit trail** — "Every action is logged for accountability"
5. **Deficiency workflow** — "Instead of rejecting, the system allows correction"
6. **Responsive design** — Show on mobile if possible

## Demo Data Requirements

Before the demo, ensure:
- [ ] 10-20 applicant profiles exist
- [ ] Multiple NFST applications in various statuses
- [ ] Multiple NOS applications in various statuses
- [ ] At least one application at each status stage
- [ ] Demo applicant "Rahul Kumar" has a DRAFT application ready
- [ ] AI mock results are configured for all document types
- [ ] Selection scores exist for screened applications
- [ ] Audit log has entries
