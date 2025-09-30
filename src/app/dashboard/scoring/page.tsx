import { ScoringPortal } from '@/components/dashboard/scoring/ScoringPortal';
import { submissions } from '@/lib/submissions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { scores } from '@/lib/scores';

export default function ScoringPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Scoring Portal
      </h1>
      <p className="text-muted-foreground">
        Review student submissions and assign scores.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Submissions Ready for Scoring</CardTitle>
          <CardDescription>
            Select a submission, review the work, and submit a score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScoringPortal initialSubmissions={submissions} initialScores={scores} />
        </CardContent>
      </Card>
    </div>
  );
}
