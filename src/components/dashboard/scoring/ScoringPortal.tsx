'use client';

import { useState, useEffect } from 'react';
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

const scoreSchema = z.coerce.number().min(0).max(10);

const formSchema = z.object({
  scorerName: z.string().min(1, { message: 'Scorer name is required.' }),
  scorerEmail: z.string().email({ message: 'Invalid email address.' }),
  employeeId: z.string().min(1, { message: 'Employee ID is required.' }),
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
  useAuthRedirect('scorer');
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [scores, setScores] = useState<Score[]>(initialScores);
  
  useEffect(() => {
    const storedScores = localStorage.getItem('scores');
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    } else {
      localStorage.setItem('scores', JSON.stringify(initialScores));
    }
  }, [initialScores]);


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
      scorerName: values.scorerName,
      date: new Date().toISOString(),
    };

    setTimeout(() => {
      const updatedScores = [...scores, newScore];
      setScores(updatedScores);
      localStorage.setItem('scores', JSON.stringify(updatedScores));

      // Dispatch a storage event to notify other tabs/windows
      window.dispatchEvent(new Event('storage'));

      toast({
        title: 'Score Submitted',
        description: `Score of ${totalScore}/50 has been submitted for ${submission.studentName}.`,
      });
      form.reset({
        ...form.getValues(),
        submissionId: '',
        depth: 0,
        relevance: 0,
        applicability: 0,
        authenticity: 0,
        packaging: 0,
      });
      setIsPending(false);
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
          name="scorerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scorer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scorerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter your employee ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="submissionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Submission</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
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
