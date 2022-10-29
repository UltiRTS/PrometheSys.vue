import { ref } from 'vue'
import * as soundPlayer from '../soundPlayer/soundPlayer'
export const activeWindow = ref('menu')
export const mainMenuContent = ref('dod')
export const modalMenuContent = ref('chat')
export const inputGrabber = ref<any>(false)
export const notifs = ref<{ msg: string; title: string; class: string }[]>([])
const loadingQ = ref<string [] >([])
export const loadingClass = ref<string>('died')
export const confirms = ref<{ title: string; msg: string; rej: any;cnfrm: any; acceAvail: boolean;rejAvail: boolean }[]>([])

export function pushNewLoading(id: string) {
  loadingClass.value = 'alive'
  loadingQ.value.push(id)
}

export function rmLoading(id: string) {
  function removeFirst(arr: string[], target: string) {
    const idx = arr.indexOf(target)
    if (idx > -1)
      arr.splice(idx, 1)

    return arr
  }

  loadingQ.value = removeFirst(loadingQ.value, id)
  if (loadingQ.value.length === 0) {
    loadingClass.value = 'dying'
    setTimeout(() => {
      if (loadingQ.value.length > 0)
        return
      loadingClass.value = 'died'
    }, 400)
  }
}

export function pushUINewNotif(input: { title: string; msg: string; class: string }) {
  input.class = 'init'
  notifs.value.push(input)
  soundPlayer.playNotif('smolInfo.wav')
  setTimeout(() => {
    notifs.value.shift()
  }, 7000)

  setTimeout(() => {
    notifs.value[notifs.value.length - 1].class = 'gone'
  }, 5000)
  setTimeout(() => {
    notifs.value[notifs.value.length - 1].class = 'hold'
  }, 500)
}
/*
export function activateGrabber() {
  grabberActivated.value = true
}

export function pushGrabberAction(action: string) {
  grabberTriggerAction.value = action
  grabberActivated.value = true
}

export function clearGrabber() {
  grabberTriggerAction.value = ''
  grabberActivated.value = false
}
*/
export function getTextThroughGrabber(title: string) {
  return new Promise((resolve, reject) => {
    inputGrabber.value = { title, rej: reject, cnfrm: resolve }
  })
}

export function setactiveWindow(input: string) {
  activeWindow.value = input
}

export function setmainMenuContent(input: string) {
  mainMenuContent.value = input
}

export function setmodalMenuContent(input: string) {
  modalMenuContent.value = input
}

export function pushConfirm(title: string, message: string, acce = true, rej = true) {
  return new Promise((resolve, reject) => {
    confirms.value.push({ title, msg: message, rej: reject, cnfrm: resolve, acceAvail: acce, rejAvail: rej })
  })
}
