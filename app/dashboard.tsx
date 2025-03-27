import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const router = useRouter();
  const cidade = "São Paulo"; // Pode ser dinâmico futuramente

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
        activeOpacity={0.7} // Adiciona um efeito de clique
      >
        <Text style={styles.buttonText}>Pedir Ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/oferecer-ajuda')}
        activeOpacity={0.7} // Adiciona um efeito de clique
      >
        <Text style={styles.buttonText}>Oferecer Ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/abrigos')}
        activeOpacity={0.7} // Adiciona um efeito de clique
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
    backgroundColor: '#f0f0f0',
  },
  header: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  alertBox: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    // Adicionando sombra para melhorar a aparência visual
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
