'use client';

import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const navLinks = {
  admin: [
    { href: '/dashboard/users', title: 'User Management', description: 'Add or remove students and operators.' },
    { href: '/dashboard/tasks', title: 'Task Management', description: 'Upload and manage learning tasks.' },
    { href: '/dashboard/submissions', title: 'View Submissions', description: 'See all student submissions.' },
    { href: '/dashboard/scores', title: 'View Scores', description: 'Check scores given by scorers.' },
    { href: '/dashboard/discussion', title: 'Discussion Forum', description: 'Moderate the common discussion area.' },
  ],
  student: [
    { href: '/dashboard/tasks', title: 'My Tasks', description: 'View tasks assigned by the admin.' },
    { href: '/dashboard/submit', title: 'Submit Work', description: 'Upload your outputs and files.' },
    { href: '/dashboard/discussion', title: 'Discussion Forum', description: 'Share feedback and opinions.' },
  ],
  scorer: [
    { href: '/dashboard/submissions', title: 'View Submissions', description: 'See student submissions.' },
    { href: '/dashboard/scoring', title: 'Provide Scores', description: 'Give scores to students.' },
  ],
  operator: [
    { href: '/dashboard/submissions', title: 'View Submissions', description: 'See all student submissions.' },
    { href: '/dashboard/scores', title: 'View All Scores', description: 'See all scores submitted by scorers.' },
  ],
};


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

  const features = navLinks[user.role] || [];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Dashboard
      </h1>
      <p className="text-muted-foreground">
        Welcome back, {user.name}! Select an option to get started.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className="block">
              <Card className="hover:border-primary transition-colors group h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {feature.description}
                      </CardDescription>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
    </div>
  );
}
