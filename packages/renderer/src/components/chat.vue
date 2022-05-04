<script>
export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {

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

    // return the last message and author in a dict of every channel
    lastMsg() {
      const res = {}
      this.channels.forEach(channel => {
        const filteredChats = this.chatLog.filter(chat => chat.chatName === channel)
        if (filteredChats.length === 0)
          return res
        res[channel] = {
        },
        res[channel].author = filteredChats[filteredChats.length - 1].author
        res[channel].msg = filteredChats[filteredChats.length - 1].msg
      })
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

      this.current_channel = ev;
    },
  },
}
</script>

<template>
  <div style="position:absolute;width:100%;height:100%;background:rgba(0,0,0,0.5);" />
  <div id='channelContainer' style='position: absolute; right: 3%; font-size: 4vh; top: -4%; width: 10vw; height: 100%;'>
        <div v-for="channel in channels" :key="channel" :class='{channelTag:current_channel!=channel, channelTagActivated:current_channel==channel}' @click="onChangeChannel(channel)" style='position: relative; margin-bottom: 4vh; text-align: right; /* padding: 3vh; */ border-top-right-radius: 1vh; overflow: hidden; width: 134%; cursor: pointer;height: 5vh;'>
          <div style='position: absolute; color: white; font-size: 2vh; font-family: font6; text-align: right; left: 0px; width: 87%;top: 53%;'>{{lastMsg[channel].msg}}</div>
          <div style='font-family: font2; right: 0px; position: absolute; width: 100%; text-align: right; height: 100%; text-transform: uppercase; color: black; opacity: 0.2; font-weight: 900; padding-right: 1vw;top: 23.3%;top:-1vh;right:-5%;'>{{ channel }}</div>
          <i class="fa fa-times-circle chatClose" aria-hidden="true" style='cursor: crosshair;position:absolute;color:white;font-size:5vh;top:30%;right:-5%;'></i>

        </div>
  </div>

  <div id="chatContainer" ref="chats" style="left:3vw;position:absolute;height:90%;width:90%;overflow-x:hidden;overflow-y:auto;top:1%;padding-top:2vh;padding-bottom:2vh;color:white;" @scroll="onscroll">


    <div v-for="chat in timeline" id="chatBlock" :key="chat.username" style="margin-bottom:2.5%;position:relative;left:2%;">
      <div id="userHeading" style="left:2%;margin:0;position:relative;margin-bottom:2%;">
        {{ chat.username }}
      </div>
      <div id="userMsgs" style="left:2%;font-size:2vh;margin:0;height:100%;position:relative;">
        <div v-for="message in chat.chats" :id="chat.username" :key="message" class="chat" style="margin:0;">
          {{ message }}
        </div>
      </div>
      <div id="colorBlock" style="width:0.1%;height:110%;top:0;background:#2196f3;margin:0;position:absolute;" />
    </div>
  </div>

  <div id="typeBar" style="position: absolute; bottom: 0px; height: 7vh; background: rgb(86 86 86); color: white; width: 100%; filter: drop-shadow(rgba(0, 0, 0, 0.675) 7px 13px 6px); left: 0%;">
  <div class='send' style="position:absolute;height:100%;width: 8%;left: 1%;cursor:pointer;">
    <i class="fa fa-caret-right" style="font-size: min(7.2vh,3.9vw);color: #ffffff78;font-weight:900;left: 14%;top:0;position:absolute;" aria-hidden="true"></i>

    <span style="font-size: min(4vh,2.6vw);color: #74747417;font-weight:900;right:0;bottom:0;position:absolute;">送る</span>
  </div>
    <textarea style="position: absolute; color: white; width: 90%; height: 85%; padding: 0px; border-width: 0px; background: #ffffff00; resize: none; outline: none; right: 0%; margin: 0px; top: 7%;overflow:auto;font-family:font5;">At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.</textarea>
</div>
</template>

<style scoped>
  .chatClose{
    opacity:0.5;
  }
  .chatClose:hover{
    opacity:1;
    filter: drop-shadow(#fff 9px 18px 15px);
  }

  .channelTag{
    background: rgb(18, 82, 134);
    filter: drop-shadow(#000 9px 18px 15px);
  }

  .channelTag:hover{
    background:rgb(33, 150, 243);
    filter: drop-shadow(rgba(255, 255, 255, 0.175) 9px 18px 2px);
  }

  .channelTagActivated{
    background:rgb(33, 150, 243);
    filter: drop-shadow(rgba(255, 255, 255, 0.175) 9px 18px 2px);
  }

  .send{
    background: rgb(0 0 0 / 20%);
  }

  .send:hover{
    background: rgb(0 0 0 / 50%);
  }

</style>

