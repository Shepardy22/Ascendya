import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ChapterCard from '../components/ChapterCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Importa ícone para anotações
import { UserContext } from '../context/UserContext';

export default function ChapterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useContext(UserContext);
  const { area, capitulos, descricao } = route.params;

  function handleOpenChapter(chapter) {
    navigation.navigate('Task', {
      area,
      chapter
    });
  }

  function handleOpenNotes() {
    navigation.navigate('Notes', {
      area,
      capitulos
    });
  }

  function isChapterCompleted(chapter) {
    if (!user) return false;
    const tarefasConcluidas = user.tarefasConcluidas?.[area]?.[chapter.id] || [];
    const feedback = user.feedbacks?.find(f => f.area === area && f.chapterId === chapter.id);
    return (
      tarefasConcluidas.length === chapter.tarefas.length &&
      !!feedback && feedback.comentario && feedback.comentario.length > 0
    );
  }

  function getPontosArea() {
    if (!user) return 0;
    const areaObj = user.areas?.find(a => a.nome === area);
    return areaObj ? areaObj.pontos : 0;
  }
  const pontosArea = getPontosArea();

  return (

    
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#9f84ff" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notesButton} onPress={handleOpenNotes}>
          <MaterialCommunityIcons name="notebook-outline" size={22} color="#9f84ff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{area}</Text>
      {descricao ? (
        <Text style={styles.areaDescription}>{descricao}</Text>
      ) : null}
      <FlatList
        data={capitulos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const pontosMinimos = item.pontosMinimos || 0;
          const bloqueado = pontosArea < pontosMinimos;
          return (
            <ChapterCard
              title={item.titulo}
              onPress={() => handleOpenChapter(item)}
              concluido={isChapterCompleted(item)}
              bloqueado={bloqueado}
              pontosMinimos={pontosMinimos > 0 ? pontosMinimos : undefined}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(159,132,255,0.08)'
  },
  notesButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(159,132,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  backText: {
    color: '#9f84ff',
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500'
  },
  title: {
    fontSize: 22,
    color: '#e4e2f1',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center'
  },
  areaDescription: {
    color: '#b3adc9',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    marginTop: -4,
  }
});