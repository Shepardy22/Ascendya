import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import ButtonPrimary from '../components/ButtonPrimary';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import Slider from '@react-native-community/slider';

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chapter, area } = route.params;
  const { user, setUser, completarTarefa } = useContext(UserContext);

  // Guarda as notas para cada pergunta
  const perguntas = chapter.feedback?.perguntas || [];

  const [notas, setNotas] = useState(
    perguntas.map(() => '') // inicializa vazio para cada pergunta
  );
  const [comentario, setComentario] = useState('');

  // Novo: verificar se já recebeu bônus neste capítulo
  const jaBonificado = user.feedbacks?.some(f => f.area === area && f.chapterId === chapter.id && f.bonusAtribuido);

  // Atualiza a nota da pergunta i (agora usando slider)
  function handleNotaChangeSlider(value, i) {
    const newNotas = [...notas];
    newNotas[i] = value;
    setNotas(newNotas);
  }

  // Valida e salva o feedback, atribui bônus se aplicável
  function handleSave() {
    for (let i = 0; i < notas.length; i++) {
      if (notas[i] === '' || isNaN(parseInt(notas[i]))) {
        Alert.alert('Erro', `Por favor, preencha a nota da pergunta ${i + 1}`);
        return;
      }
    }
    // Cálculo do bônus
    const notasNum = notas.map((n) => parseInt(n));
    const media = notasNum.reduce((a, b) => a + b, 0) / notasNum.length;
    const BONUS_MAX = 5; // valor máximo de bônus por feedback
    const bonus = Math.round((media / 10) * BONUS_MAX); // arredonda para inteiro

    // Salva feedback e atribui bônus se ainda não recebeu
    const novoFeedback = {
      area,
      chapterId: chapter.id,
      notas: notasNum,
      comentario,
      bonusAtribuido: !jaBonificado // marca se foi atribuído agora
    };
    setUser((prev) => {
      const outros = prev.feedbacks ? prev.feedbacks.filter(f => !(f.area === area && f.chapterId === chapter.id)) : [];
      return {
        ...prev,
        feedbacks: [...outros, novoFeedback]
      };
    });
    if (!jaBonificado && bonus > 0) {
      completarTarefa(area, { pontos: bonus, xp: bonus, energia: 0, tipo: '' });
    }
    Alert.alert('Obrigado!', `Anotação registrada com sucesso.${!jaBonificado && bonus > 0 ? ` Você ganhou ${bonus} pontos de bônus!` : ''}`);
    navigation.navigate('Home');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Anotações - {chapter.titulo}</Text>

      {perguntas.map((pergunta, i) => (
        <View key={i} style={styles.perguntaContainer}>
          <Text style={styles.perguntaText}>{pergunta}</Text>
          {/* Slider para nota de 0 a 10 */}
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Slider
              style={{flex:1, height: 40}}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={notas[i] ? parseInt(notas[i]) : 0}
              onValueChange={value => handleNotaChangeSlider(value, i)}
              minimumTrackTintColor="#9f84ff"
              maximumTrackTintColor="#444"
              thumbTintColor="#9f84ff"
            />
            <Text style={{width:32, textAlign:'center', color:'#e4e2f1', fontWeight:'bold'}}>{notas[i] || 0}</Text>
          </View>
        </View>
      ))}

      <View style={styles.comentarioContainer}>
        <Text style={styles.label}>Anotações (opcional)</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Compartilhe sua experiência..."
          value={comentario}
          onChangeText={setComentario}
        />
      </View>

      <ButtonPrimary title="Salvar Anotações" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1b21',
    padding: 20,
    flex: 1
  },
  title: {
    color: '#e4e2f1',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
  },
  perguntaContainer: {
    marginBottom: 20
  },
  perguntaText: {
    color: '#d5d2eb',
    fontSize: 16,
    marginBottom: 6
  },
  input: {
    backgroundColor: '#2a2831',
    color: '#e4e2f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16
  },
  comentarioContainer: {
    marginBottom: 30
  },
  label: {
    color: '#d5d2eb',
    fontSize: 16,
    marginBottom: 8
  }
});
