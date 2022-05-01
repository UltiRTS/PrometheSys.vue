"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const electron_store_1 = __importDefault(require("electron-store"));
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, 'preload.js'),
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
        mainWindow.loadFile((0, path_1.join)(electron_1.app.getAppPath(), 'renderer', 'index.html'));
    }
}
function createStorage() {
    return new electron_store_1.default({
        name: 'Promethesys',
    });
}
const store = createStorage();
store.set('map', 'testmap');
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.ipcMain.on('toMain', (event, message) => {
    try {
        const msgJson = JSON.parse(message);
        if (msgJson.action === 'queryMap') {
            event.reply('fromMain', JSON.stringify({
                action: 'map',
                data: store.get('map')
            }));
        }
    }
    catch (e) {
        console.log('Invalid JSON format', message);
    }
});
