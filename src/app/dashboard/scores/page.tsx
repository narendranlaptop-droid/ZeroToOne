import { ScoresTable } from '@/components/dashboard/scores/ScoresTable';
import { scores } from '@/lib/scores';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ScoresPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Scores
      </h1>
      <p className="text-muted-foreground">
        View and manage all student scores.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Scores</CardTitle>
          <CardDescription>
            A list of all scores submitted by scorers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScoresTable scores={scores} />
        </CardContent>
      </Card>
    </div>
  );
}