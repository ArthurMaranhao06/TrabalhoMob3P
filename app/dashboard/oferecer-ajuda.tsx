import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface Pedido {
  tipo: string;
  descricao: string;
  ajudado?: boolean; // pra controlar se já ajudou naquele pedido
}

export default function OferecerAjuda() {
  const router = useRouter();

  const [pedidos, setPedidos] = useState<Pedido[]>([
    { tipo: 'Alimentos', descricao: 'Precisamos de comida enlatada.' },
    { tipo: 'Roupas', descricao: 'Roupas secas para família de 4 pessoas.' },
    { tipo: 'Abrigo', descricao: 'Abrigo temporário para uma noite.' },
  ]);

  const handleAjudar = (index: number) => {
    const pedido = pedidos[index];
    const msg = pedido.tipo === 'Abrigo' ? 'Voluntário confirmado!' : 'Doação confirmada!';

    // Marca como ajudado para desabilitar botão
    setPedidos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ajudado: true } : p))
    );

    Alert.alert('Obrigado!', msg);
  };

  const renderItem = ({ item, index }: { item: Pedido; index: number }) => (
    <View style={styles.card} key={index}>
      <Text style={styles.tipo}>{item.tipo}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <TouchableOpacity
        style={[styles.button, item.ajudado && styles.buttonDisabled]}
        onPress={() => handleAjudar(index)}
        disabled={item.ajudado}
        accessibilityLabel={`Botão para ajudar com ${item.tipo}`}
      >
        <Text style={styles.buttonText}>
          {item.ajudado ? 'Ajudado' : 'Ajudar'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oferecer Ajuda</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum pedido disponível no momento.</Text>
        }
        contentContainerStyle={pedidos.length === 0 && styles.flatListEmpty}
        showsVerticalScrollIndicator={false}
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
    fontSize: 32,
    fontWeight: '700',
    color: '#0050C0',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  tipo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C78C4',
    fontFamily: 'Arial',
  },
  descricao: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    fontFamily: 'Arial',
  },
  button: {
  backgroundColor: '#2C78C4',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},

  buttonDisabled: {
    backgroundColor: '#a0aec0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Arial',
  },
  empty: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 60,
    fontFamily: 'Arial',
  },
  flatListEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
