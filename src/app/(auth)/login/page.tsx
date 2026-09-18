import { Suspense } from 'react';
import Link from 'next/link';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login · Tribal Scholar AI',
  description: 'Sign in to the Scholarship & Fellowship Management System.',
};

export default function LoginPage() {
  return (
    <Suspense>
      <div className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-4 py-16">
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
              Sign in to the Scholarship &amp; Fellowship Management System
            </p>
          </div>

          <LoginForm />

          <p className="mt-5 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800">
              Register
            </Link>
          </p>

          <div className="mt-5 rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-white p-4">
            <p className="eyebrow text-amber-700">
              Hackathon Prototype — Demo Accounts
            </p>
            <p className="mt-1 text-xs leading-relaxed text-amber-800/80">
              One-click sign-in using the seeded demo credentials
              (<span className="font-mono">demo1234</span>).
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}