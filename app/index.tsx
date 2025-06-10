import { useRouter } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Parent" onPress={() => router.push('/parent')} />
      <Button title="Driver" onPress={() => router.push('/driver')} />
      <Button title="Cook" onPress={() => router.push('/cook')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 40,
  },
});
