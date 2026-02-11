import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation } from 'react-native';
import { UserContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotesScreen({ navigation: navProp, route }) {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { area, capitulos } = route.params;
  const [expanded, setExpanded] = useState({});

  // Busca feedbacks do usuário para a área
  const feedbacks = (user?.feedbacks || []).filter(f => f.area === area);

  function getFeedbackByChapter(chapterId) {
    return feedbacks.find(f => f.chapterId === chapterId);
  }

  function toggleExpand(chapterId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  }

  function goToTaskScreen(chapter) {
    navigation.navigate('Task', {
      area,
      chapter
    });
  }

  return (

    


    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#9f84ff" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Anotações</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {capitulos.map((cap) => {
          const feedback = getFeedbackByChapter(cap.id);
          const comentario = feedback?.comentario || '';
          const isExpanded = expanded[cap.id];
          const preview = comentario.length > 80 && !isExpanded ? comentario.slice(0, 80) + '...' : comentario;
          return (
            <View key={cap.id} style={styles.chapterBlock}>
              <TouchableOpacity onPress={() => goToTaskScreen(cap)}>
                <Text style={styles.chapterTitle}>{cap.titulo}</Text>
              </TouchableOpacity>
              {comentario ? (
                <TouchableOpacity
                  style={styles.noteBox}
                  onPress={() => goToTaskScreen(cap)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.noteText}>{preview}</Text>
                  {comentario.length > 80 && (
                    <Text style={styles.expandText}>{isExpanded ? 'Mostrar menos' : 'Expandir'}</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <Text style={styles.noNote}>Nenhuma anotação neste capítulo.</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1b21',
    padding: 20
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(159,132,255,0.08)',
    marginRight: 10,
  },
  backText: {
    color: '#9f84ff',
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500'
  },
  title: {
    fontSize: 20,
    color: '#e4e2f1',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  chapterBlock: {
    marginBottom: 24,
  },
  chapterTitle: {
    color: '#9f84ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteBox: {
    backgroundColor: '#28263a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  noteText: {
    color: '#e4e2f1',
    fontSize: 15,
  },
  expandText: {
    color: '#9f84ff',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'right'
  },
  noNote: {
    color: '#b3adc9',
    fontSize: 13,
    fontStyle: 'italic'
  }
});