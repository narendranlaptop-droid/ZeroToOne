'use client';

import { ScoresTable } from '@/components/dashboard/scores/ScoresTable';
import { scores as initialScores } from '@/lib/scores';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Score } from '@/lib/types';

export default function ScoresPage() {
  const [scores, setScores] = useState<Score[]>(initialScores);

  useEffect(() => {
    const storedScores = localStorage.getItem('scores');
    if (storedScores) {
      try {
        setScores(JSON.parse(storedScores));
      } catch (e) {
        console.error("Failed to parse scores from localStorage", e);
        setScores(initialScores);
        localStorage.setItem('scores', JSON.stringify(initialScores));
      }
    } else {
        localStorage.setItem('scores', JSON.stringify(initialScores));
    }

    const handleStorageChange = () => {
        const updatedScores = localStorage.getItem('scores');
        if(updatedScores) {
            setScores(JSON.parse(updatedScores));
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
