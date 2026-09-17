'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -48px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
        shown ? 'translate-y-0 opacity-100' : 'opacity-0',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform: shown ? undefined : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}