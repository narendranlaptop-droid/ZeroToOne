'use client';

import { useState } from 'react';
import { UserForm } from '@/components/dashboard/users/UserForm';
import { UserTable } from '@/components/dashboard/users/UserTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { users as initialUsers } from '@/lib/users';
import type { User } from '@/lib/types';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

export default function UsersPage() {
  useAuthRedirect('admin');
  const [users, setUsers] = useState<User[]>(
    initialUsers.filter((user) => user.role === 'student')
  );

  const addUser = (newUser: Omit<User, 'id' | 'role'>) => {
    const newUserWithId: User = {
      ...newUser,
      id: `student-${Date.now()}`,
      role: 'student',
    };
    setUsers((prevUsers) => [newUserWithId, ...prevUsers]);
  };

  const removeUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        User Management
      </h1>
      <p className="text-muted-foreground">
        Add, view, and remove student users.
      </p>
      <div className="grid gap-8 mt-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Student</CardTitle>
              <CardDescription>
                Fill out the form to add a new student.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserForm onAddUser={addUser} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                A list of all students in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable users={users} onRemoveUser={removeUser} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
