// firebase/services/salvarDadosUsuarioNoFirebase.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

/**
 * Salva todos os dados do usuário no Firestore.
 * @param {Object} user Objeto completo do usuário (vindo do contexto).
 * @returns {Promise<void>}
 */
export async function salvarDadosUsuarioNoFirebase(user) {
    console.log("🔄 Salvando dados do usuário no Firestore...");
  if (!user || !user.uid) {
    console.warn("Usuário inválido ou não autenticado");
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const dados = {
      ...user,
      atualizadoEm: new Date().toISOString()
    };

    await setDoc(userRef, dados, { merge: true });

    console.log("✅ Dados do usuário salvos com sucesso no Firestore");
  } catch (error) {
    console.error("❌ Erro ao salvar os dados do usuário:", error);
    throw error;
  }
}
