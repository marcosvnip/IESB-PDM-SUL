import { Share, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../../store/expenses-context';
import AppButton from '../../components/AppButton';
import { COLORS, SHADOW } from '../../constants/colors';

export default function Wallet() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((acc, item) => acc + item.amount, 0);

  async function compartilhar() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch (error) {
      console.log('Erro ao compartilhar', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.label}>Total gasto no semestre</Text>
          <Ionicons name="wallet" size={28} color="#ffffff" />
        </View>
        <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
        <Text style={styles.count}>
          {expenses.length} {expenses.length === 1 ? 'despesa registrada' : 'despesas registradas'}
        </Text>
      </View>
      <AppButton title="Compartilhar resumo" icon="share-social" onPress={compartilhar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 20, justifyContent: 'center' },
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    padding: 26,
    gap: 8,
    ...SHADOW,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#e4e0ff', fontSize: 14, fontWeight: '600' },
  total: { fontSize: 42, fontWeight: '800', color: '#ffffff' },
  count: { color: '#e4e0ff', fontSize: 13 },
});
