'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const WORDS = ['Scholarships', 'Fellowships', 'Opportunities', 'Dreams'];

export default function RotatingWord({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
      setTick((t) => t + 1);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span key={tick} className={cn('animate-word-in', className)}>
      {WORDS[index]}
    </span>
  );
}