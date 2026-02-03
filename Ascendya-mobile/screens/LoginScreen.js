import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // db adicionado
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/UserContext';

export default function LoginScreen({ navigation, onLogin }) {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const firebaseUser = userCredential.user;

      const displayName = firebaseUser.displayName;
      //salva o nome do usuário no AsyncStorage
      if (displayName) {
        await AsyncStorage.setItem('userName', displayName);
      } else {
        await AsyncStorage.removeItem('userName');
      }

      // Buscar dados do Firestore
      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      let userData;
      if (userSnap.exists()) {
        userData = userSnap.data();
        userData.uid = firebaseUser.uid;
      } else {
        // Se não existir, cria um novo usuário padrão
        userData = {
          uid: firebaseUser.uid,
          level: 1,
          xp: 0,
          energia: 100,
          pontos: 0,
          areas: [
            { nome: 'Espiritualidade', pontos: 0, icone: 'om' },
            { nome: 'Saúde Física', pontos: 0, icone: 'heartbeat' },
            { nome: 'Alimentação', pontos: 0, icone: 'carrot' },
            { nome: 'Emoções e Mente', pontos: 0, icone: 'brain' },
            { nome: 'Finanças e Propósito', pontos: 0, icone: 'wallet' }
          ],
          tarefasConcluidas: {},
          feedbacks: []
        };
        await setDoc(userRef, userData);
      }

      // Salva no AsyncStorage e no contexto
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      onLogin && onLogin(firebaseUser.uid);
    } catch (e) {
      Alert.alert('Erro', e.message || 'Não foi possível logar');
      console.log('Erro ao logar:', e);
    }
    setLoading(false);
  }

  function handleCadastro() {
    navigation.navigate('Cadastro');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastro}>
        <Text style={styles.cadastroText}>Criar nova conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#1c1b21', padding: 24 },
  title: { color: '#e4e2f1', fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#28263a', color: '#fff', borderRadius: 8, padding: 12, marginBottom: 16 },
  button: { backgroundColor: '#9f84ff', borderRadius: 8, padding: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cadastroButton: { marginTop: 18, alignItems: 'center' },
  cadastroText: { color: '#9f84ff', fontSize: 15, textDecorationLine: 'underline' },
});