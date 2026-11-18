import { useState, useEffect } from 'react';
import { Todo, Priority } from '@/models/todo.model';
import { storageService } from '@/services/storageService';
import { STORAGE_KEYS } from '@/constants/storageKeys';

// Hook enna return pannum nu solra interface
interface UseTodosResult {
  todos: Todo[];
  loading: boolean;
  doneCount: number;
  addTodo: (title: string, priority?: Priority) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const useTodos = (): UseTodosResult => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. App open aagumbodhu: saved data load pannum
  useEffect(() => {
    const load = async () => {
      const saved = await storageService.get<Todo[]>(STORAGE_KEYS.TODOS);
      setTodos(saved ?? []);
      setLoading(false);
    };
    load();
  }, []);

  // 2. todos maaruna ovvoru thadavaiyum: auto save
  useEffect(() => {
    if (!loading) {
      storageService.set(STORAGE_KEYS.TODOS, todos);
    }
  }, [todos, loading]);

  const addTodo = (title: string, priority: Priority = Priority.Medium) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: trimmed,
      done: false,
      priority,
      dueDate: null,
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // reduce: done aana todos count
  const doneCount = todos.reduce((count, t) => (t.done ? count + 1 : count), 0);

  return { todos, loading, doneCount, addTodo, toggleTodo, deleteTodo };
};

export default useTodos;