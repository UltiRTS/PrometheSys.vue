<script>
/* eslint-disable vue/first-attribute-linebreak */
/* eslint-disable vue/html-self-closing */

import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
import rglike from '../components/rglike.vue'
import FrdSelectPanel from '../components/frdSelectPanel.vue'
// import dodPGameTeam from '../components/dodPGameTeam.vue'

export default {
  components: { rglike, FrdSelectPanel },
  // components: { dodPGameTeam },
  data() {
    return {

      mouseOn: 'default',
      mousePosX: 0,
      mousePosY: 0,
    }
  },
  computed: {
    ...mapState(useUserStore, ['joinedGame', 'mainMenuContent', 'modalMenuContent', 'activeWindow', 'network', 'ui', 'musicPlayer']),
    shouldIlightUpModal() {
      if (this.activeWindow === 'modal')
        return 1

      else if (this.mouseOn === 'modal')
        return 0.7

      else
        return 0.6
    },

    shouldIlightUpMenu() {
      if (this.activeWindow === 'menu')
        return 1

      else if (this.mouseOn === 'menu')
        return 0.9

      else
        return 0.8
    },
    dynamicMouseX() {
      return 3 * this.mousePosX
    },
    dynamicMouseY() {
      return 3 * this.mousePosY
    },
  },
  watch: {
    joinedGame(newVal, oldVal) { // watch it
      if (newVal != null)
        this.setmainMenuContent('dodPregame')

      else
        this.setmainMenuContent('dod')

      // console.log('joinedGame changed')
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions(useUserStore, ['setmainMenuContent', 'setmodalMenuContent', 'setactiveWindow']),

    activateModal() {
      this.setactiveWindow('modal')
    },

    activateMenu() {
      this.setactiveWindow('menu')
    },

    activateDefault() {
      this.setmodalMenuContent('chat')
      this.setactiveWindow('default')
    },
    toggleSoundFast() {
      this.musicPlayer.toggleSound()
    },
    mouseMove(e) {
      this.mousePosX = -e.clientX / this.$refs.home.clientWidth - 0.5
      this.mousePosY = -e.clientY / this.$refs.home.clientHeight - 0.5
    },

  },

}
</script>

<template>
  <div id="bg" style="top: 0%; position: fixed; width: 100%; height: 100%; background: black;left:0;">
    <img id="bgPic" alt="background" src="/imgs/replaceThisBgPlz.png" style="position: fixed; top: 0px; left: 0px; height:100%;opacity: 100%;">
    <div id="mask" style="position:absolute;top:0;left:0;width:100%;height:100%;background: radial-gradient(#00000014 13%, #000000 67%);">
    </div>
  </div>
  <div id="home" ref="home" data-depth="2" style="perspective: 500vw; backface-visibility: hidden; position: absolute;height: 100%;width: 100%;top: 0px;left: 0px;overflow:hidden;margin:0;" @mousemove="mouseMove">
    <div id="homeUIContainer" :class="activeWindow" style="perspective: 100vw; position: absolute; height: 100%; width: 100%; display: block; left: 0px; top: 0px;">
      <div id="mainContent" style="transform: translateZ(0vw); position: absolute; color: white; width: 181%; height: 181%; top: -39%; left: -18%;" @click="activateDefault">
        <div id="mainMask" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background: radial-gradient(rgba(179, 223, 255, 0.58) 0%, rgba(41, 51, 52, 0.5) 73%, rgba(0, 0, 0, 0.05) 81%); backdrop-filter: blur(5px);">
        </div>
        <dod v-if="mainMenuContent == 'dod'" />
        <dodPregame v-if="joinedGame && mainMenuContent == 'dodPregame'" />
        <home :visible="mainMenuContent == 'home'" />
        <sys-email v-if="mainMenuContent == 'email'" />
        <rglike v-if="mainMenuContent == 'rglike'" />
      </div>
      <div id="modalMenu" :style="{ opacity: shouldIlightUpModal }" style="transform: rotateY(15.6deg) translateZ(10vw) translateX(-55vw); top: 5%;width: 56%; height: 84%; position: absolute; backdrop-filter: blur(5px);" @click="activateModal" @mouseover="mouseOn = &quot;modal&quot;" @mouseleave="mouseOn = 'default'">
        <FrdSelectPanel v-if="modalMenuContent == 'FrdSelectPanel'" />
        <Chat v-if="modalMenuContent == 'chat'" />
        <dod-p-game-team v-if="modalMenuContent == 'dod-p-game-team'" />
        <dod-p-game-map v-if="modalMenuContent == 'dodPGameMap'" />
        <dod-p-game-mutator v-if="modalMenuContent == 'dodPGameMutator'" />
      </div>
      <div id="rightHome" class="rightHome" :style="{ opacity: shouldIlightUpMenu }" style="transform:rotateY(-15.6deg) translateZ(-283vh) translateX(380vh); width: 200vh; height: 102%; position: absolute; backdrop-filter: blur(5px);top: -41%;filter: drop-shadow(rgba(0, 0, 0, 0.2) 18px 25px 15px);right:-2vw;" @click="activateMenu" @mouseover="mouseOn = &quot;menu&quot;" @mouseleave="mouseOn = 'default'">
        <img src="/imgs/horizontalSep1.png" style="position:absolute;top:-1%;height: 5px;width: 93%;opacity:0.3;">

        <div data-v-6fa0e716="" style="position: absolute;height: 6%;width: 93%;background: rgb(191 191 191 / 59%);top: 0%;padding: 2%;font-family: font9;">
          <div id="sysStatusPing" data-v-6fa0e716="" style="font-size: 3vh;color: rgb(0 0 0 / 55%);left: 33.5%;position:absolute;top: 24%;background: #ffffffa3;padding-left: 3%;padding-right:1%;height: 21%;filter: drop-shadow(19px 17px 12px rgba(0,0,0,0.5));width:3.4%;">
            {{ parseInt(parseInt(network.clientHP.value) / 3 * 100) }}%
          </div>
          <i class="fa fa-sitemap" aria-hidden="true" data-v-6fa0e716="" style="font-size: 10vh;color: rgba(255, 255, 255, 0.55);left: 3%;position:absolute;filter: drop-shadow(19px 17px 12px rgba(0,0,0,0.5));"></i><span id="sysStatusInt" data-v-6fa0e716="" style="font-size: 4vh;color: rgba(255, 255, 255, 0.55);left: 10%;position:absolute;">Neural
            Connectivity</span><span data-v-6fa0e716="" style="font-size: 5vh;color: rgba(255, 255, 255, 0.55);left: 10%;position:absolute;top: 43%;">{{ new Date().toJSON() }}</span><i class="fa fa-tasks" aria-hidden="true" data-v-6fa0e716="" style="font-size: 10vh;color: rgba(255, 255, 255, 0.55);left: 48%;position:absolute;filter: drop-shadow(19px 17px 12px rgba(0,0,0,0.5));"></i><i class="fa fa-volume-up" aria-hidden="true" data-v-6fa0e716="" style="font-size: 3vh;color: rgba(255, 255, 255, 0.55);left: 55.3%;position:absolute;top: 53%;filter: drop-shadow(19px 17px 12px rgba(0,0,0,0.5));" @click="toggleSoundFast"></i>
          <span id="sysStatusUsr" data-v-6fa0e716="" style="font-size: 5vh;color: rgba(255, 255, 255, 0.55);left: 55%;position:absolute;">Dr. {{
            network.username.value
          }}</span>
        </div>

        <div style="overflow:hidden;top:11%;position:absolute;height:100%;width:100%;">
          <div id="" class="ttblock3" style="position:absolute;width:25%;left:-12.5%;transform: skew(20deg);height:100%;" />
          <div id="" class="ttblock" style="position:absolute;width:25%;left:12.5%;      transform: skew(20deg);height:100%;" />
          <div id="" class="ttblock2" style="position:absolute;width:25%;left:37.5%;      transform: skew(20deg);height:100%;" />
          <div id="" class="ttblock" style="position:absolute;width:25%;left:62.5%;      transform: skew(20deg);height:100%;" />
          <div id="" class="ttblock3" style="position:absolute;width:25%;left:87.5%;        transform: skew(20deg);height:100%;" />
        </div>

        <div class="sanity rightHomeMainBtns" style="cursor:pointer;top:11%;position:absolute;height:25%;width:45%;background: rgb(177 182 183);" @click="ui.setmainMenuContent('home')">
          <div style="position:absolute;width: 50.1%;left: 11%;font-size: 10vw;overflow:hidden;height:100%;">
            <p style="position:absolute;width:93.7%;background: #606060;color: #d1d1d1;font-size: 5vh;bottom: 3%;padding-top:5%;padding-bottom:5%;text-align:right;padding-right:4%;filter:drop-shadow(8px 6px 6px rgba(50,50,50,0.9));font-family: font2;font-weight:900;">
              SANITY
            </p>
            <i class="fa fa-bolt" aria-hidden="true" style="position:absolute;top: 23%;left:3%;color:#949494fa;font-size: 24vh;" />
            <span style="position:absolute;top: 28%;left: 48%;font-size: 13vh;color: #565656;filter: drop-shadow(8px 11px 8px rgba(0,0,0,0.5));font-family: font9;">125</span>
          </div>

          <div style="position:absolute;width: 23%;height: 100%;left: 63%;font-size: 10vw;overflow:hidden;">
            <span style="position:absolute;top: 37%;font-size: 9vh;color: #0000005c;width:88.5%;text-align:right;filter:drop-shadow(8px 6px 6px black);font-family: font1;">/240</span><i class="fa fa-plus" aria-hidden="true" style="position:absolute;top: 61.2%;font-size: 8vh;background: #606060;color: #d1d1d1b8;width:91%;text-align:center;padding-top: 7.3%;padding-bottom: 3.8%;filter:drop-shadow(8px 6px 6px rgba(50,50,50,0.9));" />
          </div>
        </div>

        <div class="personalStats rightHomeMainBtns" style="display:none; position:absolute;height:25%;width: 53%;background:rgba(255,255,255,0.5);left: 44.9%;top:11%;">
          <div style="position:absolute;width: 36%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 6vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              戦い
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 2.8vw;background: #00000045;color: #ffffff73;padding: 5.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              BATTLE
            </p>
          </div>
          <div style="position:absolute;width: 48%;right: 6%;overflow:hidden;height:100%;">
            <i class="fa fa-gg" aria-hidden="true" style="position:absolute;font-weight:900;font-size: 21vw;color: #0000000d;left: -1%;" />

            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 6%;line-height: 2vw;font-weight:900;">
              Paradox Simulation
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 27%;line-height: 2vw;font-weight:900;">
              PROMOTED: leader
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 50%;line-height: 2vw;font-weight:900;">
              Lone Journey
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 62%;line-height: 2vw;font-weight:900;">
              floor 3, stage 41
            </p>
            <div style="position:absolute;height: 9px;background:#2196f3;width:100%;bottom:0%;" />
          </div>
        </div>

        <div class="commander rightHomeMainBtns" style="display:none; position:absolute;height: 19%;width: 53%;background: rgb(177 182 183);top: 39%;overflow:hidden;">
          <div style="position:absolute;width: 55%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 37%;font-size: 6vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              司令
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;background: #00000045;color: #ffffff73;padding: 4.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              COMMANDANT
            </p>
          </div>
          <div style="position:absolute;width: 51%;right: 0%;overflow:hidden;height:100%;">
            <i class="fa fa-graduation-cap" aria-hidden="true" style="position:absolute;font-size: 16vw;color: #0000000d;left: 32%;" />

            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 6%;line-height: 2vw;font-weight:900;right: 5%;">
              Primary Commander
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 27%;line-height: 2vw;font-weight:900;right: 5%;">
              Guardian
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 50%;line-height: 2vw;font-weight:900;right: 5%;">
              Commander Configs
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 74%;line-height: 2vw;font-weight:900;right: 5%;">
              Rifle, Heavy Machine Guns
            </p>
            <div style="position:absolute;height: 9px;background:#2196f3;width:100%;bottom:0%;" />
          </div>
        </div>

        <div class="taskForce rightHomeMainBtns" style="display:none; position:absolute;height: 19%;width: 36%;background:rgba(255,255,255,0.5);left: 53.9%;top: 39%;overflow:hidden;">
          <div style="position:absolute;width: 46%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 6vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              軍
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;background: #00000045;color: #ffffff73;padding: 5.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              TASKFORCE
            </p>
          </div>
          <div style="position:absolute;width: 48%;right: -7%;overflow:hidden;height:100%;">
            <i class="fa fa-users" aria-hidden="true" style="position:absolute;font-size: 10vw;color: #0000000d;left: 15%;top: 16%;" />

            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 6%;line-height: 2vw;font-weight:900;">
              Primary Squad
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 31%;line-height: 2vw;font-weight:900;">
              Jump Jets
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 53%;line-height: 2vw;font-weight:900;">
              Squad Members
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 77%;line-height: 2vw;font-weight:900;">
              Edit Members
            </p>
            <div style="position:absolute;height: 9px;background:#2196f3;width:100%;bottom:0%;" />
          </div>
        </div>

        <div class="forum rightHomeMainBtns" style="display:none; position:absolute;height: 19%;width: 30%;background: #2196f3;left: -0.1%;top: 60%;">
          <div style="position:absolute;width: 100%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 3vw;font-weight:900;color: #ffffffad;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.5));">
              フォーラム
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;font-weight:900;background: #ffffff82;color: #2196f3;padding: 4.1%;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.9));">
              FORUMS
            </p>
          </div>

          <i class="fa fa-comments-o" aria-hidden="true" style="position:absolute;font-size: 10vw;color: #ffffff0d;left: 65%;top: 16%;" />
        </div>

        <div class="moderationNaccount rightHomeMainBtns" style="display:none; position:absolute;height: 19%;width: 64%;background: #2196f3;left: 30.9%;top: 60%;overflow:hidden;">
          <div style="position:absolute;width: 33%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 3vw;font-weight:900;color: #ffffffad;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.5));">
              節度
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;font-weight:900;background: #ffffff82;color: #2196f3;padding: 4.1%;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.9));">
              Moderation
            </p>
            <i class="fa fa-book" aria-hidden="true" style="position:absolute;font-size: 10vw;color: #ffffff0d;left: 52%;top: 26%;" />
          </div>
          <img src="/imgs/separator.png" style="position:absolute;left: 43%;height:100%;width:4px;opacity: 50%;">

          <div style="position:absolute;width: 41%;height:100%;left: 51%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 3vw;font-weight:900;color: #ffffffad;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.5));">
              プロフィール
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;font-weight:900;background: #ffffff82;color: #2196f3;padding: 3.1%;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.9));">
              Account Management
            </p>

            <i class="fa fa-wrench" aria-hidden="true" style="position:absolute;font-size: 10vw;color: #ffffff0d;left: 58%;top: 20%;" />
          </div>
        </div>

        <div class="warehouse rightHomeMainBtns" style="display:none; position:absolute;height: 19%;width: 34%;background:rgba(255,255,255,0.5);left: -0.1%;top: 81%;">
          <div style="position:absolute;width: 100%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 4vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              ストレージ
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;background: #00000045;color: #ffffff73;padding: 3.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              STORAGE
            </p>
          </div>
          <i class="fa fa-home" aria-hidden="true" style="position:absolute;font-size: 10vw;color: #0000000d;left: 74%;top: 16%;" />
        </div>

        <div class="researchCenter rightHomeMainBtns" style="display:none; position:absolute;height: 19%;width: 34%;background:rgba(255,255,255,0.5);left: 34.9%;top: 81%;">
          <div style="position:absolute;width: 100%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 4vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              リサーチ
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;background: #00000045;color: #ffffff73;padding: 3.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              RESEARCH
            </p>
          </div>
          <i class="fa fa-flask" aria-hidden="true" style="position:absolute;font-size: 10vw;color: #0000000d;left: 74%;top: 16%;" />
        </div>

        <div class="email rightHomeMainBtns" style="position:absolute;height:19%;width:34%;background:rgba(255,255,255,0.5);left:69.9%;top:81%;cursor:pointer;" @click="ui.setmainMenuContent('email')">
          <div style="position:absolute;width:100%;height:100%;left:9%;overflow:hidden;">
            <p style="position: absolute; top: -6%; font-size: 8vh; font-weight: 900; color: rgba(58, 58, 58, 0.9); filter: drop-shadow(rgba(50, 50, 50, 0.5) 8px 6px 6px);">
              メイル
            </p>
            <p style="position: absolute; top: 42.7%; font-size: 6vh; background: #606060;color: #d1d1d1; padding: 3.1%; filter: drop-shadow(rgba(50, 50, 50, 0.9) 8px 6px 6px);font-family: font10;">
              EMAIL
            </p>
          </div><i class="fa fa-globe" aria-hidden="true" style="position: absolute; font-size: 31vh; color: rgba(0, 0, 0, 0.05); left: 36%; top: 38%;"></i>
        </div>

        <img src="/imgs/horizontalSep2.png" style="position:absolute;top: 101%;height: 5px;width: 93%;opacity:0.3;">
      </div>
    </div>
    <div id="visualOverlay">
      <div :style="{transform: `rotateX(${dynamicMouseX}deg) rotateY(${dynamicMouseY}deg)`, position:'absolute', left:'0',top:'0',height:'100%',width:'100%','pointer-events': 'none',filter:'drop-shadow(7px 13px 8px rgba(100,100,100,0.4))',}">
        <visUserInfo />
      </div>
      <InputGrabber />
      <visNotif />
      <visLoading />
      <visConfirmation />
    </div>
  </div>
</template>

<style scoped>
.rightHome {

  animation-fill-mode: forwards;
  animation-name: homeAnime;
  animation-duration: 0.7s;
  animation-iteration-count: 1;

  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);

}

