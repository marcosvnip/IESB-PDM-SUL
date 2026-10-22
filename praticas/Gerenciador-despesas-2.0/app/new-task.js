import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppButton from '../components/AppButton';
import { COLORS, SHADOW } from '../constants/colors';

export default function NewTask() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="add" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Nova tarefa</Text>
        <Text style={styles.sub}>Esta tela abre sobre as outras, como uma janela.</Text>
      </View>
      <AppButton title="Fechar" icon="close" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 20 },
  card: { backgroundColor: COLORS.card, borderRadius: 28, padding: 32, alignItems: 'center', gap: 10, ...SHADOW },
  iconCircle: { width: 76, height: 76, borderRadius: 38, backgroundColor: COLORS.primarySoft, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  sub: { color: COLORS.textSecondary, textAlign: 'center' },
});
