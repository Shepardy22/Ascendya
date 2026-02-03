const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  const filePath = result.filePaths[0];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
});

ipcMain.handle('save-json', async (_, data) => {
  const result = await dialog.showSaveDialog({
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });
  if (result.canceled || !result.filePath) return false;
  fs.writeFileSync(result.filePath, JSON.stringify(data, null, 2));
  return true;
});

ipcMain.handle('save-image', async (_, name, base64data) => {
  const matches = base64data.match(/^data:.+\/(.+);base64,(.*)$/);
  if (!matches) return false;
  const ext = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const savePath = path.join(__dirname, 'images', name);
  fs.mkdirSync(path.dirname(savePath), { recursive: true });
  fs.writeFileSync(savePath, buffer);
  return true;
});

ipcMain.handle('read-all-json-files', async (_, dir = 'data') => {
  const folderPath = path.join(__dirname, dir);
  if (!fs.existsSync(folderPath)) return [];
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
  const result = [];
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
      result.push(JSON.parse(content));
    } catch (e) {
      // Ignora arquivos inválidos
    }
  }
  return result;
});