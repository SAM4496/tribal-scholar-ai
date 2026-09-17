'use client';

import Link from 'next/link';
import { useState } from 'react';

const DEMO_ACCOUNTS = [
  { role: 'Applicant', email: 'applicant@demo.com' },
  { role: 'Admin', email: 'admin@demo.com' },
  { role: 'Scrutiny', email: 'scrutiny@demo.com' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-blue-400/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-indigo-400/20 blur-[130px]" />

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="mb-8 text-center">
          <div className="sheen-parent mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-800 to-indigo-700 shadow-xl shadow-blue-900/25 ring-1 ring-inset ring-white/20">
            <span className="font-display text-2xl font-extrabold tracking-tight text-white">
              TS
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Login to the Scholarship &amp; Fellowship Management System
          </p>
        </div>

        <div className="card p-6 sm:p-7">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="eyebrow mb-1.5 block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
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
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/35"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800">
              Register
            </Link>
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-white p-4">
          <p className="eyebrow text-amber-700">Hackathon Prototype — Demo Accounts</p>
          <div className="mt-3 space-y-2">
            {DEMO_ACCOUNTS.map((account) => (
              <div
                key={account.email}
                className="flex items-center justify-between gap-3 rounded-lg bg-white/70 px-3 py-2 text-xs"
              >
                <span className="font-medium text-slate-700">{account.role}</span>
                <span className="font-mono text-slate-500">
                  {account.email} / demo1234
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
