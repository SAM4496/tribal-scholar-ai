'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LogoMark } from '@/components/layout/Logo';
import NavIcon from '@/components/layout/NavIcon';
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

interface HeaderLink {
  href: string;
  label: string;
}

const APPLICANT_LINKS: HeaderLink[] = [
  { href: '/applicant/dashboard', label: 'Dashboard' },
  { href: '/applicant/schemes', label: 'Schemes' },
  { href: '/applicant/applications', label: 'Applications' },
  { href: '/applicant/profile', label: 'Profile' },
];

const ADMIN_LINKS: HeaderLink[] = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/selection', label: 'Selection' },
  { href: '/admin/reports', label: 'Reports' },
  { href: '/admin/audit', label: 'Audit' },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + '/');
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const portalLabel = pathname.startsWith('/admin')
    ? 'Admin Portal'
    : pathname.startsWith('/applicant')
      ? 'Applicant Portal'
      : null;

  const isAdmin = !!user && isAdminPortalRole(user.role);
  const isApplicant = !!user && user.role === 'APPLICANT';
  const portalLinks = isApplicant ? APPLICANT_LINKS : isAdmin ? ADMIN_LINKS : [];

  const roleHomeHref = isApplicant
    ? '/applicant/dashboard'
    : isAdmin
      ? '/admin/dashboard'
      : '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 overflow-hidden border-b transition-all duration-500',
        scrolled
          ? 'border-slate-200 bg-white/90 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.22)]'
          : 'border-slate-200/60 glass shadow-[0_1px_3px_rgba(15,23,42,0.04)]'
      )}
    >
      {/* Ambient aurora glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-16 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl animate-aurora" />
      </div>

      {/* Animated gradient hairline */}
      <div className="relative h-1 bg-gradient-to-r from-amber-400 via-blue-600 to-emerald-500 bg-[length:220%_220%] animate-gradient-x" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-400/70 via-blue-600/70 to-emerald-500/70 blur-[2px]" aria-hidden="true" />

      {/* Bottom premium hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* ===== Brand ===== */}
          <Link
            href={roleHomeHref}
            className="group flex shrink-0 items-center gap-3"
            aria-label="Tribal Scholar AI home"
          >
            <div className="relative animate-float-slow transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-[1.06]">
              <span className="absolute -inset-1.5 rounded-2xl bg-indigo-500/25 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute -inset-0.5 rounded-[13px] bg-gradient-to-tr from-blue-500/20 to-indigo-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <LogoMark size={40} className="relative" />
            </div>

            <div className="hidden sm:block">
              <p className="font-display text-base font-bold leading-tight tracking-tight text-slate-900">
                <span className="text-slate-900">Tribal Scholar</span>{' '}
                <span className="text-gradient-animated">AI</span>
              </p>
              <div className="mt-0.5 h-[3px] w-24 origin-left rounded-full bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 transition-all duration-500 group-hover:w-28" />
              <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Scholarship Management System
              </p>
            </div>
          </Link>

          {/* ===== Desktop nav ===== */}
          {portalLinks.length > 0 && (
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
              {portalLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                      active
                        ? 'text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute inset-x-2.5 -bottom-px h-[2.5px] origin-left rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-transform duration-300',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>
          )}

          {/* ===== Auth / user actions ===== */}
          <div className="flex items-center gap-2 sm:gap-3">
            {portalLabel && !user && (
              <span className="chip border border-blue-200/80 bg-blue-50/70 text-blue-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                </span>
                <span className="hidden sm:inline">{portalLabel}</span>
                <span className="sm:hidden">Portal</span>
              </span>
            )}

            {!user && !portalLabel && (
              <>
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-blue-200 hover:text-blue-700 hover:shadow-md sm:inline-flex"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3h3v10h-3M6.5 8H13M9 5.5 11.5 8 9 10.5" />
                  </svg>
                  Login
                </Link>
                <Link
                  href="/register"
                  className="sheen-parent inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(79,70,229,0.75)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_32px_-10px_rgba(79,70,229,0.9)]"
                >
                  Register
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8h9M8.5 4l4 4-4 4" />
                  </svg>
                </Link>
              </>
            )}

            {user && (
              <div className="flex items-center gap-2 border-l border-slate-200 pl-2 sm:gap-2.5 sm:pl-3">
                <Link href={roleHomeHref} className="group relative" aria-label="Go to dashboard">
                  <span className="block rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 p-[2px] transition-transform duration-300 group-hover:scale-105">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold leading-none text-slate-700 shadow-inner">
                      {getInitials(user.name)}
                    </span>
                  </span>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                </Link>

                <div className="hidden leading-tight md:block">
                  <p className="max-w-[10rem] truncate text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>
                  <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">
                    <span className={cn('h-1.5 w-1.5 rounded-full', isAdmin ? 'bg-blue-500' : 'bg-emerald-500')} />
                    {user.role.replace(/_/g, ' ')}
                  </p>
                </div>

                <LogoutButton />
              </div>
            )}

            {/* Mobile menu toggle */}
            {portalLinks.length > 0 && (
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 lg:hidden',
                  menuOpen
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 shadow-sm hover:border-blue-200 hover:text-blue-700'
                )}
              >
                {menuOpen ? (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M5 5l10 10M15 5 5 15" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== Mobile drawer ===== */}
      {menuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 animate-fade-in bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm animate-slide-in-right flex-col border-l border-slate-200/70 bg-white/95 shadow-2xl backdrop-blur-2xl">
            {/* Drawer brand */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <Link href={roleHomeHref} className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
                <LogoMark size={32} />
                <div>
                  <p className="font-display text-sm font-bold leading-tight text-slate-900">
                    Tribal Scholar <span className="text-gradient-animated">AI</span>
                  </p>
                  {portalLabel && (
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {portalLabel}
                    </p>
                  )}
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M5 5l10 10M15 5 5 15" />
                </svg>
              </button>
            </div>

            {/* User card */}
            {user && (
              <div className="mx-5 mt-4 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 p-[2px]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700">
                      {getInitials(user.name)}
                    </span>
                  </span>
                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-sm font-semibold text-slate-800">{user.name}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400">
                      <span className={cn('h-1.5 w-1.5 rounded-full', isAdmin ? 'bg-blue-500' : 'bg-emerald-500')} />
                      {user.role.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-5 py-5" aria-label="Mobile navigation">
              <p className="eyebrow px-1 pb-2">Navigate</p>
              <div className="space-y-1.5">
                {portalLinks.map((link, index) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{ animationDelay: `${index * 45}ms` }}
                      className={cn(
                        'animate-fade-in-up flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98]',
                        active
                          ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-700/25'
                          : 'text-slate-700 hover:bg-slate-100/90 hover:text-slate-950'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                          active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'
                        )}
                      >
                        <NavIcon href={link.href} className="h-[1.05rem] w-[1.05rem]" />
                      </span>
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {!user && (
                <div className="mt-5 space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:text-blue-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-700/25 transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>

            {/* Drawer footer */}
            <div className="border-t border-slate-100 p-5">
              {user ? (
                <LogoutButton wide />
              ) : (
                <p className="text-center text-[0.7rem] leading-relaxed text-slate-400">
                  Built for the MoTA Hackathon 2026
                </p>
              )}
              <p className="mt-3 text-center text-[0.62rem] lowercase text-slate-300">
                Tribal Scholar AI · Scholarship Management System
              </p>
            </div>
          </div>
          </div>,
          document.body
        )}
    </header>
  );
}

function LogoutButton({ wide = false }: { wide?: boolean }) {
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
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg border transition-all duration-200 disabled:opacity-50',
        wide
          ? 'w-full border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700'
          : 'border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700'
      )}
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
      <span className="sm:hidden">{pending ? 'Signing out…' : 'Sign out'}</span>
    </button>
  );
}