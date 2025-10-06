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
    <svg
      width="100"
      height="36"
      viewBox="0 0 100 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path
        d="M20.3348 3.00002C20.3348 2.03335 20.9015 1.17502 21.7848 0.775017C22.6682 0.375017 23.6848 0.50835 24.4515 1.13335L29.5015 5.05002C30.0182 5.45835 30.3348 6.08335 30.3348 6.75835V29.5C30.3348 30.1334 30.0515 30.7167 29.5682 31.1417C29.0848 31.5667 28.4515 31.7917 27.8182 31.7917C27.1848 31.7917 26.5515 31.5667 26.0682 31.1417C25.5848 30.7167 25.3015 30.1334 25.3015 29.5V11.25L22.7848 8.76668C22.0432 8.03335 21.0598 7.64168 20.0432 7.64168C18.9932 7.64168 18.0015 8.03335 17.2515 8.76668L12.0348 13.925C11.6432 14.3084 11.3432 14.7584 11.1348 15.275C10.9265 15.7917 10.8215 16.35 10.8215 16.95V29.5C10.8215 30.1334 10.5382 30.7167 10.0548 31.1417C9.5715 31.5667 8.93816 31.7917 8.2965 31.7917C7.65483 31.7917 7.0215 31.5667 6.53816 31.1417C6.05483 30.7167 5.7715 30.1334 5.7715 29.5V3C5.7715 2.17502 5.0965 1.50002 4.2715 1.50002C3.4465 1.50002 2.7715 2.17502 2.7715 3.00002V29.5C2.7715 31.1917 3.42983 32.8167 4.60483 33.9917C5.77983 35.1667 7.3215 35.7917 8.98816 35.7917C10.6548 35.7917 12.1965 35.1667 13.3715 33.9917C14.5465 32.8167 15.2132 31.1917 15.2132 29.5V17.925L18.7515 14.425C19.1348 14.05 19.5932 13.8584 20.1265 13.8584C20.6598 13.8584 21.1265 14.05 21.5098 14.425L25.3015 18.2167V29.5C25.3015 31.1917 25.9598 32.8167 27.1348 33.9917C28.3098 35.1667 29.8515 35.7917 31.5182 35.7917C33.1848 35.7917 34.7265 35.1667 35.9015 33.9917C37.0765 32.8167 37.7432 31.1917 37.7432 29.5V6.75835C37.7432 4.90002 36.9348 3.16668 35.5848 1.86668L30.5348 -2.09828e-05C29.6932 -0.850021 28.5348 -1.25835 27.4182 -1.09168C26.3015 -0.925021 25.3182 -0.216685 24.7182 0.725015L20.3348 5.75835V3.00002Z"
        fill="currentColor"
      />
      <path
        d="M93.8126 1.48332C92.9376 0.549987 91.7376 0 90.4376 0C89.1376 0 87.9376 0.549987 87.0626 1.48332L64.2126 24.3333L49.0876 9.20832C48.6376 8.75832 48.0626 8.51665 47.4626 8.51665C46.8626 8.51665 46.2876 8.75832 45.8376 9.20832L41.6626 13.3833C40.7293 14.2583 40.2126 15.4583 40.2126 16.7583C40.2126 18.0583 40.7293 19.2583 41.6626 20.1333L61.6626 40.1333C62.5376 41.0083 63.7376 41.5 65.0376 41.5C66.3376 41.5 67.5376 41.0083 68.4126 40.1333L97.0626 11.4833C97.9376 10.6083 98.4543 9.40832 98.4543 8.10832C98.4543 6.80832 97.9376 5.60832 97.0626 4.73332L93.8126 1.48332ZM65.0376 37.05L45.8376 17.85L47.4626 16.225L65.0376 33.8L93.8126 5.025L95.4376 6.65C95.8876 7.1 96.1293 7.675 96.1293 8.275C96.1293 8.875 95.8876 9.45 95.4376 9.9L68.4126 36.925C67.9626 37.375 67.4293 37.7 66.8293 37.875C66.2293 38.05 65.6126 38.05 65.0376 37.875C64.4376 37.7 63.8876 37.375 63.4376 36.925L61.6626 35.15L65.0376 31.775L66.1626 32.9C66.6126 33.35 67.1876 33.5916 67.7876 33.5916C68.3876 33.5916 68.9626 33.35 69.4126 32.9L90.4376 11.875L92.1876 13.625L65.0376 37.05Z"
        fill="currentColor"
      />
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
