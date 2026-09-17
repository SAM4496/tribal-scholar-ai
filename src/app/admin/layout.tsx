import Sidebar, { adminNavItems } from '@/components/layout/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar items={adminNavItems} title="Admin Portal" />
      <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
