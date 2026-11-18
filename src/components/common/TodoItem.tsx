import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Todo, Priority } from '@/models/todo.model';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// Priority ku color: Record<key type, value type>
const PRIORITY_COLORS: Record<Priority, string> = {
  [Priority.Low]: '#22c55e',
  [Priority.Medium]: '#f59e0b',
  [Priority.High]: '#ef4444',
};

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const { id, title, done, priority, dueDate, note, category } = todo;

  return (
    <View style={styles.card}>
      <View
        style={[styles.priorityBar, { backgroundColor: PRIORITY_COLORS[priority] }]}
      />

      <Pressable style={styles.content} onPress={() => onToggle(id)}>
        <Text style={[styles.title, done && styles.titleDone]}>
          {done ? '✓ ' : '○ '}
          {title}
        </Text>
        <Text style={styles.meta}>
          {category?.name ?? 'No category'} • {dueDate ?? 'No due date'}
        </Text>
        {note ? <Text style={styles.note}>{note}</Text> : null}
      </Pressable>

      <Pressable onPress={() => onDelete(id)} hitSlop={8}>
        <Text style={styles.delete}>✕</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  priorityBar: { width: 4, alignSelf: 'stretch', borderRadius: 2, marginRight: 12 },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  titleDone: { textDecorationLine: 'line-through', color: '#94a3b8' },
  meta: { fontSize: 12, color: '#64748b', marginTop: 2 },
  note: { fontSize: 13, color: '#475569', marginTop: 4 },
  delete: { fontSize: 18, color: '#dc2626', paddingHorizontal: 8 },
});

export default TodoItem;