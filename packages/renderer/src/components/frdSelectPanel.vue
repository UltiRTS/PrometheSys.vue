<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      recruiting: [],

    }
  },

  computed: {
    ...mapState(useUserStore, ['joinedGame', 'username', 'network', 'ui', 'userapi']),

    friendsOnline() {
      return this.network.userDetail.value.friendsOnline
    },
    friendsOffline() {
      return this.network.userDetail.value.friends.filter(n => !this.network.userDetail.value.friendsOnline.includes(n))
    },
    recruitableCount() {
      return this.network.userDetail.value.rglike.recruit_ticket
    },
    friendsInfo() {
      console.log(this.userapi.userInfoBulk.value)
      return this.userapi.userInfoBulk.value
    },

  },
  mounted() {
    this.userapi.getUInfoBulk(this.network.userDetail.value.friends)
  },
  updated() {

  },
  methods: {
    ...mapActions(useUserStore, ['setmainMenuContent', 'setmodalMenuContent', 'setactiveWindow', 'setAIorChicken', 'delAIorChicken', 'setTeam', 'specPlayer']),

    toggleRecruit(pName) {
      if (this.recruiting.includes(pName)) {
        this.recruiting = this.recruiting.filter((item) => {
          return item !== pName
        })
        return
      }
      if (this.recruiting.length > this.network.userDetail.value.rglike.recruit_ticket) {
        this.ui.pushUINewNotif({ title: 'RECRUIT', msg: 'SQUAD CAPACITY REACHED', class: 'abc' })
        return
      }
      this.recruiting.push(pName)
    },

    confirmRecruit() {
      for (const username in this.recruiting)
        this.network.ADV_RECRUIT(this.recruiting[username])
    },

    clearSelection() {
      this.recruiting = []
    },

  },
}
</script>

