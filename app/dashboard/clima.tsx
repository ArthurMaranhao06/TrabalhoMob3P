import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Image, Animated } from 'react-native';

export default function ClimaScreen() {
  const [cidade, setCidade] = useState('São Paulo');
  const [dadosClima, setDadosClima] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [blinkAnim] = useState(new Animated.Value(1)); // Para piscar

  const API_KEY = 'f2acbd368e6a44a6968182207252605';

  const buscarClima = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cidade}&days=3&lang=pt`
      );
      const data = await response.json();
      setDadosClima(data);

      // Verificar riscos altos e disparar alerta sonoro
      const riscoEnchente = avaliarRiscoEnchente(data.current.precip_mm, data.current.humidity);
      const riscoDeslizamento = avaliarRiscoDeslizamento(data.current.precip_mm, data.current.wind_kph);

      if (riscoEnchente === 'Alto' || riscoDeslizamento === 'Alto') {
        Alert.alert(
          'Alerta de Risco Alto!',
          `Risco de Enchente: ${riscoEnchente}\nRisco de Deslizamento: ${riscoDeslizamento}`,
          [{ text: 'OK' }]
        );
        iniciarPiscar();
      } else {
        pararPiscar();
      }

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o clima.');
      pararPiscar();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarClima();
  }, []);

  const avaliarRiscoEnchente = (precip: number, umidade: number) => {
    if (precip > 50 || umidade > 90) return 'Alto';
    if (precip > 20 || umidade > 80) return 'Moderado';
    return 'Baixo';
  };

  const avaliarRiscoDeslizamento = (precip: number, vento: number) => {
    if (precip > 50 || vento > 50) return 'Alto';
    if (precip > 20 || vento > 30) return 'Moderado';
    return 'Baixo';
  };

  // Animação de piscar para alerta
  const iniciarPiscar = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  };

  const pararPiscar = () => {
    blinkAnim.stopAnimation();
    blinkAnim.setValue(1);
  };

  if (!dadosClima && loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0050C0" />
      </View>
    );
  }

  const riscoEnchenteAtual = dadosClima ? avaliarRiscoEnchente(dadosClima.current.precip_mm, dadosClima.current.humidity) : 'Baixo';
  const riscoDeslizamentoAtual = dadosClima ? avaliarRiscoDeslizamento(dadosClima.current.precip_mm, dadosClima.current.wind_kph) : 'Baixo';

  // Função para retornar cor baseado no risco
  const corRisco = (risco: string) => {
    switch (risco) {
      case 'Alto':
        return '#D32F2F'; // vermelho
      case 'Moderado':
        return '#FBC02D'; // amarelo
      default:
        return '#388E3C'; // verde
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clima Atual e Previsão</Text>

      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Digite a cidade"
      />

      <TouchableOpacity style={styles.button} onPress={buscarClima}>
        <Text style={styles.buttonText}>Buscar Clima</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0050C0" style={{ marginTop: 20 }} />
      ) : dadosClima ? (
        <View style={styles.result}>
          <Text style={styles.sectionTitle}>🌍 {dadosClima.location.name}, {dadosClima.location.region}</Text>

          <View style={styles.row}>
            <Image
              source={{ uri: 'https:' + dadosClima.current.condition.icon }}
              style={styles.icon}
            />
            <View>
              <Text style={styles.info}>🌡️ {dadosClima.current.temp_c}°C</Text>
              <Text style={styles.info}>💧 Umidade: {dadosClima.current.humidity}%</Text>
              <Text style={styles.info}>💨 Vento: {dadosClima.current.wind_kph} km/h</Text>
              <Text style={styles.info}>☁️ {dadosClima.current.condition.text}</Text>

              {/* Alertas com cores e animação piscar para risco alto */}
              <Animated.View
                style={[
                  styles.alertBox,
                  {
                    borderColor: (riscoEnchenteAtual === 'Alto') ? '#D32F2F' : 'transparent',
                    opacity: (riscoEnchenteAtual === 'Alto') ? blinkAnim : 1,
                  },
                ]}
              >
                <Text style={[styles.info, { color: corRisco(riscoEnchenteAtual) }]}>
                  🌊 Enchente: {riscoEnchenteAtual}
                </Text>
              </Animated.View>

              <Animated.View
                style={[
                  styles.alertBox,
                  {
                    borderColor: (riscoDeslizamentoAtual === 'Alto') ? '#D32F2F' : 'transparent',
                    opacity: (riscoDeslizamentoAtual === 'Alto') ? blinkAnim : 1,
                  },
                ]}
              >
                <Text style={[styles.info, { color: corRisco(riscoDeslizamentoAtual) }]}>
                  🪨 Deslizamento: {riscoDeslizamentoAtual}
                </Text>
              </Animated.View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>📅 Previsão para os próximos dias:</Text>

          {dadosClima.forecast.forecastday.map((dia: any, index: number) => {
            const riscoEnchenteDia = avaliarRiscoEnchente(dia.day.totalprecip_mm, dia.day.avghumidity);
            const riscoDeslizamentoDia = avaliarRiscoDeslizamento(dia.day.totalprecip_mm, dia.day.maxwind_kph);

            return (
              <View key={index} style={styles.forecastCard}>
                <Text style={styles.forecastDate}>{dia.date}</Text>

                <View style={styles.row}>
                  <Image
                    source={{ uri: 'https:' + dia.day.condition.icon }}
                    style={styles.iconSmall}
                  />
                  <View>
                    <Text>🌡️ Máx: {dia.day.maxtemp_c}°C / Mín: {dia.day.mintemp_c}°C</Text>
                    <Text>☁️ {dia.day.condition.text}</Text>
                    <Text>💧 Umidade: {dia.day.avghumidity}%</Text>
                    <Text>🌧️ Chuva: {dia.day.totalprecip_mm} mm</Text>
                    <Text style={{ color: corRisco(riscoEnchenteDia) }}>
                      🌊 Enchente: {riscoEnchenteDia}
                    </Text>
                    <Text style={{ color: corRisco(riscoDeslizamentoDia) }}>
                      🪨 Deslizamento: {riscoDeslizamentoDia}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Nenhum dado disponível.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#E6F4FA',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0050C0',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#AAD4FB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#2C78C4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0050C0',
    marginTop: 10,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginVertical: 2,
    color: '#333333',
  },
  forecastCard: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  forecastDate: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  iconSmall: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertBox: {
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 4,
    marginTop: 6,
  },
});
