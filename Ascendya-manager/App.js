import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ChapterEditor from './components/ChapterEditor';

const App = () => {
  const [conteudo, setConteudo] = useState(null);
  const [filePath, setFilePath] = useState('');

  const carregarArquivo = async () => {
    const path = await window.electronAPI.selectJSON();
    if (path) {
      const data = await window.electronAPI.loadJSON(path);
      setFilePath(path);
      setConteudo(data);
    }
  };

  const salvarArquivo = async () => {
    if (filePath && conteudo) {
      await window.electronAPI.saveJSON({ filePath, content: conteudo });
      alert('Salvo com sucesso!');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Editor de Conteúdo JSON</h1>
      <button onClick={carregarArquivo}>Carregar JSON</button>
      <button onClick={salvarArquivo} disabled={!conteudo}>Salvar JSON</button>
      {conteudo && (
        <ChapterEditor data={conteudo} setData={setConteudo} />
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// renderer/src/components/ChapterEditor.jsx
import React from 'react';

const ChapterEditor = ({ data, setData }) => {
  const updateTitulo = (index, value) => {
    const updated = { ...data };
    updated.capitulos[index].titulo = value;
    setData(updated);
  };

  return (
    <div>
      <h2>Capítulos</h2>
      {data.capitulos.map((cap, i) => (
        <div key={i} style={{ border: '1px solid #aaa', marginBottom: 10, padding: 10 }}>
          <input
            value={cap.titulo}
            onChange={(e) => updateTitulo(i, e.target.value)}
            style={{ width: '100%' }}
          />
          <p><strong>ID:</strong> {cap.id}</p>
          <p><strong>Descrição:</strong> {cap.descricao}</p>
        </div>
      ))}
    </div>
  );
};

export default ChapterEditor;