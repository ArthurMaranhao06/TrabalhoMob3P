import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#2C78C4' }}>
      <Tabs.Screen
        name="abrigos"
        options={{
          title: 'Abrigos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="oferecer-ajuda"
        options={{
          title: 'Ajudar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hand-left" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="pedir-ajuda"
        options={{
          title: 'Ajuda',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
