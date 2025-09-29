import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  BookOpenCheck,
  FileUp,
  Star,
  MessageSquare,
  Palette,
} from 'lucide-react';

const adminFeatures = [
  {
    title: 'User Management',
    description: 'Add or remove students and operators.',
    icon: Users,
    href: '/dashboard/users',
  },
  {
    title: 'Task Management',
    description: 'Upload and manage learning tasks.',
    icon: BookOpenCheck,
    href: '/dashboard/tasks',
  },
  {
    title: 'View Submissions',
    description: 'See all student submissions.',
    icon: FileUp,
    href: '#',
  },
  {
    title: 'View Scores',
    description: 'Check scores given by scorers.',
    icon: Star,
    href: '#',
  },
  {
    title: 'Discussion Forum',
    description: 'Moderate the common discussion area.',
    icon: MessageSquare,
    href: '#',
  },
  {
    title: 'Customize UI',
    description: 'Change the look and feel of the app.',
    icon: Palette,
    href: '/dashboard/customize',
  },
];

export function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {adminFeatures.map((feature) => (
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
