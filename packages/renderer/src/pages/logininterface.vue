<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import { useUserStore } from '../stores'
const uStore = useUserStore()
const userState = computed(() => uStore.userState)
const isNetWorkOpen = uStore.network.ws_open
//const  = uStore.network.isReg.value
const displayAttr = computed(() => isNetWorkOpen.value ? '' : 'none')
const isReg = computed(() => uStore.network.isReg.value)

const username = ref('')
const password = ref('')
const pushUINewNotif = uStore.ui.pushUINewNotif

const isRemember = ref<any>(false)
async function loginWrapper() {
  uStore.soundPlayer.playNotif('acknowledge.wav')
  if(isReg.value){
    console.log('pressed reg!')
    uStore.network.register({
      username: username.value,
      password: password.value,
      bio:'some random personal hobby'
    })
  }
  else{
    uStore.login({
    username: username.value,
    password: password.value,
  })
  }


  // console.log(remembered)
  if (isRemember.value) {
    uStore.eStore.set('uName', username.value)
    uStore.eStore.set('passwd', password.value)
  }
}

// isRemember.value = uStore.memory.get('isRememberedLogin')
uStore.eStore.get('isRememberedLogin').then(async (r: any) => {
  isRemember.value = r
  if (r) {
    username.value = await uStore.eStore.get('uName')
    password.value = await uStore.eStore.get('passwd')
  }
})

function toggleRemember() {
  isRemember.value = !isRemember.value
  uStore.eStore.set('isRememberedLogin', isRemember.value)
  if (isRemember.value) {
    uStore.eStore.set('uName', username.value)
    uStore.eStore.set('passwd', password.value)
  }
  else {
    uStore.eStore.set('uName', '')
    uStore.eStore.set('passwd', '')
  }
}

