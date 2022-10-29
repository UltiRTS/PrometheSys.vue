import Store from 'electron-store'

interface StoreType {
  isRememberedLogin: boolean
  uName: string
  passwd: string
}

export const store = new Store<StoreType>({
  defaults: {
    isRememberedLogin: false,
    uName: '',
    passwd: '',
  },
})
