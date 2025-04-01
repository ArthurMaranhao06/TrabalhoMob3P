import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const router = useRouter();

  const handleLogin = () => {
    if (!isChecked) {
      setAlertVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setAlertVisible(false));
      }, 5000);
      return;
    }

    if (email === 'reergueradministracao@outlook.com.br' && password === 'reerguer') {
      router.push('/dashboard');
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <View style={styles.container}>
      {alertVisible && (
        <Animated.View style={[styles.alertBox, { opacity: fadeAnim }]}> 
          <Text style={styles.alertText}>Você deve concordar com os Termos & Condições!</Text>
        </Animated.View>
      )}

      {/* Input para o e-mail */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0AEC0"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Input para a senha */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#A0AEC0"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#2B6CB0" />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
  <Checkbox 
    value={isChecked} 
    onValueChange={setIsChecked} 
    color={isChecked ? '#2B6CB0' : undefined} 
  />
  <Text style={styles.checkboxText}>
    Concordo com os{' '}
    <TouchableOpacity onPress={() => router.push('/termos')}>
      <Text style={styles.termsText}>Termos & Condições</Text>
    </TouchableOpacity>
  </Text>
</View>

      <TouchableOpacity onPress={() => router.push('/esqueci-senha')}>
        <Text style={styles.forgotPassword}>ESQUECI MINHA SENHA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccount} onPress={() => router.push('/criar-conta')}>
  <Text style={styles.buttonText}>CRIAR CONTA</Text>
</TouchableOpacity>

      {/* Ícones para login com Gmail e Facebook */}
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={require('../assets/google-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/facebook-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 20,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#A0AEC0',
    borderRadius: 8,
    backgroundColor: '#D0E7FF',
    marginBottom: 12,
    height: 50,
  },
  input: {
    flex: 1,
    color: '#2B6CB0',
    fontSize: 16,
    height: '100%',
    padding: 10
  },
  iconContainer: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxText: {
    marginLeft: 8,
    color: '#2B6CB0',
  },
  termsText: {
    color: '#1E40AF',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#2B6CB0',
    textAlign: 'right',
    width: '100%',
    marginBottom: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
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
  createAccount: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});