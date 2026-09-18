'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate(): string | null {
    if (name.trim().length < 2) return 'Please enter your full name.';
    if (!EMAIL_RE.test(email.trim())) return 'Please enter a valid email address.';
    if (!PASSWORD_RE.test(password))
      return 'Password must be at least 8 characters and include a letter and a number.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    if (!acceptedTerms) return 'Please accept the terms to continue.';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: email.trim(), password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message ?? 'Unable to create your account. Please try again.');
        return;
      }

      router.push('/applicant/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-blue-400/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-emerald-400/15 blur-[130px]" />

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="mb-8 text-center">
          <div className="sheen-parent mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-800 to-indigo-700 shadow-xl shadow-blue-900/25 ring-1 ring-inset ring-white/20">
            <span className="font-display text-2xl font-extrabold tracking-tight text-white">
              TS
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Register to apply for scholarships and fellowships
          </p>
        </div>

        <div className="card p-6 sm:p-7">
          {error && (
            <div
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-fade-in"
              role="alert"
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="8" cy="8" r="6.5" />
                <path d="M8 5.5V8M8 10.5h.01" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="eyebrow mb-1.5 block">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="eyebrow mb-1.5 block">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="eyebrow mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-11"
                  placeholder="Create a password (min 8 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1.5 9s2.7-4.5 7.5-4.5 7.5 4.5 7.5 4.5-2.7 4.5-7.5 4.5S1.5 9 1.5 9Z" />
                      <path d="M9 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
                      <path d="m12 6 3.5-3.5M6 12l-3.5 3.5" />
                    </svg>
                  ) : (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1.5 9s2.7-4.5 7.5-4.5 7.5 4.5 7.5 4.5-2.7 4.5-7.5 4.5S1.5 9 1.5 9Z" />
                      <circle cx="9" cy="9" r="2.25" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                <span className={cn(password.length >= 8 ? 'text-emerald-600' : '')}>
                  ✓ 8+ characters
                </span>
                <span className={cn(/[A-Za-z]/.test(password) ? 'text-emerald-600' : '')}>
                  ✓ letter
                </span>
                <span className={cn(/\d/.test(password) ? 'text-emerald-600' : '')}>
                  ✓ number
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="eyebrow mb-1.5 block">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="Confirm your password"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-500">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-700"
              />
              <span>
                I confirm this is a hackathon prototype. I will not share real personal
                information, and I accept the demo terms of use.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/35 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
                  </svg>
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-700 hover:text-blue-800">
              Login
            </Link>
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-white p-3.5">
          <p className="text-center text-xs text-amber-800">
            ⚠️ Hackathon Prototype — This is not an official government portal.
          </p>
        </div>
      </div>
    </div>
  );
}