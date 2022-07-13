<script>

import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'

export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      msgBus: [{ title: 'aaa', msg: 'bbb', cssClass: 'default' }],

    }
  },
  computed: {
    ...mapState(useUserStore, ['newNotif']),
  },

  watch: {
    newNotif(newVal, oldVal) { // watch it
      console.log(newVal)
      const newDict = { title: newVal.title, msg: newVal.msg, cssClass: 'default' }
      this.msgBus.push(newDict)
      setTimeout(() => {
        this.preRemoveNotif(this.msgBus.length - 1)
      }, 5000) // start removing this notif 5 secs later
    },
  },

  updated() {

  },
  methods: {
    ...mapActions(useUserStore, ['pushUINewNotif']),
    preRemoveNotif(id) {
      this.msgBus[id].cssClass = 'killNotif'
      setTimeout(() => {
        this.msgBus.splice(id, 1) // really remove
      }, 1000)
    },

  },
}
</script>

<template>
  <div style="position:absolute;right:0;background:black;width:30vh;height:100%;margin:0;top:0;overflow:auto;">
    <h1 style="color:white" @click="pushUINewNotif({title:'aaa',msg: 'vvv',})">
      pushNewNotif
    </h1>
    <div v-for="msg in msgBus" :key="msg" :class="msg.cssClass" style="background:white; height:8vh;width:100%;position:relative;margin-top:2vh;">
      {{ msg.title }}
      {{ msg.msg }}
    </div>
  </div>
</template>

<style scoped>

</style>

