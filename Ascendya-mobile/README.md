# Ascendya

Ascendya é um aplicativo mobile de autodesenvolvimento que integra áreas essenciais da vida — Espiritualidade, Saúde Física, Alimentação, Emoções e Finanças — em uma jornada gamificada, educativa e interativa. O objetivo é promover equilíbrio, autoconhecimento e evolução pessoal por meio de tarefas práticas, capítulos temáticos e feedbacks personalizados.

## Propósito do Sistema
O sistema foi criado para ajudar o usuário a evoluir de forma integral, estimulando hábitos saudáveis, consciência financeira, equilíbrio emocional e crescimento espiritual. A plataforma utiliza conceitos de gamificação (níveis, XP, pontos, energia) para engajar o usuário e tornar o processo de autodesenvolvimento mais motivador e mensurável.

## Principais Funcionalidades
- **Cadastro e Login:** Autenticação via Firebase, com armazenamento seguro dos dados do usuário.
- **Áreas Temáticas:** Espiritualidade, Saúde Física, Alimentação, Emoções e Finanças, cada uma com capítulos, tarefas e trilhas de aprendizado.
- **Capítulos e Tarefas:** Cada área possui capítulos com conteúdos, tópicos e tarefas práticas. O usuário ganha XP, pontos e energia ao concluir tarefas.
- **Feedback Personalizado:** Após cada capítulo, o usuário responde perguntas reflexivas e recebe feedbacks para consolidar o aprendizado.
- **Progresso e Gamificação:** Sistema de níveis, XP, energia e pontos para acompanhar o progresso e incentivar a evolução.
- **Notas e Anotações:** Possibilidade de registrar insights e aprendizados ao longo da jornada.
- **Persistência Local e Remota:** Dados salvos localmente (AsyncStorage) e sincronizados com o Firestore (Firebase).

## Estrutura de Pastas
- **components/**: Componentes reutilizáveis da interface (cards, botões, barras de progresso).
- **context/**: Contexto global do usuário (UserContext) e gerenciamento de estado.
- **screens/**: Telas principais do app (Home, Login, Cadastro, Capítulos, Tarefas, Feedback, Notas).
- **public/data/**: Dados estruturados das áreas, capítulos e tarefas em formato JSON.
- **utils/**: Utilitários para manipulação de imagens, dados e integração com Firebase.
- **theme/**: Definições de tema e estilos globais.
- **services/**: (Reservado para integrações e serviços futuros).
- **assets/**: Imagens e fontes utilizadas na interface.

## Tecnologias Utilizadas
- **React Native & Expo**: Base do aplicativo mobile.
- **Firebase (Auth & Firestore)**: Autenticação e banco de dados em nuvem.
- **AsyncStorage**: Persistência local de dados.
- **React Navigation**: Navegação entre telas.
- **Gamificação**: Sistema de XP, níveis, pontos e energia.

## Como Executar o Projeto
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o projeto:
   ```bash
   npm start
   ```
3. Use o Expo Go no celular ou emulador para visualizar o app.

## Estrutura dos Dados
Os dados das áreas (espiritualidade, alimentação, finanças, etc.) estão em `public/data/` e seguem o formato:
```json
{
  "area": "Nome da Área",
  "icone": "icone",
  "cor": "#cor",
  "descricao": "Descrição da área.",
  "capitulos": [
    {
      "id": "area_1",
      "titulo": "Título do Capítulo",
      "descricao": "Descrição do capítulo.",
      "topicos": [ ... ],
      "tarefas": [ ... ],
      "feedback": { ... }
    }
  ]
}
```

## Contribuição
Contribuições são bem-vindas! Siga o padrão de código, documente suas funções e mantenha a estrutura dos dados consistente.

## Licença
Este projeto é open-source sob a licença MIT.

---

> Para mais detalhes, consulte a pasta `docs/` para documentação técnica, exemplos de dados e guias de contribuição.
