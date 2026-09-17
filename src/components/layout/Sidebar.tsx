'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';

interface SidebarProps {
  items: NavItem[];
  title: string;
}

export default function Sidebar({ items, title }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <div className="lg:hidden bg-white border-b border-gray-200">
        <nav className="flex gap-2 overflow-x-auto px-4 py-3" aria-label={title}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-full border transition-colors',
                isActive(item.href)
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {item.label}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-gray-200 sticky top-[4.25rem] self-start max-h-[calc(100vh-4.25rem)] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            {title}
          </h2>
          <nav className="space-y-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-r-lg border-l-4 transition-colors',
                    active
                      ? 'bg-blue-50 text-blue-700 border-blue-700 font-semibold'
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
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
