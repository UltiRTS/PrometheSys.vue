<script lang="ts" setup>
import { ipcRenderer } from 'electron'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import router from './router'
import { useUserStore } from './stores'

const store = useUserStore()

ipcRenderer.send('toMain', JSON.stringify({
  action: 'queryMap',
  data: {
    mapId: '1',
  },
}))

// const userStore = useUserStore()
// userStore.login({ username: 'test', password: 'testpassword' })

onMounted(async () => {
  fetch('music/acknowledge.wav').then(res => res.json()).then((obj) => {
    console.log(obj)
  })
  if (await ipcRenderer.invoke('issubwindow'))
    router.push('popup')
  else
    router.push('prelogin')
})
</script>

<template>
  <div class="app-wrapper">
    <router-view />
  </div>
</template>
