// app/parent.tsx
import { FlatList, Button, StyleSheet, Text, View } from 'react-native';
import { useActivities } from '@/context/ActivitiesContext';

export default function DriverScreen() {
  const { activities, toggleApproval } = useActivities();

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.activity}>
            <Text style={styles.title}>{item.title}</Text>
            <Button
              title={item.approved ? 'Unapprove' : 'Approve'}
              onPress={() => toggleApproval(item.id)}
            />
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
});
