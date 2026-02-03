{
  "area": "Nome da Área", //AREA DO CONHECIMENTO ( Alimentação, Emoções, espiritualidade, Finanças, Saúde Física )
  "icone": "nomeDoIcone", // Ex: "brain", "wallet", "om", etc.
  "cor": "#hexadecimal", // Cor principal da área
  "descricao": "Descrição breve da área.",
  "capitulos": [
    {
      "id": "area_1", // ID único do capítulo
      "titulo": "Título do Capítulo",
      "descricao": "Descrição do capítulo.",
      "topicos": [
        {
          "titulo": "Título do Tópico",
          "conteudo": [
            "Texto do parágrafo.",
            { "imagem": "nome_da_imagem.png" }, // Para exibir uma imagem (deve estar em assets/images/)
            { "referencia": { 
                "area": "Nome da Área de Destino", 
                "capituloId": "id_do_capitulo_destino", 
                "texto": "Texto do link de referência" 
            }}
            // Pode alternar entre strings, imagens e referências
          ]
        }
        // ...outros tópicos
      ],
      "tarefas": [
        {
          "id": "tarefa_1", // ID único da tarefa
          "descricao": "Descrição da tarefa.",
          "xp": 10,         // XP ganho ao concluir
          "pontos": 5,      // Pontos da área ganhos ao concluir
          "energia": 2,     // Energia ganha ou gasta
          "tipo": "mental"  // Tipo de tarefa (opcional, pode ser usado para lógica de energia)
          // Tipos possíveis: "mental", "fisica", "emocional", "espiritual", "social", "financeira"     }
        // ...outras tarefas
      ],
      "feedback": {
        "ativo": true, // Se o feedback está habilitado para este capítulo
        "perguntas": [
          "Pergunta 1 para o feedback.",
          "Pergunta 2 para o feedback."
          // ...outras perguntas
        ]
      },
      "pontosMinimos": 20 // (opcional) Pontos mínimos necessários na área para desbloquear este capítulo
    }
    // ...outros capítulos
  ]
}