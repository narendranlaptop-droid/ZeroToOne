import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Palette } from 'lucide-react';

const adminFeatures = [
  {
    title: 'User Management',
    description: 'Add or remove students and operators.',
    image: PlaceHolderImages.find((img) => img.id === 'users-icon'),
    href: '/dashboard/users',
  },
  {
    title: 'Task Management',
    description: 'Upload and manage learning tasks.',
    image: PlaceHolderImages.find((img) => img.id === 'tasks-icon'),
    href: '/dashboard/tasks',
  },
  {
    title: 'View Submissions',
    description: 'See all student submissions.',
    image: PlaceHolderImages.find((img) => img.id === 'submissions-icon'),
    href: '/dashboard/submissions',
  },
  {
    title: 'View Scores',
    description: 'Check scores given by scorers.',
    image: PlaceHolderImages.find((img) => img.id === 'scores-icon'),
    href: '/dashboard/scores',
  },
  {
    title: 'Discussion Forum',
    description: 'Moderate the common discussion area.',
    image: PlaceHolderImages.find((img) => img.id === 'discussion-icon'),
    href: '/dashboard/discussion',
  },
  {
    title: 'Customize UI',
    description: 'Customize the look and feel of the application.',
    image: PlaceHolderImages.find((img) => img.id === 'customize-icon'),
    href: '/dashboard/customize',
  },
];

export function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {adminFeatures.map((feature) => (
        <Link href={feature.href} key={feature.title}>
          <Card className="h-full hover:border-primary transition-colors group">
            <CardHeader>
              {feature.image && (
                <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={feature.image.imageUrl}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={feature.image.imageHint}
                  />
                </div>
              )}
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
