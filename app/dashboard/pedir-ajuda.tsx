import { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Pedido = {
  tipo: string;
  descricao: string;
};

export default function PedirAjudaScreen() {
  const [tipoNecessidade, setTipoNecessidade] = useState('Alimentos');
  const [descricao, setDescricao] = useState('');
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoEditandoIndex, setPedidoEditandoIndex] = useState<number | null>(null);
  const [editTipo, setEditTipo] = useState('Alimentos');
  const [editDescricao, setEditDescricao] = useState('');

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@pedidos');
      if (dados) {
        setPedidos(JSON.parse(dados));
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const salvarPedidos = async (novosPedidos: Pedido[]) => {
    try {
      await AsyncStorage.setItem('@pedidos', JSON.stringify(novosPedidos));
    } catch (error) {
      console.error('Erro ao salvar pedidos:', error);
    }
  };

  const handleEnviarPedido = () => {
    if (!descricao.trim()) {
      Alert.alert('Erro', 'Por favor, insira uma descrição.');
      return;
    }

    const novoPedido: Pedido = { tipo: tipoNecessidade, descricao };
    const novosPedidos = [...pedidos, novoPedido];
    setPedidos(novosPedidos);
    salvarPedidos(novosPedidos);
    setDescricao('');

    Alert.alert('Sucesso', 'Pedido enviado com sucesso!');
  };

  const handleExcluirPedido = (index: number) => {
    const novosPedidos = pedidos.filter((_, i) => i !== index);
    setPedidos(novosPedidos);
    salvarPedidos(novosPedidos);
  };

  const abrirModalEdicao = (index: number) => {
    setPedidoEditandoIndex(index);
    setEditTipo(pedidos[index].tipo);
    setEditDescricao(pedidos[index].descricao);
    setModalVisible(true);
  };

  const handleSalvarEdicao = () => {
    if (pedidoEditandoIndex === null) return;

    const novosPedidos = [...pedidos];
    novosPedidos[pedidoEditandoIndex] = { tipo: editTipo, descricao: editDescricao };
    setPedidos(novosPedidos);
    salvarPedidos(novosPedidos);

    setModalVisible(false);
    setPedidoEditandoIndex(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pedir Ajuda</Text>

      <Text style={styles.label}>Tipo de necessidade:</Text>
      <Picker
        selectedValue={tipoNecessidade}
        onValueChange={(itemValue) => setTipoNecessidade(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Alimentos" value="Alimentos" />
        <Picker.Item label="Roupas" value="Roupas" />
        <Picker.Item label="Abrigo" value="Abrigo" />
        <Picker.Item label="Medicamentos" value="Medicamentos" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva sua necessidade..."
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviarPedido}>
        <Text style={styles.buttonText}>Enviar Pedido</Text>
      </TouchableOpacity>

      <View style={styles.lista}>
        <Text style={styles.subtitle}>Pedidos Enviados:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#2C78C4" style={{ marginTop: 20 }} />
        ) : pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <View key={index} style={styles.pedidoItem}>
              <Text style={styles.pedidoTipo}>✅ {pedido.tipo}</Text>
              <Text style={styles.pedidoDescricao}>{pedido.descricao}</Text>

              <View style={styles.botoes}>
                <TouchableOpacity onPress={() => abrirModalEdicao(index)} style={styles.editarBtn}>
                  <Text style={styles.btnTexto}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluirPedido(index)} style={styles.excluirBtn}>
                  <Text style={styles.btnTexto}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noPedidos}>Nenhum pedido enviado ainda.</Text>
        )}
      </View>

      {/* Modal de Edição */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subtitle}>Editar Pedido</Text>

            <Text style={styles.label}>Tipo:</Text>
            <Picker
              selectedValue={editTipo}
              onValueChange={(itemValue) => setEditTipo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Alimentos" value="Alimentos" />
              <Picker.Item label="Roupas" value="Roupas" />
              <Picker.Item label="Abrigo" value="Abrigo" />
              <Picker.Item label="Medicamentos" value="Medicamentos" />
              <Picker.Item label="Outros" value="Outros" />
            </Picker>

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={styles.input}
              value={editDescricao}
              onChangeText={setEditDescricao}
              multiline
            />

            <View style={styles.botoes}>
              <TouchableOpacity style={styles.editarBtn} onPress={handleSalvarEdicao}>
                <Text style={styles.btnTexto}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.excluirBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E6F4FA',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0050C0',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  picker: {
    backgroundColor: '#FFFFFF',
    borderColor: '#AAD4FB',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    height: 45,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#AAD4FB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2C78C4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0050C0',
    marginBottom: 10,
  },
  pedidoItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2C78C4',
  },
  pedidoTipo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C78C4',
  },
  pedidoDescricao: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  noPedidos: {
    fontSize: 16,
    color: '#9BA2A8',
    marginTop: 10,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editarBtn: {
    backgroundColor: '#FFD700',
    padding: 8,
    borderRadius: 6,
  },
  excluirBtn: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 6,
  },
  btnTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
  },
});
