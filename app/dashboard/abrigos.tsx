import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity, Linking, } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native';

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
    endereco: 'Rua das Flores, 123 - Santo Amaro, Recife',
    capacidade: '150 pessoas',
    responsavel: 'Maria Silva',
    telefone: '(81) 99999-1234',
    latitude: -8.0476,
    longitude: -34.8770,
  },
  {
    id: '2',
    nome: 'Centro de Apoio Sol',
    endereco: 'Av. Central, 456 - Casa Forte, Recife',
    capacidade: '200 pessoas',
    responsavel: 'João Santos',
    telefone: '(81) 98888-4567',
    latitude: -8.0540,
    longitude: -34.8888,
  },
  {
    id: '3',
    nome: 'Refúgio da Paz',
    endereco: 'Travessa Azul, 789 - Madalena, Recife',
    capacidade: '100 pessoas',
    responsavel: 'Ana Costa',
    telefone: '(81) 97777-7890',
    latitude: -8.0600,
    longitude: -34.8700,
  },
  {
    id: '4',
    nome: 'Abrigo Boa Viagem',
    endereco: 'Av. Conselheiro Aguiar, 1500 - Boa Viagem, Recife',
    capacidade: '180 pessoas',
    responsavel: 'Carlos Pereira',
    telefone: '(81) 91234-5678',
    latitude: -8.1234,
    longitude: -34.9000,
  },
  {
    id: '5',
    nome: 'Casa de Apoio Santo Amaro',
    endereco: 'Rua do Futuro, 350 - Santo Amaro, Recife',
    capacidade: '130 pessoas',
    responsavel: 'Fernanda Lima',
    telefone: '(81) 99876-5432',
    latitude: -8.0450,
    longitude: -34.8800,
  },
  {
    id: '6',
    nome: 'Refúgio Jardim São Paulo',
    endereco: 'Rua Padre Roma, 220 - Jardim São Paulo, Recife',
    capacidade: '120 pessoas',
    responsavel: 'Joana Martins',
    telefone: '(81) 98765-4321',
    latitude: -8.0250,
    longitude: -34.9100,
  },
  {
    id: '7',
    nome: 'Abrigo Casa Amarela',
    endereco: 'Av. Norte, 800 - Casa Amarela, Recife',
    capacidade: '170 pessoas',
    responsavel: 'Rafael Souza',
    telefone: '(81) 96543-2109',
    latitude: -8.0300,
    longitude: -34.9500,
  },
  {
    id: '8',
    nome: 'Centro de Apoio Derby',
    endereco: 'Rua Benfica, 400 - Derby, Recife',
    capacidade: '140 pessoas',
    responsavel: 'Mariana Alves',
    telefone: '(81) 93456-7890',
    latitude: -8.0600,
    longitude: -34.9000,
  },
];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [animar] = useState(new Animated.Value(1));
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
const abrirLocalizacaoAtualNoMapa = () => {
  if (location) {
    const { latitude, longitude } = location.coords;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  }
};


useEffect(() => {
    (async () => {
      // Solicita permissão
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização negada');
        return;
      }

      // Obtém a localização atual
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);


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

  <TouchableOpacity style={styles.locationBox} onPress={abrirLocalizacaoAtualNoMapa} activeOpacity={0.8}>
  {errorMsg ? (
    <Text style={styles.locationText}>{errorMsg}</Text>
  ) : location ? (
    <>
      <Text style={styles.locationText}>Latitude: {location.coords.latitude.toFixed(4)}</Text>
      <Text style={styles.locationText}>Longitude: {location.coords.longitude.toFixed(4)}</Text>
      <Text style={[styles.locationText, { fontSize: 11, marginTop: 4 }]}>Toque para abrir no mapa</Text>
    </>
  ) : (
    <ActivityIndicator size="small" color="#0050C0" />
  )}
</TouchableOpacity>

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

locationBox: {
  position: 'absolute',
  bottom: 20,  // Mantém no canto inferior
  left: 20,    // Agora alinha à esquerda
  backgroundColor: '#D6ECFA',
  padding: 4,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},

  locationText: {
    fontSize: 12,
    color: '#0050C0',
    fontWeight: '600',
  },

});
