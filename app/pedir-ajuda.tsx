import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Pedido = {
  tipo: string;
  descricao: string;
};

export default function PedirAjudaScreen() {
  const [tipoNecessidade, setTipoNecessidade] = useState("Alimentos");
  const [descricao, setDescricao] = useState("");
  const [pedidos, setPedidos] = useState<Pedido[]>([]); // Definindo explicitamente que pedidos é um array de Pedido

  const handleEnviarPedido = () => {
    if (!descricao.trim()) {
      Alert.alert("Erro", "Por favor, insira uma descrição.");
      return;
    }

    const novoPedido: Pedido = { tipo: tipoNecessidade, descricao };
    setPedidos((prevPedidos) => [...prevPedidos, novoPedido]); // Atualizando estado de forma segura

    Alert.alert("Sucesso", "Pedido enviado com sucesso!");
    setDescricao(""); // Limpa o campo após envio
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pedir Ajuda</Text>

      {/* Dropdown - Tipo de necessidade */}
      <Text style={styles.label}>Tipo de necessidade:</Text>
      <Picker
        selectedValue={tipoNecessidade}
        onValueChange={(itemValue) => setTipoNecessidade(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Alimentos" value="Alimentos" />
        <Picker.Item label="Roupas" value="Roupas" />
        <Picker.Item label="Abrigo" value="Abrigo" />
      </Picker>

      {/* Campo de descrição */}
      <Text style={styles.label}>Descrição curta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva sua necessidade..."
        value={descricao}
        onChangeText={setDescricao}
      />

      {/* Botão de envio */}
      <Button title="Enviar Pedido" onPress={handleEnviarPedido} />

      {/* Exibe pedidos armazenados */}
      <View style={styles.lista}>
        <Text style={styles.subtitle}>Pedidos Enviados:</Text>
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <Text key={index} style={styles.pedido}>
              ✅ {pedido.tipo} - {pedido.descricao}
            </Text>
          ))
        ) : (
          <Text style={styles.noPedidos}>Nenhum pedido enviado ainda.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  picker: {
    backgroundColor: 'white',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  lista: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pedido: {
    fontSize: 16,
    marginTop: 5,
  },
  noPedidos: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
});
