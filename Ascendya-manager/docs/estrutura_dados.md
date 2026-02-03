# Estrutura dos Dados

Os dados do Ascendya Manager são organizados em arquivos JSON, cada um representando uma área do conhecimento. A estrutura segue o modelo abaixo:

```json
{
  "area": "Nome da Área",
  "icone": "nomeDoIcone",
  "cor": "#hexadecimal",
  "descricao": "Descrição breve da área.",
  "capitulos": [
    {
      "id": "area_1",
      "titulo": "Título do Capítulo",
      "descricao": "Descrição do capítulo.",
      "topicos": [
        {
          "titulo": "Título do Tópico",
          "conteudo": [
            "Texto do parágrafo.",
            { "imagem": "nome_da_imagem.png" },
            { "referencia": { "area": "Nome da Área de Destino", "capituloId": "id_do_capitulo_destino", "texto": "Texto do link de referência" }}
          ]
        }
      ],
      "tarefas": [
        {
          "id": "tarefa_1",
          "descricao": "Descrição da tarefa.",
          "xp": 10,
          "pontos": 5,
          "energia": 2,
          "tipo": "mental"
        }
      ],
      "feedback": {
        "ativo": true,
        "perguntas": ["Pergunta 1", "Pergunta 2"]
      }
    }
  ]
}
```

Consulte o arquivo [`templateDados.md`](../data/templateDados.md) para detalhes e exemplos reais.

---