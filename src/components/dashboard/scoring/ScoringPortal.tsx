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

const formSchema = z.object({
  submissionId: z.string().min(1, 'Please select a submission.'),
  score: z.coerce
    .number()
    .min(0, 'Score must be at least 0.')
    .max(100, 'Score cannot be more than 100.'),
  scoreFile:
    typeof window === 'undefined'
      ? z.any()
      : z.instanceof(FileList).refine((files) => files?.length === 1, 'A score file is required.'),
});

interface ScoringPortalProps {
  initialSubmissions: Submission[];
  initialScores: Score[];
}

export function ScoringPortal({ initialSubmissions, initialScores }: ScoringPortalProps) {
  useAuthRedirect(['scorer', 'admin']);
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [scores, setScores] = useState<Score[]>(initialScores);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const fileRef = form.register('scoreFile');

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to score.' });
        return;
    }
    
    const submission = submissions.find(s => s.id === values.submissionId);
    if (!submission) {
        toast({ variant: 'destructive', title: 'Error', description: 'Invalid submission selected.' });
        return;
    }

    setIsPending(true);

    const newScore: Score = {
      id: `score-${Date.now()}`,
      studentName: submission.studentName,
      taskName: submission.taskName,
      score: values.score,
      scorerName: user.name,
      date: new Date().toISOString(),
      fileUrl: `/scores/${values.scoreFile[0].name}`, // Mock URL
    };
    
    // In a real app, this would be an API call to a database.
    // We simulate it by updating the state.
    setTimeout(() => {
        const updatedScores = [...scores, newScore];
        setScores(updatedScores);
        // Persist to localStorage to be reflected on the scores page
        localStorage.setItem('scores', JSON.stringify(updatedScores));

        toast({
            title: 'Score Submitted',
            description: `Score of ${values.score} has been submitted for ${submission.studentName}.`,
        });
        form.reset();
        setIsPending(false);
        
        // Manually dispatch a storage event to notify other tabs/pages
        window.dispatchEvent(new Event('storage'));

    }, 1000);
  };

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
        
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Score (0-100)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 95" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scoreFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Score Excel File</FormLabel>
              <FormControl>
                <Input type="file" {...fileRef} accept=".xlsx, .xls, .csv" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Score
        </Button>
      </form>
    </Form>
  );
}
