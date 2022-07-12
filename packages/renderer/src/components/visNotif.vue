<script>

import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'

export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      msgBus: [{ Map: 'New map downloaded' }, { Campaign: '7-19 Unlocked' }],
      styleDict: {}, // msg id as key and their class as value

    }
  },
  computed: {
    ...mapState(useUserStore, ['newNotif']),
  },

  watch: {
    newNotif(newVal, oldVal) { // watch it
      console.log(newVal)
      const newDict = {}
      newDict[newVal.title] = newVal.msg
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
      this.styleDict[id] = 'killNotif'
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
    <div v-for="msg in msgBus" :key="msg" style="background:white; height:8vh;width:100%;position:relative;margin-top:2vh;">
      {{ Object.keys(msg)[0] }}
      {{ msg[Object.keys(msg)[0]] }}
    </div>
  </div>
</template>

<style scoped>

</style>

