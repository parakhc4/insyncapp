// app/parent.tsx
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useActivities } from '@/context/ActivitiesContext';

export default function ParentScreen() {
  const { activities, addActivity, notification, clearNotification } = useActivities();
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      addActivity(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      {notification ? (
        <Text style={styles.notification} onPress={clearNotification}>
          {notification}
        </Text>
      ) : null}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="New activity"
          value={text}
          onChangeText={setText}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.activity}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Approved: {item.approved ? 'Yes' : 'No'}</Text>
            {item.notes.map((n) => (
              <Text key={n.id} style={styles.note}>
                Note: {n.content}
              </Text>
            ))}
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
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
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
  note: {
    marginLeft: 8,
    fontStyle: 'italic',
  },
  notification: {
    backgroundColor: '#def',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
    textAlign: 'center',
  },
});
