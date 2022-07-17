import { ref } from 'vue'

export const grabberTriggerAction = ref('')
export const activeWindow = ref('menu')
export const mainMenuContent = ref('dod')
export const modalMenuContent = ref('chat')
export const grabberActivated = ref(false)
export const notifs = ref<{ msg: string; title: string; class: string }[]>([])

export function pushUINewNotif(input: { title: string; msg: string; class: string }) {
  input.class = 'init'
  notifs.value.push(input)

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

export function setactiveWindow(input: string) {
  activeWindow.value = input
}

export function setmainMenuContent(input: string) {
  mainMenuContent.value = input
}

export function setmodalMenuContent(input: string) {
  modalMenuContent.value = input
}
