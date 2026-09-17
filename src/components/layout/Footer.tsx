'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';

const WORKFLOW_STAGES = [
  { label: 'Application', icon: '📝' },
  { label: 'Documents', icon: '📎' },
  { label: 'Eligibility', icon: '🛡️' },
  { label: 'Scrutiny', icon: '🔎' },
  { label: 'Selection', icon: '📈' },
  { label: 'Decision', icon: '🏁' },
];

const FOOTER_LINKS = {
  schemes: [
{ label: 'National Fellowship for ST', href: '/applicant/schemes' },
      { label: 'National Overseas Scholarship', href: '/applicant/schemes' },
    { label: 'Browse All Schemes', href: '/applicant/schemes' },
    { label: 'Eligibility Rulebook', href: 'https://github.com/SAM4496/tribal-scholar-ai/blob/main/docs/scheme-rulebook.md' },
  ],
  portals: [
    { label: 'Applicant Dashboard', href: '/applicant/dashboard' },
    { label: 'My Applications', href: '/applicant/applications' },
    { label: 'My Documents', href: '/applicant/documents' },
    { label: 'Admin Portal', href: '/admin/dashboard' },
  ],
  resources: [
    { label: 'System Architecture', href: 'https://github.com/SAM4496/tribal-scholar-ai/blob/main/docs/architecture.md' },
    { label: 'API Reference', href: 'https://github.com/SAM4496/tribal-scholar-ai/blob/main/docs/api.md' },
    { label: 'Workflow Guide', href: 'https://github.com/SAM4496/tribal-scholar-ai/blob/main/docs/workflow.md' },
    { label: 'View on GitHub', href: 'https://github.com/SAM4496/tribal-scholar-ai' },
  ],
};

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/SAM4496/tribal-scholar-ai',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.1rem] w-[1.1rem]">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.05rem] w-[1.05rem]">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-800/80 bg-slate-950 text-slate-400">
      {/* Animated gradient hairline */}
      <div className="h-[3px] bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-emerald-500/80 bg-[length:220%_220%] animate-gradient-x" aria-hidden="true" />

      {/* Ambient glows + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-blue-600/15 blur-[110px] animate-aurora" />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-indigo-600/12 blur-[110px] animate-aurora [animation-delay:4s]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-600/8 blur-[120px] animate-aurora [animation-delay:7s]" />
        <div className="absolute inset-0 grid-lines opacity-[0.05] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,black,transparent)]" />
      </div>

      {/* ===== Call-to-action band (landing only) ===== */}
      {isHome && (
        <div className="relative border-b border-white/5">
          <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row lg:px-8">
            <div className="max-w-xl text-center md:text-left">
              <p className="eyebrow text-indigo-300/90">Built for the MoTA Hackathon 2026</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                See your scholarship journey{' '}
                <span className="text-gradient-animated">come to life</span>
              </h2>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="sheen-parent group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-xl shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Create Your Account
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:border-white/30 hover:bg-white/10"
              >
                Explore the Demo
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== Live workflow pipeline strip ===== */}
      <div className="relative border-b border-white/5">
        <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
                Live workflow
                <span className="hidden rounded bg-emerald-500/10 px-1.5 py-0.5 text-[0.6rem] text-emerald-400 sm:inline-block">
                  Track your application in real time
                </span>
              </p>
            </div>

            <ul className="flex w-full items-center lg:w-auto">
              {WORKFLOW_STAGES.map((stage, index) => {
                const isLast = index === WORKFLOW_STAGES.length - 1;
                const live = index === 4;
                return (
                  <li key={stage.label} className={cn('flex items-center', !isLast && 'flex-1 lg:flex-none')}>
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={cn(
                          'relative flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-all',
                          live
                            ? 'border-indigo-400/60 bg-indigo-500/15 text-indigo-200 shadow-[0_0_18px_rgba(99,102,241,0.35)]'
                            : index < 4
                              ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300'
                              : 'border-white/10 bg-white/5 text-slate-500'
                        )}
                      >
                        {live && (
                          <span className="animate-ping-ring absolute inset-0 rounded-full bg-indigo-500/40" aria-hidden="true" />
                        )}
                        <span aria-hidden="true">{stage.icon}</span>
                      </span>
                      <span
                        className={cn(
                          'hidden whitespace-nowrap text-[0.625rem] font-medium lg:block',
                          live ? 'text-indigo-300' : 'text-slate-500'
                        )}
                      >
                        {stage.label}
                      </span>
                    </div>
                    {!isLast && (
                      <span
                        className={cn(
                          'mx-2 h-px flex-1 rounded-full lg:w-10 lg:flex-none',
                          index < 4
                            ? 'bg-gradient-to-r from-emerald-400/50 to-slate-600/50'
                            : 'bg-white/10'
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Main link grid ===== */}
      <div className="relative">
        <div className="mx-auto grid max-w-[90rem] grid-cols-2 gap-x-8 gap-y-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:grid-cols-12 lg:px-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
                <span className="absolute -inset-2 rounded-3xl bg-indigo-500/25 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                <LogoMark size={44} className="relative" glow />
              </div>
              <div>
                <p className="font-display text-lg font-bold leading-tight tracking-tight text-white">
                  Tribal Scholar <span className="text-gradient-animated">AI</span>
                </p>
                <p className="text-[0.7rem] tracking-wide text-slate-500">
                  Scholarship Management System
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              An AI-enabled scholarship and fellowship management system for the
              Ministry of Tribal Affairs — from eligibility to merit list, every
              step transparent and audited.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              All systems operational · Demo build
            </div>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white hover:shadow-[0_0_18px_rgba(99,102,241,0.25)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(
            [
              ['Supported Schemes', FOOTER_LINKS.schemes],
              ['Portals', FOOTER_LINKS.portals],
              ['Resources', FOOTER_LINKS.resources],
            ] as const
          ).map(([heading, links], colIndex) => (
            <div key={heading} className="lg:col-span-2">
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
                <span
                  className="h-[3px] w-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  aria-hidden="true"
                />
                {heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        'group inline-flex items-center gap-1.5 text-sm leading-relaxed transition-colors duration-200',
                        link.href.startsWith('/')
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-500 hover:text-white'
                      )}
                    >
                      <span
                        className="h-px w-0 bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 group-hover:w-3"
                        aria-hidden="true"
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Quick-actions strip — only on first column */}
              {colIndex === 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/login"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-blue-400/40 hover:text-white"
                  >
                    Applicant Login
                  </Link>
                  <Link
                    href="/admin/dashboard"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-blue-400/40 hover:text-white"
                  >
                    Admin Portal
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* Demo card */}
          <div className="col-span-2 lg:col-span-2">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
              <span className="h-[3px] w-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" aria-hidden="true" />
              Status
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Prototype build</span>
                <span className="rounded bg-amber-400/15 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-amber-300">
                  v0.1
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Running on simulated demo data. Live APIs and production
                infrastructure land at integration time.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[0.7rem] font-medium text-slate-400">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                44 static routes · shipped to Vercel
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="relative border-t border-white/5">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-slate-500 sm:px-6 md:flex-row md:text-left lg:px-8">
          <p>
            © {new Date().getFullYear()} Hackathon Team · Built for the{' '}
            <span className="font-semibold text-slate-300">MoTA Hackathon</span>
          </p>
          <p className="flex items-center gap-1.5 text-center">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            Not an official Government of India application
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:text-white"
          >
            Back to top
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 13V3M4 7l4-4 4 4" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== Ghost wordmark watermark ===== */}
      {isHome && (
        <div aria-hidden="true" className="pointer-events-none relative select-none overflow-hidden">
          <div className="mx-auto -mb-8 max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <p className="whitespace-nowrap text-center font-display text-[17vw] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(148,163,184,0.10)]">
              TRIBAL SCHOLAR AI
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}