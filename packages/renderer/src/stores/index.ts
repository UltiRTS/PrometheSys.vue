/* eslint-disable eqeqeq */
import { acceptHMRUpdate, defineStore } from 'pinia'

import consola from 'consola'
import { ref } from 'vue'
import router from '../router'

export const useUserStore = defineStore('user', () => {
  const ws = new WebSocket('ws://185.205.246.232:9090')

  const ws_open = ref<boolean>()
  const count = ref<number>()
  const userState = ref({ paramaters: { usrstats: { loggedIn: false } } })
  const chatLog = ref([
    {
      author: 'Александр Карпов',
      msg: 'Привет, как дела?',
      chatName: 'global',
      timestamp: Date.now(),
    },
  ])
  const grabberInput = ref('')
  const grabberTriggerAction = ref('')

  function pushGrabberAction(action: string) {
    grabberTriggerAction.value = action
  }

  function pushGrabberInput(input: string) {
    if (input === 'canceling') {
      consola.info('canceling')
      return
    }

    grabberInput.value = input
    consola.info('grabberInput', grabberInput.value)

    switch (grabberTriggerAction.value) {
      case 'AddChat': {
        joinChat({
          chatName: grabberInput.value,
        })
        break
      }
      default: {
        consola.info('default trigger')
        break
      }
    }

    // reset action to empty
    grabberTriggerAction.value = ''
  }

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
        if (msg.paramaters.usrstats.chatMsg) {
          if (chatLog.value.length === 100)
            chatLog.value.shift()

          chatLog.value.push({
            ...msg.paramaters.usrstats.chatMsg,
            timestamp: Date.now(),
          })
          // consola.info(chatLog)
        }
        // console.log(userState.value)
        if (msg.paramaters.usrstats.loggedIn && !userState.value.paramaters.usrstats.loggedIn) {
          router.push('postlogin') // just logged in
          joinChat({ chatName: 'global' })
        }

        userState.value = msg
        // consola.info(userState.value)

        break
      default:
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
    grabberInput,
    grabberTriggerAction,

    sayChat,
    joinChat,
    login,
    pushGrabberAction,
    pushGrabberInput,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

