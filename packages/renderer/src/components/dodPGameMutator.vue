<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      firstRun: true,
      pickedMod: 0,
    }
  },
  computed: {
    ...mapState(useUserStore, ['network']),
    focusedTag() {
      if (this.firstRun) {
        switch (this.network.joinedGame.value.mod) {
          case 'mod.sdd':
            return 1
          case 'arena.sdd':
            return 2
          case 'unitlevelup.sdd':
            return 3
          default:
            return 3
        }
      }

      return this.pickedMod
    },

  },

  updated() {

  },
  methods: {
    setMod(modName) {
      switch (modName) {
        case 1:
          this.network.setMod({ mod: 'mod.sdd' })
          return
        case 2:
          this.network.setMod({ mod: 'arena.sdd' })
          return
        case 3:
          this.network.setMod({ mod: 'unitlevelup.sdd' })
          return
        default:
          this.network.setMod({ mod: 'mod.sdd' })
      }
    },
    makefocus(id) {
      this.firstRun = false
      this.pickedMod = id
    },
  },
}
</script>

<template>
  <div v-if="network.joinedGame" style="position: absolute; height: 100%; width: 100%; background: rgb(33, 150, 243); top: 0%; left: 0px; overflow: hidden; filter: drop-shadow(rgba(0, 0, 0, 0.5) 21px 27px 2.4vh); perspective: 20vh;">
    <img src="/imgs/bg.png" style="position:absolute;top:-163%;left:-299%;height:368%;filter:grayscale(100%) invert(0%) contrast(424%) brightness(1);mix-blend-mode:multiply;"><div id="opDefBg" style="position:absolute;top:0;left:0;height:100%;width:100%;transform:rotateY(-1deg) translateZ(5vw) translateX(0vw);">
      <img src="/imgs/grid.png" style="position:absolute;top:-41vh;left:-8%;height:184%;filter:drop-shadow(-16px 13px 2px #fff) sepia(100%) saturate(100) hue-rotate(121deg);transform:rotate(335deg);opacity:0.5;"><div style="position:absolute;border-radius:50%;background:white;top:-126%;left:30%;height:46vh;width:80%;filter:drop-shadow(rgb(255, 255, 255) 0vh 96vh 24vh);"></div><img src="/imgs/thea_auth.png" style="position:absolute;top:12vh;left:17%;height:36%;filter:invert(0%) contrast(506%) hue-rotate(53deg) brightness(0.8) drop-shadow(rgb(0, 0, 0) -10px 8px 0.4vh);transform:rotate(-26deg);">

      <div style="width:100%;position: absolute; top: 42%; right: 20%; color: white; filter: drop-shadow(rgb(0, 0, 0) -13px 8px 0.4vh); font-size: 10vh; transform: rotate(-26deg); background: -webkit-linear-gradient(246deg, rgb(237 237 237) -14%, rgb(221 221 221) 22%, rgb(108 108 108) 100%);  -webkit-background-clip: text;-webkit-text-fill-color: transparent; width: 85%; font-weight: 100; font-family: font5; text-align: right;">
        <div style="font-family:font4;">
          {{ focusedTag }}
        </div> OPERATIONAL<br> DEFNITION
      </div>
    </div>
    <div class="optionCard" style="position:absolute;top:0;left:0;width:100%;height:100%;">
      <div v-if="focusedTag == 1" class="selected" style="position:absolute;top:15vh;left:0.4vw;height:67vh;width:15vw;overflow:hidden;">
        <img src="/imgs/miniWhiteBtn.png" style="position:absolute;height:30vw;right:-275%;bottom:17%;transform:rotate(270deg);filter:brightness(100%) invert(0%);-webkit-mask-image:linear-gradient(292deg,rgb(0 255 220 / 0%) 34%, rgb(255 0 0)40%);"><div style="position:absolute;height:1%;left:0%;width:100%;background:#2196f3;filter:drop-shadow(4px -2px 4px #2196f3);bottom:0%;"></div>
      </div>

      <div v-if="focusedTag == 2" class="selected" style="position:absolute;top:15vh;left:15.8vw;height:67vh;width:15vw;overflow:hidden;">
        <img src="/imgs/miniWhiteBtn.png" style="position:absolute;height:30vw;right:-275%;bottom:17%;transform:rotate(270deg);filter:brightness(100%) invert(0%);-webkit-mask-image:linear-gradient(292deg,rgb(0 255 220 / 0%) 34%, rgb(255 0 0)40%);"><div style="position:absolute;height:1%;left:0%;width:100%;background:#2196f3;filter:drop-shadow(4px -2px 4px #2196f3);bottom:0%;"></div>
      </div>

      <div v-if="focusedTag == 3" class="selected" style="position:absolute;top:15vh;left: 31.5vw;height:67vh;width:15vw;overflow:hidden; ">
        <img src="/imgs/miniWhiteBtn.png" style="position:absolute;height:30vw;right:-275%;bottom:17%;transform:rotate(270deg);filter:brightness(100%) invert(0%);-webkit-mask-image:linear-gradient(292deg,rgb(0 255 220 / 0%) 34%, rgb(255 0 0)40%);"><div style="position:absolute;height:1%;left:0%;width:100%;background:#2196f3;filter:drop-shadow(4px -2px 4px #2196f3);bottom:0%;"></div>
      </div>
      <div class="tag1" style=" position:absolute;top:2vh;height:78vh;background:#5a5a5a8f;backdrop-filter:blur(9px);width:13vw;overflow:hidden;filter:drop-shadow(rgb(0, 0, 0) 9px -13px 0.4vh);" @mouseenter="makefocus(1)" @mouseleave="makefocus(0)" @click="setMod(1)">
        <div class="tagOpacity" style="position:absolute;top:0;left:0;height:100%;width:100%;">
          <img src="/imgs/01warlord_bg.jpeg" style="position:absolute;top:-29%;height:100%;-webkit-mask-image:linear-gradient(307deg,rgb(0 255 220 / 0%) 54%, rgb(255 0 0));left:-181%;">
          <img class="lokOn" src="/imgs/lockon.png" style="position:absolute;top:2vw;width:7vw;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
          <img src="/imgs/thea.png" style="position:absolute;top:81%;width:12vw;left:-10%;opacity:0.1;">
          <div class="numberPop" style="position:absolute;left:3%;font-size:4vw;color:white;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
            01
          </div>
          <div class="typePop" style="position:absolute;left:24%;font-size:1vw;color:white;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
            TYPE
          </div>
          <div style="position:absolute;top:30%;left:5%;font-size:3vw;color:#ffffffb5;font-family:font1;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));font-weight:900;">
            RS_1
          </div>
          <div style="position:absolute;top:46%;left:44%;font-size:0.6vw;color:#ffffff;font-family:font5;text-align:right;">
            idk<br>what description<br>there is supposed to be<br>original game mode<br>I guess
          </div>
          <div class="colorBlock" style="position:absolute;top:42%;background:#ffffffb5;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));width:33%;height:1vh;"></div>
          <div style="position:absolute;top:30%;left:55%;font-size:1vw;color:black;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));padding-left:2vw;padding-top:4vh;background:white;mix-blend-mode:screen;">
            GRANT
          </div><div style="position:absolute;top:63%;left:5%;font-size:0.6vw;color:#ffffff;font-family:font5;width:90%;">
            Kill all builders to win. Global FOV revealed at numerical advantage.
          </div><div style="position:absolute;top:59%;left:5%;font-size:0.6vw;color:black;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));padding-left:0.7vw;padding-right:0.2vw;padding-top:1.2vh;background:white;mix-blend-mode:screen;">
            CNDT
          </div>
        </div>
      </div>
      <div class="tag2" style=" position:absolute;top:3%;height:93%;background:#5a5a5a8f;backdrop-filter:blur(9px);width:23%;overflow:hidden;filter:drop-shadow(rgb(0, 0, 0) 9px -13px 0.4vh);" @mouseenter="makefocus(2)" @mouseleave="makefocus(0)" @click="setMod(2)">
        <div class="tagOpacity" style="position:absolute;top:0;left:0;height:100%;width:100%;">
          <img src="/imgs/01warlord_bg.jpeg" style="position:absolute;top:-34%;height:100%;-webkit-mask-image:linear-gradient(307deg,rgb(0 255 220 / 0%) 54%, rgb(255 0 0));left:-129%;">
          <img class="lokOn" src="/imgs/lockon.png" style="position:absolute;top:2vw;width:7vw;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
          <img src="/imgs/thea.png" style="position:absolute;top:81%;width:12vw;left:-10%;opacity:0.1;">
          <div class="numberPop" style="position:absolute;left:3%;font-size:4vw;color:white;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
            02
          </div>
          <div class="typePop" style="position:absolute;left:24%;font-size:1vw;color:white;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
            TYPE
          </div><div style="position:absolute;top:30%;left:5%;font-size:3vw;color:#ffffffb5;font-family:font1;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));font-weight:900;">
            RS_2
          </div><div style="position:absolute;top:46%;left:44%;font-size:0.6vw;color:#ffffff;font-family:font5;text-align:right;">
            idk<br>what description<br>there is supposed to be<br>original game mode<br>I guess
          </div><div class="colorBlock" style="position:absolute;top:42%;background:#ffffffb5;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));width:33%;height:1vh;"></div><div style="position:absolute;top:30%;left:55%;font-size:1vw;color:black;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));padding-left:2vw;padding-top:4vh;background:white;mix-blend-mode:screen;">
            GRANT
          </div><div style="position:absolute;top:63%;left:5%;font-size:0.6vw;color:#ffffff;font-family:font5;width:90%;">
            NO BUILDERS ALLOWED. PURE LUCK MODE
          </div><div style="position:absolute;top:59%;left:5%;font-size:0.6vw;color:black;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));padding-left:0.7vw;padding-right:0.2vw;padding-top:1.2vh;background:white;mix-blend-mode:screen;">
            CNDT
          </div>
        </div>
      </div>
      <div class="tag3" style=" position:absolute;top:3%;height:93%;background:#5a5a5a8f;backdrop-filter:blur(9px);width:23%;overflow:hidden;filter:drop-shadow(rgb(0, 0, 0) 9px -13px 0.4vh);" @mouseenter="makefocus(3)" @mouseleave="makefocus(0)" @click="setMod(3)">
        <div class="tagOpacity" style="position:absolute;top:0;left:0;height:100%;width:100%;">
          <img src="/imgs/01warlord_bg.jpeg" style="position:absolute;top:-34%;height:100%;-webkit-mask-image:linear-gradient(307deg,rgb(0 255 220 / 0%) 54%, rgb(255 0 0));left:-129%;">
          <img class="lokOn" src="/imgs/lockon.png" style="position:absolute;top:2vw;width:7vw;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
          <img src="/imgs/thea.png" style="position:absolute;top:81%;width:12vw;left:-10%;opacity:0.1;">
          <div class="numberPop" style="position:absolute;left:3%;font-size:4vw;color:white;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
            03
          </div>
          <div class="typePop" style="position:absolute;left:24%;font-size:1vw;color:white;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));">
            TYPE
          </div>
          <div style="position:absolute;top:30%;left:5%;font-size:3vw;color:#ffffffb5;font-family:font1;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));font-weight:900;">
            RS_2
          </div><div style="position:absolute;top:46%;left:44%;font-size:0.6vw;color:#ffffff;font-family:font5;text-align:right;">
            idk<br>what description<br>there is supposed to be<br>original game mode<br>I guess
          </div><div class="colorBlock" style="position:absolute;top:42%;background:#ffffffb5;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));width:33%;height:1vh;"></div><div style="position:absolute;top:30%;left:55%;font-size:1vw;color:black;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));padding-left:2vw;padding-top:4vh;background:white;mix-blend-mode:screen;">
            GRANT
          </div><div style="position:absolute;top:63%;left:5%;font-size:0.6vw;color:#ffffff;font-family:font5;width:90%;">
            NO BUILDERS ALLOWED. PURE LUCK MODE
          </div><div style="position:absolute;top:59%;left:5%;font-size:0.6vw;color:black;font-family:font9;filter:drop-shadow(7px 13px 8px rgba(200,200,200,0.8));padding-left:0.7vw;padding-right:0.2vw;padding-top:1.2vh;background:white;mix-blend-mode:screen;">
            CNDT
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.typePop{
  opacity: 0;
  animation: typePop 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 2s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes typePop {
  0% {
    top:12vw;
    opacity: 0;
  }
  100% {
    opacity: 1;
    top:7.36vw;
  }
}

.numberPop{
  opacity: 0;
  animation: numberPop 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 2s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes numberPop {
  0% {
    top:4vw;
    opacity: 0;
  }
  100% {
    opacity: 1;
    top:2vw;
  }
}

.lokOn{
  opacity: 0;
  animation: lokOn 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
}

@keyframes lokOn {
  0% {
    left:-12%;
    opacity: 0;
  }
  100% {
    opacity: 1;
    left:5%;
  }
}

.colorBlock{
  opacity: 0;
  animation: colorBlock 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
}

@keyframes colorBlock {
  0% {
    left:0%;
    opacity: 0;
  }
  100% {
    opacity: 1;
    left:6%;
  }
}

.tag1{
  opacity: 0;
  animation: tag1 1s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

@keyframes tag1 {
  0% {
    left:0.8vw;
    opacity: 0;
  }
  100% {
    opacity: 1;
    left:1.4vw;
  }
}

.tag2{
  opacity: 0;
  animation: tag2 1s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

@keyframes tag2 {
  0% {
    left:0.8vw;
    opacity: 0;
  }
  100% {
    opacity: 1;
    left:16.6vw;
  }
}

.tag3{
  opacity: 0;
  animation: tag3 1s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

@keyframes tag3 {
  0% {
    left:0.8vw;
    opacity: 0;
  }
  100% {
    opacity: 1;
    left:32.4vw;
  }
}

.tagOpacity{
  opacity:0.5;
}

.tagOpacity:hover{
  opacity:1;
}
</style>

