import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function OferecerAjuda() {
  const router = useRouter();
  const [mensagem, setMensagem] = useState('');

  const handleEnviarAjuda = () => {
    if (mensagem.trim() === '') {
      Alert.alert('Erro', 'Por favor, escreva uma mensagem antes de enviar.');
      return;
    }
    Alert.alert('Sucesso', 'Sua oferta de ajuda foi enviada!');
    router.back(); // Voltar para a tela anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oferecer Ajuda</Text>
      <Text style={styles.label}>Escreva como você pode ajudar:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem..."
        value={mensagem}
        onChangeText={setMensagem}
        multiline
      />
      <Button title="Enviar" onPress={handleEnviarAjuda} />
    </View>
  );
}

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
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
});
