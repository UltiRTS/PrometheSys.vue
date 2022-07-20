import { ref } from 'vue'

export const grabberTriggerAction = ref('')
export const activeWindow = ref('menu')
export const mainMenuContent = ref('dod')
export const modalMenuContent = ref('chat')
export const grabberActivated = ref(false)
export const notifs = ref<{ msg: string; title: string; class: string }[]>([])
const loadingQ = ref<string [] >([])
export const loadingClass = ref<string>('died')

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
      loadingClass.value = 'died'
    }, 2000)
  }
}

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
