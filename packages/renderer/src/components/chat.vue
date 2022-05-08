<script>
import consola from 'consola'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
export default {
  // feed those
  props: ['chatLog'],
  data() {
    return {

      isBottom: false,
      // channels: ['general', 'room1'],
      current_channel: 'global',
      msg: '',
      unreadChannel: [],
    }
  },
  computed: {
    channels() {
      const res = []
      for (const chat of this.chatLog) {
        if (!res.includes(chat.chatName))
          res.push(chat.chatName)
      }
      consola.info(res)
      return res
    },

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

      // time in ms
      let lastTime, curTime
      for (let i = 1; i < filteredChats.length; i++) {
        // the same with last user
        if (filteredChats[i].author === lastUser) {
          curTime = filteredChats[i].timestamp
          // duration between two messages greater than 2min
          if ((curTime - lastTime) > 1000 * 60 * 2) {
            lastTime = curTime
            // console.log(curTime)
            cur.chats.push({
              msg: filteredChats[i].msg,
              timestring: new Date(curTime).toISOString().slice(11, -8),
            })
          }
          else {
            cur.chats.push({
              msg: filteredChats[i].msg,
              timestring: '',
            })
          }
        }
        else {
          if (i !== 0)
            res.push(cur)

          curTime = filteredChats[i].timestamp
          cur = {
            username: filteredChats[i].author,
            chats: [
              {
                msg: filteredChats[i].msg,
                timestring: new Date(curTime).toISOString().slice(11, -8),
              }],
          }
          lastUser = filteredChats[i].author
          lastTime = filteredChats[i].timestamp
        }
        // consola.info(curTime)
      }
      res.push(cur)
      return res
    },

    // return the last message and author in a dict of every channel
    lastMsg() {
      const res = {}
      for (const channel of this.channels) {
        const filteredChats = this.chatLog.filter(chat => chat.chatName === channel)
        if (filteredChats.length === 0) {
          res[channel] = {
            author: '',
            msg: '',
          }
          continue
        }

        res[channel] = {
          author: filteredChats[filteredChats.length - 1].author,
          msg: filteredChats[filteredChats.length - 1].msg,
        }
      }

      return res
    },
  },
  watch: {
    chatLog(newVal, oldVal) { // watch it
      this.unreadChannel.push(this.newVal.slice(-1).chatName)
    },
  },

  updated() {
    if (this.isBottom)
      this.$refs.chats.scrollTop = this.$refs.chats.scrollHeight
  },
  methods: {
    ...mapActions(useUserStore, ['joinChat', 'sayChat']),
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
      this.current_channel = ev
      // remove this channel from this.updatedChat
      this.lastUpdatedChannels = this.lastUpdatedChannels.filter(chat => chat.chatName !== ev)
    },
    // parent must provide sayChat interface
    sendMessage() {
      consola.info(this.msg)
      this.sayChat({
        chatName: this.current_channel,
        msg: this.msg,
      })
    },
  },
}
</script>

