# Estrutura dos Dados — Ascendya

## Exemplo de JSON de Área
```json
{
  "area": "Espiritualidade",
  "icone": "spa",
  "cor": "#a280f7",
  "descricao": "Desvende a realidade além da matéria.",
  "capitulos": [
    {
      "id": "espiritualidade_1",
      "titulo": "O Princípio Mental: Tudo é Consciência",
      "descricao": "O universo é mental; quem percebe cria o que é percebido.",
      "topicos": [
        {
          "titulo": "A Mente Una",
          "conteudo": ["O universo é mental; quem percebe cria o que é percebido."]
        }
      ],
      "tarefas": [
        {
          "id": "tarefa_1",
          "descricao": "Pratique 5 minutos de meditação consciente.",
          "xp": 10,
          "pontos": 8,
          "energia": 5,
          "tipo": "mental"
        }
      ],
      "feedback": {
        "ativo": true,
        "perguntas": [
          "O que você percebeu durante a prática?",
          "Como se sentiu após a tarefa?"
        ]
      }
    }
  ]
}
```

## Campos Importantes
- **area**: Nome da área temática.
- **icone**: Ícone representativo (FontAwesome5).
- **cor**: Cor principal da área.
- **descricao**: Descrição breve da área.
- **capitulos**: Lista de capítulos, cada um com tópicos, tarefas e feedback.
- **tarefas**: Cada tarefa tem XP, pontos, energia e tipo (mental, física, racional, etc).
- **feedback**: Perguntas reflexivas para consolidar o aprendizado.

## Como Adicionar Novas Áreas ou Capítulos
1. Crie um novo arquivo JSON em `public/data/` seguindo o modelo acima.
2. Mantenha a estrutura e os campos obrigatórios.
3. Adicione referências cruzadas entre áreas/capítulos se necessário.

## Exemplo de Referência Cruzada
```json
{
  "referencia": {
    "area": "Espiritualidade",
    "capituloId": "espiritualidade_1",
    "texto": "Veja também: A Energia da Consciência"
  }
}
```

## Observações
- Todos os dados são carregados dinamicamente nas telas do app.
- Feedbacks são opcionais, mas recomendados para engajamento.
- Siga o padrão para garantir compatibilidade e fácil manutenção.

---

> Consulte também o arquivo `documentacao-tecnica.md` para detalhes de implementação.