// app/parent.tsx
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useActivities } from '@/context/ActivitiesContext';

export default function CookScreen() {
  const { activities, addNote } = useActivities();
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleAdd = (id: string) => {
    const message = notes[id]?.trim();
    if (message) {
      addNote(id, message);
      setNotes((prev) => ({ ...prev, [id]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.activity}>
            <Text style={styles.title}>{item.title}</Text>
            {item.notes.map((n) => (
              <Text key={n.id} style={styles.note}>
                Note: {n.content}
              </Text>
            ))}
            <TextInput
              style={styles.input}
              placeholder="Add note"
              value={notes[item.id] || ''}
              onChangeText={(t) => setNotes((p) => ({ ...p, [item.id]: t }))}
            />
            <Button title="Submit Note" onPress={() => handleAdd(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  activity: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginTop: 6,
  },
  note: {
    marginLeft: 8,
    fontStyle: 'italic',
  },
});
