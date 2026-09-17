import Link from 'next/link';
import type { ReactNode } from 'react';
import HeroFx from '@/components/landing/HeroFx';
import HeroShell from '@/components/landing/HeroShell';
import RotatingWord from '@/components/landing/RotatingWord';
import CountUp from '@/components/landing/CountUp';
import Reveal from '@/components/landing/Reveal';

const MARQUEE_ITEMS = [
  'AI-Powered OCR',
  'NFST · M.Phil / Ph.D.',
  'NOS · Overseas Studies',
  'Eligibility Engine',
  'Transparent Merit Lists',
  'Full Audit Trail',
  'Secure Role-Based Access',
  'Live Status Tracking',
];

const HERO_STATS = [
  { to: 2, suffix: '', label: 'Active Schemes', sub: 'NFST & NOS', bar: 100, delay: 0 },
  { to: 6, suffix: '', label: 'Workflow Stages', sub: 'Application to selection', bar: 78, delay: 120 },
  { to: 100, suffix: '%', label: 'Audit Coverage', sub: 'Every action logged', bar: 100, delay: 240 },
  { to: 48, suffix: '+', label: 'Demo Applications', sub: 'Processed end-to-end', bar: 64, delay: 360 },
];

const STEPS = [
  {
    icon: 'user',
    label: 'STEP 01',
    title: 'Register & Complete Profile',
    description:
      'Create your account and build a complete profile with personal, academic, and tribal-identity details.',
  },
  {
    icon: 'clipboard',
    label: 'STEP 02',
    title: 'Choose Scheme & Apply',
    description:
      'Browse NFST or NOS, check eligibility instantly, and fill the guided application form.',
  },
  {
    icon: 'upload',
    label: 'STEP 03',
    title: 'Upload & Verify Documents',
    description:
      'Upload required documents. AI verifies and extracts information with confidence scores.',
  },
  {
    icon: 'trend',
    label: 'STEP 04',
    title: 'Track, Resolve & Get Selected',
    description:
      'Follow your status in real time, respond to deficiencies, and see final selection on the merit list.',
  },
];

const STEP_ICONS: Record<string, ReactNode> = {
  user: (
    <>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h6" />
    </>
  ),
  upload: (
    <>
      <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
      <path d="M12 12v9" />
      <path d="m8 16 4-4 4 4" />
    </>
  ),
  trend: (
    <>
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </>
  ),
};

