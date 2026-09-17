'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoMarkProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function LogoMark({ size = 40, className, glow = false }: LogoMarkProps) {
  const gid = useId().replace(/:/g, '');
  const grad = `logo-grad-${gid}`;
  const shine = `logo-shine-${gid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Tribal Scholar AI logo"
      className={cn('shrink-0 drop-shadow-md', glow && 'drop-shadow-[0_0_14px_rgba(129,140,248,0.55)]', className)}
    >
      <defs>
        <linearGradient id={grad} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e3a8a" />
          <stop offset="0.55" stopColor="#4338ca" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id={shine} cx="0.22" cy="0.18" r="0.9">
          <stop stopColor="#ffffff" stopOpacity="0.5" />
          <stop stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="40" height="40" rx="11" fill={`url(#${grad})`} />
      <rect width="40" height="40" rx="11" fill={`url(#${shine})`} />

      <path
        d="M20 12.2c-.62 0-1.16.15-1.66.47L12 16.2c-.74.42-1.2 1.16-1.2 2.06v1.51a1.2 1.2 0 0 0 2.4 0v-1.01l3.06-1.75v4.72l-.42 1.03a1.3 1.3 0 0 0 .04 1.05l2.82 5.53a1.4 1.4 0 0 0 2.56 0l2.8-5.5a1.3 1.3 0 0 0 .05-1.06l-.44-1.04V16.2l3.06 1.75v1.02a1.2 1.2 0 0 0 2.4 0V18.26c0-.9-.46-1.64-1.2-2.06l-6.35-3.53a2.1 2.1 0 0 0-1.66-.47Z"
        fill="#ffffff"
      />
      <path
        d="M20 15.4 27.4 18.6 27.4 18.6c.2.1.22.36.05.49L20.65 23.2 20.05 23.7 20 23.68 13.47 19.13c-.17-.13-.15-.39.05-.49L20 15.4Z"
        fill="#fde68a"
        opacity="0.95"
      />
      <path
        d="M20.05 23.68v5.62a.9.9 0 0 0 1.68.4l2.8-5.5.04-1.02-4.52 3.5Z"
        fill="#fde68a"
        opacity="0.6"
      />
      <circle cx="27.4" cy="25.2" r="1.15" fill="#34d399" stroke="#022c22" strokeWidth="0.4" />
      <path
        d="M28.6 25.2a1.2 1.2 0 0 1-1.2 1.2v.6a1.8 1.8 0 0 0 1.8-1.8h-.6Z"
        fill="#fde68a"
      />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export default function Logo({ size = 40, className, glow = false }: LogoProps) {
  return <LogoMark size={size} className={className} glow={glow} />;
}