import { acceptHMRUpdate, defineStore } from 'pinia'

import consola from 'consola'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const ws = new WebSocket('ws://178.18.243.134:9090')

  const ws_open = ref<boolean>()
  const count = ref<number>()
  const userState = ref({})

  function login(params: {
    username: string
    password: string
  }) {
    if (ws_open.value !== true) {
      console.log('ws is not open')
      return
    }

    ws.send(JSON.stringify({
      action: 'LOGIN',
      parameters: {
        usr: params.username,
        passwd: params.password,
      },
    }))
  }

  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data)
    consola.info(msg)
    if (msg.action === undefined)
      return

    switch (msg.action) {
      case 'stateDump':
        userState.value = msg
        break
      default:
        break
    }
  }

  ws.onopen = () => {
    ws_open.value = true
  }

  ws.onclose = () => {
    ws_open.value = false
  }

  return {
    ws_open,
    count,
    userState,

    login,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

