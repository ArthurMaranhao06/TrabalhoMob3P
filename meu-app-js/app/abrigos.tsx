import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AbrigosScreen() {
  // Lista simulada de abrigos
  const abrigos = [
    { id: '1', nome: 'Abrigo Esperança', endereco: 'Rua das Flores, 123' },
    { id: '2', nome: 'Centro de Apoio Sol', endereco: 'Av. Central, 456' },
    { id: '3', nome: 'Refúgio da Paz', endereco: 'Travessa Azul, 789' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrigos Disponíveis</Text>

      <FlatList
        data={abrigos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.abrigoItem}>
            <FontAwesome5 name="home" size={24} color="#fff" style={styles.icon} />
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  abrigoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  endereco: {
    fontSize: 14,
    color: '#ecf0f1',
  },
});
