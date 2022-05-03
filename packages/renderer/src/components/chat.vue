<script>
export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      chats: [
        {
          username: 'user1',
          message: 'hello',
        },
        {
          username: 'user1',
          message: 'hello',
        },
        {
          username: 'user1',
          message: 'hello',
        },
        {
          username: 'user2',
          message: 'world',
        },
        {
          username: 'user2',
          message: 'world',
        },
        {
          username: 'user1',
          message: 'hello',
        },
        {
          username: 'user3',
          message: 'hello',
        },
        {
          username: 'user3',
          message: 'hello',
        },
        {
          username: 'user3',
          message: 'hello',
        },
        {
          username: 'user3',
          message: 'hello',
        },
      ],
      isBottom: false,
      channels: ['general', 'room1'],
      current_channel: 'general',
      chatLog: [
        {
          author: 'sometwo',
          msg: 'msg1',
          chatName: 'general',
        },
        {
          author: 'someone',
          msg: 'msg2',
          chatName: 'room1',
        },
        {
          author: 'someone',
          msg: 'msg3',
          chatName: 'general',
        },
      ],
    }
  },
  computed: {

    timeline() {
      const res = []
      const filteredChats = this.chatLog.filter(chat => chat.chatName === this.current_channel)
      if (filteredChats.length === 0)
        return res

      let cur = {
        username: '',
        chats: [],
      }
      let lastUser = ''
      lastUser = filteredChats[0].author
      cur.username = lastUser
      cur.chats.push(filteredChats[0].msg)

      for (let i = 1; i < filteredChats.length; i++) {
        // the same with last user
        if (filteredChats[i].author === lastUser) {
          cur.chats.push(filteredChats[i].msg)
        }
        else {
          res.push(cur)
          cur = {
            username: filteredChats[i].author,
            chats: [filteredChats[i].msg],
          }
          lastUser = filteredChats[i].author
        }
      }
      res.push(cur)
      return res
    },
  },
  updated() {
    if (this.isBottom)
      this.$refs.chats.scrollTop = this.$refs.chats.scrollHeight
  },
  methods: {
    pushMessage() {
      this.moving = this.isBottom
      this.chats.push({
        username: 'pushUser',
        message: 'pushed',
      })
    },
    onscroll(ev) {
      const elem = ev.target
      if (elem.scrollHeight - elem.scrollTop === elem.clientHeight)
        this.isBottom = true
      else
        this.isBottom = false
    },
    onChangeChannel(ev) {
      const elem = ev.target
      window.console.log(ev.target)
      const channel = elem.innerText
      this.current_channel = channel
    },
  },
}
</script>

<template>
  <div style="position:absolute;width:100%;height:100%;background:rgba(0,0,0,0.5)" />

  <button style="display:none;" @click="pushMessage">
    push
  </button>
  <div style="display:none;">
    bottom: {{ isBottom }}
  </div>

  <div id="chatContainer" ref="chats" style="left:3vw;background:grey;position:absolute;height:90%;width:90%;overflow-x:hidden;overflow-y:auto;top:1%;padding-top:2vh;padding-bottom:2vh;" @scroll="onscroll">
    <div v-for="channel in channels" :key="channel" @click="onChangeChannel">
      {{ channel }}
    </div>

    <div v-for="chat in timeline" id="chatBlock" :key="chat.username" style="margin-bottom:2.5%;position:relative;left:2%;">
      <div id="userHeading" style="left:2%;margin:0;position:relative;margin-bottom:2%;">
        {{ chat.username }}
      </div>
      <div id="userMsgs" style="left:2%;font-size:2vh;margin:0;height:100%;position:relative;">
        <div v-for="message in chat.chats" :id="chat.username" :key="message" class="chat" style="margin:0;">
          {{ message }}
        </div>
      </div>
      <div id="colorBlock" style="width:1%;height:110%;top:0;background:blue;margin:0;position:absolute;;" />
    </div>
  </div>
</template>

<style scoped>

</style>

