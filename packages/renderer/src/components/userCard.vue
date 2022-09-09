<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
export default {
  // feed those
  props: ['username'],
  data() {
    return {

      isBottom: false,

    }
  },
  computed: {
    ...mapState(useUserStore, ['network']),
  },

  updated() {

  },
  methods: {
    addFrnd() {
      this.network.addFriend({
        friendName: this.username,
      })
      console.log('adding frnd')
    },
  },
}
</script>

<template>
  <div style="top: 3%; left: 2%; height: 13vw; width: 20vw; background: rgb(255 245 245 / 82%); position: absolute; backdrop-filter: blur(0.6vw);filter: drop-shadow(8px 7px 4px rgba(200,200,200,0.5));">
    <div style="position:absolute;top:72%;left:3%;color:#4c4c4c1c;font-family:font5;font-size:2vw;">
      USER
    </div><div style="position:absolute;top:5%;right:3%;color:#ffffffa8;font-family:font5;font-size:1vw;background:#9f9e9e;mix-blend-mode:multiply;padding-top:1.5vw;padding-left:4vw;">
      PUBLIC_RECORD
    </div>
    <div style="position:absolute;font-size:2.8vh;color:#ffffff8c;top:31.2%;left:7.7%;font-family:font1;background:#4a48481a;width:23%;filter:drop-shadow(9px 7px 7px rgba(0,0,0,0.5));height:10%;"></div><div style="position:absolute;top:90%;left:4%;color:#4c4c4c;font-family:font5;font-size:0.5vw;letter-spacing:0.4vw;">
      PROFILE
    </div>
    <img src="/imgs/avtSample.png" style="position:absolute;top:7%;left:5%;width:16%;height:30%;filter:drop-shadow(8px 7px 9px rgba(0,0,0,0.5));">
    <div style="position:absolute;width:73%;height:9%;top:81%;left:38%;overflow:hidden;">
      <img src="/imgs/barC.png" style="position:absolute;width:95%;top:-2%;left:-12%;opacity:0.3;filter:invert(0%);">
    </div>
    <div style="width:0;height:0;border-left:1vh solid transparent;border-right:1vh solid transparent;border-bottom:1vh solid black;top:94%;position:absolute;transform:rotate(135deg);right:1%;filter:drop-shadow(2px -7px 4px rgba(0,0,0,0.5));"></div>
    <div style="position:absolute;top:90.4%;left:38%;color:#4c4c4c;font-family:font5;font-size:0.5vw;letter-spacing:0.1vw;width:50%;">
      Dr. {{ username }}/TIN: 31415926535
    </div>
    <div style="position:absolute;top:0;left:0;height:100%;color:white;width:100%;overflow:hidden;">
      <div style="position:absolute;font-size:0.6vw;color:#0000002e;top:33%;right:2%;font-family:font1;text-align:right;">
        FEMALE<br>GRADUATED FROM YALE BIO<br>RESEARCH FOCUSES ON MOLECULAR AND GENETIC PATHWAY<br> Ph. D., M. D. in MOLECULAR AND GENETIC BIOLOGY
      </div><div style="position:absolute;font-size:4vh;font-family:font5;color:black;top:41%;left:-1%;width:4vw;height:4vw;background:#ffffff00;">
        <div style="top:18%;left:18%;position:absolute;border-radius:100%;width:64%;aspect-ratio:1;background:conic-gradient(#0000000f 0deg 172deg, #ededed 172deg 360deg);"></div><div style="position:absolute;background: #dfd7d7;width:50%;height:50%;border-radius:50%;top:25%;left:25%;font-size:3.2vh;"></div><div style="position:absolute;top:63%;width:39%;text-align:right;font-weight:900;color:#ffffff94;font-family:font5;overflow:hidden;background:#7a7a7ac4;left:44%;font-size:0.6vw;filter:drop-shadow(9px 7px 7px rgba(0,0,0,0.5));">
          LVL
        </div>
      </div><div style="position:absolute;font-size:4vh;font-family:font5;color:black;top:41%;left:16%;width:4vw;height:4vw;background:#ffffff00;">
        <div style="top:18%;left:18%;position:absolute;border-radius:100%;width:64%;aspect-ratio:1;background:conic-gradient(#0000000f 0deg 172deg, #ededed 172deg 360deg);"></div><div style="position:absolute;background: #dbd3d3;width:50%;height:50%;border-radius:50%;top:25%;left:25%;font-size:3.2vh;"></div><div style="position:absolute;top:63%;width:39%;text-align:right;font-weight:900;color:#ffffff94;font-family:font5;overflow:hidden;background:#7a7a7ac4;left:44%;font-size:0.6vw;filter:drop-shadow(9px 7px 7px rgba(0,0,0,0.5));">
          +
        </div>
      </div>
    </div>
    <div style="position:absolute;top:64%;right:30%;color:#ffffffa8;font-family:font5;font-size:0.6vw;background:#424242;padding-right:0.2vw;padding-top:0.7vw;padding-left:1.6vw;filter:drop-shadow(8px 7px 12px rgba(0,0,0,0.6));">
      PM
    </div><div style="position:absolute;top:64%;right:49%;color:#ffffffa8;font-family:font5;font-size:0.6vw;background:#424242;padding-right:0.2vw;padding-top:0.7vw;padding-left:1vw;filter:drop-shadow(8px 7px 12px rgba(0,0,0,0.6));" @click.stop="addFrnd()">
      FRND
    </div>
  </div>
</template>

<style scoped>

</style>

