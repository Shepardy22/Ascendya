// utils/gerarMapeamentoImagens.js
// Rode: node utils/gerarMapeamentoImagens.js
const fs = require('fs');
const path = require('path');

const pasta = path.join(__dirname, '../assets/images');
const arquivos = fs.readdirSync(pasta).filter(f => f.match(/\.(png|jpg|jpeg|gif)$/i));

console.log('// Cole o resultado abaixo no seu arquivo de mapeamento:');
console.log('export const imagens = {');
arquivos.forEach(nome => {
  console.log(`  '${nome}': require('../assets/images/${nome}'),`);
});
console.log('};');