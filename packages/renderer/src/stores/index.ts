/* eslint-disable eqeqeq */
import { randomInt } from 'crypto'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { ref } from 'vue'
import router from '../router'

export const useUserStore = defineStore('user', () => {
  const ws = new WebSocket('ws://185.205.246.232:8081')

  const ws_open = ref<boolean>()
  const count = ref<number>()
  const userState = ref({ isLoggedIn: false })
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
      console.log('canceling')
      return
    }

    grabberInput.value = input
    // console.log('grabberInput' + grabberInput.value)

    switch (grabberTriggerAction.value) {
      case 'AddChat': {
        joinChat({
          chatName: grabberInput.value,
          password: '',
        })
        break
      }

      case 'AddGame': {
        joinGame({
          gameName: grabberInput.value,
        })
        break
      }
      default: {
        console.log('default trigger')
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
        username: params.username,
        password: params.password,
      },
      seq: randomInt(0, 1000000),
    }))
  }

  function joinChat(params: {
    chatName: string
    password: string
  }) {
    if (ws_open.value !== true) {
      console.error('ws is not open')
      return
    }

    const tx = JSON.stringify({
      action: 'JOINCHAT',
      parameters: {
        chatName: params.chatName,
        password: params.password,
      },
      seq: randomInt(0, 1000000),
    })
    console.log(`tx${tx}`)
    ws.send(tx)
  }

  function sayChat(params: {
    chatName: string
    msg: string
  }) {
    if (ws_open.value !== true) {
      console.error('ws is not open')
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

  function joinGame(params: {
    gameName: string
  }) {
    if (ws_open.value !== true) {
      console.error('ws is not open')
      return
    }
    ws.send(JSON.stringify({
      action: 'JOINGAME',
      parameters: {
        battleName: params.gameName,
      },
    }))
  }

  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data)
    console.log(`msg${msg}`)
    if (msg.action === undefined)
      return

    // console.log(!msg.state.user)

    // console.log(!userState.value)
    if (msg.state.user && !userState.value.isLoggedIn) {
      joinChat({
        chatName: 'global',
        password: '',
      })
      router.push('postlogin') // just logged in
    }

    switch (msg.action) {
      case 'NOTIFY':
        break
      default:
        /* if (msg.stats.usrstats.chatMsg) {
          if (chatLog.value.length === 100)
            chatLog.value.shift()

          chatLog.value.push({
            ...msg.paramaters.usrstats.chatMsg,
            timestamp: Date.now(),
          })
        } */
        userState.value = msg.state
        userState.value.isLoggedIn = true
        // console.log('received userstats:')
        console.log(userState.value)
        break
    }
  }

  ws.onopen = () => {
    ws_open.value = true
    console.log('ws is open')
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

