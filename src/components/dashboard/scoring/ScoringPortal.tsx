'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Submission, Score } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { Textarea } from '@/components/ui/textarea';

const scoreSchema = z.coerce.number().min(0).max(10);

const formSchema = z.object({
  submissionId: z.string().min(1, 'Please select a submission.'),
  depth: scoreSchema,
  relevance: scoreSchema,
  applicability: scoreSchema,
  authenticity: scoreSchema,
  packaging: scoreSchema,
});

interface ScoringPortalProps {
  initialSubmissions: Submission[];
  initialScores: Score[];
}

export function ScoringPortal({
  initialSubmissions,
  initialScores,
}: ScoringPortalProps) {
  useAuthRedirect(['scorer', 'admin']);
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [scores, setScores] = useState<Score[]>(initialScores);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      submissionId: '',
      depth: 0,
      relevance: 0,
      applicability: 0,
      authenticity: 0,
      packaging: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to score.',
      });
      return;
    }

    const submission = submissions.find((s) => s.id === values.submissionId);
    if (!submission) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid submission selected.',
      });
      return;
    }

    setIsPending(true);

    const totalScore =
      values.depth +
      values.relevance +
      values.applicability +
      values.authenticity +
      values.packaging;

    const newScore: Score = {
      id: `score-${Date.now()}`,
      studentName: submission.studentName,
      taskName: submission.taskName,
      depth: values.depth,
      relevance: values.relevance,
      applicability: values.applicability,
      authenticity: values.authenticity,
      packaging: values.packaging,
      total: totalScore,
      scorerName: user.name,
      date: new Date().toISOString(),
    };

    setTimeout(() => {
      const updatedScores = [...scores, newScore];
      setScores(updatedScores);
      localStorage.setItem('scores', JSON.stringify(updatedScores));

      toast({
        title: 'Score Submitted',
        description: `Score of ${totalScore}/50 has been submitted for ${submission.studentName}.`,
      });
      form.reset();
      setIsPending(false);

      window.dispatchEvent(new Event('storage'));
    }, 1000);
  };

  const scoreCategories = [
    { name: 'depth', label: 'Depth Score' },
    { name: 'relevance', label: 'Relevance Score' },
    { name: 'applicability', label: 'Applicability' },
    { name: 'authenticity', label: 'Authenticity/Novelty' },
    { name: 'packaging', label: 'Packaging' },
  ] as const;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
        <FormField
          control={form.control}
          name="submissionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Submission</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a submission to score" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {submissions.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.studentName} - {sub.taskName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scoreCategories.map((cat) => (
            <FormField
              key={cat.name}
              control={form.control}
              name={cat.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{cat.label} (0-10)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" max="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Score
        </Button>
      </form>
    </Form>
  );
}
