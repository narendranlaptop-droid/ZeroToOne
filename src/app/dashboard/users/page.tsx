'use client';

import { useState, useEffect } from 'react';
import { UserForm } from '@/components/dashboard/users/UserForm';
import { UserTable } from '@/components/dashboard/users/UserTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { User } from '@/lib/types';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function UsersPage() {
  useAuthRedirect('admin');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('role', '==', 'student'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentUsers: User[] = [];
      querySnapshot.forEach((doc) => {
        studentUsers.push({ id: doc.id, ...doc.data() } as User);
      });
      setUsers(studentUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
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
                <Skeleton className="h-48 w-full" />
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
                 <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }


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
              <UserForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                A list of all students in the system.
              </-CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable users={users} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
