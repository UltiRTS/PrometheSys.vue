/* eslint-disable eqeqeq */
import { randomInt } from 'crypto'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { ref } from 'vue'
import router from '../router'
import type { Game, GameBrief, Notification, StateMessage } from './interfaces'

export const useUserStore = defineStore('user', () => {
  // network parsed var
  const ws = new WebSocket('ws://144.126.145.172:8081')
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
  const username = ref('')

  // UI related var
  const grabberInput = ref('')
  const grabberTriggerAction = ref('')
  const activeWindow = ref('menu')
  const mainMenuContent = ref('dod')
  const modalMenuContent = ref('chat')
  const grabberActivated = ref<boolean>(false)
  const newNotif = ref({ msg: 'aaa', title: 'bbbc' })
  const notifs = ref([{
    msg: 'Привет, как дела?',
    title: 'Привет',
  }])

  function pushUINewNotif(input: { title: string; msg: string }) {
    notifs.value.push(input)
    setTimeout(() => {
      notifs.value.shift()
    }, 500)
  }
  function pushGrabberAction(action: string) {
    grabberTriggerAction.value = action
    grabberActivated.value = true
  }

  function pushGrabberInput(input: string) {
    grabberActivated.value = false
    if (input === 'Input Await')
      return
    if (input === 'canceling')
      return

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

  function setactiveWindow(input: string) {
    activeWindow.value = input
  }

  function setmainMenuContent(input: string) {
    mainMenuContent.value = input
  }

  function setmodalMenuContent(input: string) {
    modalMenuContent.value = input
  }

  // network related function
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

  function leaveChat(params: {
    chatName: string
  }) {
    const tx = {
      action: 'LEAVECHAT',
      parameters: {
        chatName: params.chatName,
      },
      seq: randomInt(0, 1000000),
    }
    wsSendServer(tx)
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
      && params.gameName === joinedGame.value.title) {
      mainMenuContent.value = 'dodPregame'
      return
    }

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
    type: string
  }) {
    const tx = {
      action: 'DELAI',
      parameters: {
        gameName: params.gameName,
        AI: params.AI,
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

  function specPlayer(params: {
    game: string
    player: string
  }) {
    const tx = {
      action: 'SETSPEC',
      parameters: {
        gameName: params.game,
        player: params.player,
      },
      seq: randomInt(0, 1000000),
    }

    wsSendServer(tx)
  }

  function hasMap(params: {
    gameName: string
  }) {
    const tx = {
      action: 'HASMAP',
      parameters: {
        gameName: params.gameName,
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
      username.value = msg.state.user.username
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
    grabberActivated,
    mainMenuContent,
    modalMenuContent,
    activeWindow,
    username,
    newNotif,
    notifs,

    pushUINewNotif,
    hasMap,
    leaveChat,
    setactiveWindow,
    setmodalMenuContent,
    setmainMenuContent,
    sayChat,
    joinChat,
    login,
    pushGrabberAction,
    pushGrabberInput,
    setAIorChicken,
    delAIorChicken,
    setTeam,
    specPlayer,
    joinGame,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

