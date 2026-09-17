export default function NotificationsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
        <p className="text-slate-500 mt-1">View updates and action items for your applications</p>
      </div>
      <div className="card p-12 text-center">
        <div className="text-4xl mb-4">🔔</div>
        <h3 className="section-title mb-2">No Notifications</h3>
        <p className="text-slate-500">You&apos;re all caught up! Notifications about your applications will appear here.</p>
      </div>
    </div>
  );
}
