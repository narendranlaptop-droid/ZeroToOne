'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpenCheck,
  FileUp,
  LogOut,
  MessageSquare,
  Mountain,
  Star,
  Users,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

const commonLinks = [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }];

const navLinks = {
  admin: [
    ...commonLinks,
    { href: '/dashboard/users', label: 'Users', icon: Users },
    { href: '/dashboard/tasks', label: 'Tasks', icon: BookOpenCheck },
    { href: '/dashboard/submissions', label: 'Submissions', icon: FileUp },
    { href: '/dashboard/scores', label: 'Scores', icon: Star },
    { href: '/dashboard/discussion', label: 'Discussion', icon: MessageSquare },
  ],
  student: [
    ...commonLinks,
    { href: '/dashboard/tasks', label: 'My Tasks', icon: BookOpenCheck },
    { href: '/dashboard/submit', label: 'Submit Work', icon: FileUp },
    { href: '/dashboard/discussion', label: 'Discussion', icon: MessageSquare },
  ],
  scorer: [
    ...commonLinks,
    { href: '/dashboard/submissions', label: 'View Submissions', icon: FileUp },
    { href: '/dashboard/scoring', label: 'Score Work', icon: Star },
  ],
  operator: [...commonLinks, { href: '/dashboard/scores', label: 'View Scores', icon: Star }],
};

export function DashboardSidebar() {
  const { user, loading } = useAuthRedirect();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading || !user) {
    // Skeleton for sidebar
    return (
      <aside className="w-64 flex-shrink-0 border-r bg-gray-100 dark:bg-gray-800 p-4">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 h-10">
                <Mountain className="h-6 w-6" />
                <span className="font-semibold text-lg">ZeroToOne</span>
            </div>
            <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </aside>
    );
  }

  const links = navLinks[user.role] || [];

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-secondary/40 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Mountain className="h-6 w-6 text-primary" />
        <span className="font-semibold text-lg text-primary">ZeroToOne</span>
      </div>
      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <Button
            key={link.href}
            variant={pathname === link.href ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
