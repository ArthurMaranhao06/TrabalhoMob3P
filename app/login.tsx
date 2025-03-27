import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Lógica de autenticação simples
    if (name === 'usuario' && password === '1234') {
      // Redireciona para a página de dashboard após login bem-sucedido
      router.push('/dashboard');
    } else {
      // Exibe um alerta caso os dados de login estejam incorretos
      Alert.alert('Erro', 'Nome ou senha incorretos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Input para o nome do usuário */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName} // Atualiza o estado de 'name'
      />

      {/* Input para a senha do usuário */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry // Esconde o texto digitado
        value={password}
        onChangeText={setPassword} // Atualiza o estado de 'password'
      />

      {/* Botão para realizar o login */}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

// Estilo do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
