import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, SafeAreaView, Platform, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ChapterScreen from './screens/ChapterScreen';
import TaskScreen from './screens/TaskScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';

import { UserProvider } from './context/UserContext';
import NotesScreen from './screens/NotesScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //AsyncStorage.clear(); // Limpar AsyncStorage para testes

  // Buscar userId salvo ao abrir o app
  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      if (id) setUserId(id);
      setLoading(false);
    });
  }, []);

  // Salvar userId sempre que mudar
  useEffect(() => {
    if (userId) {
      AsyncStorage.setItem('userId', userId);
    } else {
      AsyncStorage.removeItem('userId');
    }
  }, [userId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
    );
  }

  return (
    <UserProvider value={{ user, setUser }}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#1c1b21" translucent={true}/>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!userId ? (
              <>
                <Stack.Screen name="Login">
                  {props => (
                    <LoginScreen
                      {...props}
                      onLogin={uid => setUserId(uid)}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Cadastro" component={CadastroScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Chapter" component={ChapterScreen} />
                <Stack.Screen name="Task" component={TaskScreen} />
                <Stack.Screen name="Feedback" component={FeedbackScreen} />
                <Stack.Screen name="Notes" component={NotesScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1b21',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 32 : 0
  }
});