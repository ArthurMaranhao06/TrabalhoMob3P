import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Termos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Termos & Condições</Text>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Introdução</Text>
        <Text style={styles.text}>
          Bem-vindo ao nosso aplicativo. Ao acessar e utilizar nossos serviços, você concorda com os seguintes termos e condições. Caso não concorde, recomendamos que não utilize o aplicativo.
        </Text>
        
        <Text style={styles.sectionTitle}>2. Uso do Aplicativo</Text>
        <Text style={styles.text}>
          O usuário deve utilizar o aplicativo de maneira ética e em conformidade com todas as leis aplicáveis. Qualquer uso indevido, como tentativa de hackear, disseminação de conteúdo impróprio ou violação de direitos autorais, resultará no bloqueio da conta.
        </Text>
        
        <Text style={styles.sectionTitle}>3. Cadastro e Segurança</Text>
        <Text style={styles.text}>
          Para utilizar algumas funcionalidades, pode ser necessário criar uma conta fornecendo informações verdadeiras e atualizadas. O usuário é responsável por manter suas credenciais seguras e por qualquer atividade realizada com sua conta.
        </Text>
        
        <Text style={styles.sectionTitle}>4. Privacidade</Text>
        <Text style={styles.text}>
          Nos comprometemos a proteger sua privacidade. Seus dados serão utilizados apenas para aprimorar sua experiência e não serão compartilhados sem sua autorização, exceto quando exigido por lei.
        </Text>
        
        <Text style={styles.sectionTitle}>5. Modificações</Text>
        <Text style={styles.text}>
          Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre mudanças significativas, e o uso contínuo do aplicativo implicará aceitação dos novos termos.
        </Text>
        
        <Text style={styles.sectionTitle}>6. Responsabilidades</Text>
        <Text style={styles.text}>
          Não garantimos que o serviço estará sempre disponível ou livre de erros. Não nos responsabilizamos por perdas ou danos decorrentes do uso do aplicativo.
        </Text>
        
        <Text style={styles.sectionTitle}>7. Contato</Text>
        <Text style={styles.text}>
          Caso tenha dúvidas sobre estes termos, entre em contato conosco pelo e-mail suportereerguer@outlook.com.br.
        </Text>
        
        <Text style={styles.disclaimer}>
          Estes termos são fictícios e foram criados apenas para fins ilustrativos.
        </Text>
      </ScrollView>
      
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B6CB0',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: '#2B6CB0',
    marginTop: 5,
  },
  disclaimer: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2B6CB0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
