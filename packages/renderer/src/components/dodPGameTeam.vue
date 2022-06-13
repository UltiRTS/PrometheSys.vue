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
    ...mapState(useUserStore, ['joinedGame']),
  },

  updated() {

  },
  methods: {
    ...mapActions(useUserStore, ['setmainMenuContent', 'setmodalMenuContent', 'setactiveWindow']),

  },
}
</script>

<template>
  <div data-v-6fa0e716="" style="position: absolute; height: 100%; width: 100%;">
    <div class="bg" style="position:absolute;height:100%;width:100%;filter: drop-shadow(7px 11px 18px #fff);background: #f6ffff61; ">
      <div style="position:absolute;width: 37%;left: 1%;background:white;top: 6%;padding-left:4%;font-family: 'font4';mix-blend-mode:screen;opacity: 0.2;font-size: 1.3vw;">
        SECTION PROFILE
      </div>
      <div style="position:absolute;right: 2%;width: 42%;font-family:font5;filter: drop-shadow(7px 11px 18px #000);">
        <div style="margin:1vw;padding: 0vw;border-style:solid;text-align:center;font-size: 1.4vw;color: #646464;">
          READ ONLY
        </div><div style="margin:1vw;padding: -1vw;/* border-style:solid; */text-align:center;font-size: 1.5vw;background:grey;color:white;">
          ADMINISTRATOR VIEW
        </div>
      </div>
      <div style="position:absolute;height: 2vw;left: 12%;width: 26vw; top: 69%;background: #ffffff;mix-blend-mode:screen;padding: 3vw;font-family:font5;opacity:0.5;">
        <div style="position:absolute;font-size: 1.1vw;top: 20%;">
          EXPLORE/CHANGE
        </div><div style="position:absolute;font-size: 3vw;top: 29%;">
          DEPLOYMENTS
        </div>
      </div>
    </div>
    <div class="content" style="position:absolute;height: 78%;width: 95%;top: 19%;left: 3%;filter: drop-shadow(7px 11px 18px #757575);">
      <div v-for="player, playerName in joinedGame.players" :key="playerName" class="individualPlayerTag" style="position:relative;display:inline-block;background:#00000029;height:4vw;width:8vw;overflow:hidden;margin:1vw;">
        <div class="deco" style="background:#2196f3;position:absolute;height:100%;right:0%;width:88%;">
          <img src="imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div><div style="position:absolute;top:0%;font-size:3.7vw;left:0;color:white;font-family:font9;">
          {{ player.team }}
        </div><div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          {{ playerName }}
        </div><div style="position:absolute;top:39%;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          OPRT
        </div><div style="position:absolute;top:44%;font-size:2.3vw;right:0%;color:#ffffff21;font-family:font9;">
          OPERATION
        </div>
      </div>
      <div class="individualPlayerTag" style="position:relative;display:inline-block;background:#00000029;height:4vw;width:8vw;overflow:hidden;margin:1vw;">
        <div class="deco" style="background:#2196f3;position:absolute;height:100%;right:0%;width:88%;">
          <img src="imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div><div style="position:absolute;top:0%;font-size:3.7vw;left:0;color:white;font-family:font9;">
          A
        </div><div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          Kaltist
        </div><div style="position:absolute;top:39%;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          OPRT
        </div><div style="position:absolute;top:44%;font-size:2.3vw;right:0%;color:#ffffff21;font-family:font9;">
          OPERATION
        </div>
      </div>
      <div class="individualPlayerTag" style="position:relative;display:inline-block;background:#00000029;height:4vw;width:8vw;overflow:hidden;margin:1vw;">
        <div class="deco" style="background:#2196f3;position:absolute;height:100%;right:0%;width:88%;">
          <img src="imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div><div style="position:absolute;top:0%;font-size:3.7vw;left:0;color:white;font-family:font9;">
          A
        </div><div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          Kaltist
        </div><div style="position:absolute;top:39%;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          OPRT
        </div><div style="position:absolute;top:44%;font-size:2.3vw;right:0%;color:#ffffff21;font-family:font9;">
          OPERATION
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

