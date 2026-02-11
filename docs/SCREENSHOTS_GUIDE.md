# 📸 Guia para Adicionar Screenshots

Este documento explica como capturar e adicionar screenshots ao README principal do Ascendya.

## 📁 Estrutura de Pastas

```
Ascendya/
└── docs/
    └── images/
        ├── logo.png                    # Logo principal do Ascendya
        └── screenshots/
            ├── mobile_login.png        # Tela de login do app
            ├── mobile_home.png         # Tela principal do app
            ├── mobile_chapter.png      # Tela de capítulos
            ├── mobile_progress.png     # Sistema de progresso
            ├── manager_main.png        # Interface principal do manager
            ├── manager_editor.png      # Editor de capítulos
            └── manager_sidebar.png     # Menu lateral de referências
```

---

## 📱 Screenshots do Ascendya Mobile

### 1. Tela de Login (`mobile_login.png`)
**Como capturar:**
1. Execute o app: `npm run start` (na pasta Ascendya-mobile)
2. Abra no navegador (pressione `w`)
3. Faça logout se estiver logado
4. Capture a tela de login
5. **Tamanho recomendado**: 400x800px (formato mobile)

**O que mostrar:**
- Logo do Ascendya
- Campos de email e senha
- Botões de login/cadastro

---

### 2. Tela Principal (`mobile_home.png`)
**Como capturar:**
1. Faça login no app
2. Capture a tela principal com as 5 áreas
3. **Tamanho recomendado**: 400x800px

**O que mostrar:**
- Header com nome do usuário e botão de logout
- 5 cards das áreas (Espiritualidade, Saúde, etc.)
- Barra de progresso de XP
- Indicadores de nível, pontos e energia

---

### 3. Tela de Capítulos (`mobile_chapter.png`)
**Como capturar:**
1. Clique em uma área (ex: Espiritualidade)
2. Capture a lista de capítulos
3. **Tamanho recomendado**: 400x800px

**O que mostrar:**
- Lista de capítulos disponíveis
- Indicadores de progresso por capítulo
- Botão de voltar

---

### 4. Sistema de Progresso (`mobile_progress.png`)
**Como capturar:**
1. Navegue até uma tela que mostre claramente:
   - Barra de XP
   - Nível atual
   - Pontos por área
   - Energia
2. **Tamanho recomendado**: 400x800px

**O que mostrar:**
- Todos os indicadores de gamificação
- Pode ser um close-up da área de progresso

---

## 🖥️ Screenshots do Ascendya Manager

### 5. Interface Principal (`manager_main.png`)
**Como capturar:**
1. Execute o manager: `npm run dev` (na pasta Ascendya-manager)
2. Carregue um arquivo JSON
3. Capture a janela completa do Electron
4. **Tamanho recomendado**: 1200x800px

**O que mostrar:**
- Header com botões "Carregar JSON" e "Salvar JSON"
- Editor principal com capítulos
- Sidebar lateral com menu de referências

---

### 6. Editor de Capítulos (`manager_editor.png`)
**Como capturar:**
1. Expanda um capítulo no editor
2. Mostre os campos de edição:
   - Título
   - Descrição
   - Tópicos
   - Tarefas
   - Feedback
3. **Tamanho recomendado**: 1200x800px

**O que mostrar:**
- Campos de edição preenchidos
- Botões de adicionar tópico/tarefa
- Interface de edição visual

---

### 7. Menu de Referências (`manager_sidebar.png`)
**Como capturar:**
1. Expanda algumas áreas no menu lateral
2. Mostre a hierarquia: Área → Capítulo → Tópico
3. **Tamanho recomendado**: 400x800px (close-up da sidebar)

**O que mostrar:**
- Menu lateral expandido
- Estrutura hierárquica de navegação
- Botões de expandir/recolher

---

## 🎨 Logo Principal (`logo.png`)

**Como criar:**
1. Crie ou use o logo existente do Ascendya
2. **Formato**: PNG com fundo transparente
3. **Tamanho recomendado**: 512x512px
4. **Localização**: `docs/images/logo.png`

Se não tiver um logo, você pode:
- Usar um ícone temporário
- Criar um logo simples com texto estilizado
- Usar uma ferramenta como Canva ou Figma

---

## 🛠️ Ferramentas Recomendadas

### Para Captura de Tela
- **Windows**: Ferramenta de Captura (Win + Shift + S)
- **macOS**: Screenshot (Cmd + Shift + 4)
- **Extensão Chrome**: Awesome Screenshot

### Para Edição
- **Paint.NET** (Windows)
- **GIMP** (Multiplataforma)
- **Preview** (macOS)
- **Photopea** (Online)

### Para Otimização
- **TinyPNG** (https://tinypng.com/)
- **Squoosh** (https://squoosh.app/)

---

## ✅ Checklist

Após adicionar todas as imagens, verifique:

- [ ] `docs/images/logo.png` - Logo principal
- [ ] `docs/images/screenshots/mobile_login.png`
- [ ] `docs/images/screenshots/mobile_home.png`
- [ ] `docs/images/screenshots/mobile_chapter.png`
- [ ] `docs/images/screenshots/mobile_progress.png`
- [ ] `docs/images/screenshots/manager_main.png`
- [ ] `docs/images/screenshots/manager_editor.png`
- [ ] `docs/images/screenshots/manager_sidebar.png`

---

## 📝 Dicas de Qualidade

1. **Resolução**: Use imagens de alta qualidade (mínimo 72 DPI)
2. **Formato**: PNG para screenshots com texto nítido
3. **Tamanho**: Otimize as imagens para web (< 500KB cada)
4. **Consistência**: Use o mesmo tema/modo em todas as capturas
5. **Privacidade**: Remova informações pessoais sensíveis

---

## 🔄 Atualizando o README

Após adicionar as imagens, o README já está configurado para exibi-las automaticamente. Não é necessário editar o arquivo, apenas certifique-se de que os nomes dos arquivos correspondem exatamente aos especificados.

---

**Pronto!** Com todas as imagens adicionadas, o README ficará completo e profissional! 🎉
