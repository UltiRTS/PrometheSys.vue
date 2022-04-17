import {app, BrowserWindow, ipcMain} from 'electron';
import {join} from 'path';
import Store from 'electron-store';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    mainWindow.webContents.openDevTools();
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

function createStorage() {
  return new Store({
    name: 'Promethesys',
  });
}

const store = createStorage();
store.set('map', 'testmap');
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('toMain', (event, message) => {
  try {
    const msgJson = JSON.parse(message);
    if(msgJson.action === 'queryMap') {
      event.reply('fromMain', JSON.stringify({
        action: 'map',
        data: store.get('map')
      })) 
    }
  } catch(e) {
    console.log('Invalid JSON format', message);
  }
})