import { ipcRenderer } from 'electron'

export async function get(key: string) {
  return await ipcRenderer.invoke('store', 'get', key)
}

export async function set(key: string, val: any) {
  await ipcRenderer.invoke('store', 'set', key, val)
}
