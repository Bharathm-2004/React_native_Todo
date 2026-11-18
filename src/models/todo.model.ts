// Enum: Priority ku fixed values
export enum Priority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

// Union type: filter ku 3 options mattum
export type Filter = 'all' | 'active' | 'done';

// Interface: Category
export interface Category {
  id: string;
  name: string;
}

// Interface: oru Todo-oda shape
export interface Todo {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  dueDate: string | null;   // date irukkalaam, illaamaum irukkalaam
  note?: string;            // optional
  category?: Category;      // optional
}