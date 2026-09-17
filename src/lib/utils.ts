// Utility functions shared across the project

import { type ClassValue, clsx } from 'clsx';

/**
 * Combines CSS class names conditionally.
 * Uses clsx for conditional classes.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a date to a readable Indian format.
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a date with time.
 */
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get status badge color based on application status.
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    DRAFT: 'bg-slate-100 text-slate-700',
    SUBMITTED: 'bg-blue-100 text-blue-700',
    UNDER_DOCUMENT_VERIFICATION: 'bg-yellow-100 text-yellow-700',
    UNDER_ELIGIBILITY_CHECK: 'bg-yellow-100 text-yellow-700',
    ELIGIBLE: 'bg-green-100 text-green-700',
    INELIGIBLE: 'bg-red-100 text-red-700',
    DEFICIENT: 'bg-orange-100 text-orange-700',
    UNDER_SCRUTINY: 'bg-purple-100 text-purple-700',
    SCRUTINY_COMPLETE: 'bg-indigo-100 text-indigo-700',
    UNDER_SCREENING: 'bg-cyan-100 text-cyan-700',
    SELECTED: 'bg-emerald-100 text-emerald-700',
    REJECTED: 'bg-red-100 text-red-700',
    APPROVED: 'bg-green-100 text-green-800',
    WITHDRAWN: 'bg-slate-100 text-slate-500',
  };
  return colors[status] || 'bg-slate-100 text-slate-700';
}

/**
 * Format status text for display (UNDER_SCRUTINY → Under Scrutiny).
 */
export function formatStatus(status: string): string {
  return status
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Derive 1-2 initials from a person's name (used for avatars).
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

/**
 * Generate application number.
 */
export function generateApplicationNumber(schemeCode: string, sequence: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequence).padStart(5, '0');
  return `${schemeCode}-${year}-${padded}`;
}
