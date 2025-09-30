'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { handleAddSubmission } from '@/app/dashboard/submit/actions';
import { Task } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

const formSchema = z.object({
  taskId: z.string().min(1, { message: 'Please select a task.' }),
  file:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files?.length === 1, 'A file is required.'),
});

type FormValues = z.infer<typeof formSchema>;

interface SubmitWorkFormProps {
  tasks: Task[];
}

export function SubmitWorkForm({ tasks }: SubmitWorkFormProps) {
  useAuthRedirect('student');
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskId: '',
    },
  });

  const fileRef = form.register('file');

  function onSubmit(values: FormValues) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to submit work.',
      });
      return;
    }

    const selectedTask = tasks.find((task) => task.id === values.taskId);
    if (!selectedTask) {
        toast({
            variant: 'destructive',
            title: 'Invalid Task',
            description: 'The selected task could not be found.',
        });
        return;
    }

    startTransition(async () => {
      const submissionData = {
        taskId: values.taskId,
        taskName: selectedTask.name,
        studentId: user.id,
        studentName: user.name,
        file: values.file[0],
      };

      try {
        await handleAddSubmission(submissionData);
        toast({
          title: 'Submission Successful',
          description: `Your work for "${selectedTask.name}" has been submitted.`,
        });
        router.push('/dashboard/submissions');
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: 'There was an error submitting your work. Please try again.',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="taskId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a task to submit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.name}
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
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Submission File</FormLabel>
                <FormControl>
                  <Input type="file" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Work
        </Button>
      </form>
    </Form>
  );
}
