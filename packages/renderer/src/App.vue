<script lang="ts" setup>
import { ipcRenderer } from 'electron'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import router from './router'
import { useUserStore } from './stores'

ipcRenderer.send('toMain', JSON.stringify({
  action: 'queryMap',
  data: {
    mapId: '1',
  },
}))

// const userStore = useUserStore()
// userStore.login({ username: 'test', password: 'testpassword' })

onMounted(() => {
  router.push('prelogin')
})
</script>

<template>
  <div class="app-wrapper">
    <router-view />
  </div>
</template>
