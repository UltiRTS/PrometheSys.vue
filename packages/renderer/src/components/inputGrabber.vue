<script lang="ts" setup>
/* eslint-disable vue/first-attribute-linebreak */
/* eslint-disable vue/html-self-closing */

import { ref } from 'vue'
import { useUserStore } from '../stores'

// props: ['channels', 'chatLog'],
defineProps<{
  activated: boolean
}>()

const uStore = useUserStore()
const text2say = ref('Input Await')
const exiting = ref(false)

const deactivate = () => {
  setTimeout(() => {
    if (text2say.value === 'Input Await')
      return
    if (text2say.value === 'canceling')
      return

    // console.log('grabberInput' + grabberInput.value)

    switch (uStore.grabberTriggerAction) {
      case 'AddChat': {
        uStore.network.joinChat({
          chatName: text2say.value,
          password: '',
        })
        break
      }

      case 'AddGame': {
        uStore.network.joinGame(
          {
            gameName: text2say.value,
            password: '',
            mapID: '0',
          })
        break
      }

      default: {
        console.log('default trigger')
        break
      }
    }

    // reset action to empty
    uStore.ui.clearGrabber()

    exiting.value = false
    text2say.value = 'Input Await'
  }, 1000)
}

const cancel = () => {
  text2say.value = 'canceling'
  exiting.value = true
  deactivate()
}

const enter = () => {
  exiting.value = true
  deactivate()
}
</script>
<template>
  <div v-if="activated" class="fixed top-0 left-0 w-screen h-screen" :class="{'bg':!exiting, 'bgExit':exiting}" @click="cancel">
    <div class="absolute" :class="{'contr':!exiting, 'contrExit':exiting}" style="top: 32%; width: 100%; height: 28%; background: linear-gradient(18deg, rgb(58, 64, 133), rgb(70, 133, 197));" />
    <div class="stripy1" style="position: absolute; top: 32%;  width: 100%;overflow:hidden; height: 28%; ">
      <div style="position: absolute; width: 200%; height: 100%; background: repeating-linear-gradient(56deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.19) 3px, rgba(70, 82, 152, 0) 7px, rgba(70, 82, 152, 0) 17px);opacity:0.5;" />
    </div>
    <div class="stripy2" style="position: absolute; top: 32%;  width: 100%; height: 28%; overflow:hidden;">
      <div style="left: -0.4%;position:absolute;width:200%;height:100%;background:repeating-linear-gradient(56deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.19) 3px, rgba(70, 82, 152, 0) 7px, rgba(70, 82, 152, 0) 17px);overflow:hidden;opacity:0.5;" />
    </div>s
    <div style="position: absolute; top: 32%; left: 0px; width: 100%; height: 28%;">
      <div style="position:absolute;color: #ffffff4a;font-weight:900;font-size: 14vh;font-family: 'font5';top: 10%;left: 4%;padding-top: 1.1%;padding-left: 1.1%;filter: drop-shadow(13px 10px 9px rgba(255, 255, 255, 0.35));width:100%;height: 59%;overflow:hidden;">
        {{ text2say }}
      </div>
      <div class="submit" style="position:absolute;color: white;font-weight:900;font-size: 3vh;font-family: 'font10';top: 40%;left: 34%;">
        Submit Game Name
      </div>
      <div :class="{'upload':!exiting, 'uploadExit':exiting}" style="cursor:pointer;position:absolute;mix-blend-mode:screen;color:black;font-weight:900;font-size: 3vh;font-family: 'font2';left: 4%;padding-top: 1.1%;padding-left: 1.1%;filter: drop-shadow(13px 10px 9px rgba(255, 255, 255, 0.35));" @click.stop="enter">
        Upload Text
      </div>
      <div style="position:absolute;color: white;font-weight:900;font-size: 3vh;font-family: 'font10';top: 0%;left: 60%;overflow:hidden;height:100%;width: 100%;">
        <img src="public/imgs/thea.png" style="  /* filter: invert(100%); */height: 76vh;top: -46%;/* left: 54%; */position:absolute;opacity: 7%;/* width: 8vh; */">
      </div>
      <img src="public/imgs/upArrow.png" style="  filter: invert(100%);height: 12vh;top: 30%;left: 45%;position:absolute;opacity: 16%;width: 8vh;">

      <textarea v-model="text2say" style="position: absolute; color: #ffffffad; width: 41.6%; height: 45%; padding: 0px; border-width: 0px; background: #ffffff00; resize: none; outline: none; right: 54.4%; margin: 0px; top: 52%;overflow:auto;font-family: 'font6';text-align:right" @click.stop />
    </div>
  </div>
</template>
<style scoped>
.contr {
  animation-fill-mode: forwards;
  animation: contr 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes contr {
  0% {
    left: -5%;
    opacity: 0;
  }
  100% {
    left: 0%;
    opacity: 1;
  }
}

.contrExit {
  animation-fill-mode: forwards;
  animation: contrExit 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  opacity: 0;
}

@keyframes contrExit {
  0% {
    left: 0%;
    opacity: 1;

  }
  100% {
    left: -5%;
    opacity: 0;
  }
}

.bg{
  animation: bg 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
}

@keyframes bg {
  0% {
    backdrop-filter: blur(0px);
    background: #00000000;
  }
  100% {
    backdrop-filter: blur(11px);
    background: #0000004d;
  }
}

.bgExit{
  animation: bgExit 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
}

@keyframes bgExit {
  0% {
    backdrop-filter: blur(11px);
    background: #0000004d;
  }
  100% {
        backdrop-filter: blur(0px);
    background: #00000000;
  }
}

.upload{
  background: #ffffffc2;
    animation: upload 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  animation-fill-mode: forwards;
}
@keyframes upload {
  0% {
    top: 20%;
    opacity: 0;
  }
  100% {
    top: 10%;
    opacity: 1;
  }
}
.upload:hover{
  background: #ffffff;
}

.uploadExit{
  background: #ffffffc2;
    animation: uploadExit 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  animation-fill-mode: forwards;
}
@keyframes uploadExit {
  0% {
        top: 10%;
    opacity: 1;

  }
  100% {
    top: 20%;
    opacity: 0;
  }
}
.stripy1 {
  left:-100%;
  animation: stripy1 120s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.stripy2 {
  left:0;
  animation: stripy2 120s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes stripy1 {
  0% {
    left:-100%;
  }

  100% {
    left:0%;
  }
}
@keyframes stripy2 {
  0% {
    left:0;
  }

  100% {
    left:100%;
  }
}
</style>
