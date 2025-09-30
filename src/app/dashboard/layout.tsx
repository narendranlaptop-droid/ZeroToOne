import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mt-12">
            {children}
        </div>
      </main>
    </div>
  );
}
