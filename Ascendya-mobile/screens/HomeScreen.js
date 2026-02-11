import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Alert, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { UserContext } from '../context/UserContext';
import ProgressBar from '../components/ProgressBar';
import { SafeAreaView } from 'react-native';

import espiritualidade from '../public/data/espiritualidade.json';
import saude from '../public/data/saude_fisica.json';
import alimentacao from '../public/data/alimentacao.json';
import emocoes from '../public/data/emocoes.json';
import financas from '../public/data/financas.json';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { imagens } from '../utils/imagesLocalData';
//importar Image
import { Image } from 'react-native';

function getImagem(nome) {
  return imagens[nome] || null;
}

export default function HomeScreen({ navigation, onLogout }) {
  const { user } = useContext(UserContext);
  const [areas, setAreas] = useState([]);

  // Função de logout
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente fazer logout?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userName');
            // Chama o callback para atualizar o estado no App.js
            if (onLogout) {
              onLogout();
            }
          }
        }
      ]
    );
  };


  const [userName, setUserName] = useState('Explorador');
  useEffect(() => {
    AsyncStorage.getItem('userName').then(name => {
      if (name) {
        setUserName(name);
      }
    });
  }, []);



  useEffect(() => {
    setAreas([
      {
        nome: 'Espiritualidade',
        icone: 'om',
        capitulos: espiritualidade.capitulos,
        descricao: espiritualidade.descricao
      },
      {
        nome: 'Saúde Física',
        icone: 'heartbeat',
        capitulos: saude.capitulos,
        descricao: saude.descricao
      },
      {
        nome: 'Alimentação',
        icone: 'utensils',
        capitulos: alimentacao.capitulos,
        descricao: alimentacao.descricao
      },
      {
        nome: 'Emoções e Mente',
        icone: 'brain',
        capitulos: emocoes.capitulos,
        descricao: emocoes.descricao
      },
      {
        nome: 'Finanças e Propósito',
        icone: 'wallet',
        capitulos: financas.capitulos,
        descricao: financas.descricao
      },
    ]);
  }, []);

  const getPontosArea = (nome) => {
    if (!user || !user.areas) return 0;
    const areaObj = user.areas.find((a) => a.nome === nome);
    return areaObj ? areaObj.pontos : 0;
  };

  function getSaudacao() {
    const hora = new Date().getHours();
    if (hora < 12) return `Bom dia, ${userName}`;
    if (hora < 19 && hora >= 12) return `Boa tarde, ${userName}`;
    if (hora >= 19) return `Boa noite, ${userName}`;
  }

  if (!areas.length) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#9f84ff" />
        <Text style={{ color: '#ccc', marginTop: 10 }}>Carregando áreas...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#9f84ff" />
        <Text style={{ color: '#ccc', marginTop: 10 }}>Carregando usuário...</Text>
      </View>
    );
  }
  const imgSrc = getImagem('Logo.png');
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com botão de logout */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Ascendya</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="sign-out-alt" size={18} color="#9f84ff" />
        </TouchableOpacity>
      </View>

      {/* Avatar e Nome */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarCircle}>
          <Image
            source={imgSrc}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.username}>{getSaudacao()}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Nível {user?.level}</Text>
          <ProgressBar progress={(user?.xp / 100) * 100} />
          <Text style={styles.statValue}>{user?.xp}/100 XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Energia</Text>
          <ProgressBar progress={user?.energiaMax ? (user?.energia / user?.energiaMax) * 100 : 100} />
          <Text style={styles.statValue}>{user?.energia}/{user?.energiaMax || 100}</Text>
        </View>
      </View>

      {/* Áreas do Conhecimento */}
      <Text style={styles.sectionTitle}>Áreas do Conhecimento</Text>
      <View style={styles.areasFlexContainer}>

        {areas.map((area, index) => (
          <View style={styles.areaFlexItem} key={index}>
            <TouchableOpacity
              style={styles.areaCard}
              onPress={() =>
                navigation.navigate('Chapter', {
                  area: area.nome,
                  capitulos: area.capitulos,
                  descricao: area.descricao
                })
              }
              activeOpacity={0.8}
            >
              <FontAwesome5 name={area.icone} size={24} color="#9f84ff" />
              <View style={styles.areaInfo}>
                <Text style={styles.areaName}>{area.nome}</Text>
                <Text style={styles.areaProgress}>
                  {getPontosArea(area.nome)} pontos
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1b21',
    flex: 1,
    paddingHorizontal: 24,
    //paddingTop: 24,
    paddingBottom: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e4e2f1',
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(159, 132, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(159, 132, 255, 0.2)',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 140, // aumente para 140 ou mais conforme desejar
    height: 140,
    borderRadius: 20, // metade do width/height
    backgroundColor: '#2a2831',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    marginBottom: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // garante que a imagem não seja cortada
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 60,
  },
  username: {
    fontSize: 18,
    color: '#e4e2f1',
    marginTop: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 16,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 4,
  },
  statLabel: {
    color: '#d5d2eb',
    fontSize: 16,
    marginBottom: 6,
  },
  statValue: {
    color: '#8886a3',
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    color: '#e4e2f1',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
  },
  areasFlexContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  areaFlexItem: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 8,
  },
  areaCard: {
    backgroundColor: '#2a2831',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minHeight: 0,
  },
  areaInfo: {
    marginLeft: 12,
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    color: '#e4e2f1',
    fontWeight: '600',
  },
  areaProgress: {
    fontSize: 14,
    color: '#9f84ff',
    marginTop: 2,
  },
});