'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogoMark } from '@/components/layout/Logo';
import { cn, getInitials } from '@/lib/utils';
import { isAdminPortalRole } from '@/lib/session-crypto';

interface HeaderUser {
  name: string;
  role: string;
  email?: string;
}

interface HeaderProps {
  user?: HeaderUser | null;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const portalLabel = pathname.startsWith('/admin')
    ? 'Admin Portal'
    : pathname.startsWith('/applicant')
      ? 'Applicant Portal'
      : null;

  const isAdmin = !!user && isAdminPortalRole(user.role);
  const isApplicant = !!user && user.role === 'APPLICANT';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 glass shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="h-1 bg-gradient-to-r from-orange-500 via-slate-200 to-emerald-600" />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={isApplicant ? '/applicant/dashboard' : isAdmin ? '/admin/dashboard' : '/'} className="group flex items-center gap-3">
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
            {!user && !portalLabel && (
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

            {portalLabel && !user && (
              <span className="chip border border-blue-200/80 bg-blue-50/80 text-blue-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                </span>
                <span className="hidden sm:inline">{portalLabel}</span>
                <span className="sm:hidden">Portal</span>
              </span>
            )}

            {isApplicant && (
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

            {isAdmin && (
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

            {user && (
              <div className="ml-1 flex items-center gap-2 border-l border-slate-200 pl-3 sm:ml-2 sm:pl-2">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-sm ring-2 ring-white"
                  title={user.name}
                >
                  {getInitials(user.name)}
                </div>
                <div className="hidden leading-tight md:block">
                  <p className="max-w-[10rem] truncate text-sm font-medium text-slate-800">
                    {user.name}
                  </p>
                  <p className="text-[0.65rem] font-medium uppercase tracking-wide text-slate-400">
                    {user.role.replace(/_/g, ' ')}
                  </p>
                </div>
                <LogoutButton />
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
      title="Sign out"
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 3h3v10h-3M6.5 8h6M9 5.5 11.5 8 9 10.5" />
      </svg>
      <span className="hidden sm:inline">{pending ? 'Signing out…' : 'Sign out'}</span>
    </button>
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