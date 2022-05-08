import { acceptHMRUpdate, defineStore } from 'pinia'

import consola from 'consola'
import { ref } from 'vue'
import router from '../router'

export const useUserStore = defineStore('user', () => {
  const ws = new WebSocket('ws://185.205.246.232:9090')

  const ws_open = ref<boolean>()
  const count = ref<number>()
  const userState = ref({})
  const chatLog = ref<object[]>([
    {
      author: 'Александр Карпов',
      msg: 'Привет, как дела?',
      chatName: 'global',
      timestamp: Date.now(),
    },
  ])

  function login(params: {
    username: string
    password: string
  }) {
    if (ws_open.value !== true) {
      window.console.log('ws is not open')
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

  function joinChat(params: {
    chatName: string
  }) {
    if (ws_open.value !== true) {
      consola.error('ws is not open')
      return
    }

    ws.send(JSON.stringify({
      action: 'JOINCHAT',
      parameters: {
        chatName: params.chatName,
      },
    }))
  }

  function sayChat(params: {
    chatName: string
    msg: string
  }) {
    if (ws_open.value !== true) {
      consola.error('ws is not open')
      return
    }
    ws.send(JSON.stringify({
      action: 'SAYCHAT',
      parameters: {
        chatName: params.chatName,
        msg: params.msg,
      },
    }))
  }

  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.action === undefined)
      return

    switch (msg.action) {
      case 'stateDump':
        userState.value = msg
        consola.info(msg)

        if (chatLog.value.length === 100)
          chatLog.value.shift()
        if (msg.paramaters.usrstats.chatMsg != null) {
          chatLog.value.push({
            ...msg.paramaters.usrstats.chatMsg,
            timestamp: Date.now(),
          })
          // console.log(chatLog)
        }

        if (msg.triggeredBy === 'LOGIN') {
          router.push('postlogin')
          joinChat({ chatName: 'global' })
        }

        break
      default:
        consola.info(msg)
        break
    }
  }

  ws.onopen = () => {
    ws_open.value = true
    consola.log('ws is open')
  }

  ws.onclose = () => {
    ws_open.value = false
  }

  return {
    ws_open,
    count,
    userState,
    chatLog,

    sayChat,
    joinChat,
    login,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

