# Ascendya

Ascendya é um aplicativo mobile de autodesenvolvimento que integra áreas essenciais da vida — Espiritualidade, Saúde Física, Alimentação, Emoções e Finanças — em uma jornada gamificada, educativa e interativa. O objetivo é promover equilíbrio, autoconhecimento e evolução pessoal por meio de tarefas práticas, capítulos temáticos e feedbacks personalizados.

## Propósito do Sistema
O sistema foi criado para ajudar o usuário a evoluir de forma integral, estimulando hábitos saudáveis, consciência financeira, equilíbrio emocional e crescimento espiritual. A plataforma utiliza conceitos de gamificação (níveis, XP, pontos, energia) para engajar o usuário e tornar o processo de autodesenvolvimento mais motivador e mensurável.

## Como funciona o Ascendya Manager
O Ascendya Manager é o sistema desktop utilizado para criação, edição e organização dos conteúdos que serão consumidos no app mobile Ascendya. Ele permite criar, editar e salvar arquivos JSON que representam capítulos, tópicos, tarefas e feedbacks de cada área, facilitando a construção de jornadas de autodesenvolvimento.

- **Carregamento de arquivos**: O usuário pode abrir arquivos JSON de áreas do conhecimento, visualizar e editar capítulos, tópicos e tarefas.
- **Edição visual**: A interface permite alterar títulos, descrições, tópicos, tarefas e feedbacks de cada capítulo.
- **Salvamento**: As alterações podem ser salvas em novos arquivos JSON, mantendo a estrutura padronizada.
- **Imagens**: É possível associar imagens aos tópicos, que ficam armazenadas na pasta `images/`.
- **Feedbacks**: Cada capítulo pode conter perguntas de feedback para o usuário final.

## Estrutura dos dados
Os arquivos JSON seguem o modelo descrito em [`templateDados.md`](../data/templateDados.md), com áreas, capítulos, tópicos, tarefas e feedbacks.

## Tecnologias utilizadas
- [Electron](https://www.electronjs.org/) para aplicação desktop
- [React](https://react.dev/) para interface do usuário

## Documentação
- [Visão Geral](./visao_geral.md)
- [Estrutura dos Dados](./estrutura_dados.md)
- [Fluxo da Aplicação](./fluxo_aplicacao.md)
- [Guia do Usuário](./guia_usuario.md)
- [Desenvolvimento](./desenvolvimento.md)

---

> Para dúvidas ou sugestões, consulte os demais arquivos em `docs/` ou entre em contato com o autor.