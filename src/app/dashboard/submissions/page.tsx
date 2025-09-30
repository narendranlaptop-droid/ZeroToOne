'use client';

import { SubmissionsTable } from '@/components/dashboard/submissions/SubmissionsTable';
import { submissions as initialSubmissions } from '@/lib/submissions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useEffect } from 'react';
import type { Submission } from '@/lib/types';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

export default function SubmissionsPage() {
  useAuthRedirect();
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  // This effect will re-fetch or update submissions if they are stored in localStorage
  useEffect(() => {
    const storedSubmissions = localStorage.getItem('submissions');
    if (storedSubmissions) {
      try {
        setSubmissions(JSON.parse(storedSubmissions));
      } catch (e) {
        console.error("Failed to parse submissions from localStorage", e);
        // If parsing fails, fall back to initial submissions
        setSubmissions(initialSubmissions);
        localStorage.setItem('submissions', JSON.stringify(initialSubmissions));
      }
    } else {
        localStorage.setItem('submissions', JSON.stringify(initialSubmissions));
    }

    const handleStorageChange = () => {
        const updatedSubmissions = localStorage.getItem('submissions');
        if(updatedSubmissions) {
            setSubmissions(JSON.parse(updatedSubmissions));
        }
    }

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

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
