import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultUser = {
    userId: '',
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
    tarefasConcluidas: {} // Novo campo: { [area_nome]: { [chapter_id]: [indices de tarefas] } }
  };

  // Carrega dados salvos
  useEffect(() => {
    async function loadUser() {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          console.log('Usuário carregado do AsyncStorage:', storedUser);
          setUser(JSON.parse(storedUser));
        } else {
          setUser(defaultUser);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do AsyncStorage:', error);
        setUser(defaultUser);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // Salva no AsyncStorage sempre que mudar
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user)).catch((err) =>
        console.error('Erro ao salvar usuário:', err)
      );
    }
  }, [user]);

  // Função para atualizar XP, pontos e energia
  const completarTarefa = (areaNome, { xp = 0, pontos = 0, energia = 0, tipo = '' }) => {
    setUser((prevUser) => {
      const novasAreas = prevUser.areas.map((area) => {
        if (area.nome === areaNome) {
          return {
            ...area,
            pontos: (area.pontos || 0) + pontos
          };
        }
        return area;
      });

      // Gasto de energia se tipo for fisica
      let energiaFinal = prevUser.energia;
      if (tipo === 'fisica') {
        energiaFinal = Math.max(0, prevUser.energia - Math.abs(energia));
      } else {
        energiaFinal = prevUser.energia + energia;
      }

      // Atualiza energia máxima acumulada
      let energiaMax = prevUser.energiaMax || 100;
      if (energiaFinal > energiaMax) energiaMax = energiaFinal;
      if (energiaMax < 1) energiaMax = 1;

      // Sistema de nível infinito
      let novoXP = prevUser.xp + xp;
      let novoNivel = prevUser.level;
      while (novoXP >= 100) {
        novoXP -= 100;
        novoNivel += 1;
      }

      return {
        ...prevUser,
        xp: novoXP,
        level: novoNivel,
        energia: energiaFinal,
        energiaMax: energiaMax,
        pontos: prevUser.pontos + pontos,
        areas: novasAreas
      };
    });
  };

  // Função para marcar tarefa como concluída
  const marcarTarefaConcluida = (areaNome, chapterId, tarefaIndex) => {
    setUser((prevUser) => {
      const tarefasConcluidas = { ...prevUser.tarefasConcluidas };
      if (!tarefasConcluidas[areaNome]) tarefasConcluidas[areaNome] = {};
      if (!tarefasConcluidas[areaNome][chapterId]) tarefasConcluidas[areaNome][chapterId] = [];
      if (!tarefasConcluidas[areaNome][chapterId].includes(tarefaIndex)) {
        tarefasConcluidas[areaNome][chapterId].push(tarefaIndex);
      }
      return {
        ...prevUser,
        tarefasConcluidas
      };
    });
  };

  // Função para marcar capítulo como concluído (opcional, se quiser usar no futuro)
  const marcarCapituloConcluido = (areaNome, chapterId) => {
    setUser((prevUser) => {
      const capitulosConcluidos = { ...prevUser.capitulosConcluidos };
      if (!capitulosConcluidos[areaNome]) capitulosConcluidos[areaNome] = [];
      if (!capitulosConcluidos[areaNome].includes(chapterId)) {
        capitulosConcluidos[areaNome].push(chapterId);
      }
      return {
        ...prevUser,
        capitulosConcluidos
      };
    });
  };

  if (loading || !user) {
    return null; // Ou uma tela de carregamento
  }

  return (
    <UserContext.Provider value={{ user, setUser, completarTarefa, marcarTarefaConcluida, marcarCapituloConcluido }}>
      {children}
    </UserContext.Provider>
  );
};
