'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { APPLICANT_PROFILE, type ApplicantProfile } from '@/lib/mock-applicant-profile';
import { cn, getInitials } from '@/lib/utils';

const STORAGE_KEY = 'tsa-applicant-profile';

interface Section {
  title: string;
  description: string;
  emoji: string;
  fields: readonly string[];
}

const SECTIONS: Section[] = [
  {
    title: 'Personal Details',
    description: 'Baseline identity information for every application.',
    emoji: '👤',
    fields: [
      'name',
      'dateOfBirth',
      'gender',
      'phone',
      'email',
    ],
  },
  {
    title: 'Scheduled Tribe Details',
    description: 'Used to verify eligibility on ST-only schemes.',
    emoji: '🛡️',
    fields: ['category', 'tribe', 'stCertificateNumber'],
  },
  {
    title: 'Family & Residence',
    description: 'Address and family income for means-based scholarships.',
    emoji: '🏠',
    fields: [
      'fatherName',
      'motherName',
      'address',
      'district',
      'state',
      'pincode',
      'annualFamilyIncome',
    ],
  },
  {
    title: 'Academic Details',
    description: 'Current course and institution of study.',
    emoji: '🎓',
    fields: ['currentEducationLevel', 'institution', 'course'],
  },
  {
    title: 'Bank Details',
    description: 'Scholarship disbursement account (masked for security).',
    emoji: '🏦',
    fields: ['bankAccountNumber', 'bankName', 'ifscCode'],
  },
];

function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase());
}

function formatFieldValue(profile: ApplicantProfile, key: string): string {
  const value = profile[key as keyof ApplicantProfile];
  if (value === null || value === undefined) return '—';
  if (key === 'annualFamilyIncome') {
    return `₹${Number(value).toLocaleString('en-IN')}`;
  }
  if (key === 'dateOfBirth') {
    return new Date(value as string).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
  return String(value);
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ApplicantProfile>(APPLICANT_PROFILE);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ApplicantProfile | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        queueMicrotask(() => setProfile(JSON.parse(stored)));
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  function startEdit() {
    setDraft({ ...profile });
    setSaved(false);
    setEditing(true);
  }

  function cancelEdit() {
    setDraft(null);
    setSaved(false);
    setEditing(false);
  }

  function saveEdit() {
    if (!draft) return;
    setProfile(draft);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // storage unavailable — keep in-memory only
    }
    setDraft(null);
    setEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }

  function updateDraft(key: string, value: string) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function resetToDemo() {
    setProfile(APPLICANT_PROFILE);
    setDraft(null);
    setEditing(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  const active = editing && draft ? draft : profile;
  const inputFor = (key: string) => (editing ? draft?.[key as keyof ApplicantProfile] ?? '' : profile[key as keyof ApplicantProfile]);

  return (
    <div>
      {/* Header */}
      <div className="mb-7 animate-fade-in-up">
        <p className="eyebrow flex items-center gap-2">
          <span className="h-1 w-7 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600" />
          Applicant Portal
        </p>
        <div className="mt-2.5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 text-xl font-bold text-white shadow-lg shadow-blue-700/25 ring-2 ring-white">
              {getInitials(active.name)}
            </div>
            <div>
              <h1 className="font-display text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[1.9rem]">
                My Profile
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {active.email} · {active.tribe} community, {active.state}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <span
              className={cn(
                'chip',
                profile.profileComplete
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              )}
            >
              {profile.profileComplete ? 'Profile complete' : 'Profile incomplete'}
            </span>
            {editing ? (
              <>
                <button
                  onClick={saveEdit}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30 active:scale-95"
                >
                  Save changes
                </button>
                <button
                  onClick={cancelEdit}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={startEdit}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30 active:scale-95"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 2.5a1.9 1.9 0 0 1 2.7 2.7L5 13.8l-3.5 1 1-3.5L11 2.5Z" />
                  </svg>
                  Edit profile
                </button>
                <button
                  onClick={resetToDemo}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300"
                >
                  Reset demo data
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {saved && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 animate-fade-in" role="status">
          <span className="text-lg">✅</span>
          Profile updated successfully. It will be used as the default in future applications.
        </div>
      )}

      {/* Sections */}
      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <section key={section.title} className="card animate-fade-in-up p-6">
            <div className="mb-5 flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                {section.emoji}
              </span>
              <div>
                <h2 className="section-title">{section.title}</h2>
                <p className="mt-0.5 text-xs text-slate-500">{section.description}</p>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.fields.map((key) => {
                const isIncome = key === 'annualFamilyIncome';
                const isMasked = key === 'bankAccountNumber';
                return (
                  <div key={key}>
                    <dt className="text-xs font-medium text-slate-400">
                      {formatFieldLabel(key)}
                    </dt>
                    {editing ? (
                      <input
                        type={isIncome ? 'number' : 'text'}
                        value={String(inputFor(key))}
                        onChange={(e) => updateDraft(key, e.target.value)}
                        disabled={key === 'email' || isMasked}
                        className="input mt-1.5 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    ) : (
                      <dd
                        className={cn(
                          'mt-1.5 font-medium text-slate-800',
                          isMasked && 'font-mono tracking-widest'
                        )}
                      >
                        {formatFieldValue(profile, key)}
                      </dd>
                    )}
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
      </div>

      {/* Privacy / security note */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg">
            🔒
          </span>
          <div className="text-sm text-slate-600">
            <p className="font-medium text-slate-800">Your data stays protected</p>
            <p className="mt-1 leading-relaxed">
              Sensitive fields like your bank account are masked everywhere in this portal.
              Profile changes are stored locally in your browser in this prototype — when the
              live backend lands, edits will write to your secure, server-side profile.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/applicant/schemes" className="text-sm font-medium text-blue-700 hover:text-blue-800">
          ← Browse schemes and start an application
        </Link>
      </div>
    </div>
  );
}