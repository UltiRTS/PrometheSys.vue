// import { contextBridge, ipcRenderer } from 'electron'
import { domReady } from './utils'
import { useLoading } from './loading'

const { appendLoading, removeLoading } = useLoading()
window.removeLoading = removeLoading

domReady().then(appendLoading)

// contextBridge.exposeInMainWorld('electron', {
//   ipcRenderer: {
//     ...ipcRenderer,
//     on: ipcRenderer.on,
//   },
// })

// contextBridge.exposeInMainWorld(
//   'ipcRenderer', {
//     send: (channel, data) => {
//       // whitelist channels
//       const validChannels = ['toMain']
//       if (validChannels.includes(channel))
//         ipcRenderer.send(channel, data)
//     },
//     receive: (channel, func) => {
//       const validChannels = ['fromMain']
//       if (validChannels.includes(channel)) {
//         // Deliberately strip event as it includes `sender`
//         ipcRenderer.on(channel, (event, ...args) => func(...args))
//       }
//     },
//   },
// )
