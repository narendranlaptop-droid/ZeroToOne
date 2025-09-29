import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileUp, Star } from 'lucide-react';

const scorerFeatures = [
  {
    title: 'View Submissions',
    description: 'See student submissions.',
    icon: FileUp,
    href: '#',
  },
  {
    title: 'Provide Scores',
    description: 'Give scores to students.',
    icon: Star,
    href: '#',
  },
];

export function ScorerDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {scorerFeatures.map((feature) => (
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
