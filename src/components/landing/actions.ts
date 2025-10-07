'use server';

import type { User } from '@/lib/types';
import { users as initialUsers } from '@/lib/users';

const STARTING_EMPLOYEE_ID = 17250;

function getNextEmployeeId(existingUsers: User[]): string {
  const studentUsers = existingUsers.filter(u => u.role === 'student' && !isNaN(parseInt(u.employeeId)));
  if (studentUsers.length === 0) {
    return String(STARTING_EMPLOYEE_ID);
  }

  const maxId = Math.max(...studentUsers.map(u => parseInt(u.employeeId, 10)));
  return String(maxId + 1);
}

export async function handleOnboardingSubmission(
  userData: Pick<User, 'name' | 'email'>
): Promise<User> {
  console.log('New onboarding submission received on server:', userData);

  // In a real app, you would fetch all users from a database.
  // For now, we use the static list and any stored users.
  const storedUsersRaw = null; // This would come from a persistent store in a real app
  const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
  const allUsers = [...initialUsers, ...storedUsers];
  
  const nextEmployeeId = getNextEmployeeId(allUsers);

  const newUser: User = {
    id: `student-${Date.now()}`,
    ...userData,
    employeeId: nextEmployeeId,
    role: 'student',
    password: 'password123',
  };

  return newUser;
}
