/* eslint-disable eqeqeq */
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import * as network from './network/network'
import * as musicPlayer from './musicPlayer/musicPlayer'
import * as soundPlayer from './soundPlayer/soundPlayer'

import * as ui from './UI/ui'
import * as dntpService from './mapAPI/dntpService'
import * as userapi from './userapi/userapi'

import * as engineMgr from './engineManager/engine'
import * as eStore from './electron-config/e-store'





export const useUserStore = defineStore('user', () => {
  


  // eslint-disable-next-line dot-notation
  const lobbyDir = ref(process.env['lobbydir'] || '/tmp')

  const isLinux = ref(process.platform != 'win32')
  // UI related var

  const mainMenuContent = ui.mainMenuContent
  const modalMenuContent = ui.modalMenuContent
  const activeWindow = ui.activeWindow
  const notifs = ui.notifs

  const setactiveWindow = ui.setactiveWindow
  const setmodalMenuContent = ui.setmodalMenuContent
  const setmainMenuContent = ui.setmainMenuContent
  const pushUINewNotif = ui.pushUINewNotif

  // network related function

  const hasMap = network.hasMap
  const leaveChat = network.leaveChat
  const sayChat = network.sayChat
  const joinChat = network.joinChat
  const login = network.login
  const setAIorChicken = network.setAIorChicken
  const setTeam = network.setTeam
  const specPlayer = network.specPlayer
  const joinGame = network.joinGame
  const delAIorChicken = network.delAIorChicken
  network.setWDir(lobbyDir.value)
  const confirmations = network.confirmations
  const userState = network.userState
  const chatLog = network.chatLog
  const joinedChannels = network.joinedChannels
  const gameListing = network.gameListing
  const joinedGame = network.joinedGame
  const username = network.username

  // dntp service
  const searchMap = dntpService.searchMap
  const ListMap = dntpService.ListMap

  // engineMgr
  engineMgr.setPlatform(isLinux)
  engineMgr.setWDir(lobbyDir.value)

  // memory
  // const memory = eStore.memory

  return {
    ui,
    mainMenuContent,
    modalMenuContent,
    activeWindow,
    notifs,

    setactiveWindow,
    setmodalMenuContent,
    setmainMenuContent,
    pushUINewNotif,

    network,
    userState,
    chatLog,
    joinedChannels,
    gameListing,
    joinedGame,
    username,
    confirmations,

    hasMap,
    leaveChat,
    sayChat,
    joinChat,
    login,
    setAIorChicken,
    delAIorChicken,
    setTeam,
    specPlayer,
    joinGame,

    dntpService,
    searchMap,
    ListMap,
    userapi,

    lobbyDir,
    isLinux,
    engineMgr,
    musicPlayer,
    soundPlayer,
    eStore,
    // memory,
  }
})
// musicPlayer.playSound('scene.babylon', true)
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