function registerMe() {
  uStore.network.toggleManualReg()
  if (isReg.value){
    pushUINewNotif({ title: 'REG', msg: 'REGISTERING', class: 'aaa' })
  }
  else{
    pushUINewNotif({ title: 'REG', msg: 'LOG IN', class: 'aaa' })
  }
}
</script>
<template>
  <div id="loginInterface" :style="{display: displayAttr}">
    <img src="/imgs/thea_auth.png" :class="{loginInterface_bgWaterMark:isNetWorkOpen}"
         style="opacity:0.00; position: absolute;width: 50vw;top: 70%; "
    >

    <div id="loginbox" class="loginbox"
         style="position: absolute; height: 100%; width: 100%; mix-blend-mode: screen;"
    >
      <div class="PRTSLOGO"
           style="position:absolute;top:45%;color:white;margin:0;left:30%;width:12vw;overflow:hidden;"
      >
        <div style="background:white;position:absolute;top:0;width:100%;height:2px;" />
        <p class="corpName"
           style="position:absolute;margin:0;top:0.1vw;font-family:font2;font-weight:900;font-size:3.5vw;"
        >
          THEA
        </p>
        <p id="prtsPharma" class="corpJob"
           style="position:absolute;margin:0;font-family:font3;font-size:0.6vw;letter-spacing:0.3vw;width:100%;text-align:center;font-weight:900;"
        >
          PHARMACEUTICALS
        </p>

        <div class="corpProduct"
             style="position:absolute;margin:0;font-size:1vw;width:100%;top:65%;font-family:font5;"
        >
          <span id="prtsOS" style="">Analysis&nbsp;</span>
          <span id="prtsOS1" style="font-weight:900;">OS</span>
          <span id="prtsVer" class="theaTitle" style="font-size:0.6vw;position:absolute;right:0;bottom:5%;">&nbsp;LTS BUILD
            V12.04</span>
        </div>
        <div id="underlinePRTS" class="" style="background:white;position:absolute;width:100%;height:2px;top:90%;" />
      </div>
      <div id="logininput" :class="{logininput:!userState.isLoggedIn,logininputOut:userState.isLoggedIn}"
           style="position:absolute;height:5.5vw;top:45%;filter: drop-shadow(10px 10px 2px rgba(255,255,255,0.5));left:45%;background:rgb(177 170 160 / 78%);width:20%;overflow:hidden;"
      >
        <img src="/imgs/thea.png"
             style="position:absolute;width: 48%;top: 31%;right: 1%;filter: invert(0.1);opacity:0.1"
        >
        <p style="cursor: default;top:1.2vw;position:absolute;left:1.2vw;font-size:1.5vw;background-color:black;color:white;margin:0;padding:0;filter: drop-shadow(4px 5px 2px rgba(0,0,0,0.5));">
          Dr.&nbsp;
        </p>
        <input id="usr" v-model="username"
               style="cursor: text;top:1.2vw;position:absolute;left:3.5vw;font-size:1.5vw; display: inline;border:none;outline:none;width:18vw;background: transparent;color:black;"
               type="text" placeholder="称号" name="uname" required
        >

        <input id="passwd" v-model="password"
               style="font-size:1.5vw;margin:0;cursor: text;top:3.2vw;position:absolute;left:1.2vw;border:none;outline:none;background: transparent;"
               type="password" placeholder="合い詞" name="psw" required
        >

        <p
          id="loginInputStatus" class="connect"
          style="cursor: pointer;top:3.2vw;position:absolute;left:85%;font-size: 1vw;margin:0;color:black;font-weight:900;filter: drop-shadow(4px 5px 2px rgba(0,0,0,0.5));"
          @click="loginWrapper"
        >
          ▶
        </p>
      </div>

      <div
        style="position:fixed;bottom:-80vh;left:30%;height:10vw;width:37vw;font-size:0.8vw;height:100%;overflow:hidden;"
      >
        <div id="" class="button-block" style="position:absolute;top:0%;width:100%;">
          <button id="rememberName" :class="{'button-clicked': isRemember}" style="width:100%;height:3vw;"
                  @click="toggleRemember"
          >
            Persistent Neural Link
          </button>
        </div>
        <div class="button-block" style="position:absolute;top:4vw;width:100%;" @click="registerMe">
          <button id="register" :class="{'button-clicked': isReg}" style="width:100%;height:3vw;" class="">
            Register this Neural Link
          </button>
        </div>
      </div>

      <div v-if="userState.isLoggedIn" id="welcomeMsg"
           style="position:absolute;left:48%;height:6vw;top:45%;color:white;width:100%;overflow:hidden; "
           class="welcomeMsg"
      >
        <div id="welcomeHeading" class="welcomeHeading" style="font-size:6vw;top:-2vw;">
          歓迎
        </div>

        <div id="welcomeUser" class="welcomeUser" style="font-size:3vw;position:absolute;">
          <span style="font-size:3vw;font-weight:900;opacity:0.4">Dr.&nbsp;{{ username }}</span>
        </div>

        <div id="welcomeSubline1" class="welcomeSubline1"
             style="font-size:0.5vw;position: absolute; top: 3vw; height:0.4vw;width:0.4vw;"
        >
          <div class="welcomeSublineBar1"
               style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)"
          >
          </div>
          <div class="welcomeSublineTxt1"
               style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;"
          >
            Releasing neural transmitters
          </div>
        </div>
        <div id="welcomeSubline2" class="welcomeSubline2"
             style="font-size:0.5vw;position: absolute; top: 3.5vw; height:0.4vw;width:0.4vw;"
        >
          <div class="welcomeSublineBar2"
               style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)"
          >
          </div>
          <div class="welcomeSublineTxt2"
               style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;"
          >
            Connecting to the neuralnetwork
          </div>
        </div>
        <div
          id="welcomeSubline3"
          class="welcomeSubline3"
          style="font-size:0.5vw;position: absolute; top: 4vw; height:0.4vw;width:0.4vw;"
        >
          <div
            class="welcomeSublineBar3"
            style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)"
          >
          </div>
          <div
            class="welcomeSublineTxt3"
            style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;"
          >
            Polling database
          </div>
        </div>
        <div id="welcomeSubline4" class="welcomeSubline4"
             style="font-size:0.5vw;position: absolute; top: 4.5vw; height:0.4vw;width:0.4vw;"
        >
          <div class="welcomeSublineBar4"
               style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)"
          >
          </div>
          <div class="welcomeSublineTxt4"
               style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;"
          >
            Connecting through /dev/neuralTTY0
          </div>
        </div>
        <div id="welcomeSubline5" class="welcomeSubline5"
             style="font-size:0.5vw;position: absolute; top: 5vw; height:0.4vw;width:0.4vw;"
        >
          <div class="welcomeSublineBar5"
               style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)"
          >
          </div>
          <div class="welcomeSublineTxt5"
               style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;"
          >
            Welcome
          </div>
        </div>
      </div>
    </div>
    <div id="visualOverlay" >
      <InputGrabber />
      <visNotif />
      <visLoading />
      <visConfirmation />
    </div>
  </div>
