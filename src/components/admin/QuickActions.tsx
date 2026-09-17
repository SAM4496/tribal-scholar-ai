import Link from 'next/link';
import type { ReactNode } from 'react';

interface QuickAction {
  title: string;
  subtitle: string;
  href: string;
  gradient: string;
  icon: ReactNode;
}

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ACTIONS: QuickAction[] = [
  {
    title: 'Review Applications',
    subtitle: 'Triage new submissions',
    href: '/admin/applications',
    gradient: 'from-blue-500 to-indigo-600',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" {...STROKE} aria-hidden="true">
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    ),
  },
  {
    title: 'Documents Queue',
    subtitle: 'Verify AI-checked uploads',
    href: '/admin/documents',
    gradient: 'from-sky-400 to-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" {...STROKE} aria-hidden="true">
        <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
        <path d="M12 12v9" />
        <path d="m8 16 4-4 4 4" />
      </svg>
    ),
  },
  {
    title: 'Manage Deficiencies',
    subtitle: 'Resolve open requests',
    href: '/admin/deficiencies',
    gradient: 'from-amber-400 to-orange-500',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" {...STROKE} aria-hidden="true">
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Selection & Merit',
    subtitle: 'Score and approve',
    href: '/admin/selection',
    gradient: 'from-indigo-400 to-violet-600',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" {...STROKE} aria-hidden="true">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13 17 22l-5-3-5 3 1.5-9" />
      </svg>
    ),
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {ACTIONS.map((action, index) => (
        <Link
          key={action.title}
          href={action.href}
          style={{ animationDelay: `${index * 60}ms` }}
          className="animate-fade-in-up card card-hover group relative overflow-hidden p-4"
        >
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${action.gradient} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient} text-white shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
            >
              {action.icon}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">{action.title}</p>
              <p className="truncate text-xs text-slate-500">{action.subtitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}