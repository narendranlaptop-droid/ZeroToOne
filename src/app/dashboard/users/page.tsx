import { UserTable } from '@/components/dashboard/users/UserTable';
import { users } from '@/lib/users';
import type { User } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function UsersPage() {
  const students = users.filter((user) => user.role === 'student');

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        User Management
      </h1>
      <p className="text-muted-foreground">
        View and manage student users.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            A list of all students in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable users={students} />
        </CardContent>
      </Card>
    </div>
  );
}
