'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { resolvePostLoginPath } from '@/lib/auth-utils';
import { cn } from '@/lib/utils';

const DEMO_PASSWORD = 'demo1234';

const DEMO_ACCOUNTS = [
  {
    label: 'Applicant',
    emoji: '🎓',
    email: 'applicant@demo.com',
    tint: 'from-blue-600 to-indigo-600 shadow-blue-600/25 hover:shadow-blue-600/35',
  },
  {
    label: 'Admin',
    emoji: '🛡️',
    email: 'admin@demo.com',
    tint: 'from-slate-700 to-slate-900 shadow-slate-800/25 hover:shadow-slate-800/35',
  },
  {
    label: 'Scrutiny Officer',
    emoji: '🔎',
    email: 'scrutiny@demo.com',
    tint: 'from-emerald-600 to-teal-700 shadow-emerald-600/25 hover:shadow-emerald-600/35',
  },
];

interface LoginPayload {
  success: boolean;
  user?: { name: string; role: string };
  home?: string;
  error?: { code: string; message: string };
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(credentials: { email: string; password: string }) {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data: LoginPayload = await res.json();

      if (!res.ok || !data.user || !data.home) {
        setError(data.error?.message ?? 'Unable to sign in. Please try again.');
        return;
      }

      const destination = resolvePostLoginPath(next, data.user.role, data.home);
      router.push(destination);
      router.refresh();
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    void submit({ email: email.trim(), password });
  }

  function demoLogin(accountEmail: string) {
    void submit({ email: accountEmail, password: DEMO_PASSWORD });
  }

  return (
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pr-11"
              placeholder="Enter your password"
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
          <p className="mt-1.5 text-xs text-slate-400">
            Forgot your password? Contact the administering officer.
          </p>
        </div>

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
              Signing in…
            </>
          ) : (
            'Sign in to your account'
          )}
        </button>
      </form>

      <div className="mt-6">
        <p className="eyebrow mb-2.5 text-center text-slate-400">Quick demo access</p>
        <div className="space-y-2">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => demoLogin(account.email)}
              disabled={loading}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg disabled:opacity-60',
                account.tint
              )}
            >
              <span className="text-lg">{account.emoji}</span>
              <span className="flex-1 text-left">{account.label}</span>
              <span className="font-mono text-xs opacity-80">{account.email}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}