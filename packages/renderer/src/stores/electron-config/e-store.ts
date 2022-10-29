import { ipcRenderer } from 'electron'

export const get = async (key: string) => {
  return await ipcRenderer.invoke('store', 'get', key)
}

export const set = async (key: string, val: any) => {
  await ipcRenderer.invoke('store', 'set', key, val)
}
