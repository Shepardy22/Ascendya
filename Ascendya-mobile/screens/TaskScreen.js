import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput, Image,  } from 'react-native';
import ButtonPrimary from '../components/ButtonPrimary';
import { UserContext } from '../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { imagens } from '../utils/imagesLocalData';

// Adicione no topo do arquivo:
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // ajuste o caminho se necessário


import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function salvarProgressoNoFirebase(user, id) {
  if (!user) {
    console.warn("Usuário inválido ou não autenticado");
    return;
  }

  // Extrair comentários de feedback
  const feedbacksComentarios = (user.feedbacks || []).map(fb => ({
    area: fb.area,
    chapterId: fb.chapterId,
    comentario: fb.comentario
  }));

  // Extrair pontos por área
  const pontosPorArea = {};
  (user.areas || []).forEach(area => {
    pontosPorArea[area.nome] = area.pontos;
  });

  try {
    await setDoc(doc(db, "users", id), {
      ...user,
      atualizadoEm: new Date().toISOString()
    }, { merge: true });
    console.log("✅ Progresso salvo no Firestore!");
  } catch (e) {
    console.log("❌ Erro ao salvar progresso:", e);
  }
}



function getImagem(nome) {
  return imagens[nome] || null;
}

export default function TaskScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chapter, area } = route.params;

  const { completarTarefa, marcarTarefaConcluida, user, setUser } = useContext(UserContext);
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
  // Novo: Estado para feedback
  const [feedback, setFeedback] = useState("");
  const [editandoFeedback, setEditandoFeedback] = useState(false);
  // Estado para referência de origem
  const [origem, setOrigem] = useState(route.params?.origem || null);
  const [userId, setUserId] = useState('');

  // Buscar userId salvo ao abrir o app
  React.useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      if (id) {
        setUserId(id);
      }
    });
  }, []);

  // Carrega tarefas concluídas do contexto ao abrir a tela
  React.useEffect(() => {
    if (user && user.tarefasConcluidas && user.tarefasConcluidas[area] && chapter.id) {
      setTarefasConcluidas(user.tarefasConcluidas[area][chapter.id] || []);
    }
  }, [user, area, chapter.id]);

  // Carrega feedback salvo do contexto ao abrir a tela
  React.useEffect(() => {
    if (user && user.feedbacks && area && chapter.id) {
      const fb = user.feedbacks.find(f => f.area === area && f.chapterId === chapter.id);
      if (fb) setFeedback(fb.comentario || "");
    }
  }, [user, area, chapter.id]);

  React.useEffect(() => {
    if (user && userId) {
      salvarProgressoNoFirebase(user, userId);
    }
    // Só salva quando feedbacks mudarem
  }, [user?.feedbacks]);

  // Função chamada ao concluir uma tarefa
  function handleCompleteTask(task, index) {
    if (tarefasConcluidas.includes(index)) {
      Alert.alert('Já concluída', 'Você já marcou essa tarefa como feita.');
      return;
    }

    setTarefasConcluidas((prev) => [...prev, index]);
    marcarTarefaConcluida(area, chapter.id, index);
    completarTarefa(area, {
      xp: task.xp || 10,
      energia: task.energia || 5,
      pontos: task.pontos || 1,
      tipo: task.tipo || '' // tipo pode ser 'fisica' para gastar energia
    });

    // Salva progresso após atualizar o contexto (pega o user atualizado no próximo tick)
    setTimeout(() => {
      console.log('Salvando progresso no Firebase...');
      console.log('Usuário atual:', user);
      if (user) salvarProgressoNoFirebase(user, userId);
    }, 500);
  }

  // Função para salvar/atualizar feedback no contexto
  function salvarFeedback(novoComentario) {
    if (!novoComentario) return;
    const novoFeedback = {
      area,
      chapterId: chapter.id,
      comentario: novoComentario
    };
    if (user && user.feedbacks) {
      const outros = user.feedbacks.filter(f => !(f.area === area && f.chapterId === chapter.id));
      setUser({ ...user, feedbacks: [...outros, novoFeedback] });

    } else if (user) {
      setUser({ ...user, feedbacks: [novoFeedback] });

    }
    setFeedback(novoComentario);
    setEditandoFeedback(false);

    // Salva progresso após atualizar o contexto (pega o user atualizado no próximo tick)
    setTimeout(() => {
      salvarProgressoNoFirebase(user, userId);
    }, 500);
  }

  // Função para navegar para referência
  function handleReferencia(ref) {
    // Busca o capítulo referenciado no JSON correspondente
    let data;
    switch (ref.area) {
      case 'Finanças e Propósito':
        data = require('../public/data/financas.json');
        break;
      case 'Espiritualidade':
        data = require('../public/data/espiritualidade.json');
        break;
      case 'Saúde Física':
        data = require('../public/data/saude_fisica.json');
        break;
      case 'Alimentação':
        data = require('../public/data/alimentacao.json');
        break;
      case 'Emoções e Mente':
        data = require('../public/data/emocoes.json');
        break;
      default:
        return;
    }
    const cap = data.capitulos.find(c => c.id === ref.capituloId);
    if (cap) {
      navigation.push('Task', {
        area: ref.area,
        chapter: cap,
        origem: { area, chapter } // salva origem para voltar
      });
    }
  }

  const todasConcluidas = chapter.tarefas.length === tarefasConcluidas.length;

  return (



      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#9f84ff" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{chapter.titulo}</Text>

        {/* Tópicos e parágrafos */}
        {chapter.topicos.map((topico, idx) => (
          <View key={idx} style={styles.topicContainer}>
            <Text style={styles.topicTitle}>{topico.titulo}</Text>
            {topico.conteudo.map((item, i) => {
              if (typeof item === 'string') {
                return <Text key={i} style={styles.paragraph}>{item}</Text>;
              } else if (item.imagem) {
                const imgSrc = getImagem(item.imagem);
                if (!imgSrc) return null;
                return (
                  <Image
                    key={i}
                    source={imgSrc}
                    style={{
                      width: '100%',
                      aspectRatio: 1.7, // ajuste conforme necessário
                      marginVertical: 12,
                      borderRadius: 10,
                      alignSelf: 'center',
                      maxHeight: 300
                    }}
                    resizeMode="contain"
                  />
                );
              } else if (item.referencia) {
                return (
                  <TouchableOpacity
                    key={i}
                    style={{ marginVertical: 8, padding: 8, backgroundColor: 'rgba(159,132,255,0.10)', borderRadius: 8 }}
                    onPress={() => handleReferencia(item.referencia)}
                  >
                    <Text style={{ color: '#9f84ff', fontWeight: 'bold', textDecorationLine: 'underline' }}>{item.referencia.texto}</Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </View>
        ))}

        {/* Lista de tarefas */}
        <View style={styles.tasksContainer}>
          <Text style={styles.tasksTitle}>Tarefas</Text>
          {chapter.tarefas.map((task, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.taskCard,
                tarefasConcluidas.includes(index) && styles.taskCardDone
              ]}
              onPress={() => handleCompleteTask(task, index)}
            >
              <Text style={styles.taskText}>{task.descricao}</Text>
              {tarefasConcluidas.includes(index) && (
                <Text style={styles.taskDone}>✔</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão para feedback */}
        {todasConcluidas && (
          feedback ? (
            <View style={{ backgroundColor: '#2a2831', padding: 16, borderRadius: 10, marginTop: 16 }}>
              <Text style={{ color: '#9f84ff', fontWeight: 'bold', marginBottom: 8 }}>Anotações:</Text>
              {editandoFeedback ? (
                <>
                  <TextInput
                    style={{ backgroundColor: '#fff', color: '#222', borderRadius: 8, padding: 12, marginBottom: 8, minHeight: 100, textAlignVertical: 'top', fontSize: 16 }}
                    value={feedback}
                    onChangeText={setFeedback}
                    multiline
                    placeholder="Digite suas anotações..."
                  />
                  <ButtonPrimary title="Salvar Anotações" onPress={() => salvarFeedback(feedback)} />
                </>
              ) : (
                <>
                  <Text style={{ color: '#e4e2f1', marginBottom: 8 }}>{feedback}</Text>
                  <ButtonPrimary title="Editar Anotações" onPress={() => setEditandoFeedback(true)} />
                </>
              )}
            </View>
          ) : (
            <ButtonPrimary
              title="Inserir Anotações"
              onPress={() => navigation.navigate('Feedback', { chapter, area })}
            />
          )
        )}

        {/* Botão para voltar ao capítulo de origem, se veio de referência */}
        {origem && (
          <ButtonPrimary
            title="Voltar para leitura anterior"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 16 }}
          />
        )}
      </ScrollView>
 

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1b21',
    padding: 20,
    flex: 1
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(159,132,255,0.08)'
  },
  backText: {
    color: '#9f84ff',
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500'
  },
  title: {
    color: '#e4e2f1',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  topicContainer: {
    marginBottom: 16
  },
  topicTitle: {
    fontSize: 18,
    color: '#d5d2eb',
    fontWeight: '600',
    marginBottom: 8
  },
  paragraph: {
    color: '#bbb9d1',
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20
  },
  tasksContainer: {
    marginTop: 24
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e4e2f1',
    marginBottom: 12
  },
  taskCard: {
    backgroundColor: '#2a2831',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  taskCardDone: {
    backgroundColor: '#5f5bdc'
  },
  taskText: {
    color: '#e4e2f1',
    fontSize: 16
  },
  taskDone: {
    color: '#9f84ff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
