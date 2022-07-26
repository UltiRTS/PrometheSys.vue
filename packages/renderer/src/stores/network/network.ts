/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { randomInt } from 'crypto'
import { ref } from 'vue'
import { pushNewLoading, pushUINewNotif, rmLoading } from '../UI/ui'
import router from '../../router'
import * as dntp from '../mapAPI/dntpService'
import * as engineMgr from '../engineManager/engine'
import type { Game, GameBrief, Notification, StateMessage } from './interfaces'

const ws = new WebSocket('ws://144.126.145.172:8081')
const ws_open = ref<boolean>()
let wdir: string
let submittedMap: number
const mapsBeingDownloaded: number[] = []
let lastGame: Game | null
export const chatLog = ref([
  {
    author: 'Александр Карпов',
    msg: 'Привет, как дела?',
    chatName: 'global',
    timestamp: Date.now(),
  },
])
export const joinedChannels = ref<string[]>()
export const gameListing = ref<GameBrief[]>()
export const joinedGame = ref<Game | null>()
export const username = ref('')
export const minimapFileName = ref('')

export function login(params: {
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

export function joinChat(params: {
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

export function leaveChat(params: {
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

export function setMap(params: { game: string
  mapId: number
}) {
  const tx = {
    action: 'SETMAP',
    parameters: {
      gameName: params.game,
      mapId: params.mapId,
    },
    seq: randomInt(0, 10000000),
  }
  wsSendServer(tx)
}

export function sayChat(params: {
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

export function joinGame(params: {
  gameName: string|null|undefined
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

export function leaveGame(){
  
    const tx = {
      action: 'LEAVEGAME',
      parameters: {
      },
      seq: randomInt(0, 1000000),
    }
    wsSendServer(tx)
}

export function setAIorChicken(params: {
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

export function delAIorChicken(params: {
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

export function setTeam(params: {
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

export function specPlayer(params: {
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

export function hasMap(params: {
  mapId: number
}) {
  const tx = {
    action: 'HASMAP',
    parameters: {
      mapId: params.mapId,
    },
    seq: randomInt(0, 1000000),
  }

  wsSendServer(tx)
}

export function startGame() {
  const tx = {
    action: 'STARTGAME',
    parameters: {
    },
    seq: randomInt(0, 1000000),
  }

  wsSendServer(tx)
}

export function wsSendServer(tx: {
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

export function setWDir(input: string) {
  wdir = input
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

    // login section
    writeLoginStats()

    // chat section
    writeChatStats(msg)
    joinedGame.value = msg.state.user.game
    gameListing.value = msg.state.games
    
    username.value = msg.state.user.username
    // const mapBeingDownloaded = joinedGame.value.mapId
    writeMapStats(msg)
    writeStartGameStats(msg)
    lastGame = joinedGame.value
  }
}

export const userState = ref({ isLoggedIn: false })

function writeLoginStats() {
  if (userState.value.isLoggedIn === false) {
    joinChat({
      chatName: 'global',
      password: '',
    })
    setTimeout(() => {
      router.push('postlogin')
    }, 5000)

    userState.value.isLoggedIn = true
  }
}

function writeChatStats(msg: StateMessage) {
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
  }
}

function writeMapStats(msg: StateMessage) {
  if (!msg.state.user.game)
    return
  const mapBeingDownloaded = msg.state.user.game.mapId
  if (mapsBeingDownloaded.includes(mapBeingDownloaded))
    return

  mapsBeingDownloaded.push(mapBeingDownloaded)

  pushNewLoading('loadingMiniMap')
  pushUINewNotif({ title: 'INTL', msg: 'Operation Intl Updated', class: 'aaa' })
  dntp.getMiniMapfromID(mapBeingDownloaded, wdir).then((filename) => {
    minimapFileName.value = filename
    rmLoading('loadingMiniMap')
    dntp.getMapActualFile(mapBeingDownloaded, wdir).then(() => {
      const index = mapsBeingDownloaded.indexOf(mapBeingDownloaded)
      if (index > -1) { // only splice array when item is found
        mapsBeingDownloaded.splice(index, 1) // 2nd parameter means remove one item only
      }

      if (submittedMap !== mapBeingDownloaded) { // gota submit again if I havent submitted
        hasMap({
          mapId: mapBeingDownloaded,
        })
        submittedMap = mapBeingDownloaded
        pushUINewNotif({ title: 'MAP', msg: 'New Map Retrieved', class: 'aaa' })
      }
    })
  })
}
function writeStartGameStats(msg: StateMessage) {
  //console.log(joinedGame.value)
  if (!msg.state.user.game)
    return
  if (!lastGame)
    return
  if (msg.state.user.game.isStarted && !lastGame.isStarted) {
    engineMgr.configureToLaunch({
      host: msg.state.user.game.responsibleAutohost.slice(7),
      port: msg.state.user.game.autohostPort,
      permittedUsername: username.value,
      token: msg.state.user.game.engineToken,
    })
  }
}
ws.onopen = () => {
  ws_open.value = true
  console.log('ws is open')
}

ws.onclose = () => {
  ws_open.value = false
}
