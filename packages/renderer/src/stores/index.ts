/* eslint-disable eqeqeq */
import { randomInt } from 'crypto'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { ref } from 'vue'
import router from '../router'
import type { Game, GameBrief, Notification, StateMessage } from './interfaces'

export const useUserStore = defineStore('user', () => {
  const ws = new WebSocket('ws://127.0.0.1:8081')

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
  const joinedChannels = ref<string[]>()
  const gameListing = ref<GameBrief[]>()
  const joinedGame = ref<Game | null>()
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
    gameName: string|null|undefined
    password: string
    mapID: string
  }) {
    if (joinedGame.value
      && params.gameName === joinedGame.value.title)
      return false

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
    return true
  }

  function setAIorChicken(params: {
    gameName: string
    AI: string
    team: string
    type: string
  }) {
    const tx = {
      action: 'SETAI',
      parameters: {
        gameName: params.gameName,
        AI: params.AI,
        team: params.team,
        type: params.type,
      },
      seq: randomInt(0, 1000000),
    }

    wsSendServer(tx)
  }

  function delAIorChicken(params: {
    gameName: string
    AI: string
    team: string
    type: string
  }) {
    const tx = {
      action: 'DELAI',
      parameters: {
        gameName: params.gameName,
        AI: params.AI,
        team: params.team,
        type: params.type,
      },
      seq: randomInt(0, 1000000),
    }

    wsSendServer(tx)
  }

  function setTeam(params: {
    gameName: string
    team: string
    player: string
  }) {
    const tx = {
      action: 'SETTEAM',
      parameters: {
        gameName: params.gameName,
        team: params.team,
        player: params.player,
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
    let msg: StateMessage | Notification = JSON.parse(ev.data)
    console.log({ msg })
    if (msg.action === undefined)
      return

    if (msg.action === 'NOTIFY') {
      msg = msg as Notification
    }
    else {
      msg = msg as StateMessage
      if (userState.value.isLoggedIn === false) {
        joinChat({
          chatName: 'global',
          password: '',
        })
        router.push('postlogin')
        userState.value.isLoggedIn = true
      }

      const tmpChannels = Object.keys(msg.state.user.chatRooms)
      joinedChannels.value = tmpChannels // composes joined channel

      for (let i = 0; i < tmpChannels.length; i++) {
        const lastMessage = msg.state.user.chatRooms[tmpChannels[i]].lastMessage
        if (lastMessage.content !== '') {
          chatLog.value.push({
            author: lastMessage.author,
            msg: lastMessage.content,
            timestamp: lastMessage.time,
            chatName: tmpChannels[i],
          })

          while (chatLog.value.length > 100) chatLog.value.shift()
        }
      } // composes chat msg

      // console.log(chatLog.value)
      // console.log(joinedChannels.value)
      gameListing.value = msg.state.games
      joinedGame.value = msg.state.user.game
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
    joinedGame,

    sayChat,
    joinChat,
    login,
    pushGrabberAction,
    pushGrabberInput,
    setAIorChicken,
    delAIorChicken,
    setTeam,
    joinGame,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

