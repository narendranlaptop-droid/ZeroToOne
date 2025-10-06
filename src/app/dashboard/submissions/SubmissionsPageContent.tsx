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
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';

export default function SubmissionsPageContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const studentFilter = searchParams.get('student');
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  // This effect will re-fetch or update submissions if they are stored in localStorage
  useEffect(() => {
    const storedSubmissions = localStorage.getItem('submissions');
    let allSubmissions = initialSubmissions;
    if (storedSubmissions) {
      try {
        allSubmissions = JSON.parse(storedSubmissions);
      } catch (e) {
        console.error("Failed to parse submissions from localStorage", e);
        localStorage.setItem('submissions', JSON.stringify(initialSubmissions));
      }
    } else {
        localStorage.setItem('submissions', JSON.stringify(initialSubmissions));
    }
    
    // If there is a student filter from the URL, apply it
    // Otherwise, if the user is a student, filter by their name
    const filterByName = studentFilter || (user?.role === 'student' ? user.name : null);
    if (filterByName) {
      setSubmissions(allSubmissions.filter(s => s.studentName === filterByName));
    } else {
      setSubmissions(allSubmissions);
    }

    const handleStorageChange = () => {
        const updatedSubmissionsJSON = localStorage.getItem('submissions');
        if(updatedSubmissionsJSON) {
            const updatedSubmissions = JSON.parse(updatedSubmissionsJSON);
             if (filterByName) {
                setSubmissions(updatedSubmissions.filter(s => s.studentName === filterByName));
            } else {
                setSubmissions(updatedSubmissions);
            }
        }
    }

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    }
  }, [user, studentFilter]);

  const isStudentView = user?.role === 'student' || !!studentFilter;
  const title = isStudentView ? 'My Submissions' : 'All Submissions';
  const description = isStudentView
    ? 'A list of all work you have submitted.'
    : 'A list of all work submitted by students.';

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Submissions
      </h1>
      <p className="text-muted-foreground">
        {description}
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionsTable submissions={submissions} />
        </CardContent>
      </Card>
    </div>
  );
}
