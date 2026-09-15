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

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4.5rem)] hidden lg:block">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          {title}
        </h2>
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-3 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