export default function HomePage() {
  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="h-1 bg-gradient-to-r from-orange-500 via-white/70 to-emerald-500" />
        <div className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-40 w-[52rem] max-w-full rounded-[100%] bg-blue-600/20 blur-[120px] animate-aurora" />
        <div className="pointer-events-none absolute -left-44 -top-48 h-[36rem] w-[36rem] rounded-full bg-blue-600/25 blur-[130px] animate-aurora" />
        <div className="pointer-events-none absolute -right-40 -top-24 h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-[130px] animate-aurora [animation-delay:3s]" />
        <div className="pointer-events-none absolute -bottom-36 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] animate-aurora [animation-delay:6s]" />

        <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.12] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        <div className="pointer-events-none absolute -right-24 top-1/3 hidden h-72 w-72 animate-spin-slower lg:block">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-6 rounded-full border border-dashed border-white/15" />
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]" />
        </div>

        <HeroFx />

        <div className="relative mx-auto max-w-[86rem] px-4 pb-20 pt-24 sm:px-6 sm:pt-32 lg:px-8">
          <HeroShell>
            <div className="mx-auto max-w-4xl text-center">
              <div
                className="hs inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-400/10 px-3.5 py-1.5 text-xs font-medium text-amber-200 backdrop-blur sheen-parent"
                style={{ transitionDelay: '150ms' }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                </span>
                Hackathon Prototype / Demo
              </div>

              <h1
                className="hs mt-7 font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.1rem]"
                style={{ transitionDelay: '280ms' }}
              >
                AI-Enabled{' '}
                <span className="text-gradient-animated">Scholarship</span> &amp; Fellowship
                Management
              </h1>

              <p
                className="hs mt-6 flex items-center justify-center gap-x-2 font-display text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ transitionDelay: '420ms' }}
              >
                Every <RotatingWord className="text-gradient-animated" /> begins here.
                <span className="animate-blink-caret ml-1 inline-block h-8 w-[3px] bg-white/80" />
              </p>

              <p
                className="hs mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
                style={{ transitionDelay: '520ms' }}
              >
                A digital platform managing the complete lifecycle of scholarship and fellowship
                applications for Scheduled Tribe students under the Ministry of Tribal Affairs.
              </p>

              <div
                className="hs mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
                style={{ transitionDelay: '660ms' }}
              >
                <Link
                  href="/register"
                  className="sheen-parent group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-slate-900 shadow-xl shadow-black/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-2xl"
                >
                  Apply Now
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Login to Portal
                </Link>
              </div>
            </div>

            {/* ===== Animated stat strip ===== */}
            <div className="hs mt-16" style={{ transitionDelay: '820ms' }}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-600/10 to-transparent" />
                <div className="grid grid-cols-2 gap-px bg-white/5 sm:grid-cols-4">
                  {HERO_STATS.map((stat) => (
                    <div key={stat.label} className="relative bg-slate-950/60 px-5 py-5 sm:px-6">
                      <div className="flex items-end justify-between gap-2">
                        <span className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          <CountUp to={stat.to} suffix={stat.suffix} />
                        </span>
                        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-emerald-300/90">
                          ● live
                        </span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="animate-grow-x h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400"
                          style={{ width: `${stat.bar}%`, animationDelay: `${900 + stat.delay}ms` }}
                        />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-200">{stat.label}</p>
                      <p className="text-xs text-slate-500">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HeroShell>

          {/* Scroll cue */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 md:flex">
            <span className="text-[0.62rem] uppercase tracking-[0.28em] text-slate-500">
              Scroll to explore
            </span>
            <span className="flex flex-col items-center gap-1">
              <span className="animate-bounce-down block h-2 w-[3px] rounded-full bg-slate-400" />
              <span className="animate-bounce-down block h-4 w-[3px] rounded-full bg-slate-500 [animation-delay:0.18s]" />
              <span className="animate-bounce-down block h-2 w-[3px] rounded-full bg-slate-500 [animation-delay:0.36s]" />
            </span>
          </div>
        </div>
      </section>

      {/* ===== Marquee strip ===== */}
      <div className="relative overflow-hidden border-y border-white/10 bg-slate-900 py-3.5">
        <div className="animate-marquee-slow flex w-max items-center gap-10 whitespace-nowrap pr-10">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {item}
              <span className="text-amber-400/70" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== Schemes ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="eyebrow">Programmes</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Available Schemes
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Two flagship programmes built to support Scheduled Tribe students at every stage of
                higher-education — from PhD research to overseas study.
              </p>
              <div className="divider-accent mx-auto mt-6 w-24" />
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <Reveal delay={80}>
              <SchemeCard
                emoji="🎓"
                tile="from-blue-500 to-indigo-600"
                scheme="National Fellowship for Scheduled Tribes"
                title="National Fellowship for ST (NFST)"
                description="Financial assistance for Scheduled Tribe students pursuing M.Phil and Ph.D. degrees in Indian universities and research institutions."
                funding="₹31,000/mo + contingency"
                level="M.Phil / Ph.D."
                duration="5 years"
                tags={[
                  { label: 'Domestic Research', tone: 'bg-blue-50 text-blue-700' },
                  { label: 'Open 2026-27', tone: 'bg-emerald-50 text-emerald-700' },
                ]}
              />
            </Reveal>
            <Reveal delay={180}>
              <SchemeCard
                emoji="🌍"
                tile="from-emerald-500 to-teal-600"
                scheme="National Overseas Scholarship"
                title="National Overseas Scholarship (NOS)"
                description="Financial assistance for Scheduled Tribe students pursuing Master's and Ph.D. programs at top-ranked universities abroad."
                funding="Full tuition + living"
                level="Master's / Ph.D."
                duration="3 years"
                tags={[
                  { label: 'Overseas', tone: 'bg-orange-50 text-orange-700' },
                  { label: 'Top Universities', tone: 'bg-violet-50 text-violet-700' },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="border-t border-slate-200/70 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="eyebrow">Capabilities</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Platform Features
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Every stage of the scholarship lifecycle — automated, transparent, and audited.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: '📄',
                tile: 'from-blue-500 to-indigo-600',
                title: 'Smart Document Processing',
                description: 'AI-powered OCR extracts and verifies information from uploaded documents automatically.',
                delay: 0,
              },
              {
                icon: '✅',
                tile: 'from-emerald-500 to-teal-600',
                title: 'Automatic Eligibility Check',
                description: 'Configurable rules engine validates eligibility criteria against applicant data.',
                delay: 100,
              },
              {
                icon: '📊',
                tile: 'from-violet-500 to-purple-600',
                title: 'Transparent Selection',
                description: 'Clear scoring criteria with full transparency — every score has a visible reason.',
                delay: 200,
              },
              {
                icon: '🔒',
                tile: 'from-amber-500 to-orange-600',
                title: 'Secure & Audited',
                description: 'Complete audit trail of all actions. Role-based access ensures data security.',
                delay: 300,
              },
            ].map((feature) => (
              <Reveal key={feature.title} delay={feature.delay}>
                <FeatureCard {...feature} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="border-t border-slate-200/70 py-20 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="eyebrow">Process</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                From first profile to final selection — four guided steps with automation at every
                point of the journey.
              </p>
              <div className="divider-accent mx-auto mt-6 w-24" />
            </div>
          </Reveal>

          <div className="relative mx-auto max-w-5xl">
            {/* Connector line (desktop) */}
            <Reveal className="hidden lg:block">
              <div className="pointer-events-none absolute left-[12%] right-[12%] top-6 h-[2px]">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-300 via-indigo-300 to-emerald-300 opacity-60" />
                <span className="animate-pulse-soft absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 opacity-60" />
              </div>
            </Reveal>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {STEPS.map((step, i) => (
                <Reveal key={step.label} delay={i * 100}>
                  <ProcessStep {...step} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pt-4 pb-20 sm:pb-24">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-16 text-center shadow-2xl shadow-blue-900/20 sm:px-12">
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-[100px] animate-aurora" />
              <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-violet-600/25 blur-[100px] animate-aurora [animation-delay:4s]" />
              <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.08]" />

              <div className="relative">
                <p className="eyebrow text-slate-400">Ready when you are</p>
                <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Start your{' '}
                  <span className="text-gradient-animated">scholarship journey</span> today
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-slate-400">
                  Create your profile in minutes and let the platform guide you through eligibility,
                  documents, and selection.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/register"
                    className="sheen-parent group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-slate-900 shadow-xl shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
                  >
                    Create Your Account
                    <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all duration-200 hover:border-white/35 hover:bg-white/10"
                  >
                    Explore the Demo
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Disclaimer ===== */}
      <section className="border-t border-amber-200/80 bg-amber-50 py-6">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-amber-900">
            ⚠️ <strong>Disclaimer:</strong> This is a hackathon prototype/demo application. It is NOT
            an official Government of India or Ministry of Tribal Affairs application. All data shown
            is simulated for demonstration purposes only.
          </p>
        </div>
      </section>
    </div>
  );
}

function SchemeCard({
  emoji,
  tile,
  scheme,
  title,
  description,
  funding,
  level,
  duration,
  tags,
}: {
  emoji: string;
  tile: string;
  scheme: string;
  title: string;
  description: string;
  funding: string;
  level: string;
  duration: string;
  tags: { label: string; tone: string }[];
}) {
  return (
    <div className="card card-hover group relative overflow-hidden p-6 sm:p-7">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tile} opacity-80 transition-all duration-500 group-hover:h-1.5`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${tile} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tile} text-xl shadow-lg shadow-blue-900/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
          >
            <span>{emoji}</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Open · 2026-27
          </span>
        </div>

        <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {scheme}
        </p>
        <h3 className="section-title mt-1 text-xl">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{description}</p>

        <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-100 py-4">
          <div>
            <dt className="text-[0.65rem] font-medium uppercase tracking-wide text-slate-400">Funding</dt>
            <dd className="mt-1 text-[0.8rem] font-semibold leading-snug text-slate-800">{funding}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-medium uppercase tracking-wide text-slate-400">Level</dt>
            <dd className="mt-1 text-[0.8rem] font-semibold leading-snug text-slate-800">{level}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-medium uppercase tracking-wide text-slate-400">Duration</dt>
            <dd className="mt-1 text-[0.8rem] font-semibold leading-snug text-slate-800">{duration}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag.label} className={`chip ${tag.tone}`}>
              {tag.label}
            </span>
          ))}
        </div>

        <Link
          href="/login"
          className="group/btn mt-6 flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-blue-700 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
        >
          View Details &amp; Apply
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-[0.7rem] text-white transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:bg-blue-800" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  tile,
  title,
  description,
}: {
  icon: string;
  tile: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card card-hover group p-6">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tile} text-lg shadow-md shadow-slate-900/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
      >
        <span>{icon}</span>
      </div>
      <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function ProcessStep({
  icon,
  label,
  title,
  description,
}: {
  icon: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative flex flex-col items-center text-center">
      <div className="relative mb-5">
        <span className="absolute -inset-2 rounded-2xl bg-indigo-100 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-700/25 ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {STEP_ICONS[icon]}
          </svg>
        </div>
        <span className="absolute -right-3 -top-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-[0.58rem] font-bold tracking-wide text-white shadow-sm">
          {label}
        </span>
      </div>

      <h3 className="font-display text-base font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}