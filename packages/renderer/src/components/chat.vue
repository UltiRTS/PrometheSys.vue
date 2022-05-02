<script>
export default {
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
    }
  },
  computed: {

    timeline() {
      if (this.chats.length === 0)
        return {}

      const res = []
      let cur = {
        username: '',
        chats: [],
      }
      let lastUser = ''
      lastUser = this.chats[0].username
      cur.username = lastUser
      cur.chats.push(this.chats[0].message)

      for (let i = 1; i < this.chats.length; i++) {
        // the same with last user
        if (this.chats[i].username === lastUser) {
          cur.chats.push(this.chats[i].message)
        }
        else {
          res.push(cur)
          cur = {
            username: this.chats[i].username,
            chats: [this.chats[i].message],
          }
          lastUser = this.chats[i].username
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
  },
}
</script>

<template>
  <div style='position:absolute;width:100%;height:100%;background:rgba(0,0,0,0.5)' />
  
    <button @click="pushMessage" style='display:none;'>
      push
    </button>
    <div style='display:none;'>bottom: {{ isBottom }}</div>

    <div ref="chats" id='chatContainer' @scroll="onscroll" style='left:3vw;background:grey;position:absolute;height:90%;width:90%;overflow-x:hidden;overflow-y:auto;top:1%;padding-top:2vh;padding-bottom:2vh;'>
      <div v-for="chat in timeline" :key="chat.username" id='chatBlock' style='margin-bottom:2.5%;position:relative;left:2%;'>
        
        <div id='userHeading' style='left:2%;margin:0;position:relative;margin-bottom:2%;'>
          {{ chat.username }}
        </div>
        <div id='userMsgs' style='left:2%;font-size:2vh;margin:0;height:100%;position:relative;'>
          <div v-for="message in chat.chats" :id="chat.username" :key="message" class="chat" style='margin:0;'>
            {{ message }}
          </div>
        </div>
        <div id='colorBlock' style='width:1%;height:110%;top:0;background:blue;margin:0;position:absolute;;'> </div>
      </div>
    </div>
  
</template>

<style scoped>

</style>

