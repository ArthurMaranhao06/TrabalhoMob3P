import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function PedirAjudaScreen() {
  const [tipoNecessidade, setTipoNecessidade] = useState("Alimentos");
  const [descricao, setDescricao] = useState("");
  const [pedidos, setPedidos] = useState([]);

  const handleEnviarPedido = () => {
    if (!descricao.trim()) {
      Alert.alert("Erro", "Por favor, insira uma descrição.");
      return;
    }

    const novoPedido = { tipo: tipoNecessidade, descricao };
    setPedidos([...pedidos, novoPedido]); // Armazena localmente na lista

    Alert.alert("Sucesso", "Pedido enviado com sucesso!");
    setDescricao(""); // Limpa o campo após envio
  };

  return (
    <View style={styles.container}>
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

      {/* Exibe pedidos armazenados (opcional) */}
      <View style={styles.lista}>
        <Text style={styles.subtitle}>Pedidos Enviados:</Text>
        {pedidos.map((pedido, index) => (
          <Text key={index} style={styles.pedido}>
            ✅ {pedido.tipo} - {pedido.descricao}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});
