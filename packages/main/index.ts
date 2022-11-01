import { release } from 'os'
import { join } from 'path'
// import Store from 'electron-store'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import pkg from '../../package.json'
import { store } from './store'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1'))
  app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32')
  app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let win: BrowserWindow | null = null
let popUpWin: BrowserWindow | null = null

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    width: 1280,
    height: 720,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  })

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
  else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${pkg.env.VITE_DEV_SERVER_HOST}:${pkg.env.VITE_DEV_SERVER_PORT}`

    win.loadURL(url)
    win.webContents.openDevTools()
  }

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:'))
      shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized())
      win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length)
    allWindows[0].focus()
  else
    createWindow()
})

// function createStorage() {
//   return new Store({
//     name: 'Promethesys',
//   })
// }

// const store = createStorage()
// store.set('map', 'testmap')

// ipcMain.on('toMain', (event, message) => {
//   try {
//     const msgJson = JSON.parse(message)
//     if (msgJson.action === 'queryMap') {
//       event.reply('fromMain', JSON.stringify({
//         action: 'map',
//         data: store.get('map'),
//       }))
//     }
//   }
//   catch (e) {
//     console.log('Invalid JSON format', message)
//   }
// })

ipcMain.handle('store', (event, type: string, key: string, value: any) => {
  console.log('store called', type, key, value)
  if (type === 'set')
    store.set(key, value)

  else if (type === 'get')
    return store.get(key)
})

ipcMain.handle('popup', (e, data) => {
  console.log('pop up called')
  const devUrl = `http://${pkg.env.VITE_DEV_SERVER_HOST}:${pkg.env.VITE_DEV_SERVER_PORT}/#/popup`
  const prodUrl = join(__dirname, '../renderer/index.html#popup')
  const modalPath = process.env.NODE_ENV === 'development' ? devUrl : prodUrl

  popUpWin = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  })

  popUpWin.on('close', () => { popUpWin = null })
  popUpWin.loadURL(modalPath)
})

ipcMain.handle('popdown', (e, data) => {
  if (popUpWin)
    popUpWin.close()
})
