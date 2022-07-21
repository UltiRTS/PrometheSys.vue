/* eslint-disable eqeqeq */
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import * as network from './network/network'
import * as ui from './UI/ui'
import * as dntpService from './mapAPI/dntpService'
export const useUserStore = defineStore('user', () => {
  const lobbyDir = ref('/tmp')
  // UI related var
  const grabberTriggerAction = ui.grabberTriggerAction
  const grabberActivated = ui.grabberActivated
  const mainMenuContent = ui.mainMenuContent
  const modalMenuContent = ui.modalMenuContent
  const activeWindow = ui.activeWindow
  const notifs = ui.notifs

  const setactiveWindow = ui.setactiveWindow
  const setmodalMenuContent = ui.setmodalMenuContent
  const setmainMenuContent = ui.setmainMenuContent
  const pushGrabberAction = ui.pushGrabberAction
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
  const userState = network.userState
  const chatLog = network.chatLog
  const joinedChannels = network.joinedChannels
  const gameListing = network.gameListing
  const joinedGame = network.joinedGame
  const username = network.username

  // dntp service
  const searchMap = dntpService.searchMap
  const ListMap = dntpService.ListMap

  return {
    ui,
    grabberTriggerAction,
    grabberActivated,
    mainMenuContent,
    modalMenuContent,
    activeWindow,
    notifs,

    setactiveWindow,
    setmodalMenuContent,
    setmainMenuContent,
    pushGrabberAction,
    pushUINewNotif,

    network,
    userState,
    chatLog,
    joinedChannels,
    gameListing,
    joinedGame,
    username,

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

    lobbyDir,

  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

