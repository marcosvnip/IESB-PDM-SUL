import { Stack } from 'expo-router';
import { ExpensesContextProvider } from '../store/expenses-context';
import { COLORS } from '../constants/colors';

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
        <Stack.Screen name="new-task" options={{ presentation: 'modal', title: 'Nova tarefa' }} />
      </Stack>
    </ExpensesContextProvider>
  );
}
