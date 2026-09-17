'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userRole?: 'APPLICANT' | 'ADMIN' | null;
  userName?: string;
}

export default function Header({ userRole, userName }: HeaderProps) {
  const pathname = usePathname();
  const portalLabel = pathname.startsWith('/admin')
    ? 'Admin Portal'
    : pathname.startsWith('/applicant')
      ? 'Applicant Portal'
      : null;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar — Indian government style accent */}
      <div className="bg-gradient-to-r from-orange-600 via-white to-green-600 h-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                Tribal Scholar AI
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                Scholarship Management System
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {!userRole && !portalLabel && (
              <>
                <Link
                  href="/login"
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === '/login'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Register
                </Link>
              </>
            )}

            {portalLabel && !userRole && (
              <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="hidden sm:inline">{portalLabel} · Demo</span>
              </span>
            )}

            {userRole === 'APPLICANT' && (
              <>
                <NavLink href="/applicant/dashboard" current={pathname}>
                  Dashboard
                </NavLink>
                <NavLink href="/applicant/schemes" current={pathname}>
                  Schemes
                </NavLink>
                <NavLink href="/applicant/applications" current={pathname}>
                  Applications
                </NavLink>
                <NavLink href="/applicant/profile" current={pathname}>
                  Profile
                </NavLink>
              </>
            )}

            {userRole === 'ADMIN' && (
              <>
                <NavLink href="/admin/dashboard" current={pathname}>
                  Dashboard
                </NavLink>
                <NavLink href="/admin/applications" current={pathname}>
                  Applications
                </NavLink>
                <NavLink href="/admin/selection" current={pathname}>
                  Selection
                </NavLink>
                <NavLink href="/admin/reports" current={pathname}>
                  Reports
                </NavLink>
                <NavLink href="/admin/audit" current={pathname}>
                  Audit Log
                </NavLink>
              </>
            )}

            {userRole && (
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">
                    {userName?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="hidden sm:block text-sm text-gray-600">
                  {userName}
                </span>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: string;
  children: React.ReactNode;
}) {
  const isActive = current.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        'px-3 py-2 text-sm font-medium rounded-lg transition-colors hidden sm:block',
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      )}
    >
      {children}
    </Link>
  );
}
