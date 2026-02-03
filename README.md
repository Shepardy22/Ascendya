# Ascendya — Projeto Open Source

Ascendya é uma plataforma de autodesenvolvimento composta por dois sistemas integrados:

- **Ascendya-mobile**: Aplicativo mobile gamificado para evolução pessoal.
- **Ascendya-manager**: Sistema desktop para criação e organização dos conteúdos do app.

## Visão Geral

### Ascendya-mobile

Aplicativo para Android/iOS focado em autodesenvolvimento, abordando áreas como Espiritualidade, Saúde Física, Alimentação, Emoções e Finanças. O app utiliza gamificação (XP, níveis, pontos, energia) para engajar o usuário em tarefas práticas, capítulos temáticos e feedbacks personalizados.

**Principais funcionalidades:**
- Cadastro/Login via Firebase
- Trilhas temáticas com capítulos, tarefas e feedbacks
- Sistema de progresso gamificado
- Notas e anotações pessoais
- Dados salvos localmente e sincronizados com Firestore

**Tecnologias:** React Native, Expo, Firebase, AsyncStorage, React Navigation

**Como executar:**
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o projeto:
   ```bash
   npx expo start
   ```

### Ascendya-manager

Aplicação desktop (Electron + React) para autores e equipes criarem, editarem e organizarem os conteúdos do Ascendya-mobile. Permite edição visual de capítulos, tópicos, tarefas e feedbacks, exportando tudo em arquivos JSON padronizados.

**Principais funcionalidades:**
- Edição visual de arquivos JSON
- Organização por áreas do conhecimento
- Suporte a imagens e feedbacks
- Exportação/importação de dados

**Como executar:**
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o sistema:
   ```bash
   npm start
   ```

## Estrutura dos Dados

Os conteúdos são organizados em arquivos JSON conforme o modelo em `Ascendya-manager/data/templateDados.md` (manager) e `Ascendya-mobile/public/data/` (mobile).

## Como contribuir

1. Faça fork e clone do repositório.
2. Crie uma branch para sua feature/correção.
3. Siga o padrão de código e estrutura dos dados.
4. Teste localmente antes de abrir um Pull Request.
5. Detalhe sua contribuição no PR.

Mais detalhes em `Ascendya-mobile/docs/guia-contribuicao.md`.

## Documentação

- [Visão Geral](Ascendya-manager/docs/visao_geral.md)
- [Estrutura dos Dados](Ascendya-manager/docs/estrutura_dados.md)
- [Guia do Usuário](Ascendya-manager/docs/guia_usuario.md)
- [Documentação Técnica](Ascendya-mobile/docs/documentacao-tecnica.md)

---

Contribua, sugira melhorias e ajude a evoluir o Ascendya!
