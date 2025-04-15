import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';

export default function CriarConta() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [cep, setCep] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [termsAlertVisible, setTermsAlertVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const termsFadeAnim = useState(new Animated.Value(0))[0];
  const router = useRouter();

  const fetchAddress = async (cep: string | any[]) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        } else {
          setAddress('CEP inválido');
        }
      } catch (error) {
        setAddress('Erro ao buscar endereço');
      }
    } else {
      setAddress('');
    }
  };

  const handleRegister = () => {
    if (!isChecked) {
      setTermsAlertVisible(true);
      Animated.timing(termsFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(termsFadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setTermsAlertVisible(false));
      }, 5000);
      return;
    }

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
      }).start(() => {
        setAlertVisible(false);
        router.push('/');
      });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {alertVisible && (
        <Animated.View style={[styles.alertBox, { opacity: fadeAnim }]}>
          <Text style={styles.alertText}>Conta criada com sucesso!</Text>
        </Animated.View>
      )}
      {termsAlertVisible && (
        <Animated.View style={[styles.alertBox, { opacity: termsFadeAnim }]}>
          <Text style={styles.alertText}>Você deve concordar com os Termos e Condições!</Text>
        </Animated.View>
      )}

      <Text style={styles.title}>Criar Conta</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Nome Completo" value={fullName} onChangeText={setFullName} />
      <TextInput 
        style={styles.input} 
        placeholder="CEP" 
        value={cep} 
        onChangeText={(text) => { setCep(text); fetchAddress(text); }}
        keyboardType="numeric" 
      />
      <TextInput style={styles.input} placeholder="Endereço" value={address} editable={false} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Número de Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Criar Conta</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2B6CB0',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#D0E7FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A0AEC0',
  },
  addressText: {
    fontSize: 14,
    color: '#2B6CB0',
    marginBottom: 10,
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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
});