@keyframes homeAnime {

  0% {
    height: 0%;
  }

  100% {
    height: 172%;
  }
}

.rightHomeMainBtns {

  animation-fill-mode: forwards;
  animation-name: rightHomeMainBtns;
  animation-duration: 0.7s;
  animation-iteration-count: 1;
  animation-delay: 1s;
  opacity: 0;

}

@keyframes rightHomeMainBtns {

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.ttblock {
  opacity: 1;
  animation-fill-mode: forwards;
  animation-name: ttblock;
  animation-duration: 0.35s;
  animation-iteration-count: 1;
  animation-delay: 0.5s;
}

.ttblock2 {
  opacity: 1;
  animation-fill-mode: forwards;
  animation-name: ttblock;
  animation-duration: 0.35s;
  animation-iteration-count: 1;
  animation-delay: 0.6s;
}

.ttblock3 {
  opacity: 1;
  animation-fill-mode: forwards;
  animation-name: ttblock;
  animation-duration: 0.35s;
  animation-iteration-count: 1;
  animation-delay: 0.7s;

}

@keyframes ttblock {
  0% {
    background: rgba(255, 255, 255, 0)
  }

  25% {
    background: rgba(255, 255, 255, 1)
  }

  50% {
    background: rgba(255, 255, 255, 0)
  }

  51% {
    background: rgba(0, 0, 0, 0)
  }

  95% {
    background: rgba(0, 0, 0, 0.5)
  }

  99% {
    background: rgba(0, 0, 0, 0)
  }

  100% {
    opacity: 0;
  }
}

.default {
  animation-fill-mode: forwards;
  animation-name: homeUIContainerDefault;
  animation-duration: 0.7s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}

@keyframes homeUIContainerDefault {
  0% {}

  100% {
    transform: rotateY(3deg) translateZ(-376vw) translateX(0vw);
  }
}

.menu {
  animation-fill-mode: forwards;
  animation-name: homeUIContainerRight;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  transform: rotateY(0deg) translateZ(-197vw) translateX(-17vw);
}

@keyframes homeUIContainerRight {
  0% {
    transform: rotateY(3deg) translateZ(-376vw) translateX(0vw);
  }

  100% {
    transform: rotateY(10.3deg) translateZ(-381vw) translateX(0vw)
  }
}

.modal {
  transform: rotateY(0deg) translateZ(-197vw) translateX(-17vw);
  animation-fill-mode: forwards;
  animation-name: homeUIContainerLeft;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}

@keyframes homeUIContainerLeft {
  0% {
    transform: rotateY(3deg) translateZ(-376vw) translateX(0vw);
  }

  100% {
    transform: rotateY(-8deg) translateZ(-381vw) translateX(0vw);
  }
}
</style>
