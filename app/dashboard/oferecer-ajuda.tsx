import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

type Pedido = {
  tipo: string;
  descricao: string;
};

export default function OferecerAjuda() {
  const router = useRouter();

  const [pedidos, setPedidos] = useState<Pedido[]>([
    { tipo: 'Alimentos', descricao: 'Precisamos de comida enlatada.' },
    { tipo: 'Roupas', descricao: 'Roupas secas para família de 4 pessoas.' },
    { tipo: 'Abrigo', descricao: 'Abrigo temporário para uma noite.' },
  ]);

  const handleAjudar = (tipo: string) => {
    const msg = tipo === 'Abrigo' ? 'Voluntário confirmado!' : 'Doação confirmada!';
    Alert.alert('Obrigado!', msg);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oferecer Ajuda</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.tipo}>{item.tipo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleAjudar(item.tipo)}>
              <Text style={styles.buttonText}>Ajudar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum pedido disponível no momento.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FA',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Arial',
    color: '#0050C0',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#2C78C4',
  },
  descricao: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#333',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#2C78C4',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#999',
    marginTop: 50,
  },
});
