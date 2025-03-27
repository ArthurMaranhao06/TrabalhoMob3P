import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    console.log('Redirecionando para /login');
    router.replace('/login');
  }, [router]);

  return null; // Não renderiza nada, apenas realiza o redirecionamento
}

