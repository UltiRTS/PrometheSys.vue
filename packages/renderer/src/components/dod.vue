<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'

const uStore = useUserStore()

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(useUserStore, ['gameListing', 'joinedGame', 'mainMenuContent']),
  },

  updated() {
  },

  onMounted() {

  },

  methods: {
    ...mapActions(useUserStore, ['joinGame', 'pushGrabberAction']),
    addGame() {
      uStore.pushGrabberAction('AddGame')
    },
    emitJoinGameResult(roomTitle) {
      if (!joinedGame.value) {
        uStore.joinGame({
          gameName: roomTitle,
          password: 'test',
          mapID: 0,
        })
        return
      }
      if (roomTitle === joinedGame.value.title)
        this.mainMenuContent.value = 'dodPregame'
    },
  },
}
</script>

<template>
  <div style="filter: drop-shadow(rgba(255, 255, 255, 0.3) 128.3px 24px 123px); position: absolute; background: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 4%, rgba(179, 223, 255, 0.3) 7%, rgba(179, 223, 255, 0.3) 93%, rgba(0, 0, 0, 0.2) 96%); width: 104%; height: 88%; top: 5%; left: -2%;  padding-left: 2%; padding-right: 2%;">
    <div id="dodHeader" style="position:absolute;top:6%;left:5%;width:101vh;height:10%;background:#585858;filter:drop-shadow(rgba(0,0,0,0.7) 15px 22px 23px);color:white;overflow:hidden;">
      <i class="fa fa-coffee" aria-hidden="true" style="position:absolute;font-size:13vh;left:0%;opacity:16%;top:-6%;" /><i class="fa fa-caret-right" aria-hidden="true" style="position:absolute;font-size:7vh;left:50.7%;top:21%;transform:rotate(-45deg);" /><img src="imgs/horizontalSep1.png" style="width:13%;position:absolute;left:78%;/* opacity:16%;*/top:10%;transform:rotate(180deg);height:2%;opacity:50%;"><img src="imgs/horizontalSep1.png" style="width:13%;position:absolute;left:50%;top:49%;transform:rotate(90deg);height:2%;opacity:50%;"><i class="fa fa-square" aria-hidden="true" style="position:absolute;font-size:1vh;left:51.8%;top:10%;" /><i class="fa fa-square" aria-hidden="true" style="position:absolute;font-size:1vh;left:64%;top:42%;" /><div style="position:absolute;font-size:4vh;font-family:font5;top:1%;left:18.6%;">
        the
      </div><div style="position:absolute;font-size:2vh;font-family:font5;top:69%;left:1%;background:#ffffffad;color:black;padding-left:11.4%;padding-top:1%;padding-right:1%;">
        33 Operation Panelists Looking to Review
      </div><div style="position:absolute;font-size:3vh;font-family:font2;top:37%;left:18.7%;">
        Doctor's Desk
      </div><div style="position:absolute;font-size:6vh;font-family:font9;top:7%;left:0%;font-weight:900;">
        デスク
      </div><div style="position:absolute;font-size:3vh;font-family:'font1';top:10%;left:65.8%;">
        2029/01/13 17:00
      </div><div style="position:absolute;font-size:3vh;font-family:font6;top:35%;left:77.1%;">
        Updated
      </div>
      <div class="opDraft" style="position:absolute;font-size:3vh;font-family:'font5';top:61%;left:59.8%;padding-left:4vh;padding-right:0.5vh;cursor:pointer;" @click="addGame">
        Draft Proposal Now
      </div>
    </div>
    <div id="dodContent" style="position:absolute;top: 18%;height: 76%;background: transparent;width: 92%;left: 5%;">
      <div v-if="joinedGame" class="goBack" style="position:absolute;bottom:1%;font-size: 62vh;height: 76vh;width: 122vh;mix-blend-mode:screen;font-family: 'font9';" @click="emitJoinGameResult(joinedGame.title)">
        <i style="position:absolute;bottom: 23%;opacity: 0.05;" class="fa fa-exchange" aria-hidden="true"></i>
        <div style="position:absolute;font-size: 33vh;top: 28%;left: 28%;background: #4a5b66b8;color: #ffffff;opacity:0.2;font-family: 'font';">
          SN 2
        </div>

        <div style="position:absolute;bottom: 80%;font-size: 6vh;left: 45%;color: #ffffff40;font-weight:900;">
          Reversable Step
        </div><div style="position:absolute;bottom: 68%;font-size: 6vh;left: 55%;color: #ffffff87;font-weight:900;">
          AVAILABLE
        </div>
      </div>
      <div v-for="game in gameListing" :key="game" class="individualGameTag" style="display:inline-block;height: 9vw;width: 22vw;position:relative;filter: drop-shadow(rgba(0,0,0,0.3) 42px 33px 23px);font-size: 2vw;margin:2vw;" @click="emitJoinGameResult(game.title)">
        <div style="height: 100%;width: 2%;position:absolute;background: #ffffff24;font-size: 2vw;" />
        <div style="left: 8%; height: 100%;width: 100%;position:absolute;background: #ffffff24;font-size: 2vw;overflow:hidden;">
          <img src="imgs/dottedBg.png" style="position:absolute;top: -254%;left: -168%;width: 279%;opacity:40%;">
        </div>
        <div style="left: 8%; height: 100%;width: 100%;position:absolute;background: #ffffff24;font-size: 2vw;overflow:hidden;">
          <img src="imgs/minimapSample.png" style="position:absolute;filter: grayscale(99%);left: 0%;height:100%;opacity: 100%;-webkit-mask-image: linear-gradient(271deg,rgb(80 80 80 / 0%), rgb(74 255 74 / 100%));opacity: 0.6;">
        </div><i class="fa fa-users" aria-hidden="true" style="position:absolute;opacity:0.5;top: 74%;left: 82%;font-size:2vw;" />

        <div style="color:white;position:absolute;font-family: 'font2';top: 4%;left: 16%;width: 84%;height: 29%;overflow:hidden;">
          {{ game.title }}
        </div>
        <div style="color:white;position:absolute;font-family: 'font5';top: 27%;right: 1%;width: 85%;height: 29%;overflow:hidden;text-align:right">
          {{ game.mapId }}
        </div><div style="color:white;position:absolute;font-size:2vw;font-family:font1;top: 73%;left: 94%;">
          09
        </div><div style="background: #5c38227d;position:absolute;height:100%;width: 0.3%;top: 0%;left: 4%;" />
        <div style="display: inline;background:white;position: absolute;font-family: 'font9';top: 43%;left: 66%;width: 33%;height: 19%;overflow:hidden;opacity: 0.3;" />
      </div>
    </div>
    <img src="imgs/horizontalSep1.png" style="width: 19.6%;position:absolute;left:4%;top:-1%;transform:rotate(0deg);height: 0.2%;opacity:30%;">
    <img src="imgs/horizontalSep1.png" style="width: 19.6%;position:absolute;left: 77%;top: 101%;transform: rotate(180deg);height: 0.2%;opacity:30%;">
  </div>
</template>

<style scoped>
.opDraft{
  background:rgba(0,0,0,0);
}

.opDraft:hover{
  background:rgba(255,255,255,0.5);
}

.goBack{
  background:rgba(0,0,0,0);
  animation-fill-mode: forwards;
  animation-name: goBack;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0.4s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.goBack:hover{
  background:rgba(255,255,255,0.2);
  left:0;
  opacity: 1;
}

@keyframes goBack {

  0% {
    opacity: 0;
    left:-2%;
  }
  100% {
    opacity: 1;
    left:0;
  }
}
</style>

