<script setup lang="ts">
import { useUserStore } from '../stores'

import router from '../router'

setTimeout(() => {
  router.push('login')
}, 9000)

const uStore = useUserStore()
uStore.musicPlayer.playSound('bbl.wav', true)

</script>

<template>
  <div id="prelogin" style="background:black;position:absolute;height:110%;width:110%;top:-5%;left:-5%;">
    <div id="init" class="init" style="position: absolute;width:110%;height:110%;top:-5%;left: 3%;overflow:hidden;filter:invert(100%);">
      <div style="position:absolute;height:10vw;width:50vw;top:38%;left:25vw;background:black;filter: drop-shadow(20px 10px 4px rgba(100,100,100,0.5));"></div>
      <div style="position:absolute;left: 27vw;width: 9vw;top: 38%;height: 20vw;">
        <img src="/imgs/thea.png" style="position:absolute;width:100%">
      </div>
      <div style="position:absolute;left: 40vw;width: 9vw;top: 39%;height: 20vw;">
        <div style="font-family:font6;color:white;position:absolute;top: 6.4%;font-size: 2.4vw;">
          PROMETHESIS
        </div>
        <div style="font-family: 'font5';color:white;position:absolute;top: 19.4%;font-size: 0.8vw;left: 95%;">
          Project
        </div>
        <div style="position:absolute;height:1%;left: 149%;width: 53%;background: linear-gradient(to right, #ffffff38 , black);top: 22%;" />

        <div style="position:absolute;height:1%;left: 21%;width: 53%;background: linear-gradient(to right, black , #ffffff38);top: 22%;" />
      </div>
      <div style="position:absolute;left: 65vw;width: 9vw;top: 39%;height: 20vw;">
        <div style="position:absolute;width:100%;color:white;font-family:font1;font-size:2vw;top: 5%;font-weight:900;">
          BA
        </div>
        <div style="font-family:font1;color:white;position:absolute;top: 17.1%;font-size: 0.8vw;">
          Balanced Annihilation
        </div>
      </div>
    </div>
    <div id="warning" class="warning" style="opacity:0;">
      <img src="/imgs/When_the_city_but_FOGG.png" style="-webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0))); mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));position:absolute;width:100%;">
      <div style="position:absolute;left: 27vw;width: 9vw;top: 13%;height: 20vw;">
        <img src="/imgs/thea.png" style="position:absolute;width:100%">
      </div>
      <div style="position:absolute;left: 40vw;width: 9vw;top: 14%;height: 20vw;">
        <div style="font-family:font6;color:white;position:absolute;top: 6.4%;font-size: 2.4vw;">
          PROMETHESIS
        </div>
        <div style="font-family: 'font5';color:white;position:absolute;top: 19.4%;font-size: 0.8vw;left: 95%;">
          Project
        </div>
        <div style="position:absolute;height:1%;left: 149%;width: 53%;background: linear-gradient(to right, #ffffff38 , #dfdfdf00);top: 22%;" />

        <div style="position:absolute;height:1%;left: 21%;width: 53%;background: linear-gradient(to right, transparent , #ffffff38);top: 22%;" />
      </div>
      <div style="position:absolute;left: 65vw;width: 9vw;top: 15%;height: 20vw;">
        <div style="position:absolute;width:100%;color:white;font-family:font1;font-size:2vw;top: 5%;font-weight:900;">
          BA
        </div>
        <div style="font-family:font1;color:white;position:absolute;top: 17.1%;font-size: 0.8vw;">
          Balanced Annihilation
        </div>
      </div>
      <div style="position:absolute;top: 43%;width: 67%;color:white;font-family:font1;left: 16%;">
        The content of this game is purely fictional, and is not intended to represent or depict any actual event, person, or entity, and any such similarities are purelt incidental. <br>
        A very small percentage of individuals may experience epileptic seizures or blackouts when exposed to certein visual images, including light patterns or flashing lights that may appear in this game. Exposure to certein patterns or backgrounds on a computer screen induce epileptic seizures or blakouts in these individuals. In you experience any of the following symptons while gaming -- dizziness, altered vision, eye or muscle twitches, loss of awareness, disorientation, any involuntary movement, or convulsions -- discontinue this game IMMEDIATELY and consult your physician before resuming play.
      </div>
    </div>
    <div id="title" />
  </div>
</template>

<style scoped>

@keyframes fadeInOut {
    0% {
        opacity: 0;
    }

    30% {
        opacity: 0;
    }

    75% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

/* The element to apply the animation to */
.init {
    animation-name: fadeInOut;
    animation-duration: 4s;
    animation-fill-mode: forwards;
}

.warning {
    animation-name: fadeInOut;
    animation-duration: 4s;
    animation-fill-mode: forwards;
    animation-delay: 4s;
}
</style>
