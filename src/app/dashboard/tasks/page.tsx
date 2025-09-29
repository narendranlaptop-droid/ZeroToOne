import { TaskForm } from '@/components/dashboard/tasks/TaskForm';
import { TaskList } from '@/components/dashboard/tasks/TaskList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tasks } from '@/lib/tasks';

export default function TasksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Task Management
      </h1>
      <p className="text-muted-foreground">
        Add, view, and remove learning tasks.
      </p>
      <div className="grid gap-8 mt-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
              <CardDescription>
                Fill out the form to create a new task.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Task List</CardTitle>
              <CardDescription>
                A list of all current tasks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList tasks={tasks} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
