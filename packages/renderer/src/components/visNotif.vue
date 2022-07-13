<script>

import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'

export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      msgBus: [{ title: 'aaa', msg: 'bbb', cssClass: 'default' }],
      msgLog: [],
    }
  },
  computed: {
    ...mapState(useUserStore, ['notifs']),
  },
  methods: {
    ...mapActions(useUserStore, ['pushUINewNotif']),
    pushMsg(msg) {
      this.msgLog.push(msg)
    },
  },
}
</script>

<template>
  <div style="position:absolute;right:0;background:black;width:30vh;height:100%;margin:0;top:0;overflow:auto;">
    <h1 style="color:white" @click="pushUINewNotif({title:'aaa',msg: 'vvv',})">
      pushNewNotif
    </h1>
    <div v-for="msg in notifs" :key="msg.title" class="default">
      <div>{{msg.title}}</div>
      <div>{{msg.msg}}</div>
    </div>
  </div>
</template>

<style scoped>
.default {
  color: white;
}
</style>

