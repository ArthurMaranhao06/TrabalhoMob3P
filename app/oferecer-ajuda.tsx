import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Impede que a tela de splash desapareça automaticamente

export default function OferecerAjuda() {
  const router = useRouter();
  const [mensagem, setMensagem] = useState('');

  const [fontsLoaded] = useFonts({
    Pacifico: Pacifico_400Regular,
  });

  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleEnviarAjuda = () => {
    if (mensagem.trim() === '') {
      Alert.alert('Erro', 'Por favor, escreva uma mensagem antes de enviar.');
      return;
    }
    Alert.alert('Sucesso', 'Sua oferta de ajuda foi enviada!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oferecer Ajuda</Text>
      <Text style={styles.label}>Escreva como você pode ajudar:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem..."
        placeholderTextColor="#9BA2A8"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleEnviarAjuda}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FA', // Azul Claro
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: '#0050C0',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  label: {
    fontSize: 16,
    color: '#000000', // Cinza Claro
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#AAD4FB',  // Fundo azul médio
    borderColor: '#AAD4FB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    textAlignVertical: 'top',
    height: 120,
    color: '#FFFFFF',            // Texto branco
  },
  
  
  button: {
    backgroundColor: '#2C78C4', // Azul do botão
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',           // Branco
    fontSize: 16,
    fontWeight: 'bold',
  },
});