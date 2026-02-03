# Documentação Técnica — Ascendya

## Visão Geral
Ascendya é um app mobile de autodesenvolvimento que integra áreas essenciais da vida em uma experiência gamificada. O sistema foi projetado para ser expansível, modular e fácil de manter.

## Estrutura de Pastas
- **components/**: Componentes de UI reutilizáveis (cards, botões, barras de progresso).
- **context/**: Contextos React para gerenciamento global de estado (ex: UserContext).
- **screens/**: Telas principais do app (Home, Login, Cadastro, Capítulos, Tarefas, Feedback, Notas).
- **public/data/**: Dados das áreas, capítulos e tarefas em JSON.
- **utils/**: Funções utilitárias e integração com Firebase.
- **theme/**: Temas e estilos globais.
- **services/**: (Reservado para integrações futuras).
- **assets/**: Imagens e fontes.

## Fluxo do Usuário
1. **Login/Cadastro:** Usuário autentica via Firebase Auth.
2. **Home:** Visualiza progresso geral e áreas disponíveis.
3. **Área:** Seleciona uma área (ex: Espiritualidade) e acessa capítulos.
4. **Capítulo:** Lê conteúdos, realiza tarefas e responde feedbacks.
5. **Tarefas:** Ao concluir tarefas, ganha XP, pontos e energia.
6. **Feedback:** Responde perguntas reflexivas ao final de cada capítulo.
7. **Notas:** Pode registrar anotações pessoais.

## Estrutura dos Dados (Exemplo)
```json
{
  "area": "Espiritualidade",
  "icone": "spa",
  "cor": "#a280f7",
  "descricao": "Desvende a realidade além da matéria.",
  "capitulos": [
    {
      "id": "espiritualidade_1",
      "titulo": "O Princípio Mental",
      "descricao": "O universo é mental...",
      "topicos": [ ... ],
      "tarefas": [ ... ],
      "feedback": { ... }
    }
  ]
}
```

## Principais Componentes
- **UserContext:** Gerencia estado do usuário, progresso, XP, energia e tarefas concluídas.
- **HomeScreen:** Exibe áreas, progresso e navegação.
- **ChapterScreen:** Lista capítulos de uma área e permite acesso às tarefas.
- **TaskScreen:** Exibe tarefas do capítulo, permite marcar como concluídas e envia progresso ao Firestore.
- **FeedbackScreen:** Coleta respostas reflexivas do usuário.
- **NotesScreen:** Permite anotações pessoais.

## Integração com Firebase
- **firebaseConfig.js:** Inicializa Firebase, Auth e Firestore.
- **UserContext:** Sincroniza dados locais (AsyncStorage) e remotos (Firestore).
- **Salvar Progresso:** Função `salvarProgressoNoFirebase` envia dados do usuário para o Firestore.

## Gamificação
- **XP, Pontos e Energia:** Cada tarefa concede XP, pontos e energia, que são acumulados e exibidos ao usuário.
- **Níveis:** O usuário sobe de nível conforme acumula XP.
- **Áreas e Capítulos:** Progresso é separado por área e capítulo.

## Como Contribuir
- Siga o padrão de código e documentação.
- Adicione novos capítulos/tarefas em `public/data/` seguindo o modelo existente.
- Documente funções e componentes novos.

## Contato
Dúvidas ou sugestões? Abra uma issue ou envie um pull request.

---

> Consulte também o README.md para visão geral e instruções de uso.