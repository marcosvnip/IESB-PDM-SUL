import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/colors';

const KEY = '@profile-photo';

export default function Profile() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((uri) => uri && setPhoto(uri))
      .catch(() => {});
  }, []);

  async function salvar(uri) {
    if (!uri) return;
    setPhoto(uri);
    try {
      await AsyncStorage.setItem(KEY, uri);
    } catch (e) {
      console.log('Erro ao salvar foto', e);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={async () => salvar(await pickImage())} style={styles.avatarWrap}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person" size={68} color="#ffffff" />
          </View>
        )}
        <View style={styles.editBadge}>
          <Ionicons name="images" size={16} color="#ffffff" />
        </View>
      </Pressable>
      <Text style={styles.name}>Estudante CampusGo</Text>
      <Text style={styles.hint}>Toque na foto para escolher uma imagem da galeria</Text>
      <View style={styles.actions}>
        <AppButton title="Tirar foto com a câmera" icon="camera" variant="soft" onPress={async () => salvar(await takePhoto())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 8 },
  avatarWrap: { marginBottom: 10 },
  avatar: { width: 160, height: 160, borderRadius: 80, borderWidth: 5, borderColor: COLORS.card },
  placeholder: { backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  editBadge: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primaryDark,
    borderWidth: 3,
    borderColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  hint: { color: COLORS.textSecondary, textAlign: 'center', marginBottom: 18 },
  actions: { alignSelf: 'stretch' },
});
