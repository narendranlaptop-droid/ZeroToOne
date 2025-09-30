'use client';

import { useState } from 'react';
import { TaskForm } from '@/components/dashboard/tasks/TaskForm';
import { TaskList } from '@/components/dashboard/tasks/TaskList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tasks as initialTasks } from '@/lib/tasks';
import type { Task } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

export default function TasksPage() {
  useAuthRedirect();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (newTask: Omit<Task, 'id' | 'file'> & { file: File }) => {
    const newTaskWithId: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      file: newTask.file.name,
    };
    setTasks((prevTasks) => [newTaskWithId, ...prevTasks]);
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        {isAdmin ? 'Task Management' : 'My Tasks'}
      </h1>
      <p className="text-muted-foreground">
        {isAdmin
          ? 'Add, view, and remove learning tasks.'
          : 'View all assigned tasks from the administrator.'}
      </p>
      <div className={`grid gap-8 mt-8 ${isAdmin ? 'lg:grid-cols-3' : ''}`}>
        {isAdmin && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
                <CardDescription>
                  Fill out the form to create a new task.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskForm onAddTask={addTask} />
              </CardContent>
            </Card>
          </div>
        )}
        <div className={isAdmin ? 'lg:col-span-2' : ''}>
          <Card>
            <CardHeader>
              <CardTitle>Task List</CardTitle>
              <CardDescription>A list of all current tasks.</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={tasks}
                onRemoveTask={removeTask}
                isAdmin={isAdmin}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
