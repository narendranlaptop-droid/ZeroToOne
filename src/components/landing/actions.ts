'use server';

import type { User } from '@/lib/types';
import { users as initialUsers } from '@/lib/users';

// In a real app, this would write to a database.
// For this demo, we can't directly modify the imported `initialUsers`
// so we'll simulate persistence. This is not a production-ready approach.
// A proper solution would use a database (e.g. Firestore).

export async function handleOnboardingSubmission(
  userData: Pick<User, 'name' | 'email' | 'employeeId'>
): Promise<User> {
  console.log('New onboarding submission received on server:', userData);

  const newUser: User = {
    id: `student-${Date.now()}`,
    ...userData,
    role: 'student',
    // In a real app, you would securely generate a password or use a passwordless system
    password: 'password123',
  };

  // This is where you would typically save the user to your database.
  // For example, with Firestore: await addUserToFirestore(newUser);
  
  // Since we can't modify the static users.ts file at runtime,
  // we're returning the new user object. The client-side will need to handle
  // how to reflect this new user in the UI, potentially via client-side state
  // or by re-fetching data if a real database were used.

  return newUser;
}
