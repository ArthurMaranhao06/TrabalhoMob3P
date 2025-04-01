import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [emailEnviado, setEmailEnviado] = useState(false);
  const router = useRouter();

  const handleEnviarLink = () => {
    if (!email) {
      alert('Por favor, insira seu e-mail, telefone ou nome de usuário.');
      return;
    }
    setEmailEnviado(true);
  };

  return (
    <View style={styles.container}>
      {!emailEnviado ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Problemas para entrar?</Text>
          <Text style={styles.subtitle}>
            Insira o seu e-mail, telefone ou nome de usuário e enviaremos um link para você voltar a acessar sua conta.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail, telefone ou nome de usuário"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleEnviarLink}>
            <Text style={styles.buttonText}>Enviar link para login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.voltarText}>Voltar ao login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Email enviado</Text>
          <Text style={styles.alertMessage}>
            Enviamos um email para {email} com um link para você poder entrar novamente na sua conta.
          </Text>
          <TouchableOpacity style={styles.okButton} onPress={() => router.push('/login')}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#6b6b6b',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2B6CB0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voltarText: {
    color: '#2B6CB0',
    fontSize: 16,
  },
  alertContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#2B6CB0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});