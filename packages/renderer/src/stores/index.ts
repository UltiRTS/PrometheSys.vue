/* eslint-disable eqeqeq */
import { randomInt } from 'crypto'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { ref } from 'vue'
import router from '../router'

export const useUserStore = defineStore('user', () => {
  const ws = new WebSocket('ws://185.205.246.232:8081')

  const ws_open = ref<boolean>()
  const userState = ref({ isLoggedIn: false })
  const chatLog = ref([
    {
      author: 'Александр Карпов',
      msg: 'Привет, как дела?',
      chatName: 'global',
      timestamp: Date.now(),
    },
  ])
  const joinedChannels = ref<string[]>([])
  const gameListing = ref<any[]>([])
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
        joinGame(
          {
            gameName: grabberInput.value,
            password: '',
            mapID: '0',
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

    const tx = JSON.stringify({
      action: 'LOGIN',
      parameters: {
        username: params.username,
        password: params.password,
      },
      seq: randomInt(0, 1000000),
    })

    console.log(tx)
    ws.send(tx)
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
    console.log(tx)
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
    const tx = JSON.stringify({
      action: 'SAYCHAT',
      parameters: {
        chatName: params.chatName,
        message: params.msg,
      },
      seq: randomInt(0, 1000000),
    })
    console.log(tx)
    ws.send(tx)
  }

  function joinGame(params: {
    gameName: string
    password: string
    mapID: string
  }) {
    const tx = {
      action: 'JOINGAME',
      parameters: {
        gameName: params.gameName,
        password: params.password,
        mapId: params.mapID,
      },
      seq: randomInt(0, 1000000),
    }
    wsSendServer(tx)
  }

  function wsSendServer(tx: {
    action: string
    parameters: any
    seq: number
  }) {
    if (ws_open.value !== true) {
      console.error('ws is not open')
      return
    }
    console.log(tx)
    ws.send(JSON.stringify(tx))
  }

  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data)
    // console.log(`msg${msg}`)
    if (msg.action === undefined)
      return

    // console.log(!msg.state.user)

    console.log(msg)
    if (msg.state && !userState.value.isLoggedIn) {
      joinChat({
        chatName: 'global',
        password: '',
      })
      router.push('postlogin') // just logged in
      userState.value.isLoggedIn = true
    }

    switch (msg.action) {
      case 'NOTIFY':
        break
      default:
        if (msg.state.user.chatRooms) {
          if (chatLog.value.length === 100)
            chatLog.value.shift()

          // console.log(msg.state.user.chatRooms)
          const tmpChannel = []
          for (const chat in msg.state.user.chatRooms) {
            tmpChannel.push(chat)
            // console.log(joinedChannels.value)

            if (msg.state.user.chatRooms[chat].lastMessage.content == '')
              continue
            chatLog.value.push({
              author: msg.state.user.chatRooms[chat].lastMessage.author,
              msg: msg.state.user.chatRooms[chat].lastMessage.content,
              chatName: chat,
              timestamp: msg.state.user.chatRooms[chat].lastMessage.time,
            })
          }
          joinedChannels.value = tmpChannel
        }
        if (msg.state.games)
          gameListing.value = msg.state.games

        userState.value = msg
        userState.value.isLoggedIn = true
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
    userState,
    chatLog,
    joinedChannels,
    grabberInput,
    grabberTriggerAction,
    gameListing,

    sayChat,
    joinChat,
    login,
    pushGrabberAction,
    pushGrabberInput,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

