
<script>
import popup from './pages/popup.vue'
import prelogin from './pages/prelogin.vue'
import login from './pages/login.vue'
import postlogin from './pages/postlogin.vue'

import { ipcRenderer } from 'electron'

import { mapActions, mapState } from 'pinia'
import { useUserStore } from './stores'
import { set } from 'lodash'
export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      isSubWindow: false,
      phase: 'prelogin'
    }
  },
  components: { popup, prelogin, login, postlogin },
  computed: {
    ...mapState(useUserStore, ['joinedGame', 'mainMenuContent', 'modalMenuContent', 'activeWindow', 'network', 'ui', 'musicPlayer','username']),



  },

  updated() {

  },
  methods: {

  },
  mounted() {
    console.log('App.vue mounted')
    const thiis = this
    this.musicPlayer.playSound('bbl.wav', true)
    ipcRenderer.invoke('issubwindow').then((result) => {
      thiis.isSubWindow = result
      if (result) this.musicPlayer.stopSound('bbl.wav')

    })
    setTimeout(() => {
      this.phase ='login'
    }, 7000)
  },
  unmounted() {
    this.musicPlayer.stopSound('bbl.wav')
  },
  watch: {
    username(newVal, oldVal) {
      if (!newVal) return
      setTimeout(() => {
        this.phase = 'postlogin'
      }, 9000)
    },
  },
}
</script>

<template>
  <div>
      <popup v-if="isSubWindow"></popup>
      <prelogin v-if="!isSubWindow && phase == 'prelogin'"></prelogin>
      <login v-if="!isSubWindow && phase == 'login'"></login>
      <postlogin v-if="!isSubWindow && phase == 'postlogin'"></postlogin>
  </div>
</template>

<style scoped>

</style>

