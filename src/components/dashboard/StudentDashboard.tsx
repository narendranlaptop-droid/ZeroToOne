import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpenCheck, FileUp, MessageSquare } from 'lucide-react';

const studentFeatures = [
  {
    title: 'My Tasks',
    description: 'View tasks assigned by the admin.',
    icon: BookOpenCheck,
    href: '/dashboard/tasks',
  },
  {
    title: 'Submit Work',
    description: 'Upload your outputs and files.',
    icon: FileUp,
    href: '#',
  },
  {
    title: 'Discussion Forum',
    description: 'Share feedback and opinions.',
    icon: MessageSquare,
    href: '/dashboard/discussion',
  },
];

export function StudentDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {studentFeatures.map((feature) => (
        <Link href={feature.href} key={feature.title}>
          <Card className="h-full hover:bg-card-foreground/5 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {feature.title}
              </CardTitle>
              <feature.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
