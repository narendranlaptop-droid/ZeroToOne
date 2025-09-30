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

const studentFeatures = [
  {
    title: 'My Tasks',
    description: 'View tasks assigned by the admin.',
    image: PlaceHolderImages.find((img) => img.id === 'tasks-icon'),
    href: '/dashboard/tasks',
  },
  {
    title: 'Submit Work',
    description: 'Upload your outputs and files.',
    image: PlaceHolderImages.find((img) => img.id === 'submissions-icon'),
    href: '/dashboard/submit',
  },
  {
    title: 'Discussion Forum',
    description: 'Share feedback and opinions.',
    image: PlaceHolderImages.find((img) => img.id === 'discussion-icon'),
    href: '/dashboard/discussion',
  },
];

export function StudentDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {studentFeatures.map((feature) => (
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