<template>
  <div style="position: absolute; height: 100%; width: 100%;" @click="clearSelection">
    <div class="bg" style="position:absolute;height:100%;width:100%;filter: drop-shadow(7px 11px 18px #fff);background: #f6ffff61; ">
      <div style="position:absolute;width: 37%;left: 1%;background:white;top: 6%;padding-left:4%;font-family: 'font4';mix-blend-mode:screen;opacity: 0.2;font-size: 1.3vw;">
        ENGINEERING SECTION
      </div>
      <div style="position:absolute;right:2%;width:42%;font-family:font5;filter: drop-shadow(16px 11px 13px #2196f3);" data-v-b86f4f80="">
        <div style="margin:1vw;padding:-1vw;text-align:center;font-size:1.5vw;background: #fff;color: #2196f3;" data-v-b86f4f80="" @click.stop="confirmRecruit">
          RECRUIT
        </div>
      </div>

      <div v-if="recruiting.length == 0" style="position:absolute;height: 2vw;left: 12%;width: 26vw; top: 69%;background: #ffffff;mix-blend-mode:screen;padding: 3vw;font-family:font5;opacity:0.5;">
        <div class="recruitingPanel1" style="position:absolute;font-size: 1.1vw;top: 20%;">
          EXPLORE/CHANGE
        </div><div class="recruitingPanel2" style="position:absolute;font-size: 3vw;top: 29%;">
          DEPLOYMENTS
        </div>
      </div>

      <div v-if="!recruiting.length == 0" style="position:absolute;height: 2vw;left: 12%;width: 26vw; top: 69%;background: #ffffff;mix-blend-mode:screen;padding: 3vw;font-family:font5;opacity:0.5;">
        <div class="recruitingPanel1" style="position:absolute;font-size: 1.1vw;top: 20%;">
          {{ recruiting.length }} out of {{ recruitableCount }}
        </div><div class="recruitingPanel2" style="position:absolute;font-size: 3vw;top: 29%;">
          SELECTED
        </div>
      </div>
    </div>
    <div v-if="friendsInfo" class="content" style="position: absolute; height: 78%; width: 80%; top: 19%; left: 3%; filter: drop-shadow(rgb(117, 117, 117) 7px 11px 18px); overflow: auto;padding-right: 12%;">
      <div v-for="(playerName, index) in friendsOnline" :key="playerName" class="individualPlayerTag tagAnime" style="position:relative;display:inline-block;background:#00000029;height:4vw;width:8vw;overflow:hidden;margin:1vw;" @click.stop="toggleRecruit(playerName)">
        <div class="deco" style="background:#2196f3;position:absolute;height:100%;right:0%;width:88%;">
          <img src="/imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div>
        <img :class="{checkIn: recruiting.includes(playerName), checkOut: !recruiting.includes(playerName)}" src="/imgs/checks.png" style="position: absolute;top: -5%;font-size: 3.7vw;color: white;width: 80%;cursor: pointer;filter:grayscale(100%) brightness(2);">
        <div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          {{ playerName }}
        </div>
        <div :class="{tagIn: !recruiting.includes(playerName), tagOut: recruiting.includes(playerName)}" style="position:absolute;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          ONLN
        </div>

        <div :class="{tagIn: recruiting.includes(playerName), tagOut: !recruiting.includes(playerName)}" style="position:absolute;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          RCUT
        </div>
        <div class="level" :class="{fadeOut: recruiting.includes(playerName), fadeIn: !recruiting.includes(playerName)}" style="position: absolute;font-size: 1.2vw;/* left: 12%; */color: white;font-family: font9;height:100%;width:100%;mix-blend-mode:screen;">
          <div v-if="friendsInfo[username]" style="position:absolute;top: 9%;left: 0%;font-size: 2.9vw;color: white;font-family: font9;">
            {{ friendsInfo[username].user.exp }}
          </div>
          <div style="position:absolute;top: 39%;left: 12%;font-size: 0.6vw;color:black;font-family:font1;background:white;border-style:solid;padding-left: 0.8vw;padding-right: 0.8vw;">
            level
          </div>
        </div>
        <div class="typographSpec" style="pointer-events: none; position:absolute;font-size:2.3vw;right:0%;color:#ffffff21;font-family:font9;">
          OPERATION
        </div>
      </div>

      <div v-for="(playerName, index) in friendsOffline" :key="playerName" class="individualSpecTag tagAnime" style="position:relative;display:inline-block;background:#00000029;height:4vw;width:8vw;overflow:hidden;margin:1vw;" @click.stop="toggleRecruit(playerName)">
        <div class="deco" style="background: #939393;position:absolute;height:100%;right:0%;width:88%;">
          <img src="/imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div>
        <img :class="{checkIn: recruiting.includes(playerName), checkOut: !recruiting.includes(playerName)}" src="/imgs/checks.png" style="position: absolute;top: -5%;font-size: 3.7vw;color: white;width: 80%;cursor: pointer;filter:grayscale(100%) brightness(2);">

        <div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          {{ playerName }}
        </div>
        <div :class="{tagIn: !recruiting.includes(playerName), tagOut: recruiting.includes(playerName)}" style="position:absolute;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          OFLN
        </div>
        <div :class="{tagIn: recruiting.includes(playerName), tagOut: !recruiting.includes(playerName)}" style="position:absolute;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          RCUT
        </div>
        <div class="level" :class="{fadeOut: recruiting.includes(playerName), fadeIn: !recruiting.includes(playerName)}" style="position: absolute;font-size: 1.2vw;/* left: 12%; */color: white;font-family: font9;height:100%;width:100%;mix-blend-mode:screen;">
          <div v-if="friendsInfo[username]" style="position:absolute;top: 9%;left: 0%;font-size: 2.9vw;color: white;font-family: font9;">
            {{ friendsInfo[username].user.exp }}
          </div>
          <div style="position:absolute;top: 39%;left: 12%;font-size: 0.6vw;color:black;font-family:font1;background:white;border-style:solid;padding-left: 0.8vw;padding-right: 0.8vw;">
            level
          </div>
        </div>
        <div class="typographSpec" style="pointer-events: none;position:absolute;font-size:2.3vw;right:0%;color:#ffffff21;font-family:font9;">
          OFFDUTY
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.fadeIn{
  animation-fill-mode: forwards;
  animation-name: fadeIn;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0.2s;
  opacity: 0.1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes fadeIn {

  0% {

    opacity: 0.1;
  }

  100% {

    opacity: 1;
  }
}

.fadeOut{
  animation-fill-mode: forwards;
  animation-name: fadeOut;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  opacity: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes fadeOut {

  0% {

    opacity: 1;
  }

  100% {

    opacity: 0.1;
  }
}

.recruitingPanel2{
  animation-fill-mode: forwards;
  animation-name: recruitingPanel2;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0.2s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes recruitingPanel2 {

  0% {
    left:12%;
    opacity: 0;
  }

  100% {
    left:15.5%;
    opacity: 1;
  }
}

.recruitingPanel1{
  animation-fill-mode: forwards;
  animation-name: recruitingPanel1;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0.4s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes recruitingPanel1 {

  0% {
    left:12%;
    opacity: 0;
  }

  100% {
    left:16%;
    opacity: 1;
  }
}

.tagAnime{
  animation-fill-mode: forwards;
  animation-name: tagAnime;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes tagAnime {

  0% {
    left:-5%;
    opacity: 0;
  }

  100% {
    left:0%;
    opacity: 1;
  }
}

.checkIn{
  animation-fill-mode: forwards;
  animation-name: checkIn;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0.2s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes checkIn {

  0% {
    left:-43%;
    opacity: 0;
  }

  100% {
    left:-23%;
    opacity: 1;
  }
}

.checkOut{
  animation-fill-mode: forwards;
  animation-name: checkOut;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  opacity: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes checkOut {

  0% {
    left:-23%;
    opacity: 1;
  }

  100% {
    left:-43%;
    opacity: 0;
  }
}

.typographSpec{
  animation-fill-mode: forwards;
  animation-name: typographSpec;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 1s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes typographSpec {

  0% {
    top:0%;
    opacity: 0;
  }

  100% {
    top:44%;
    opacity: 1;
  }
}

.tagIn{
  animation-fill-mode: forwards;
  animation-name: tagIn;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  top:0%;
}

@keyframes tagIn {

  0% {
    top:0%;
    opacity: 0;
  }

  100% {
    top:39%;
    opacity: 1;
  }
}

.tagOut{
  animation-fill-mode: forwards;
  animation-name: tagOut;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  top:39%;
}

@keyframes tagOut {

  0% {
    top:39%;
    opacity: 1;
  }

  100% {
    top:78%;
    opacity: 0;
  }
}

</style>

