const Store = require('electron-store')

export const memory = new Store()
if (!memory.get('isRememberedLogin')) {
  memory.set('uName', '')
  memory.set('passwd', '')
  memory.set('isRememberedLogin', false)
}

