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
  
  <button @click="pushMessage">
    push
  </button>
  <div>bottom: {{ isBottom }}</div>

  <div ref="chats" class="chat-container" @scroll="onscroll">
    <div v-for="chat in timeline" :key="chat.username" class="chats">
      <div class="avator">
        {{ chat.username }}
      </div>
      <div class="chat-wrapper">
        <div v-for="message in chat.chats" :id="chat.username" :key="message" class="chat">
          <div class="message">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avator {
  margin: 5%;
}
.chat-container {
  height: 20%;
  width: 20%;
  background-color: aqua;
  overflow-y: scroll;
}
.chats {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: antiquewhite;
  margin-bottom: 3%;
}
.avator {
  margin-right: 5%;
}
.chat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #eee;
  padding: 5px;
}
</style>

