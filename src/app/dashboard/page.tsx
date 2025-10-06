'use client';

import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import {
  ChevronRight,
  Users,
  BookOpenCheck,
  FileUp,
  MessageSquare,
  Star,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { users } from '@/lib/users';
import { tasks } from '@/lib/tasks';
import { submissions } from '@/lib/submissions';
import { scores } from '@/lib/scores';
import { Button } from '@/components/ui/button';

const navLinks: Record<string, Feature[]> = {
  admin: [
    { href: '/dashboard/users', title: 'User Management', description: 'Add or remove users.', icon: Users },
    { href: '/dashboard/tasks', title: 'Task Management', description: 'Create and manage tasks.', icon: BookOpenCheck },
    { href: '/dashboard/submissions', title: 'View Submissions', description: 'See all student work.', icon: FileUp },
    { href: '/dashboard/scores', title: 'View Scores', description: 'Check all given scores.', icon: Star },
    { href: '/dashboard/discussion', title: 'Discussion Forum', description: 'Moderate conversations.', icon: MessageSquare },
  ],
  student: [
    { href: '/dashboard/tasks', title: 'My Tasks', description: 'View assigned tasks.', icon: BookOpenCheck },
    { href: '/dashboard/submit', title: 'Submit Work', description: 'Upload your assignments.', icon: FileUp },
    { href: '/dashboard/discussion', title: 'Discussion Forum', description: 'Share your feedback.', icon: MessageSquare },
  ],
  scorer: [
    { href: '/dashboard/submissions', title: 'View Submissions', description: 'See student submissions.', icon: FileUp },
    { href: '/dashboard/scoring', title: 'Provide Scores', description: 'Give scores to students.', icon: Star },
  ],
  operator: [
    { href: '/dashboard/submissions', title: 'View Submissions', description: 'See all student work.', icon: FileUp },
    { href: '/dashboard/scores', title: 'View All Scores', description: 'See all submitted scores.', icon: Star },
  ],
};

type Feature = {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function DashboardPage() {
  const { user, loading } = useAuthRedirect();
  
  const studentCount = users.filter(u => u.role === 'student').length;
  const recentSubmissions = submissions.slice(0, 3);
  const finishedTasksCount = new Set(scores.map(score => score.taskName)).size;


  if (loading || !user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  const features = navLinks[user.role] || [];
  const welcomeMessage = `Welcome back, ${user.name}!`;
  const roleDescription = {
    admin: "You can manage users, tasks, submissions, scores, and discussions.",
    student: "You can view your tasks, submit your work, and participate in discussions.",
    scorer: "You can view submissions and provide scores.",
    operator: "You can monitor submissions and scores across the program."
  }

  const stats = [
    { title: 'Total Students', value: studentCount, icon: Users },
    { title: 'Active Tasks', value: tasks.length, icon: BookOpenCheck },
    { title: 'Finished Tasks', value: finishedTasksCount, icon: CheckCircle },
    { title: 'Total Submissions', value: submissions.length, icon: FileUp },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          {welcomeMessage} {roleDescription[user.role]}
        </p>
      </div>

      {user.role === 'admin' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title} className="group">
            <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-muted rounded-full">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="mt-1">{feature.description}</CardDescription>
                </div>
              </CardHeader>
               <CardContent>
                <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Go to {feature.title} <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {user.role === 'admin' && (
         <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>A quick look at the latest student submissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{sub.studentName}</p>
                    <p className="text-sm text-muted-foreground">{sub.taskName}</p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/dashboard/submissions?student=${sub.studentName}`}>
                      View <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
