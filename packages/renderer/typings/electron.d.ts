/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  ipcRenderer: Electron.IpcRenderer
}

export interface IpcRendererApi {
  send: (channel: string, ...args: any[]) => void,
  receive: (channel: string, func: Function) => void,
}

declare global {
  interface Window {
    electron: ElectronApi,
    ipcRenderer: IpcRendererApi,
  }
}
