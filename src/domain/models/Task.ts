export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  status: 'new' | 'done';
  createdAt: Date;
}
