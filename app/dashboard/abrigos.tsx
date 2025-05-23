import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// Tipo para os itens de abrigo
type Abrigo = {
  id: string;
  nome: string;
  endereco: string;
  capacidade?: string;
  responsavel?: string;
  telefone?: string;
  latitude?: number;
  longitude?: number;
};

type RootStackParamList = {
  Termos: undefined;
  // adicione outras rotas aqui se necessário
};

export default function AbrigosScreen() {
  // Lista sim
   const router = useRouter();

  const abrigos: Abrigo[] = [
    {
      id: '1',
      nome: 'Abrigo Esperança',
      endereco: 'Rua das Flores, 123',
      capacidade: '150 pessoas',
      responsavel: 'Maria Silva',
      telefone: '(81) 99999-1234',
      latitude: -8.0476,
      longitude: -34.8770,
    },
    {
      id: '2',
      nome: 'Centro de Apoio Sol',
      endereco: 'Av. Central, 456',
      capacidade: '200 pessoas',
      responsavel: 'João Santos',
      telefone: '(81) 98888-4567',
      latitude: -8.0540,
      longitude: -34.8888,
    },
    {
      id: '3',
      nome: 'Refúgio da Paz',
      endereco: 'Travessa Azul, 789',
      capacidade: '100 pessoas',
      responsavel: 'Ana Costa',
      telefone: '(81) 97777-7890',
      latitude: -8.0600,
      longitude: -34.8700,
    },
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [animar] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(animar, {
      toValue: 1.03,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animar, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const abrirNoMapa = (latitude?: number, longitude?: number, nome?: string) => {
    if (!latitude || !longitude) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrigos Disponíveis</Text>

      {abrigos.length > 0 ? (
        <FlatList
          data={abrigos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const expanded = item.id === expandedId;

            return (
              <Animated.View
                style={[styles.abrigoItem, { transform: [{ scale: animar }] }]}
                onTouchStart={handlePressIn}
                onTouchEnd={handlePressOut}
              >
                <TouchableOpacity
                  style={styles.topRow}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.7}
                >
                  <FontAwesome5 name="home" size={24} color="#fff" style={styles.icon} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.endereco}>{item.endereco}</Text>
                  </View>
                  
                  <Feather
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>

                {expanded && (
                  <View style={styles.extraInfo}>
                    <Text style={styles.infoText}>Capacidade: {item.capacidade}</Text>
                    <Text style={styles.infoText}>Responsável: {item.responsavel}</Text>
                    <Text style={styles.infoText}>Telefone: {item.telefone}</Text>

                    <TouchableOpacity
                      style={styles.mapaBtn}
                      onPress={() => abrirNoMapa(item.latitude, item.longitude, item.nome)}
                    >
                      <Feather name="map-pin" size={16} color="#fff" />
                      <Text style={styles.mapaBtnText}>Ver no Mapa</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Animated.View>
            );
          }}
        />
      ) : (
        <Text style={styles.noAbrigos}>Nenhum abrigo disponível no momento.</Text>
      )}


 <View style={{ marginTop: 20, alignItems: 'center' }}>
  <TouchableOpacity onPress={() => router.push('/termos')}>
    <Text style={{ color: '#2C78C4', fontSize: 16, fontWeight: '600' }}>
      Ver Termos de Uso
    </Text>
  </TouchableOpacity>
</View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0050C0',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  abrigoItem: {
    backgroundColor: '#2C78C4',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  extraInfo: {
    marginTop: 10,
    backgroundColor: '#4C93D1',
    borderRadius: 8,
    padding: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  mapaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FF4D4D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  mapaBtnText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
  },
  noAbrigos: {
    fontSize: 16,
    color: '#9BA2A8',
    textAlign: 'center',
    marginTop: 20,
  },
});
