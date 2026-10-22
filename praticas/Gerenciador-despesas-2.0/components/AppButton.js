import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function AppButton({ title, icon, onPress, variant = 'primary' }) {
  const isPrimary = variant === 'primary';
  const color = isPrimary ? '#fff' : COLORS.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.soft,
        pressed && styles.pressed,
      ]}
    >
      {icon ? <Ionicons name={icon} size={20} color={color} /> : null}
      <Text style={[styles.text, { color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 999,
  },
  primary: { backgroundColor: COLORS.primary },
  soft: { backgroundColor: COLORS.primarySoft },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  text: { fontSize: 16, fontWeight: '700' },
});
