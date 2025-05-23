import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const handleEnviarLink = () => {
    if (!email) {
      setAlertVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setAlertVisible(false));
        }, 3000);
      });
      return;
    }

    setEmailEnviado(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {alertVisible && (
        <Animated.View style={[styles.alertBox, { opacity: fadeAnim }]}>
          <Text style={styles.alertText}>
            Por favor, insira seu e-mail, telefone ou nome de usuário.
          </Text>
        </Animated.View>
      )}

      {!emailEnviado ? (
        <View style={styles.card}>
          <Text style={styles.title}>Problemas para entrar?</Text>
          <Text style={styles.subtitle}>
            Insira o seu e-mail, telefone ou nome de usuário e enviaremos um link para você voltar a acessar sua conta.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail, telefone ou nome de usuário"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleEnviarLink}>
            <Text style={styles.buttonText}>Enviar link para login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')}>
  <Text style={styles.link}>Voltar ao login</Text>
</TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Email enviado!</Text>
          <Text style={styles.subtitle}>
            Enviamos um email para <Text style={{ fontWeight: 'bold' }}>{email}</Text> com um link para você poder entrar novamente na sua conta.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
  <Text style={styles.buttonText}>OK</Text>
</TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 30,
  },
  alertBox: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  alertText: {
    color: '#2B6CB0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#A0AEC0',
    borderRadius: 8,
    backgroundColor: '#D0E7FF',
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#2B6CB0',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2B6CB0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#2B6CB0',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
