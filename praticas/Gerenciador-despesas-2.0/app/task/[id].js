import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AppButton from '../../components/AppButton';
import { COLORS, SHADOW } from '../../constants/colors';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="document-text" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Tarefa número {id}</Text>
        <Text style={styles.sub}>O número vem direto do endereço da tela.</Text>
      </View>
      <AppButton title="Voltar" icon="arrow-back" onPress={() => router.back()} />
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
