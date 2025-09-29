'use client';

import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { ScorerDashboard } from '@/components/dashboard/ScorerDashboard';
import { OperatorDashboard } from '@/components/dashboard/OperatorDashboard';
import { Welcome } from '@/components/dashboard/Welcome';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, loading } = useAuthRedirect();

  if (loading || !user) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'scorer':
        return <ScorerDashboard />;
      case 'operator':
        return <OperatorDashboard />;
      default:
        return <p>Error: Unknown user role.</p>;
    }
  };

  return (
    <div>
      <Welcome name={user.name} />
      <div className="mt-8">{renderDashboard()}</div>
    </div>
  );
}
