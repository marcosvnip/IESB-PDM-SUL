import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import ActionRow from '../../components/ActionRow';
import { COLORS } from '../../constants/colors';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  async function estudeiAqui() {
    try {
      const place = await getCurrentPlace();
      if (!place) {
        Alert.alert('Sem permissão', 'Permita a localização para fazer o check-in.');
        return;
      }
      Alert.alert('Check-in', place.label);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  }

  async function lembrar() {
    try {
      const ok = await scheduleReminder('Hora de estudar!', 10);
      Alert.alert(ok ? 'Lembrete agendado' : 'Sem permissão para notificações');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function concluir() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}
    Alert.alert('Tarefa concluída');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.section}>Organize seu estudo</Text>
      <ActionRow icon="add-circle" title="Nova tarefa" subtitle="Criar uma tarefa em uma janela" onPress={() => router.push('/new-task')} />
      <ActionRow icon="document-text" title="Abrir tarefa 42" subtitle="Ver os detalhes de uma tarefa" onPress={() => router.push('/task/42')} />

      <Text style={styles.section}>Seu dia no campus</Text>
      <ActionRow icon="location" title="Estudei aqui" subtitle="Registrar o lugar onde você está" onPress={estudeiAqui} />
      <ActionRow icon="alarm" title="Lembrar em 10 s" subtitle="Receber um lembrete em instantes" onPress={lembrar} />
      <ActionRow icon="checkmark-circle" title="Concluir" subtitle="Marcar a tarefa como feita" onPress={concluir} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  section: { fontSize: 13, fontWeight: '800', color: COLORS.textSecondary, textTransform: 'uppercase', marginTop: 8 },
});