</template>
<style scoped>
.logininputOut {
  background-color: white;
  opacity: 0;
  mix-blend-mode: screen;
  overflow: hidden;
  top: -2vw;
  color: white;
  animation-fill-mode: forwards;
  animation-name: logininputGoneAnime;
  animation-duration: 0.7s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  width: 22vw;
  left: 45%;
  opacity: 1;
}

@keyframes logininputGoneAnime {
  0% {
    width: 22vw;
    left: 45%;
    opacity: 1;
  }
  100% {
    width: 0.1vw;
    left: 45%;
    opacity: 1;
  }
}

.welcomeSublineBar1 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-delay: 4.0s;
  left: 0%;
  right: -2500%;
  opacity: 0;
}

.welcomeSublineBar2 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-delay: 4.1s;
  left: 0%;
  right: -2500%;
  opacity: 0;
}

.welcomeSublineBar3 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-delay: 4.4s;
  left: 0%;
  right: -2500%;
  opacity: 0;
}

.welcomeSublineBar4 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-delay: 4.5s;
  left: 0%;
  right: -2500%;
  opacity: 0;
}

.welcomeSublineBar5 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-delay: 4.8s;
  left: 0%;
  right: -2500%;
  opacity: 0;
}

/*
  @keyframes welcomeSublineBar {
  0%   {opacity:0; left:0%;right:2000%;}
  15.9% {opacity:1;}
  16% {opacity:0;}
  17% {opacity:0;}
  17.1% {opacity:1;}
  20%   {opacity:1;left:0%;right:-2500%;}
  40%   {opacity:1;left:0%;right:-2500%;}
  70%   {opacity:0;left:2500%;right:-2500%;}
}*/

@keyframes welcomeSublineBar {
  0% {
    opacity: 0.1;
  }
  24% {
    opacity: 0.1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  51% {
    opacity: 0.1;
  }
  76% {
    opacity: 0.1;
  }
  77% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.welcomeSublineTxt1 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay: 4.0s;
}

.welcomeSublineTxt2 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay: 4.1s;
}

.welcomeSublineTxt3 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay: 4.4s;
}

.welcomeSublineTxt4 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay: 4.5s;
}

.welcomeSublineTxt5 {
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay: 4.8s;
}

