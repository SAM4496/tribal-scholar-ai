'use client';

import { useEffect, useState } from 'react';
import { LogoMark } from '@/components/layout/Logo';

const BRAND = 'TRIBAL SCHOLAR AI';

type Phase = 'idle' | 'active' | 'leaving' | 'gone';

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setTimeout(() => {
      if (prefersReduced || sessionStorage.getItem('tsa-preloaded')) return;
      sessionStorage.setItem('tsa-preloaded', '1');
      setPhase('active');
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (phase !== 'active') return;
    let value = 0;
    const id = window.setInterval(() => {
      value = Math.min(100, value + Math.ceil(Math.random() * 8));
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(id);
        window.dispatchEvent(new Event('tsa:play-ready'));
        window.setTimeout(() => setPhase('leaving'), 380);
        window.setTimeout(() => setPhase('gone'), 1450);
      }
    }, 92);
    return () => window.clearInterval(id);
  }, [phase]);

  if (phase === 'gone' || phase === 'idle') return null;

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-slate-950 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'leaving' ? '-translate-y-full opacity-100' : ''
      }`}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.06]" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-blue-700/25 blur-[120px] animate-aurora" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-violet-600/20 blur-[110px] animate-aurora [animation-delay:2.5s]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="relative mb-8">
          <span className="absolute inset-0 rounded-2xl bg-indigo-500/40 animate-ping-ring" />
          <span className="absolute -inset-3 rounded-2xl bg-white/5 animate-pulse-soft" />
          <LogoMark size={84} glow className="animate-floaty relative" />
        </div>

        <div className="flex justify-center gap-[0.32em] overflow-hidden">
          {BRAND.split('').map((letter, i) => (
            <span
              key={i}
              className="animate-letter-rise font-display text-sm font-bold tracking-[0.3em] text-white"
              style={{ animationDelay: `${120 + i * 40}ms` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>

        <div className="mt-10 h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
          <div
            className="progress-shine h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 font-mono text-xs tabular-nums tracking-widest text-slate-400">
          LOADING · {progress.toString().padStart(3, '0')}%
        </div>

        <div className="mt-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Ministry of Tribal Affairs · Hackathon Demo
        </div>
      </div>
    </div>
  );
}