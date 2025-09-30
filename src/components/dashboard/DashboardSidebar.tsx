'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpenCheck,
  FileUp,
  LogOut,
  MessageSquare,
  Star,
  Users,
  LayoutDashboard,
  Palette,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
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
  const { user } = useAuthRedirect();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return null; 
  }

  const links = navLinks[user.role] || [];

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-xl">
        <Link href="/">ZeroToOne</Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
              pathname === link.href
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
