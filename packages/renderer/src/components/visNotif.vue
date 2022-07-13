<script>

import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'

export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {

    }
  },
  computed: {
    ...mapState(useUserStore, ['notifs']),
  },
  methods: {
    ...mapActions(useUserStore, ['pushUINewNotif']),
    pushMsg(title, msg) {
      this.pushUINewNotif({ title, msg })
    },
  },
}
</script>

<template>
  <div style="position:absolute;right:0;width:30vh;height:100%;margin:0;top:0;overflow:auto;perspective:50px;overflow-x:hidden;">
    <h1 style="color:white" @click="pushUINewNotif({title:'aaa',msg: 'vvv',})">
      pushNewNotif
    </h1>
    <div v-for="msg in notifs" :key="msg.title" :class="{expiring:msg.expiring,tag:true}" style="position: relative;width:100%;height: 6vh;filter: drop-shadow(20px 11px 16px #000);transform-style: preserve-3d;margin-top: 9vh;">
      <div style=" position:absolute;height:100%; overflow: hidden; width: 100%; background: #2196f3;">
        <div id="tagBg" style="position: absolute; left: 104%;top: -177%; height: 534%; width: 100%; transform: rotate(108deg);mix-blend-mode: screen;">
          <img src="imgs/aaaa.jpg" style="position: absolute; top: -7%; width: 423%; opacity: 1; filter: invert(1) contrast(4) grayscale(100%); "><div style="position: absolute; top: 0px; height: 229%; width: 141%; background-image: linear-gradient(to right, rgb(255 255 255) 2px, transparent -1px), linear-gradient(rgb(255 255 255) 2px, transparent -1px); background-repeat: repeat; background-size: 3px 3px;"></div>
        </div>
        <div class="tagLine" style="position:absolute;width:100%;height: 4%;background:#2196f3;"></div>
        <div style="right: -3%;position: absolute; top: -7%;width:100%;text-align:right; font-family: 'font9';font-weight:900;opacity: 12%;font-size: 9vh;">
          MAP
        </div><div style="position: absolute; left: 10%;width:100%;top:0%;margin:1vh;font-family: 'font5';font-size: 1vh;">
          NEW MAP RETRIEVED
        </div><div style="position: absolute; left: 10%;width:100%;top: 28%;margin:1vh;font-family: 'font5';font-weight:900;font-size: 2vh;opacity:0.7;">
          MAP
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expiring {
  left: 3%;
    animation-fill-mode: forwards;
  animation-name: expiring;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;

  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes expiring {

  0% {
    left: 3%;
  }

  100% {
    left: 100%;
    opacity:0;
  }
}
/*
.tag{
animation-fill-mode: forwards;
  animation-name: tagAnim;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;

  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes tagAnim {

  0% {
    left: 100%;
    opacity:0;
  }

  100% {
    left: 3%;
    opacity:1;
  }
}*/
.tag:hover{
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px);

  animation-fill-mode: forwards;
  animation-name: tagHoverAnim;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;

  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes tagHoverAnim {

  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px);
  }

  100% {
    transform: rotateX(0deg) rotateY(-0.1deg) rotateZ(0deg) translateY(2px);
  }
}

</style>

