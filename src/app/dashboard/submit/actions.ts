'use server';

import type { Submission } from '@/lib/types';
import { submissions as initialSubmissions } from '@/lib/submissions';

// This is a simplified in-memory "database" operation.
// In a real application, you would interact with a database.
// We are using localStorage to persist submissions across client-side navigations.

export async function handleAddSubmission(
  newSubmissionData: Omit<Submission, 'id' | 'submissionDate' | 'file'> & { file: File }
) {
  // Note: In a real app, file would be uploaded to a storage service.
  // Here we just use the file name.
  
  const newSubmission: Submission = {
    id: `sub-${Date.now()}`,
    ...newSubmissionData,
    file: newSubmissionData.file.name,
    submissionDate: new Date().toISOString(),
  };

  // This approach is NOT recommended for production. It's a temporary workaround
  // to simulate data persistence without a proper database.
  // We are reading and writing to a "database" (the submissions.ts file) at build time,
  // which won't work for dynamic data.
  // A proper implementation would use a database (e.g., Firestore) and an API
  // to add the submission, then the client would re-fetch the updated list.
  
  // For the purpose of this demo, we'll just log it. The client will update its own state.
  console.log('New submission added on the server:', newSubmission);

  // We can't directly modify the imported `initialSubmissions` array
  // as it's a static build-time asset.
  
  return newSubmission;
}
