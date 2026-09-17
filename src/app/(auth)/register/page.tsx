'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-16">
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
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="eyebrow mb-1.5 block">
                Full Name
              </label>
              <input
                id="name"
                type="text"
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
                placeholder="Create a password (min 8 characters)"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="eyebrow mb-1.5 block">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/35"
            >
              Register
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