@keyframes welcomeSublineTxt {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  51% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.welcomeSubline1 {
  font-family: font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay: 4.0s;
  background: rgba(255, 255, 255, 0);
}

.welcomeSubline2 {
  font-family: font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay: 4.1s;
  background: rgba(255, 255, 255, 0);
}

.welcomeSubline3 {
  font-family: font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay: 4.4s;
  background: rgba(255, 255, 255, 0);
}

.welcomeSubline4 {
  font-family: font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay: 4.5s;
  background: rgba(255, 255, 255, 0);
}

.welcomeSubline5 {
  font-family: font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay: 4.8s;
  background: rgba(255, 255, 255, 0);
}

@keyframes welcomeSubline {
  0% {
    background: rgba(255, 255, 255, 0.5);
  }
  20% {
    background: rgba(255, 255, 255, 0.5);
  }
  21% {
    background: rgba(255, 255, 255, 0);
  }
  40% {
    background: rgba(255, 255, 255, 0);
  }
  41% {
    background: rgba(255, 255, 255, 0.5);
  }
  60% {
    background: rgba(255, 255, 255, 0.5);
  }
  61% {
    background: rgba(255, 255, 255, 0);
  }
  80% {
    background: rgba(255, 255, 255, 0);
  }
  81% {
    background: rgba(255, 255, 255, 0.5);
  }
  99% {
    background: rgba(255, 255, 255, 0.5);
  }
  100% {
    background: rgba(255, 255, 255, 0);
  }
}

.welcomeHeading {
  left: 0%;
  opacity: 0;
  position: absolute;
  color: white;
  animation-fill-mode: forwards;
  animation-name: welcomeHeading;
  animation-duration: 2.5s;
  animation-iteration-count: 1;
  animation-delay: 0.8s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);

}

@keyframes welcomeHeading {
  0% {
    left: 10%;
    opacity: 0;
  }
  30% {
    left: 0%;
    opacity: 0.4;
  }
  60% {
    left: 0%;
    opacity: 0.4;
  }
  100% {
    left: -20%;
    opacity: 0;
  }
}

.welcomeUser {
  top: 7vw;
  opacity: 0;
  position: absolute;
  color: white;
  animation-fill-mode: forwards;
  animation-name: welcomeUserAnime;
  animation-duration: 0.7s;
  animation-iteration-count: 1;
  animation-delay: 3.3s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes welcomeUserAnime {
  0% {
    top: 7vw;
    opacity: 0;
  }
  100% {
    top: -0.6vw;
    opacity: 1;
  }
}

@keyframes leftSpotLight {
  0% {
    opacity: 0;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(0, 0, 0), black);
  }
  100% {
    opacity: 0.5;
    background-image: linear-gradient(305deg, rgba(0, 0, 0, 0), rgb(0, 0, 0), black);
  }
}

@keyframes rightSpotLight {
  0% {
    opacity: 0;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(0, 0, 0), black);
  }
  100% {
    opacity: 0.5;
    background-image: linear-gradient(55deg, rgba(0, 0, 0, 0), rgb(0, 0, 0), black);
  }
}

@keyframes mainContent {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  75% {
    opacity: 1;
    visibility: hidden;
  }
}

.logininput {
  background-color: white;
  opacity: 0;
  mix-blend-mode: screen;
  overflow: hidden;
  top: -2vw;
  color: white;
  animation-fill-mode: forwards;
  animation-name: logininputAnime;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  animation-delay: 2.5s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  width: 1vw;
}

