import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const adminFeatures = [
  {
    title: 'User Management',
    description: 'Add or remove students and operators.',
    href: '/dashboard/users',
  },
  {
    title: 'Task Management',
    description: 'Upload and manage learning tasks.',
    href: '/dashboard/tasks',
  },
  {
    title: 'View Submissions',
    description: 'See all student submissions.',
    href: '/dashboard/submissions',
  },
  {
    title: 'View Scores',
    description: 'Check scores given by scorers.',
    href: '/dashboard/scores',
  },
  {
    title: 'Discussion Forum',
    description: 'Moderate the common discussion area.',
    href: '/dashboard/discussion',
  },
  {
    title: 'Customize UI',
    description: 'Customize the look and feel of the application.',
    href: '/dashboard/customize',
  },
];

export function AdminDashboard() {
  return (
    <div className="space-y-4">
      {adminFeatures.map((feature) => (
        <Link href={feature.href} key={feature.title} className="block">
          <Card className="hover:border-primary transition-colors group">
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
