// Demo applicant profile — mirrors the seeded ApplicantProfile for
// applicant@demo.com (Rahul Kumar) in prisma/seed.ts.

export interface ApplicantProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  tribe: string;
  fatherName: string;
  motherName: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  stCertificateNumber: string;
  annualFamilyIncome: number;
  bankAccountNumber: string;
  bankName: string;
  ifscCode: string;
  currentEducationLevel: string;
  institution: string;
  course: string;
  profileComplete: boolean;
}

export const APPLICANT_PROFILE: ApplicantProfile = {
  name: 'Rahul Kumar',
  email: 'applicant@demo.com',
  phone: '9876543210',
  dateOfBirth: '2000-05-15',
  gender: 'Male',
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
  bankAccountNumber: '•••• 7890',
  bankName: 'State Bank of India',
  ifscCode: 'SBIN0001234',
  currentEducationLevel: 'Post Graduate',
  institution: 'Rani Durgavati University',
  course: 'Ph.D. Computer Science',
  profileComplete: true,
};