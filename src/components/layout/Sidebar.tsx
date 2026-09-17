'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import NavIcon from './NavIcon';

interface SidebarProps {
  items: NavItem[];
  title: string;
}

export default function Sidebar({ items, title }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <div className="sticky top-[4.1rem] z-40 border-b border-slate-200/70 glass lg:hidden">
        <nav className="flex gap-2 overflow-x-auto px-4 py-3" aria-label={title}>
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95',
                  active
                    ? 'border-transparent bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-600/25'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900'
                )}
              >
                <NavIcon href={item.href} className="h-4 w-4" />
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <aside className="sticky top-[4.1rem] hidden max-h-[calc(100vh-4.1rem)] w-72 shrink-0 self-start overflow-y-auto border-r border-slate-200/70 bg-white/70 backdrop-blur-xl lg:block">
        <div className="p-5">
          <p className="eyebrow mb-4 px-1">{title}</p>
          <nav className="space-y-1.5">
            {items.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className={cn(
                    'animate-slide-in-right group relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-700/25'
                      : 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200',
                      active
                        ? 'bg-white/15 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-700 group-hover:shadow-sm'
                    )}
                  >
                    <NavIcon href={item.href} className="h-[1.05rem] w-[1.05rem]" />
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        active ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-4">
            <p className="text-xs font-semibold text-slate-700">Hackathon Prototype</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Running on demo data. Live APIs will replace the mock layer at integration time.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

// Pre-configured sidebar items for applicant portal
export const applicantNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/applicant/dashboard' },
  { label: 'My Profile', href: '/applicant/profile' },
  { label: 'Browse Schemes', href: '/applicant/schemes' },
  { label: 'My Applications', href: '/applicant/applications' },
  { label: 'My Documents', href: '/applicant/documents' },
  { label: 'Notifications', href: '/applicant/notifications' },
];

// Pre-configured sidebar items for admin portal
export const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Applications', href: '/admin/applications' },
  { label: 'Documents', href: '/admin/documents' },
  { label: 'Deficiencies', href: '/admin/deficiencies' },
  { label: 'Selection', href: '/admin/selection' },
  { label: 'Reports & Analytics', href: '/admin/reports' },
  { label: 'Audit Log', href: '/admin/audit' },
];
