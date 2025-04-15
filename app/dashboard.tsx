import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const router = useRouter();
  const cidade = "Recife"; // Pode ser dinâmico futuramente

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="warning" size={28} color="white" />
        <Text style={styles.headerText}>SOS Chuvas</Text>
      </View>

      {/* Notificação */}
      <View style={styles.alertBox}>
        <Text style={styles.alertText}>🚨 Alerta: Risco de enchente em {cidade} 🚨</Text>
      </View>

      {/* Botões */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/pedir-ajuda')}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Pedir Ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/oferecer-ajuda')}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Oferecer Ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/abrigos')}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Abrigos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E6F4FA',  // Azul Claro (Fundo)
  },
  header: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0050C0',  // Azul Escuro
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Branco
  },
  alertBox: {
    backgroundColor: '#FF4D4D',  // Vermelho para o alerta
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
    width: '90%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#2C78C4',  // Azul Médio (Botão)
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    // Sombra mais suave para os botões
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});