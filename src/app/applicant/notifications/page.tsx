'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  APPLICANT_NOTIFICATIONS,
  type ApplicantNotification,
  type ApplicantNotificationType,
} from '@/lib/mock-notifications';
import { cn, formatDateTime } from '@/lib/utils';

const READ_STORAGE_KEY = 'tsa-notifications-read';

const TYPE_META: Record<ApplicantNotificationType, { label: string; icon: string; tint: string }> = {
  STATUS_UPDATE: { label: 'Status update', icon: '🔁', tint: 'bg-blue-50 text-blue-600' },
  DEFICIENCY: { label: 'Deficiency', icon: '⚠️', tint: 'bg-orange-50 text-orange-600' },
  APPROVAL: { label: 'Approval', icon: '🎉', tint: 'bg-emerald-50 text-emerald-600' },
  GENERAL: { label: 'General', icon: '📣', tint: 'bg-slate-100 text-slate-500' },
};

type FilterKey = 'all' | 'unread' | ApplicantNotificationType;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'STATUS_UPDATE', label: 'Status updates' },
  { key: 'DEFICIENCY', label: 'Deficiencies' },
  { key: 'APPROVAL', label: 'Approvals' },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<ApplicantNotification[]>(
    APPLICANT_NOTIFICATIONS
  );
  const [filter, setFilter] = useState<FilterKey>('all');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(READ_STORAGE_KEY);
      if (stored) {
        const readIds = new Set(JSON.parse(stored) as string[]);
        queueMicrotask(() =>
          setNotifications((prev) =>
            prev.map((n) => (readIds.has(n.id) ? { ...n, isRead: true } : n))
          )
        );
      }
    } catch {
      // ignore
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  function persistRead(ids: string[]) {
    try {
      const storedRaw = window.localStorage.getItem(READ_STORAGE_KEY);
      const stored = storedRaw ? (JSON.parse(storedRaw) as string[]) : [];
      window.localStorage.setItem(
        READ_STORAGE_KEY,
        JSON.stringify(Array.from(new Set([...stored, ...ids])))
      );
    } catch {
      // ignore
    }
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    persistRead([id]);
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    persistRead(notifications.map((n) => n.id));
  }

  const filtered = useMemo(() => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter((n) => !n.isRead);
    return notifications.filter((n) => n.type === filter);
  }, [notifications, filter]);

  const countFor = (key: FilterKey) => {
    if (key === 'all') return notifications.length;
    if (key === 'unread') return notifications.filter((n) => !n.isRead).length;
    return notifications.filter((n) => n.type === key).length;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-7 animate-fade-in-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600" />
              Applicant Portal
            </p>
            <h1 className="mt-2.5 font-display text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[1.9rem]">
              Notifications
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Updates about your applications — status changes, deficiencies, and approvals.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
              >
                Mark all as read
              </button>
            )}
            <span className="chip bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </span>
          </div>
        </div>
        <div className="divider-accent mt-5 h-[3px] w-full" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white/80 p-1 shadow-sm w-fit">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95',
              filter === f.key
                ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            {f.label}
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold',
                filter === f.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              )}
            >
              {countFor(f.key)}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="mt-6 space-y-3">
          {filtered.map((n, index) => {
            const meta = TYPE_META[n.type];
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  'card card-hover animate-fade-in-up w-full p-4 text-left sm:p-5',
                  !n.isRead && 'border-blue-200 bg-gradient-to-r from-blue-50/60 to-white'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg', meta.tint)}>
                    {meta.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={cn('section-title', !n.isRead && 'font-bold')}>{n.title}</h3>
                      {!n.isRead && (
                        <span className="chip whitespace-nowrap bg-blue-100 text-blue-700">New</span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{n.message}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className={cn('chip px-2 py-0.5', meta.tint)}>{meta.label}</span>
                      <span className="text-slate-400">{formatDateTime(n.createdAt)}</span>
                      {n.applicationId && (
                        <Link
                          href={`/applicant/applications/${n.applicationId}`}
                          onClick={(e) => e.stopPropagation()}
                          className="font-medium text-blue-700 hover:text-blue-800"
                        >
                          View application →
                        </Link>
                      )}
                    </div>
                  </div>
                  {!n.isRead && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="card mt-6 p-12 text-center animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl">
            🔔
          </div>
          <h3 className="section-title mt-4">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications here'}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            {filter === 'unread'
              ? 'You’re all caught up! New activity will appear here immediately.'
              : 'Nothing under this filter right now.'}
          </p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="mt-5 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
            >
              Show all notifications
            </button>
          )}
        </div>
      )}
    </div>
  );
}