@keyframes logininputAnime {
  0% {
    left: 80%;
    width: 0.2vw;
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  50% {
    left: 45%;
    width: 0.2vw;
    opacity: 1;
  }
  51% {
    left: 45%;
    width: 0.2vw;
    opacity: 0;
  }
  60% {
    left: 45%;
    width: 0.2vw;
    opacity: 0;
  }
  61% {
    left: 45%;
    width: 0.2vw;
    opacity: 1;
  }
  70% {
    left: 45%;
    width: 0.2vw;
    opacity: 1;
  }
  71% {
    left: 45%;
    width: 0.2vw;
    opacity: 0;
  }
  80% {
    left: 45%;
    width: 0.2vw;
    opacity: 0;
  }
  81% {
    left: 45%;
    width: 0.2vw;
    opacity: 1;
  }
  100% {
    width: 22vw;
    left: 45%;
    opacity: 1;
  }
}

/* The element to apply the animation to */

@keyframes theaVanish {
  0% {
    opacity: 1;
  }

  100% {
    left: 25%;
    opacity: 0;
  }

}

@keyframes logoIn {
  0% {
    left: 5%;
    opacity: 0;
  }

  100% {
    left: 0%;
    opacity: 1;
  }

}

.corpName {
  opacity: 0;
  animation-delay: 3.5s;
  animation-name: logoIn;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes corpJob {
  0% {
    left: 5%;
    opacity: 0;
  }

  80% {
    left: 0%;
    opacity: 1;
  }

  81% {
    background: black;
    opacity: 1;
    top: 1.8vw;
    left: 0%;
  }
  82% {
    background: white;
    opacity: 1;
    top: 1.1vw;
    left: -50%;
  }
  98% {
    background: white;
    opacity: 1;
    top: 1.1vw;
    left: -50%;
  }
  100% {
    top: 1.8vw;
    left: 0%;
    background: black;
    opacity: 1;
  }

}

.corpJob {
  background: black;
  opacity: 0;
  animation-delay: 3.55s;
  animation-name: corpJob;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.corpProduct {
  opacity: 0;
  animation-delay: 3.6s;
  animation-name: logoIn;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes loginInterface_bgWaterMark {
  0% {
    left: -3%;
    opacity: 0.00;
  }

  100% {
    left: -5%;
    opacity: 0.05;
  }

}

.loginInterface_bgWaterMark {

  animation-delay: 3s;
  animation-name: loginInterface_bgWaterMark;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes PRTSLOGO {
  0% {
    height: 0vw;
  }

  100% {
    height: 6vw;
  }

}

.PRTSLOGO {
  height: 0vw;
  animation-delay: 3.4s;
  animation-name: PRTSLOGO;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes theaTitle {
  0% {
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  60% {
    opacity: 0;

  }

  100% {
    opacity: 1;
  }

}

.theaTitle {

  animation-name: theaTitle;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-delay: 0.75s;
}

@keyframes qichuangyijingchenggong {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    left: -2.5vw;
  }
}

.edgy-link span {
  position: relative;
  z-index: 999;
}

.edgy-link:hover span {
  color: #001d3c;
}

.button-block {
  display: inline-block;
  border-left: 0.5vw solid rgba(70, 66, 47, 0.75);
  padding: 0 3vw;
  position: relative;
}

.button-block::before {
  content: "";
  position: absolute;
  width: 0.1vw;
  top: 0;
  height: 100%;
  left: 0.2vw;
  background: rgba(70, 66, 47, 0.75);
}

button {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 0.02vw solid transparent;
  color: #46422f;
  background: transparent;
  border-style: solid none;
  margin: 0 auto;
  display: block;
  font-family: font5;
  font-size: 1vw;
  padding: 0.5vw 0.5vw;
  min-width: 5vw;
  cursor: pointer;
  position: relative;
  transition: all 0.25s;
  text-align: left;
}

button::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: calc(100% - 0.56vw);
  left: 0px;
  top: 0.26vw;
  background: transparent linear-gradient(to right, #46422f 50%, rgba(70, 66, 47, 0.75) 50%, rgba(70, 66, 47, 0.25) 100%) 100% 0/200% 100% no-repeat;
  transition: all 0.35s;
  z-index: -1;
}

button::after {
  content: "";
  display: inline-block;
  /*float: left;*/
  width: 0.8vw;
  height: 0.8vw;
  margin-top: 0.31vw;
  position: absolute;
  left: 29vw;
  background: currentColor;
  border-right: 0.1px solid #46422f;
}

button:hover, button:focus, .button-clicked {
  color: #c9c3ab;
  border-color: #46422f;
}

button:focus, button-clicked {
  border-color: transparent;
  opacity: 0.8;
  outline: none;
}

button:hover::before, button:focus::before, .button-clicked:before {
  background-position-x: 0;
}

button:focus::before, .button-clicked:before {
  padding-right: 30px;
}

button + button {
  margin-top: 10px;
}

@media (max-width: 800px) {
  select, option {
    text-align: center;
    text-align-last: center;
  }
}

</style>
