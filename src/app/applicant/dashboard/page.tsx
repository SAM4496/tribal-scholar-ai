import Link from 'next/link';
import { ApplicationStatus } from '@/types';
import {
  getApplicantApplications,
  getApplicantStats,
} from '@/lib/mock-applicant-applications';
import { APPLICANT_NOTIFICATIONS } from '@/lib/mock-notifications';
import { getSchemes } from '@/lib/mock-schemes';
import { readSession } from '@/lib/session';
import { cn, formatDateTime } from '@/lib/utils';
import ApplicationCard from '@/components/applicant/ApplicationCard';

function firstName(name: string): string {
  return name.split(' ')[0] ?? name;
}

export default async function ApplicantDashboard() {
  const session = await readSession();
  const applications = getApplicantApplications();
  const stats = getApplicantStats(applications);
  const deficiencies = applications.filter(
    (a) => a.status === ApplicationStatus.DEFICIENT
  );
  const drafts = applications.filter((a) => a.status === ApplicationStatus.DRAFT);
  const recent = [...applications]
    .sort((a, b) => (b.submittedAt ?? b.createdAt).localeCompare(a.submittedAt ?? a.createdAt))
    .slice(0, 3);
  const notifications = APPLICANT_NOTIFICATIONS.slice(0, 4);
  const unreadCount = APPLICANT_NOTIFICATIONS.filter((n) => !n.isRead).length;
  const openSchemes = getSchemes().filter((s) => s.status === 'OPEN').length;

  const statCards = [
    {
      label: 'In Progress',
      value: stats.inProgress,
      hint: 'Actively under review',
      tone: 'text-blue-700',
      icon: '⚙️',
      tint: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Needs Action',
      value: stats.needsAction,
      hint: deficiencies.length > 0 ? `${deficiencies.length} deficiency raised` : 'Drafts & deficiencies',
      tone: stats.needsAction > 0 ? 'text-orange-600' : 'text-slate-400',
      icon: '⚠️',
      tint: stats.needsAction > 0 ? 'bg-orange-50 text-orange-500' : 'bg-slate-100 text-slate-400',
    },
    {
      label: 'Completed',
      value: stats.completed,
      hint: 'Final decisions shared',
      tone: 'text-emerald-600',
      icon: '✅',
      tint: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Open Schemes',
      value: openSchemes,
      hint: 'Ready to apply',
      tone: 'text-indigo-600',
      icon: '📋',
      tint: 'bg-indigo-50 text-indigo-600',
    },
  ];

  const quickActions = [
    {
      label: 'Browse Schemes',
      description: 'Explore open scholarships',
      href: '/applicant/schemes',
      icon: '📋',
      tint: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: drafts.length > 0 ? 'Resume Draft' : 'My Applications',
      description: drafts.length > 0 ? `${drafts.length} application${drafts.length > 1 ? 's' : ''} waiting` : 'Track every application',
      href: '/applicant/applications',
      icon: '📄',
      tint: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'My Documents',
      description: 'Upload & verify documents',
      href: '/applicant/documents',
      icon: '🗂️',
      tint: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Complete Profile',
      description: 'Keep your ST details current',
      href: '/applicant/profile',
      icon: '👤',
      tint: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-7 animate-fade-in-up overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600" />
              Applicant Portal
            </p>
            <h1 className="mt-2.5 font-display text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[2rem]">
              Welcome back, {firstName(session?.name ?? 'there')} 👋
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              {stats.needsAction > 0
                ? 'You have applications that need your attention. Take a look at the alerts below.'
                : 'Here’s what’s happening with your scholarship applications today.'}
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/applicant/schemes"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-700/30 active:scale-95"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 11V5M5 8h6" />
                <circle cx="8" cy="8" r="6.5" />
              </svg>
              Apply for a Scheme
            </Link>
          </div>
        </div>
      </div>

      {/* Deficiency alert */}
      {deficiencies.length > 0 && (
        <div className="mb-7 animate-fade-in-up rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="relative mt-0.5 flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  Action required on {deficiencies.length === 1 ? 'an application' : `${deficiencies.length} applications`}
                </p>
                <p className="mt-0.5 text-sm text-orange-700/80">
                  {deficiencies.map((d) => d.schemeName).join(', ')} — a document needs to be re-uploaded.
                </p>
              </div>
            </div>
            <Link
              href="/applicant/applications"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
            >
              Resolve now
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className="card animate-fade-in-up p-4 sm:p-5"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[0.8rem] font-medium text-slate-500">{stat.label}</p>
                <p className={cn('mt-1.5 font-display text-3xl font-bold tracking-tight', stat.tone)}>
                  {stat.value}
                </p>
                <p className="mt-0.5 hidden truncate text-xs text-slate-400 sm:block">{stat.hint}</p>
              </div>
              <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg', stat.tint)}>
                {stat.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent applications */}
        <div className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Recent applications</h2>
            <Link
              href="/applicant/applications"
              className="text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              View all →
            </Link>
          </div>
          {recent.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {recent.map((app, index) => (
                <ApplicationCard key={app.id} application={app} delayMs={index * 80} />
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center">
              <div className="text-4xl">📋</div>
              <h3 className="section-title mt-3">No applications yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Browse the available schemes and submit your first application.
              </p>
              <Link
                href="/applicant/schemes"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30"
              >
                Browse Schemes →
              </Link>
            </div>
          )}
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          {/* Notifications preview */}
          <div className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="section-title">Notifications</h2>
              {unreadCount > 0 && (
                <span className="chip bg-red-50 text-red-600">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li key={n.id}>
                  <Link
                    href="/applicant/notifications"
                    className="group block rounded-xl border border-slate-100 p-3 transition-colors hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className={cn('mt-0.5 flex h-2.5 w-2.5 shrink-0 rounded-full', n.isRead ? 'bg-slate-200' : 'bg-blue-500')} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800 group-hover:text-blue-700">
                          {n.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                          {n.message}
                        </p>
                        <p className="mt-1 text-[0.65rem] font-medium text-slate-400">
                          {formatDateTime(n.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/applicant/notifications"
              className="mt-4 block text-center text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              View all notifications
            </Link>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <h2 className="section-title mb-4">Quick actions</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex items-start gap-3 rounded-xl border border-slate-100 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                >
                  <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg', action.tint)}>
                    {action.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-800 group-hover:text-blue-700">
                      {action.label}
                    </span>
                    <span className="block truncate text-xs text-slate-400">{action.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}