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

export type Post = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string; // ISO 8601 string
};

export type Submission = {
  id: string;
  taskId: string;
  taskName: string;
  studentId: string;
  studentName: string;
  submissionDate: string; // ISO 8601 string
  file: string;
};

export type Score = {
    id: string;
    studentName: string;
    taskName: string;
    depth: number;
    relevance: number;
    applicability: number;
    authenticity: number;
    packaging: number;
    total: number;
    scorerName: string;
    date: string; // ISO 8601 string
};
