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

const scorerFeatures = [
  {
    title: 'View Submissions',
    description: 'See student submissions.',
    image: PlaceHolderImages.find((img) => img.id === 'submissions-icon'),
    href: '/dashboard/submissions',
  },
  {
    title: 'Provide Scores',
    description: 'Give scores to students.',
    image: PlaceHolderImages.find((img) => img.id === 'scores-icon'),
    href: '/dashboard/scoring',
  },
];

export function ScorerDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {scorerFeatures.map((feature) => (
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
