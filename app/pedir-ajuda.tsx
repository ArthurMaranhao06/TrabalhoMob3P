import { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

type Pedido = {
  tipo: string;
  descricao: string;
};

export default function PedirAjudaScreen() {
  const [tipoNecessidade, setTipoNecessidade] = useState("Alimentos");
  const [descricao, setDescricao] = useState("");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const router = useRouter();

  const handleEnviarPedido = () => {
    if (!descricao.trim()) {
      Alert.alert("Erro", "Por favor, insira uma descrição.");
      return;
    }

    const novoPedido: Pedido = { tipo: tipoNecessidade, descricao };
    setPedidos((prevPedidos) => [...prevPedidos, novoPedido]);

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
      <TouchableOpacity style={styles.button} onPress={handleEnviarPedido}>
        <Text style={styles.buttonText}>Enviar Pedido</Text>
      </TouchableOpacity>

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
    backgroundColor: '#E6F4FA', // Azul Claro
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0050C0',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000000', // Cinza Claro
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#FFFFFF', // Fundo branco
    marginVertical: 10,
    borderColor: '#AAD4FB',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
  },
  input: {
    backgroundColor: '#AAD4FB', // Azul Médio
    borderColor: '#AAD4FB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    textAlignVertical: 'top',
    height: 120,
    color: '#FFFFFF', // Texto branco
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#2C78C4', // Azul do botão
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // Largura ajustada
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0050C0', // Azul Escuro
  },
  pedido: {
    fontSize: 16,
    marginTop: 5,
    color: '#000000', // Texto cinza
  },
  noPedidos: {
    fontSize: 16,
    color: '#9BA2A8', // Cinza Claro
    marginTop: 5,
  },
});