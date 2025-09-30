import { SubmitWorkForm } from '@/components/dashboard/submit/SubmitWorkForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tasks } from '@/lib/tasks';

export default function SubmitWorkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Submit Your Work
      </h1>
      <p className="text-muted-foreground">
        Select a task and upload your assignment file.
      </p>
      <Card className="mt-8 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>New Submission</CardTitle>
          <CardDescription>
            Fill out the details below to submit your work.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmitWorkForm tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  );
}
