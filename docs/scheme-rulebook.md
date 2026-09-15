# Scheme Rulebook

> ⚠️ **HACKATHON PROTOTYPE** — The rules below are illustrative demo configurations.
> Actual scheme rules must be verified against official MoTA/DBT scheme documents.
> All values marked with [DEMO] are prototype placeholders.

---

## Scheme 1: National Fellowship for Scheduled Tribes (NFST)

### Overview
- **Code:** NFST
- **Full Name:** National Fellowship for Scheduled Tribes
- **Purpose:** Financial assistance to ST students for pursuing M.Phil and Ph.D. degrees
- **Administering Body:** Ministry of Tribal Affairs, Government of India

### Eligibility Rules [DEMO CONFIGURATION]

| Rule Code | Rule Name | Type | Condition | Mandatory |
|---|---|---|---|---|
| NFST_ST_CATEGORY | Must belong to Scheduled Tribe | CATEGORY | Applicant category = ST | Yes |
| NFST_EDUCATION | Educational Qualification | EDUCATION | Must have qualified NET/SET or equivalent, or admitted to M.Phil/Ph.D. | Yes |
| NFST_INCOME | Family Income Limit | INCOME | Annual family income ≤ ₹6,00,000 [DEMO] | Yes |
| NFST_AGE | Age Limit | AGE | No specific upper age limit for NFST [DEMO] | No |
| NFST_INSTITUTION | Recognized Institution | EDUCATION | Must be enrolled in a UGC-recognized university/institution | Yes |
| NFST_NOT_AVAILING | Not availing other fellowship | CUSTOM | Must not be receiving any other fellowship for the same purpose | Yes |

### Required Documents [DEMO CONFIGURATION]

| Document Type | Document Name | Mandatory | Max Size | Formats |
|---|---|---|---|---|
| ST_CERTIFICATE | ST/Caste Certificate | Yes | 5 MB | pdf, jpg, png |
| INCOME_CERTIFICATE | Income Certificate | Yes | 5 MB | pdf, jpg, png |
| ADMISSION_LETTER | University Admission/Enrollment Letter | Yes | 5 MB | pdf |
| MARKSHEET_LAST_QUAL | Last Qualifying Exam Marksheet | Yes | 5 MB | pdf, jpg, png |
| NET_SET_CERTIFICATE | NET/SET/Equivalent Certificate | No | 5 MB | pdf, jpg, png |
| PHOTO | Passport-size Photograph | Yes | 2 MB | jpg, png |
| ID_PROOF | Government Photo ID | Yes | 5 MB | pdf, jpg, png |
| BANK_PASSBOOK | Bank Passbook First Page | Yes | 5 MB | pdf, jpg, png |
| RESEARCH_PROPOSAL | Research Proposal (for Ph.D.) | No | 10 MB | pdf |

### Scheme-Specific Form Fields [DEMO CONFIGURATION]

| Field Code | Label | Type | Required | Section |
|---|---|---|---|---|
| research_topic | Research Topic | TEXT | Yes | Research Details |
| research_area | Research Area/Discipline | TEXT | Yes | Research Details |
| supervisor_name | Name of Research Supervisor | TEXT | Yes | Research Details |
| supervisor_designation | Supervisor Designation | TEXT | Yes | Research Details |
| university_name | University/Institution Name | TEXT | Yes | Academic Details |
| department | Department | TEXT | Yes | Academic Details |
| enrollment_date | Date of Enrollment | DATE | Yes | Academic Details |
| course_type | Course Type | SELECT [M.Phil, Ph.D.] | Yes | Academic Details |
| net_qualified | NET/SET Qualified? | SELECT [Yes, No, Exempted] | Yes | Qualification |
| net_roll_number | NET/SET Roll Number | TEXT | No | Qualification |

### Selection Criteria [DEMO CONFIGURATION]

| Criteria | Max Score | Description |
|---|---|---|
| Academic Performance | 40 | Based on qualifying exam marks |
| Research Proposal Quality | 30 | Relevance and quality (for Ph.D.) |
| NET/SET Score | 20 | NET/SET qualification |
| Other Factors | 10 | State representation, gender, etc. |

---

## Scheme 2: National Overseas Scholarship (NOS)

### Overview
- **Code:** NOS
- **Full Name:** National Overseas Scholarship for Scheduled Tribes
- **Purpose:** Financial assistance to ST students for pursuing Master's and Ph.D. programs abroad
- **Administering Body:** Ministry of Tribal Affairs, Government of India

