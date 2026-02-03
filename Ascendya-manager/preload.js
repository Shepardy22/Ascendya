const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFileFromData: () => ipcRenderer.invoke('open-file'),
  saveJSON: (data) => ipcRenderer.invoke('save-json', data),
  saveImage: (name, data) => ipcRenderer.invoke('save-image', name, data),
  readAllJsonFiles: (dir) => ipcRenderer.invoke('read-all-json-files', dir),

});