<template>
  <div style="position:absolute;width:100%;height:100%;background:rgba(0,0,0,0.5);" />

  <div id="chatContainer" ref="chats" style="left:3vw;position:absolute;height:90%;width:90%;overflow-x:hidden;overflow-y:auto;top:1%;padding-top:2vh;padding-bottom:2vh;color:white;" @scroll="onscroll">
    <div v-for="chat in timeline" id="chatBlock" :key="chat.username" style="margin-bottom: 2.5%; position: relative; left: 2%;">
      <div id="userHeading" style="left: 2%; margin: 0px 0px 4%; position: relative; font-size: 6vh; font-family: font10; color: rgb(33, 150, 243); height: 7.3vh;overflow:hidden;">
        <div style="opacity: 0.4; margin-right: 2vh; font-weight: 700;width: 16.8vw;overflow:hidden;position:relative;">
          {{ chat.username }}
        </div>
        <div id="userRank" style="position: absolute;top:0; padding-top: 3vh; padding-left: 6vh; color: white; background: rgba(255, 255, 255, 0.1); font-size: 2vh; font-family: font9; font-weight: 400;right: 25%;">
          Thea Pharmaceuticals Inc.
        </div>
      </div>

      <div id="userMsgs" style="left:2%;font-size:2vh;height:100%;position:relative;font-family:font5;">
        <div v-for="message in chat.chats" :id="chat.username" :key="message" class="chat" style="margin:0;">
          {{ message.msg }}
        </div>
      </div>
      <div id="colorBlock" style="width:0.1%;height:110%;top:0;background:#2196f3;margin:0;position:absolute;" />

      <div id="timeBlk" style="position:absolute;right:4%;font-size: 3.7vh;font-family:font3;font-weight:900;opacity:0.5;bottom:0;/* height:4vh; */">
        {{ chat.chats[0].timestring }} <br>PM
      </div>
    </div>
  </div>

  <div id="chatDetail" style="color: white; font-size: 3vh; top: 22%; left: 1%; position: absolute; font-family: font2; width: 100%; height: 65vh; overflow: hidden; opacity: 0.07;">
    <span style="color: white; font-size: 7vh; top: 58%; left: 13vh; position: absolute; font-family: font2;">{{ current_channel }}</span>
    <span style="background:white;color: black; font-size: 4.8vh; top: 70%; left: 13vh; position: absolute; font-family: font4; font-weight: 900;">channelTopic</span>
    <img src="public/imgs/thea_frame.png" style="color: white; font-size: 4vh; top: 57%; left: -6vh; position: absolute; font-family: font2; width: 34vh;">
  </div>

  <div id="typeBar" style="position: absolute; bottom: 0px; height: 7vh; background: rgb(86 86 86); color: white; width: 100%; filter: drop-shadow(rgba(0, 0, 0, 0.675) 7px 13px 6px); left: 0%;">
    <div class="send" style="position:absolute;height:100%;width: 8%;left: 1%;cursor:pointer;" @click="sendMessage">
      <i class="fa fa-caret-right" style="font-size: min(7.2vh,3.9vw);color: #ffffff78;font-weight:900;left: 14%;top:0;position:absolute;" aria-hidden="true" />

      <span style="font-size: min(4vh,2.6vw);color: #74747417;font-weight:900;right:0;bottom:0;position:absolute;">送る</span>
    </div>
    <textarea v-model="msg" style="position: absolute; color: white; width: 90%; height: 85%; padding: 0px; border-width: 0px; background: #ffffff00; resize: none; outline: none; right: 0%; margin: 0px; top: 7%;overflow:auto;font-family:font5;">{ msg }</textarea>
  </div>

  <div id="channelContainer" style="position: absolute; right: 3%; font-size: 4vh; top: -4%; width: 10vw; height: 100%;">
    <div v-for="channel in channels" :key="channel" :class="{channelTag:current_channel!=channel, channelTagActivated:current_channel==channel}" style="position: relative; margin-bottom: 4vh; text-align: right; /* padding: 3vh; */ border-top-right-radius: 1vh; overflow: hidden; width: 134%; cursor: pointer;height: 5vh;" @click="onChangeChannel(channel)">
      <div style="position: absolute; color: white; font-size: 2vh; font-family: font6; text-align: right; left: 0px; width: 87%;top: 53%;">
        {{ lastMsg[channel].msg }}
      </div>
      <div style="font-family: font2; right: 0px; position: absolute; width: 100%; text-align: right; height: 100%; text-transform: uppercase; color: black; opacity: 0.2; font-weight: 900; padding-right: 1vw;top: 23.3%;top:-1vh;right:-5%;">
        {{ channel }}
      </div>
      <i class="fa fa-times-circle chatClose" aria-hidden="true" style="cursor: crosshair;position:absolute;color:white;font-size:5vh;top:30%;right:-5%;" />
      <gem v-if="unreadChannel.includes(channel)" />
    </div>
  </div>

  <div id="channelAdd" class="channelAdd" style="position: absolute; right: -3%; font-size: 4vh; top: 84%; width: 13vw; height: 6%; background: white;cursor:pointer;overflow:hidden;">
    <div style="position: absolute; color: black; font-size: 2vh; font-family: font6; text-align: right; left: 0px; width: 87%;top: 53%;">
      Add a Chat
    </div>
    <div style="font-family: font2; right: 0px; position: absolute; width: 100%; text-align: right; height: 100%; text-transform: uppercase; color: black; opacity: 0.2; font-weight: 900; padding-right: 1vw;top: 23.3%;top:-1vh;right:-5%;">
      追加
    </div>
    <i class="fa fa-plus-circle" aria-hidden="true" style="position:absolute;color:rgba(0,0,0,0.8);font-size:5vh;top:30%;right:-5%;" />
  </div>
</template>

<style scoped>
.channelAdd{
  opacity:0.3;
  filter: drop-shadow(#000 9px 18px 15px);
}
.channelAdd:hover{
  opacity:1;
  filter: drop-shadow(rgba(255, 255, 255, 0.175) 9px 18px 2px);
}
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