### Eligibility Rules [DEMO CONFIGURATION]

| Rule Code | Rule Name | Type | Condition | Mandatory |
|---|---|---|---|---|
| NOS_ST_CATEGORY | Must belong to Scheduled Tribe | CATEGORY | Applicant category = ST | Yes |
| NOS_EDUCATION | Educational Qualification | EDUCATION | Must have completed graduation (for Master's) or post-graduation (for Ph.D.) with minimum 55% marks [DEMO] | Yes |
| NOS_INCOME | Family Income Limit | INCOME | Annual family income ≤ ₹6,00,000 [DEMO] | Yes |
| NOS_AGE | Age Limit | AGE | Not more than 35 years at time of application [DEMO] | Yes |
| NOS_ADMISSION | Foreign Admission | CUSTOM | Must have admission offer from a recognized foreign university/institution | Yes |
| NOS_NOT_AVAILING | Not availing other scholarship | CUSTOM | Must not be receiving any other overseas scholarship for the same purpose | Yes |
| NOS_FIRST_TIME | First-time applicant | CUSTOM | Not previously availed NOS [DEMO] | Yes |

### Required Documents [DEMO CONFIGURATION]

| Document Type | Document Name | Mandatory | Max Size | Formats |
|---|---|---|---|---|
| ST_CERTIFICATE | ST/Caste Certificate | Yes | 5 MB | pdf, jpg, png |
| INCOME_CERTIFICATE | Income Certificate | Yes | 5 MB | pdf, jpg, png |
| ADMISSION_LETTER_FOREIGN | Admission Letter from Foreign University | Yes | 5 MB | pdf |
| MARKSHEET_GRADUATION | Graduation Marksheet | Yes | 5 MB | pdf, jpg, png |
| MARKSHEET_POST_GRAD | Post-Graduation Marksheet (for Ph.D.) | No | 5 MB | pdf, jpg, png |
| PASSPORT | Valid Passport (first and last page) | Yes | 5 MB | pdf, jpg, png |
| PHOTO | Passport-size Photograph | Yes | 2 MB | jpg, png |
| ID_PROOF | Government Photo ID | Yes | 5 MB | pdf, jpg, png |
| BANK_PASSBOOK | Bank Passbook First Page | Yes | 5 MB | pdf, jpg, png |
| VISA_OFFER | Visa / Conditional Offer (if available) | No | 5 MB | pdf |
| ENGLISH_PROFICIENCY | IELTS/TOEFL Score (if applicable) | No | 5 MB | pdf, jpg, png |

### Scheme-Specific Form Fields [DEMO CONFIGURATION]

| Field Code | Label | Type | Required | Section |
|---|---|---|---|---|
| foreign_university | Foreign University Name | TEXT | Yes | Overseas Details |
| foreign_country | Country | TEXT | Yes | Overseas Details |
| course_name | Course/Program Name | TEXT | Yes | Overseas Details |
| course_type | Course Level | SELECT [Master's, Ph.D.] | Yes | Overseas Details |
| course_duration | Course Duration (years) | NUMBER | Yes | Overseas Details |
| course_start_date | Expected Course Start Date | DATE | Yes | Overseas Details |
| passport_number | Passport Number | TEXT | Yes | Passport Details |
| passport_expiry | Passport Expiry Date | DATE | Yes | Passport Details |
| ielts_toefl_score | IELTS/TOEFL Score | TEXT | No | Qualification |
| graduation_percentage | Graduation Percentage | NUMBER | Yes | Academic Details |
| post_grad_percentage | Post-Graduation Percentage | NUMBER | No | Academic Details |

### Selection Criteria [DEMO CONFIGURATION]

| Criteria | Max Score | Description |
|---|---|---|
| Academic Performance | 40 | Based on graduation/PG marks |
| University Ranking | 25 | QS/THE ranking of foreign university |
| Course Relevance | 20 | Relevance to national priorities |
| Other Factors | 15 | State representation, gender, etc. |

---

## How to Add a New Scheme

To add a new scheme to the system:

1. Insert a new `Scheme` record with code, name, description
2. Create a `SchemeVersion` for the new scheme
3. Add `EligibilityRule` records for each rule
4. Add `RequiredDocument` records for each required document
5. Add `SchemeField` records for each custom form field
6. Add selection criteria configuration

No code changes should be needed — the system reads scheme configuration from the database.
