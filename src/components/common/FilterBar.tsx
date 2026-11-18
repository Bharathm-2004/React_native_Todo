import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Filter } from '@/models/todo.model';

interface FilterBarProps {
  current: Filter;
  onChange: (filter: Filter) => void;
}

// Options list: Filter type ku match aagura values mattum
const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Done' },
];

const FilterBar = ({ current, onChange }: FilterBarProps) => {
  return (
    <View style={styles.row}>
      {OPTIONS.map(({ value, label }) => {
        const isActive = value === current;
        return (
          <Pressable
            key={value}
            onPress={() => onChange(value)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  chipActive: { backgroundColor: '#2563eb' },
  text: { fontSize: 14, fontWeight: '600', color: '#334155' },
  textActive: { color: '#ffffff' },
});

export default FilterBar;