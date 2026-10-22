import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

function tabIcon(active, inactive) {
  return ({ color, size, focused }) => (
    <Ionicons name={focused ? active : inactive} size={size} color={color} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        tabBarStyle: { backgroundColor: COLORS.card, borderTopColor: COLORS.border, height: 62, paddingBottom: 8, paddingTop: 6 },
        headerStyle: { backgroundColor: COLORS.background },
        headerShadowVisible: false,
        headerTintColor: COLORS.text,
        headerTitleAlign: 'left',
        headerTitleStyle: { fontWeight: '800', fontSize: 24 },
        sceneStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: tabIcon('home', 'home-outline') }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas', tabBarIcon: tabIcon('checkbox', 'checkbox-outline') }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso', tabBarIcon: tabIcon('wallet', 'wallet-outline') }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', tabBarIcon: tabIcon('person', 'person-outline') }} />
    </Tabs>
  );
}
