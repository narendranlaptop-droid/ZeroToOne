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
  operator: [
    ...commonLinks,
    { href: '/dashboard/submissions', label: 'Submissions', icon: FileUp },
    { href: '/dashboard/scores', label: 'View Scores', icon: Star },
  ],
};

const MuSigmaLogo = () => (
    <svg width="140" height="40" viewBox="0 0 200 50" className="text-primary">
      <path d="M61.4,38.5c-2.4-0.8-4.2-2-5.4-3.6c-1.1-1.6-1.7-3.4-1.7-5.5v-3.3c0-2.3,0.6-4.3,1.7-6.2c1.1-1.8,2.8-3.2,4.9-4.1c2.1-0.9,4.4-1.3,7-1.3c2.7,0,5.1,0.5,7.1,1.4c2.1,0.9,3.7,2.3,4.9,4.1c1.2,1.8,1.7,3.9,1.7,6.2v3.3c0,2-0.6,3.9-1.7,5.5c-1.2,1.6-2.9,2.8-5.3,3.6c-2.4,0.8-5.2,1.2-8.3,1.2C66.5,40,63.8,39.4,61.4,38.5z M67.4,36.1c1.3,0,2.5-0.2,3.6-0.7c1.1-0.5,2-1.1,2.8-1.9c0.7-0.8,1.3-1.8,1.7-2.9c0.4-1.1,0.6-2.3,0.6-3.7v-3.3c0-1.4-0.2-2.7-0.6-3.8c-0.4-1.1-1-2.1-1.7-2.9c-0.8-0.8-1.7-1.4-2.8-1.9c-1.1-0.5-2.3-0.7-3.6-0.7c-1.3,0-2.5,0.2-3.6,0.7c-1.1,0.5-2,1.1-2.8,1.9c-0.7,0.8-1.3,1.8-1.7,2.9c-0.4,1.1-0.6,2.4-0.6,3.8v3.3c0,1.3,0.2,2.6,0.6,3.7c0.4,1.1,1,2.1,1.7,2.9c0.8,0.8,1.7,1.4,2.8,1.9C64.9,35.9,66.1,36.1,67.4,36.1z" fill="currentColor"/>
      <path d="M14.6,39.6c-2.8,0-5.1-0.9-6.9-2.6c-1.8-1.8-2.7-4-2.7-6.7V1.4h4.4v28.8c0,1.6,0.5,3,1.5,4c1,1,2.3,1.5,3.8,1.5c1.5,0,2.8-0.5,3.8-1.5c1-1,1.5-2.3,1.5-4V1.4h4.4v28.8c0,2.7-0.9,4.9-2.7,6.7C19.7,38.8,17.4,39.6,14.6,39.6z M30.8,30.2c-0.7,2-1.8,3.6-3.4,4.9c-1.6,1.3-3.5,1.9-5.7,1.9c-2.2,0-4.1-0.6-5.7-1.9c-1.6-1.3-2.7-2.9-3.4-4.9c-0.7-2-1-4.2-1-6.5c0-2.3,0.3-4.5,1-6.5c0.7-2,1.8-3.6,3.4-4.9c1.6-1.3,3.5-1.9,5.7-1.9c2.2,0,4.1,0.6,5.7,1.9c1.6,1.3,2.7,2.9,3.4,4.9c0.7,2,1,4.2,1,6.5C31.8,26,31.5,28.2,30.8,30.2z M27,23.7c0-1.5-0.3-2.9-0.8-4.2c-0.5-1.3-1.3-2.3-2.3-3.1c-1-0.8-2.2-1.2-3.6-1.2s-2.6,0.4-3.6,1.2c-1,0.8-1.8,1.8-2.3,3.1c-0.5,1.3-0.8,2.7-0.8,4.2c0,1.5,0.3,2.9,0.8,4.2c0.5,1.3,1.3,2.3,2.3,3.1c1,0.8,2.2,1.2,3.6,1.2s2.6-0.4,3.6-1.2c1-0.8,1.8-1.8,2.3-3.1C26.7,26.6,27,25.2,27,23.7z" fill="currentColor"/>
      <path d="M110.1,28.7c-0.8,0.9-1.9,1.5-3.1,1.9c-1.2,0.4-2.6,0.6-4.1,0.6c-2.3,0-4.3-0.5-6.1-1.4c-1.8-0.9-3.3-2.2-4.5-3.9c-1.2-1.7-1.8-3.7-1.8-5.9c0-2.2,0.6-4.2,1.8-5.9c1.2-1.7,2.7-3,4.5-3.9c1.8-0.9,3.8-1.4,6.1-1.4c1.5,0,2.9,0.2,4.1,0.6c1.2,0.4,2.3,1,3.1,1.9l-2.6,3.2c-0.5-0.5-1-0.9-1.6-1.1c-0.6-0.3-1.3-0.4-2-0.4c-1.3,0-2.5,0.3-3.5,0.8c-1,0.5-1.9,1.3-2.5,2.3c-0.6,1-0.9,2.2-0.9,3.6c0,1.4,0.3,2.6,0.9,3.6c0.6,1,1.5,1.8,2.5,2.3c1,0.5,2.2,0.8,3.5,0.8c0.8,0,1.5-0.1,2-0.4c0.6-0.3,1.1-0.6,1.6-1.1L110.1,28.7z M125,39.1h-4.4V11.2h-6.7v-4h17.8v4h-6.7V39.1z M141.2,39.1h-4.4l-8-12.2V39h-4.4V7.2h4.4l8,12.2V7.2h4.4V39.1z" fill="currentColor"/>
    </svg>
  );

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
    <aside className="w-64 flex-shrink-0 bg-card text-card-foreground flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
        <Link href="/">
         <MuSigmaLogo />
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
              pathname === link.href
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
