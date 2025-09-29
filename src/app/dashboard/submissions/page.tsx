import { SubmissionsTable } from '@/components/dashboard/submissions/SubmissionsTable';
import { submissions } from '@/lib/submissions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SubmissionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Submissions
      </h1>
      <p className="text-muted-foreground">
        View and manage all student submissions.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
          <CardDescription>
            A list of all work submitted by students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionsTable submissions={submissions} />
        </CardContent>
      </Card>
    </div>
  );
}
