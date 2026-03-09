import { Sidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:mr-64 transition-all duration-300 flex flex-col overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
