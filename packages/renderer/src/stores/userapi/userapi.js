import axios from 'axios'
import { ref } from 'vue'
import * as ui from '../UI/ui'
const provider = 'http://144.126.145.172:3030/user/'
export const userInfo = ref(false)
export const panelAlreadyShown = ref(false)
const request = axios.create({
  baseURL: provider,
  timeout: 10000,
})

export function getInfoLock(){
  panelAlreadyShown.value = true
}

export async function getUInfo(username) {

  ui.pushNewLoading('gtUInfo')
  try {
    const resp = await request.get(`/byname/${username}`)

    // console.log(resp)
    userInfo.value = resp.data
  }
  catch (e) {
    // console.log(e)
  }
  ui.rmLoading('gtUInfo')
}

export function resetUserInfo() {
  userInfo.value = false
  panelAlreadyShown.value = false
}

