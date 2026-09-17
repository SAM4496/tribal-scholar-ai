'use client';

import { useEffect, useState, type ReactNode } from 'react';

export default function HeroShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sessionStorage.getItem('tsa-preloaded')) {
      finish();
      return;
    }

    const fallback = window.setTimeout(finish, 3600);
    window.addEventListener('tsa:play-ready', finish, { once: true });
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('tsa:play-ready', finish);
    };
  }, []);

  return (
    <div className={`${ready ? 'hero-ready' : ''} transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
}