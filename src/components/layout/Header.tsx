'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from '@/components/layout/Logo';
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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 glass shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="h-1 bg-gradient-to-r from-orange-500 via-slate-200 to-emerald-600" />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative transition-transform duration-300 group-hover:scale-[1.05] group-hover:rotate-[-3deg]">
              <span className="absolute -inset-1.5 rounded-2xl bg-indigo-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              <LogoMark size={40} className="relative" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-base font-bold leading-tight tracking-tight text-slate-900">
                Tribal Scholar <span className="text-blue-700">AI</span>
              </h1>
              <p className="text-[0.7rem] leading-tight tracking-wide text-slate-500">
                Scholarship Management System
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {!userRole && !portalLabel && (
              <>
                <Link
                  href="/login"
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    pathname === '/login'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30"
                >
                  Register
                </Link>
              </>
            )}

            {portalLabel && !userRole && (
              <span className="chip border border-blue-200/80 bg-blue-50/80 text-blue-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                </span>
                <span className="hidden sm:inline">{portalLabel} · Demo</span>
                <span className="sm:hidden">Demo</span>
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
              <div className="ml-2 flex items-center gap-2 border-l border-slate-200 pl-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-sm ring-2 ring-white">
                  {userName?.charAt(0) || 'U'}
                </div>
                <span className="hidden text-sm text-slate-600 sm:block">{userName}</span>
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
        'hidden rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 sm:block',
        isActive
          ? 'bg-blue-50 text-blue-700 shadow-[inset_0_-2px_0_0_var(--color-blue-600)]'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      )}
    >
      {children}
    </Link>
  );
}
