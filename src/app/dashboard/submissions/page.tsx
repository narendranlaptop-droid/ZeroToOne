'use client';
import { Suspense } from 'react';
import SubmissionsPageContent from './SubmissionsPageContent';

export default function SubmissionsPage() {
  return (
    <Suspense>
      <SubmissionsPageContent />
    </Suspense>
  );
}
