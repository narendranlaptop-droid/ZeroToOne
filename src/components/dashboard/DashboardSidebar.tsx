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
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';

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

function SidebarContentComponent() {
  const { user, loading } = useAuthRedirect();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading || !user) {
    return (
        <div className="flex h-full flex-col p-4">
            <div className="flex items-center gap-2 h-10 mb-8">
                <div className="flex items-center justify-center rounded-md bg-primary p-2 h-10 w-10 animate-pulse">
                    <span className="text-sm font-bold text-primary-foreground">Z</span>
                </div>
                <span className="font-semibold text-lg animate-pulse">ZeroToOne</span>
            </div>
            <div className="flex-1 space-y-2">
                <div className="h-8 bg-muted rounded animate-pulse"></div>
                <div className="h-8 bg-muted rounded animate-pulse"></div>
                <div className="h-8 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="h-10 bg-muted rounded animate-pulse mt-auto"></div>
        </div>
    );
  }

  const links = navLinks[user.role] || [];
  
  return (
    <>
    <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-primary p-2 h-10 w-10">
                <span className="text-sm font-bold text-primary-foreground">Z</span>
            </div>
            <span className="font-semibold text-lg text-primary-foreground">ZeroToOne</span>
        </div>
    </SidebarHeader>

    <SidebarContent>
        <SidebarMenu>
            {links.map((link) => (
            <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    >
                    <Link href={link.href}>
                        <link.icon />
                        <span>{link.label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            ))}
        </SidebarMenu>
    </SidebarContent>

    <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarFooter>
    </>
  )

}

export function DashboardSidebar() {
  return (
    <SidebarProvider>
        <Sidebar collapsible='icon'>
            <SidebarContentComponent />
        </Sidebar>
    </SidebarProvider>
  )
}
