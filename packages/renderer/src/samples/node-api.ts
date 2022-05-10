import { lstat } from 'fs/promises'
import { cwd } from 'process'
import { ipcRenderer } from 'electron'

// Usage of ipcRenderer.on
ipcRenderer.on('main-process-message', (_event, ...args) => {
  // eslint-disable-next-line no-console
  console.log('[Receive Main-process message]:', ...args)
})

lstat(cwd()).then((stats) => {
  // eslint-disable-next-line no-console
  console.log('[fs.lstat]', stats)
}).catch((err) => {
  console.error(err)
})
