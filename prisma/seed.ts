// Seed script for Tribal Scholar AI
// Creates demo users, schemes, eligibility rules, required documents, and form fields
// Run with: npx prisma db seed

import { PrismaClient, ApplicationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ============ CLEAN EXISTING DATA ============
  console.log('🧹 Cleaning existing data...');
  await prisma.auditLog.deleteMany();
  await prisma.selectionScore.deleteMany();
  await prisma.applicationStatusHistory.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.deficiency.deleteMany();
  await prisma.eligibilityResult.deleteMany();
  await prisma.ocrResult.deleteMany();
  await prisma.documentVerification.deleteMany();
  await prisma.document.deleteMany();
  await prisma.applicationField.deleteMany();
  await prisma.application.deleteMany();
  await prisma.schemeField.deleteMany();
  await prisma.requiredDocument.deleteMany();
  await prisma.eligibilityRule.deleteMany();
  await prisma.schemeVersion.deleteMany();
  await prisma.scheme.deleteMany();
  await prisma.applicantProfile.deleteMany();
  await prisma.user.deleteMany();

  // ============ CREATE USERS ============
  console.log('👤 Creating users...');
  const passwordHash = await bcrypt.hash('demo1234', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      passwordHash,
      name: 'Anita Patel',
      role: 'ADMIN',
    },
  });

  const scrutinyUser = await prisma.user.create({
    data: {
      email: 'scrutiny@demo.com',
      passwordHash,
      name: 'Priya Sharma',
      role: 'SCRUTINY_OFFICER',
    },
  });

  const selectionUser = await prisma.user.create({
    data: {
      email: 'selection@demo.com',
      passwordHash,
      name: 'Vikram Singh',
      role: 'SELECTION_OFFICER',
    },
  });

  const applicantUser = await prisma.user.create({
    data: {
      email: 'applicant@demo.com',
      passwordHash,
      name: 'Rahul Kumar',
      role: 'APPLICANT',
      applicantProfile: {
        create: {
          dateOfBirth: new Date('2000-05-15'),
          gender: 'MALE',
          phone: '9876543210',
          category: 'ST',
          tribe: 'Gond',
          fatherName: 'Suresh Kumar',
          motherName: 'Sunita Devi',
          address: '42, Gandhi Nagar',
          district: 'Mandla',
          state: 'Madhya Pradesh',
          pincode: '481661',
          stCertificateNumber: 'ST/MP/2024/12345',
          annualFamilyIncome: 450000,
          bankAccountNumber: '1234567890',
          bankName: 'State Bank of India',
          ifscCode: 'SBIN0001234',
          currentEducationLevel: 'Post Graduate',
          institution: 'Rani Durgavati University',
          course: 'Ph.D. Computer Science',
          profileComplete: true,
        },
      },
    },
  });

  // Create more demo applicants
  const demoApplicants = [
    { email: 'meera@demo.com', name: 'Meera Bhil', gender: 'FEMALE' as const, tribe: 'Bhil', state: 'Rajasthan', district: 'Udaipur', income: 350000, education: 'Post Graduate', institution: 'University of Rajasthan', course: 'M.Phil. Sociology' },
    { email: 'arjun@demo.com', name: 'Arjun Munda', gender: 'MALE' as const, tribe: 'Munda', state: 'Jharkhand', district: 'Ranchi', income: 280000, education: 'Graduate', institution: 'Ranchi University', course: 'M.Sc. Physics' },
    { email: 'priya.t@demo.com', name: 'Priya Tirkey', gender: 'FEMALE' as const, tribe: 'Oraon', state: 'Jharkhand', district: 'Gumla', income: 520000, education: 'Post Graduate', institution: 'BHU Varanasi', course: 'Ph.D. History' },
    { email: 'vikash@demo.com', name: 'Vikash Lakra', gender: 'MALE' as const, tribe: 'Lakra', state: 'Chhattisgarh', district: 'Jashpur', income: 380000, education: 'Graduate', institution: 'Pt. Ravishankar University', course: 'M.A. Economics' },
    { email: 'sunita@demo.com', name: 'Sunita Soren', gender: 'FEMALE' as const, tribe: 'Santal', state: 'West Bengal', district: 'Purulia', income: 420000, education: 'Post Graduate', institution: 'Jadavpur University', course: 'Ph.D. Chemistry' },
    { email: 'deepak@demo.com', name: 'Deepak Xalxo', gender: 'MALE' as const, tribe: 'Oraon', state: 'Jharkhand', district: 'Lohardaga', income: 310000, education: 'Post Graduate', institution: 'IIT Delhi', course: 'Ph.D. Computer Science' },
    { email: 'kavita@demo.com', name: 'Kavita Maravi', gender: 'FEMALE' as const, tribe: 'Gond', state: 'Madhya Pradesh', district: 'Chhindwara', income: 480000, education: 'Graduate', institution: 'AIIMS Delhi', course: 'M.D. Medicine' },
    { email: 'ravi@demo.com', name: 'Ravi Hembram', gender: 'MALE' as const, tribe: 'Santal', state: 'Odisha', district: 'Mayurbhanj', income: 250000, education: 'Post Graduate', institution: 'University of Oxford', course: 'Ph.D. Economics' },
    { email: 'anita.k@demo.com', name: 'Anita Kujur', gender: 'FEMALE' as const, tribe: 'Oraon', state: 'Chhattisgarh', district: 'Surguja', income: 550000, education: 'Graduate', institution: 'MIT USA', course: 'M.S. Data Science' },
    { email: 'sunil@demo.com', name: 'Sunil Toppo', gender: 'MALE' as const, tribe: 'Kharia', state: 'Jharkhand', district: 'Simdega', income: 290000, education: 'Post Graduate', institution: 'JNU Delhi', course: 'Ph.D. Political Science' },
  ];

  const createdApplicants = [];
  for (const applicant of demoApplicants) {
    const user = await prisma.user.create({
      data: {
        email: applicant.email,
        passwordHash,
        name: applicant.name,
        role: 'APPLICANT',
        applicantProfile: {
          create: {
            dateOfBirth: new Date('1998-01-01'),
            gender: applicant.gender,
            phone: '9' + Math.floor(100000000 + Math.random() * 900000000).toString(),
            category: 'ST',
            tribe: applicant.tribe,
            fatherName: 'Demo Father',
            motherName: 'Demo Mother',
            address: 'Demo Address',
            district: applicant.district,
            state: applicant.state,
            pincode: '400001',
            stCertificateNumber: 'ST/' + applicant.state.substring(0, 2).toUpperCase() + '/2024/' + Math.floor(10000 + Math.random() * 90000),
            annualFamilyIncome: applicant.income,
            bankAccountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            bankName: 'State Bank of India',
            ifscCode: 'SBIN0001234',
            currentEducationLevel: applicant.education,
            institution: applicant.institution,
            course: applicant.course,
            profileComplete: true,
          },
        },
      },
      include: { applicantProfile: true },
    });
    createdApplicants.push(user);
  }

  console.log(`✅ Created ${createdApplicants.length + 1} applicants + 3 admin users`);

  // ============ CREATE SCHEMES ============
  console.log('📋 Creating schemes...');

  // --- NFST ---
  const nfstScheme = await prisma.scheme.create({
    data: {
      code: 'NFST',
      name: 'National Fellowship for Scheduled Tribes',
      description: 'Financial assistance for Scheduled Tribe students pursuing M.Phil and Ph.D. degrees in Indian universities and research institutions. [DEMO CONFIGURATION]',
      isActive: true,
      applicationStartDate: new Date('2026-01-01'),
      applicationEndDate: new Date('2026-12-31'),
    },
  });

  const nfstVersion = await prisma.schemeVersion.create({
    data: { schemeId: nfstScheme.id, version: 1, isActive: true },
  });

  // NFST Eligibility Rules
  const nfstRules = [
    { ruleCode: 'NFST_ST_CATEGORY', ruleName: 'Must belong to Scheduled Tribe', ruleDescription: 'Applicant must be from a recognized Scheduled Tribe', ruleType: 'CATEGORY' as const, ruleConfig: { requiredCategory: 'ST' }, isMandatory: true, orderIndex: 1 },
    { ruleCode: 'NFST_EDUCATION', ruleName: 'Educational Qualification', ruleDescription: 'Must have qualified NET/SET or equivalent, or admitted to M.Phil/Ph.D.', ruleType: 'EDUCATION' as const, ruleConfig: { requiredLevels: ['Post Graduate', 'M.Phil', 'Ph.D.'] }, isMandatory: true, orderIndex: 2 },
    { ruleCode: 'NFST_INCOME', ruleName: 'Family Income Limit [DEMO]', ruleDescription: 'Annual family income must not exceed ₹6,00,000', ruleType: 'INCOME' as const, ruleConfig: { maxIncome: 600000 }, isMandatory: true, orderIndex: 3 },
    { ruleCode: 'NFST_INSTITUTION', ruleName: 'Recognized Institution', ruleDescription: 'Must be enrolled in a UGC-recognized university/institution', ruleType: 'EDUCATION' as const, ruleConfig: { mustBeRecognized: true }, isMandatory: true, orderIndex: 4 },
    { ruleCode: 'NFST_NOT_AVAILING', ruleName: 'Not availing other fellowship', ruleDescription: 'Must not be receiving any other fellowship for the same purpose', ruleType: 'CUSTOM' as const, ruleConfig: { checkType: 'self_declaration' }, isMandatory: true, orderIndex: 5 },
  ];

  for (const rule of nfstRules) {
    await prisma.eligibilityRule.create({
      data: { schemeVersionId: nfstVersion.id, ...rule },
    });
  }

  // NFST Required Documents
  const nfstDocs = [
    { documentType: 'ST_CERTIFICATE', documentName: 'ST/Caste Certificate', description: 'Valid ST certificate issued by competent authority', isMandatory: true, maxSizeMB: 5, orderIndex: 1 },
    { documentType: 'INCOME_CERTIFICATE', documentName: 'Income Certificate', description: 'Family income certificate from competent authority', isMandatory: true, maxSizeMB: 5, orderIndex: 2 },
    { documentType: 'ADMISSION_LETTER', documentName: 'University Admission/Enrollment Letter', description: 'Proof of admission to M.Phil/Ph.D. program', isMandatory: true, maxSizeMB: 5, orderIndex: 3 },
    { documentType: 'MARKSHEET', documentName: 'Last Qualifying Exam Marksheet', description: 'Marksheet of last qualifying examination', isMandatory: true, maxSizeMB: 5, orderIndex: 4 },
    { documentType: 'PHOTO', documentName: 'Passport-size Photograph', description: 'Recent passport-size photograph', isMandatory: true, maxSizeMB: 2, allowedFormats: ['jpg', 'png'], orderIndex: 5 },
    { documentType: 'ID_PROOF', documentName: 'Government Photo ID', description: 'Aadhaar card / Voter ID / Passport', isMandatory: true, maxSizeMB: 5, orderIndex: 6 },
    { documentType: 'BANK_PASSBOOK', documentName: 'Bank Passbook First Page', description: 'Bank passbook or cancelled cheque', isMandatory: true, maxSizeMB: 5, orderIndex: 7 },
    { documentType: 'RESEARCH_PROPOSAL', documentName: 'Research Proposal', description: 'Research proposal for Ph.D. applicants', isMandatory: false, maxSizeMB: 10, allowedFormats: ['pdf'], orderIndex: 8 },
  ];

  for (const doc of nfstDocs) {
    await prisma.requiredDocument.create({
      data: { schemeVersionId: nfstVersion.id, ...doc },
    });
  }

  // NFST Form Fields
  const nfstFields = [
    { fieldCode: 'research_topic', fieldLabel: 'Research Topic', fieldType: 'TEXT' as const, isRequired: true, section: 'Research Details', orderIndex: 1 },
    { fieldCode: 'research_area', fieldLabel: 'Research Area/Discipline', fieldType: 'TEXT' as const, isRequired: true, section: 'Research Details', orderIndex: 2 },
    { fieldCode: 'supervisor_name', fieldLabel: 'Name of Research Supervisor', fieldType: 'TEXT' as const, isRequired: true, section: 'Research Details', orderIndex: 3 },
    { fieldCode: 'supervisor_designation', fieldLabel: 'Supervisor Designation', fieldType: 'TEXT' as const, isRequired: true, section: 'Research Details', orderIndex: 4 },
    { fieldCode: 'university_name', fieldLabel: 'University/Institution Name', fieldType: 'TEXT' as const, isRequired: true, section: 'Academic Details', orderIndex: 5 },
    { fieldCode: 'department', fieldLabel: 'Department', fieldType: 'TEXT' as const, isRequired: true, section: 'Academic Details', orderIndex: 6 },
    { fieldCode: 'enrollment_date', fieldLabel: 'Date of Enrollment', fieldType: 'DATE' as const, isRequired: true, section: 'Academic Details', orderIndex: 7 },
    { fieldCode: 'course_type', fieldLabel: 'Course Type', fieldType: 'SELECT' as const, isRequired: true, options: ['M.Phil', 'Ph.D.'], section: 'Academic Details', orderIndex: 8 },
    { fieldCode: 'net_qualified', fieldLabel: 'NET/SET Qualified?', fieldType: 'SELECT' as const, isRequired: true, options: ['Yes', 'No', 'Exempted'], section: 'Qualification', orderIndex: 9 },
    { fieldCode: 'net_roll_number', fieldLabel: 'NET/SET Roll Number', fieldType: 'TEXT' as const, isRequired: false, section: 'Qualification', orderIndex: 10 },
  ];

  for (const field of nfstFields) {
    await prisma.schemeField.create({
      data: { schemeVersionId: nfstVersion.id, ...field },
    });
  }

  // --- NOS ---
  const nosScheme = await prisma.scheme.create({
    data: {
      code: 'NOS',
      name: 'National Overseas Scholarship',
      description: 'Financial assistance for Scheduled Tribe students for pursuing Master\'s and Ph.D. programs at top universities abroad. [DEMO CONFIGURATION]',
      isActive: true,
      applicationStartDate: new Date('2026-01-01'),
      applicationEndDate: new Date('2026-12-31'),
    },
  });

  const nosVersion = await prisma.schemeVersion.create({
    data: { schemeId: nosScheme.id, version: 1, isActive: true },
  });

  // NOS Eligibility Rules
  const nosRules = [
    { ruleCode: 'NOS_ST_CATEGORY', ruleName: 'Must belong to Scheduled Tribe', ruleDescription: 'Applicant must be from a recognized Scheduled Tribe', ruleType: 'CATEGORY' as const, ruleConfig: { requiredCategory: 'ST' }, isMandatory: true, orderIndex: 1 },
    { ruleCode: 'NOS_EDUCATION', ruleName: 'Educational Qualification [DEMO]', ruleDescription: 'Must have completed graduation (for Master\'s) or post-graduation (for Ph.D.) with minimum 55% marks', ruleType: 'EDUCATION' as const, ruleConfig: { minPercentage: 55, requiredLevels: ['Graduate', 'Post Graduate'] }, isMandatory: true, orderIndex: 2 },
    { ruleCode: 'NOS_INCOME', ruleName: 'Family Income Limit [DEMO]', ruleDescription: 'Annual family income must not exceed ₹6,00,000', ruleType: 'INCOME' as const, ruleConfig: { maxIncome: 600000 }, isMandatory: true, orderIndex: 3 },
    { ruleCode: 'NOS_AGE', ruleName: 'Age Limit [DEMO]', ruleDescription: 'Not more than 35 years at time of application', ruleType: 'AGE' as const, ruleConfig: { maxAge: 35 }, isMandatory: true, orderIndex: 4 },
    { ruleCode: 'NOS_ADMISSION', ruleName: 'Foreign University Admission', ruleDescription: 'Must have admission offer from a recognized foreign university', ruleType: 'CUSTOM' as const, ruleConfig: { checkType: 'document_required', documentType: 'ADMISSION_LETTER_FOREIGN' }, isMandatory: true, orderIndex: 5 },
  ];

  for (const rule of nosRules) {
    await prisma.eligibilityRule.create({
      data: { schemeVersionId: nosVersion.id, ...rule },
    });
  }

  // NOS Required Documents
  const nosDocs = [
    { documentType: 'ST_CERTIFICATE', documentName: 'ST/Caste Certificate', description: 'Valid ST certificate', isMandatory: true, maxSizeMB: 5, orderIndex: 1 },
    { documentType: 'INCOME_CERTIFICATE', documentName: 'Income Certificate', description: 'Family income certificate', isMandatory: true, maxSizeMB: 5, orderIndex: 2 },
    { documentType: 'ADMISSION_LETTER_FOREIGN', documentName: 'Admission Letter from Foreign University', description: 'Official admission offer letter', isMandatory: true, maxSizeMB: 5, allowedFormats: ['pdf'], orderIndex: 3 },
    { documentType: 'MARKSHEET', documentName: 'Graduation Marksheet', description: 'Marksheet of graduation', isMandatory: true, maxSizeMB: 5, orderIndex: 4 },
    { documentType: 'PASSPORT', documentName: 'Valid Passport', description: 'First and last page of passport', isMandatory: true, maxSizeMB: 5, orderIndex: 5 },
    { documentType: 'PHOTO', documentName: 'Passport-size Photograph', description: 'Recent photograph', isMandatory: true, maxSizeMB: 2, allowedFormats: ['jpg', 'png'], orderIndex: 6 },
    { documentType: 'ID_PROOF', documentName: 'Government Photo ID', description: 'Aadhaar / Voter ID', isMandatory: true, maxSizeMB: 5, orderIndex: 7 },
    { documentType: 'BANK_PASSBOOK', documentName: 'Bank Passbook', description: 'Bank passbook first page', isMandatory: true, maxSizeMB: 5, orderIndex: 8 },
    { documentType: 'ENGLISH_PROFICIENCY', documentName: 'IELTS/TOEFL Score', description: 'English proficiency test score', isMandatory: false, maxSizeMB: 5, orderIndex: 9 },
  ];

  for (const doc of nosDocs) {
    await prisma.requiredDocument.create({
      data: { schemeVersionId: nosVersion.id, ...doc },
    });
  }

  // NOS Form Fields
  const nosFields = [
    { fieldCode: 'foreign_university', fieldLabel: 'Foreign University Name', fieldType: 'TEXT' as const, isRequired: true, section: 'Overseas Details', orderIndex: 1 },
    { fieldCode: 'foreign_country', fieldLabel: 'Country', fieldType: 'TEXT' as const, isRequired: true, section: 'Overseas Details', orderIndex: 2 },
    { fieldCode: 'course_name', fieldLabel: 'Course/Program Name', fieldType: 'TEXT' as const, isRequired: true, section: 'Overseas Details', orderIndex: 3 },
    { fieldCode: 'course_type', fieldLabel: 'Course Level', fieldType: 'SELECT' as const, isRequired: true, options: ["Master's", 'Ph.D.'], section: 'Overseas Details', orderIndex: 4 },
    { fieldCode: 'course_duration', fieldLabel: 'Course Duration (years)', fieldType: 'NUMBER' as const, isRequired: true, section: 'Overseas Details', orderIndex: 5 },
    { fieldCode: 'course_start_date', fieldLabel: 'Expected Course Start Date', fieldType: 'DATE' as const, isRequired: true, section: 'Overseas Details', orderIndex: 6 },
    { fieldCode: 'passport_number', fieldLabel: 'Passport Number', fieldType: 'TEXT' as const, isRequired: true, section: 'Passport Details', orderIndex: 7 },
    { fieldCode: 'passport_expiry', fieldLabel: 'Passport Expiry Date', fieldType: 'DATE' as const, isRequired: true, section: 'Passport Details', orderIndex: 8 },
    { fieldCode: 'ielts_toefl_score', fieldLabel: 'IELTS/TOEFL Score', fieldType: 'TEXT' as const, isRequired: false, section: 'Qualification', orderIndex: 9 },
    { fieldCode: 'graduation_percentage', fieldLabel: 'Graduation Percentage', fieldType: 'NUMBER' as const, isRequired: true, section: 'Academic Details', orderIndex: 10 },
  ];

  for (const field of nosFields) {
    await prisma.schemeField.create({
      data: { schemeVersionId: nosVersion.id, ...field },
    });
  }

  console.log('✅ Created NFST and NOS schemes with rules, documents, and fields');

  // ============ CREATE SAMPLE APPLICATIONS ============
  console.log('📄 Creating sample applications...');

  const applicantProfile = await prisma.applicantProfile.findUnique({
    where: { userId: applicantUser.id },
  });

  if (applicantProfile) {
    // Create a submitted NFST application for the main demo applicant
    const nfstApp = await prisma.application.create({
      data: {
        applicationNumber: 'NFST-2026-00001',
        applicantId: applicantProfile.id,
        schemeId: nfstScheme.id,
        schemeVersionId: nfstVersion.id,
        status: 'SUBMITTED',
        currentStage: 'Document Verification',
        submittedAt: new Date('2026-09-10'),
        statusHistory: {
          create: [
            { fromStatus: null, toStatus: 'DRAFT', changedById: applicantUser.id, remarks: 'Application created', changedAt: new Date('2026-09-08') },
            { fromStatus: 'DRAFT', toStatus: 'SUBMITTED', changedById: applicantUser.id, remarks: 'Application submitted', changedAt: new Date('2026-09-10') },
          ],
        },
      },
    });

    // Create some applications from other applicants in various statuses
    const statuses: Array<{ status: ApplicationStatus; stage: string }> = [
      { status: 'SUBMITTED', stage: 'Document Verification' },
      { status: 'ELIGIBLE', stage: 'Scrutiny' },
      { status: 'UNDER_SCRUTINY', stage: 'Scrutiny' },
      { status: 'DEFICIENT', stage: 'Deficiency Response' },
      { status: 'SCRUTINY_COMPLETE', stage: 'Screening' },
      { status: 'UNDER_SCREENING', stage: 'Selection' },
      { status: 'SELECTED', stage: 'Final Approval' },
      { status: 'APPROVED', stage: 'Complete' },
      { status: 'REJECTED', stage: 'Complete' },
      { status: 'DRAFT', stage: 'Application Form' },
    ];

    for (let i = 0; i < createdApplicants.length; i++) {
      const applicant = createdApplicants[i];
      const profile = await prisma.applicantProfile.findUnique({
        where: { userId: applicant.id },
      });
      if (!profile) continue;

      const statusInfo = statuses[i % statuses.length];
      const isNfst = i < 6; // First 6 are NFST, rest are NOS
      const scheme = isNfst ? nfstScheme : nosScheme;
      const version = isNfst ? nfstVersion : nosVersion;

      await prisma.application.create({
        data: {
          applicationNumber: `${scheme.code}-2026-${String(i + 2).padStart(5, '0')}`,
          applicantId: profile.id,
          schemeId: scheme.id,
          schemeVersionId: version.id,
          status: statusInfo.status,
          currentStage: statusInfo.stage,
          submittedAt: statusInfo.status !== 'DRAFT' ? new Date('2026-09-01') : null,
          statusHistory: {
            create: {
              fromStatus: null,
              toStatus: statusInfo.status,
              changedById: applicant.id,
              remarks: 'Demo data',
            },
          },
        },
      });
    }

    console.log('✅ Created sample applications in various statuses');
  }

  // ============ AUDIT LOG ============
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'SYSTEM_SEEDED',
      entity: 'System',
      entityId: 'seed',
      newValue: { message: 'Database seeded with demo data' },
    },
  });

  console.log('');
  console.log('🎉 Seed complete!');
  console.log('');
  console.log('Demo accounts:');
  console.log('  Applicant:        applicant@demo.com / demo1234');
  console.log('  Scrutiny Officer: scrutiny@demo.com  / demo1234');
  console.log('  Selection Officer:selection@demo.com  / demo1234');
  console.log('  Administrator:    admin@demo.com      / demo1234');
  console.log('');
  console.log('Schemes: NFST, NOS');
  console.log(`Applications: ${createdApplicants.length + 1} created`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
