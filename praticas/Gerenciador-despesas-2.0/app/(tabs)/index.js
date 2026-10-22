import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useNotices from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';
import AppButton from '../../components/AppButton';
import { COLORS, SHADOW } from '../../constants/colors';

function Header() {
  return (
    <View style={styles.hero}>
      <View style={styles.heroTexts}>
        <Text style={styles.heroTitle}>Olá, estudante!</Text>
        <Text style={styles.heroSub}>Veja os avisos mais recentes do campus.</Text>
      </View>
      <Ionicons name="school" size={44} color="#ffffff" />
    </View>
  );
}

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <View style={styles.errorCircle}>
          <Ionicons name="cloud-offline" size={40} color={COLORS.error} />
        </View>
        <Text style={styles.errorTitle}>Não foi possível carregar</Text>
        <Text style={styles.muted}>{error}</Text>
        <AppButton title="Tentar novamente" icon="refresh" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View>
          <Header />
          <View style={styles.notice}>
            <Ionicons name="information-circle" size={18} color={COLORS.primary} />
            <Text style={styles.noticeText}>Conteúdo de exemplo carregado de um serviço de testes.</Text>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.center}>
          <Ionicons name="megaphone-outline" size={48} color={COLORS.textSecondary} />
          <Text style={styles.muted}>Nenhum aviso por enquanto.</Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <FadeIn>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.chip}>
                <Ionicons name="megaphone" size={13} color={COLORS.primary} />
                <Text style={styles.chipText}>Aviso {index + 1}</Text>
              </View>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 14, padding: 24 },
  list: { padding: 16, paddingBottom: 32 },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 22,
    marginBottom: 12,
    ...SHADOW,
  },
  heroTexts: { flex: 1 },
  heroTitle: { fontSize: 24, fontWeight: '800', color: '#ffffff' },
  heroSub: { color: '#e4e0ff', marginTop: 4 },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 14,
    padding: 10,
    marginBottom: 16,
  },
  noticeText: { flex: 1, fontSize: 12, color: COLORS.primaryDark },
  muted: { color: COLORS.textSecondary, textAlign: 'center' },
  errorCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.errorSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    ...SHADOW,
  },
  cardHeader: { flexDirection: 'row', marginBottom: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  title: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 6, textTransform: 'capitalize' },
  body: { color: COLORS.textSecondary, lineHeight: 21 },
});
