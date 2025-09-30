import Link from 'next/link';
import {
  Card,
} from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';


const operatorFeatures = [
  {
    title: 'View All Scores',
    description: 'See all scores submitted by scorers.',
    href: '/dashboard/scores',
  },
  {
    title: 'Maintenance',
    description: 'Perform maintenance tasks and report to admin.',
    href: '#',
  },
];

export function OperatorDashboard() {
  return (
    <div className="space-y-4">
      {operatorFeatures.map((feature) => (
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
