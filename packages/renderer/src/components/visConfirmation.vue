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
    ...mapState(useUserStore, ['ui']),
    getLastConfirm() {
      if (this.ui.confirms.value.length > 0)
        return this.ui.confirms.value[0]
      return false
    },
  },

  updated() {

  },
  methods: {
    acceptConfirm() {
      this.ui.confirms.value[0].cnfrm()
      this.ui.confirms.value.shift()
    },

    rejectConfirm() {
      this.ui.confirms.value[0].rej()
      this.ui.confirms.value.shift()
    },

  },
}
</script>

<template>
  <div v-if="getLastConfirm" style="position: fixed; top: 0px; left: 0px; background: rgba(0, 0, 0, 0.32); width: 100%; height: 100%; backdrop-filter: blur(4px);">
    <div style="position:absolute;top:37%;height:25%;width:100%;background:#ebebeb;backdrop-filter:blur(8px);overflow:hidden;">
      <div id="confirmCheckBg" style="position:absolute;left:104%;top:-177%;height:534%;width:100%;transform:rotate(108deg);/* mix-blend-mode:multiply;">
        <img src="/imgs/aaaa.jpg" style="position:absolute;top:85%;width:423%;opacity:1;filter: invert(1) contrast(5) grayscale(22%) brightness(100.9%);"><div style="position:absolute;top:42%;height:229%;width:141%;background-image:linear-gradient(to right, #ebebeb 2px, transparent -1px), linear-gradient(#ebebeb 2px, transparent -1px);background-repeat:repeat;background-size:3px 3px;"></div>
      </div>
      <div class="confirmTxt">
        <div class="confirmTxtHead" style="position:absolute;top:33%;left:35%;font-size:3.6vh;font-family:font5;width:18%;height:38%;font-weight:900;color:rgba(0,0,0,0.5);">
          {{ getLastConfirm.msg }}
        </div>
        <div class="confirmTxtHead" style="position:absolute;top:62%;right: 32.2%;font-size:1.9vh;font-family:font9;">
          GENERAL NOTICE
        </div>
        <div class="confirmTxtbody" style="position:absolute;top:5%;left: 35.3%;font-size:0.8vh;font-family:font0;width:32%;text-align:right;">
          POWERED BY THEA PHARMACEUTICALS, INC
        </div><div class="confirmTxtbody" style="position:absolute;top: 10%;left:35%;font-size:2vh;font-family:font10;width:32%;background:black;color:white;mix-blend-mode:multiply;padding-left: 0.4%;padding-top: 0.3%;padding-bottom: 0.2%;">
          {{ getLastConfirm.title }}
        </div>
        <img src="imgs/barC.png" style="position:absolute;top:28%;right: 32.6%;height:33%;opacity:1;filter: invert(100%);background: #bebebe;">
        <img src="imgs/caret-right-solid.svg" style="position:absolute;top:0%;left:34%;height:13%;opacity:1;filter:invert(16%);/* background:#9f9f9f;*/transform:rotate(225deg);">
      </div>
      <div class="confirmRej" style="position:absolute;top:32%;left:-2%;width:35%;height:42%;background:#4a4a4a;overflow:hidden;filter:drop-shadow(10px 10px 7px rgba(100,100,100,0.5));" @click="rejectConfirm">
        <div style="position:absolute;top:3%;right:-2%;color:#ffffff12;font-size:4vh;font-family:font10;font-weight:900;">
          REQUEST
        </div><div style="position:absolute;top:33%;right:-4%;color:#ffffff12;font-size:10vh;font-family:font10;font-weight:900;">
          DENY
        </div><div style="position:absolute;top:-21%;right:21%;color:#ffffffb5;font-size:10vh;font-family:font10;font-weight:900;">
          拒絶
        </div><img src=" imgs/rej.png" style="position:absolute;top:12%;height:8vh;filter:contrast(56);right:3%;opacity:100%;image-rendering:pixelated;">
      </div>
      <div class="confirmCheck" style="position:absolute;top:32%;right:-2%;width:35%;height:42%;background:#2196f3;overflow:hidden;filter:drop-shadow(10px 10px 7px rgba(16, 68, 110,0.5));" @click="acceptConfirm">
        <div style="position:absolute;top:3%;left:-2%;color:#ffffff3b;font-size:4vh;font-family:font10;font-weight:900;">
          REQUEST
        </div><div style="position:absolute;top:33%;left:-4%;color:#ffffff3b;font-size:10vh;font-family:font10;font-weight:900;">
          CONFIRM
        </div><div style="position:absolute;top:-21%;left:21%;color:#f1f9ff;font-size:10vh;font-family:font10;font-weight:900;">
          確認
        </div><img src="imgs/affir.png" style="position:absolute;top:13%;height:8vh;/* filter:invert(100%);*/left:3%;">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

