import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a tela de Login
    router.replace('/login');
  }, []);

  return null; // Não renderiza nada, apenas redireciona
}