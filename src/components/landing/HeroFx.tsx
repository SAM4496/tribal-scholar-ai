'use client';

import { useEffect, useRef } from 'react';

export default function HeroFx() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onPointerMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  const particles = Array.from({ length: 22 }, (_, i) => {
    const left = (i * 41 + 7) % 100;
    const bottom = 6 + ((i * 29) % 70);
    const size = 2 + (i % 3);
    const delay = (i % 11) * 0.55;
    const duration = 9 + (i % 8);
    return (
      <span
        key={i}
        className="animate-particle absolute rounded-full bg-white/25"
        style={{
          left: `${left}%`,
          bottom: `${bottom}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-25 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(540px circle at var(--mx, 50%) var(--my, 28%), rgba(129,140,248,0.85), transparent 62%)',
        }}
      />
      {particles}
    </div>
  );
}