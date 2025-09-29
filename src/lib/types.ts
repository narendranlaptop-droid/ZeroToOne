export type UserRole = "admin" | "student" | "scorer" | "operator";

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be sent to client
  role: UserRole;
};

export type Task = {
  id: string;
  name: string;
  deadline: string;
  file: string;
};
