// Demo schemes for the applicant "Browse Schemes" experience.

export interface Scheme {
  code: string;
  name: string;
  shortName: string;
  description: string;
  emoji: string;
  tint: string;
  funding: string;
  deadline: string;
  status: 'OPEN' | 'CLOSED';
  level: string;
  eligibility: string[];
  documents: string[];
}

export const SCHEMES: Scheme[] = [
  {
    code: 'NFST',
    name: 'National Fellowship for Scheduled Tribes',
    shortName: 'National Fellowship',
    description:
      'Financial assistance for Scheduled Tribe students pursuing M.Phil and Ph.D. degrees in Indian universities and research institutions.',
    emoji: '🎓',
    tint: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200',
    funding: 'Up to ₹41,000/month stipend + research contingency',
    deadline: '31 December 2026',
    status: 'OPEN',
    level: 'M.Phil / Ph.D. (India)',
    eligibility: [
      'Must belong to a recognized Scheduled Tribe',
      'Admitted to / applying for M.Phil or Ph.D.',
      'Annual family income below ₹6,00,000',
      'Enrolled in a UGC-recognized institution',
      'Not availing any other fellowship',
    ],
    documents: [
      'ST/Caste certificate',
      'Income certificate',
      'University admission/enrollment letter',
      'Last qualifying exam marksheet',
      'Passport-size photograph',
      'Government photo ID',
      'Bank passbook first page',
      'Research proposal (Ph.D. only)',
    ],
  },
  {
    code: 'NOS',
    name: 'National Overseas Scholarship',
    shortName: 'Overseas Scholarship',
    description:
      'Financial assistance for Scheduled Tribe students pursuing Master\u2019s and Ph.D. programs at top-ranking universities abroad.',
    emoji: '🌍',
    tint: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
    funding: 'Tuition + living allowance + travel',
    deadline: '31 December 2026',
    status: 'OPEN',
    level: 'Master\u2019s / Ph.D. (Abroad)',
    eligibility: [
      'Must belong to a recognized Scheduled Tribe',
      'Completed graduation (Master\u2019s) or post-graduation (Ph.D.) with 55%+',
      'Annual family income below ₹6,00,000',
      'Age not more than 35 years',
      'Admission offer from a recognized foreign university',
    ],
    documents: [
      'ST/Caste certificate',
      'Income certificate',
      'Admission letter from foreign university',
      'Graduation marksheet',
      'Valid passport',
      'Passport-size photograph',
      'Government photo ID',
      'Bank passbook first page',
      'IELTS/TOEFL score (if applicable)',
    ],
  },
  {
    code: 'TCEP',
    name: 'Top Class Education Scheme for ST Students',
    shortName: 'Top Class Education',
    description:
      'Financial support for meritorious Scheduled Tribe students joining notified premier institutions for full-time courses.',
    emoji: '🏆',
    tint: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
    funding: 'Tuition fee + living allowance up to ₹16,000/month',
    deadline: '31 December 2026',
    status: 'OPEN',
    level: 'Undergraduate / Postgraduate (Premier institutes)',
    eligibility: [
      'Must belong to a recognized Scheduled Tribe',
      'Admitted to a notified premier institution (IIT, NIT, AIIMS, etc.)',
      'Annual family income below ₹8,00,000',
      'Full-time course only',
    ],
    documents: [
      'ST/Caste certificate',
      'Income certificate',
      'Admission letter',
      'Last qualifying exam marksheet',
      'Passport-size photograph',
      'Government photo ID',
      'Bank passbook first page',
    ],
  },
];

export function getSchemes(): Scheme[] {
  return SCHEMES;
}

export function getSchemeByCode(code: string): Scheme | undefined {
  return SCHEMES.find((s) => s.code === code);
}