import axios from 'axios'
import { ref } from 'vue'
import * as ui from '../UI/ui'
const provider = 'http://144.126.145.172:3030/user/'
export const userInfo = ref(false)

const request = axios.create({
  baseURL: provider,
  timeout: 10000,
})

export async function getUInfo(username) {
  ui.pushNewLoading('gtUInfo')
  const resp = await request.get(`/byname/${username}`)
  ui.rmLoading('gtUInfo')
  try {
    console.log(resp)
    userInfo.value = resp.data
  }
  catch (e) {
    console.log(e)
    return null
  }
}

export function resetUserInfo() {
  userInfo.value = false
}

