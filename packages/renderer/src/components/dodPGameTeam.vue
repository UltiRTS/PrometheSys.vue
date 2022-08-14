<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      focusedTag: '',
      AINum: 0,
      chickenNum: 0,
    }
  },
  computed: {
    ...mapState(useUserStore, ['joinedGame', 'username']),
    spectators() {
      const spec = {}
      for (const player in this.joinedGame.players) {
        if (this.joinedGame.players[player].isSpec)
          spec[player] = this.joinedGame.players[player]
      }
      return spec
    },

    noMapPlayers() {
      const players = {}
      for (const player in this.joinedGame.players) {
        if (!this.joinedGame.players[player].hasmap && !this.joinedGame.players[player].isSpec)
          players[player] = this.joinedGame.players[player]
      }
      return players
    },

    normalPlayers() {
      const players = {}
      for (const player in this.joinedGame.players) {
        if (this.joinedGame.players[player].hasmap && !this.joinedGame.players[player].isSpec)
          players[player] = this.joinedGame.players[player]
      }
      console.log('showing normal players')
      console.log(players)
      return players
    },

  },

  updated() {

  },
  methods: {
    ...mapActions(useUserStore, ['setmainMenuContent', 'setmodalMenuContent', 'setactiveWindow', 'setAIorChicken', 'delAIorChicken', 'setTeam', 'specPlayer']),

    chTeam(isNext, player, curLetter) {
      if (isNext)
        this.setTeam({ gameName: this.joinedGame.title, team: this.getNextLetter(curLetter), player })
      if (!isNext)

        this.setTeam({ gameName: this.joinedGame.title, team: this.getPreviousLetter(curLetter), player })
    },

    toggleSpec(player) {
      this.specPlayer({ game: this.joinedGame.title, player })
    },

    addAI() {
      this.setAIorChicken({ gameName: this.joinedGame.title, AI: `GPT_${this.AINum}`, team: 'A', type: 'AI' })
      this.AINum++
    },

    addChicken() {
      this.setAIorChicken({ gameName: this.joinedGame.title, AI: `CHK_${this.chickenNum}`, team: 'A', type: 'Chicken' })
      this.chickenNum++
    },

    rmAIorChicken(name, type) {
      this.delAIorChicken({ gameName: this.joinedGame.title, AI: name, type })
    },

    chAI(isNext, name, curLetter) {
      if (isNext)
        this.setAIorChicken({ gameName: this.joinedGame.title, AI: name, team: this.getNextLetter(curLetter), type: 'AI' })
      if (!isNext)
        this.setAIorChicken({ gameName: this.joinedGame.title, AI: name, team: this.getPreviousLetter(curLetter), type: 'AI' })
    },

    chChicken(isNext, name, curLetter) {
      if (isNext)
        this.setAIorChicken({ gameName: this.joinedGame.title, AI: name, team: this.getNextLetter(curLetter), type: 'Chicken' })
      if (!isNext)
        this.setAIorChicken({ gameName: this.joinedGame.title, AI: name, team: this.getPreviousLetter(curLetter), type: 'Chicken' })
    },

    getNextLetter(letter) {
      if (letter === 'z')
        return 'a'

      else if (letter === 'Z')
        return 'A'

      else
        return String.fromCharCode(letter.charCodeAt(0) + 1)
    },

    getPreviousLetter(letter) {
      if (letter === 'a')
        return 'z'

      else if (letter === 'A')
        return 'Z'

      else
        return String.fromCharCode(letter.charCodeAt(0) - 1)
    },

  },
}
</script>

<template>
  <div data-v-6fa0e716="" style="position: absolute; height: 100%; width: 100%;">
    <div class="bg" style="position:absolute;height:100%;width:100%;filter: drop-shadow(7px 11px 18px #fff);background: #f6ffff61; ">
      <div style="position:absolute;width: 37%;left: 1%;background:white;top: 6%;padding-left:4%;font-family: 'font4';mix-blend-mode:screen;opacity: 0.2;font-size: 1.3vw;">
        SECTION PROFILE
      </div>
      <div v-if="joinedGame.hoster == username" style="position:absolute;right: 2%;width: 42%;font-family:font5;filter: drop-shadow(7px 11px 18px #000);">
        <div style="margin:1vw;padding: 0vw;border-style:solid;text-align:center;font-size: 1.4vw;color: #646464;opacity:0.2;">
          READ ONLY
        </div><div style="margin:1vw;padding: -1vw;text-align:center;font-size: 1.5vw;background:grey;color:white;">
          ADMINISTRATOR VIEW
        </div>
      </div>

      <div v-if="joinedGame.hoster != username" style="position:absolute;right: 2%;width: 42%;font-family:font5;filter: drop-shadow(7px 11px 18px #000);">
        <div style="margin:1vw;padding: 0vw;border-style:solid;text-align:center;font-size: 1.4vw;color: #646464;opacity:0.2;">
          ADMINISTRATOR VIEW
        </div><div style="margin:1vw;padding: -1vw;text-align:center;font-size: 1.5vw;background:grey;color:white;">
          READ ONLY
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
    <div class="content" style="position: absolute; height: 78%; width: 80%; top: 19%; left: 3%; filter: drop-shadow(rgb(117, 117, 117) 7px 11px 18px); overflow: auto;padding-right: 12%;">
      <div v-for="player, playerName in normalPlayers" :key="playerName" class="individualPlayerTag tagAnime" style="position:relative;display:inline-block;background:#00000029;height:4vw;width:8vw;overflow:hidden;margin:1vw;">
        <div class="deco" style="background:#2196f3;position:absolute;height:100%;right:0%;width:88%;">
          <img src="/imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div>
        <div style="position:absolute;top:0%;font-size:3.7vw;left:0;color:white;font-family:font9;" @click="chTeam(true, playerName, player.team)" @contextmenu="chTeam(false, playerName, player.team)">
          {{ player.team }}
        </div><div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          {{ playerName }}
        </div>
        <div style="position:absolute;top:39%;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          OPRT
        </div>
        <div class="roleOperation" style=" position: absolute; top: 41%; font-size: 1.2vw; right: 0%;  font-family: font9;height: 1.3vw;width:3vw;margin:0;" :class="{oprtTagMask:focusedTag==playerName, oprtTagMaskGone:focusedTag!=playerName}" @mouseenter="focusedTag=playerName" @mouseleave="focusedTag=''" @click="toggleSpec(playerName)">
          <div :class="{oprtTagFlash:focusedTag==playerName, oprtTagFlashGone:focusedTag!=playerName}" style="position:absolute; height:100%;background:white;margin:0;"></div>
          <div :class="{oprtTagTxt:focusedTag==playerName, oprtTagTxtGone:focusedTag!=playerName}" style="position:absolute;top:0%;font-size:1.2vw;right:0%;margin:0;color:white;font-family:font9;">
            SPEC
          </div>
        </div>

        <div class="typographSpec" style="pointer-events: none; position:absolute;font-size:2.3vw;right:0%;color:#ffffff21;font-family:font9;">
          OPERATION
        </div>
      </div>
      <div v-for="player, playerName in spectators" :key="playerName" class="individualSpecTag tagAnime" style="position:relative;display:inline-block;background:#00000029;height:4vw;width:8vw;overflow:hidden;margin:1vw;">
        <div class="deco" style="background: #939393;position:absolute;height:100%;right:0%;width:88%;">
          <img src="/imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div><div style="position:absolute;top:0%;font-size:3.7vw;left:0;color:white;font-family:font9;">
          A
        </div><div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          SpecUsr
        </div><div style="position:absolute;top:39%;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          SPEC
        </div>
        <div class="roleOperation" style=" position: absolute; top: 39%; font-size: 1.2vw; right: 0%;  font-family: font9;height: 1.3vw;width:3vw;margin:0;" :class="{oprtTagMask:focusedTag==playerName, oprtTagMaskGone:focusedTag!=playerName}" @mouseenter="focusedTag=playerName" @mouseleave="focusedTag=''" @click="toggleSpec(playerName)">
          <div :class="{oprtTagFlash:focusedTag==playerName, oprtTagFlashGone:focusedTag!=playerName}" style="position:absolute; height:100%;background:white;margin:0;"></div>
          <div :class="{oprtTagTxt:focusedTag==playerName, oprtTagTxtGone:focusedTag!=playerName}" style="position:absolute;top:0%;font-size:1.2vw;right:0%;margin:0;color:white;font-family:font9;">
            OPRT
          </div>
        </div>
        <div class="typographPlayer" style="pointer-events: none;position:absolute;font-size:2.3vw;right:0%;color:#ffffff21;font-family:font9;">
          SPECTATOR
        </div>
      </div>
      <div v-for="player, playerName in noMapPlayers" :key="playerName" class="individualPlayerTagUnready tagAnime" style="position:relative;display:inline-block;background:#00000029;height:4vw;width:8vw;overflow:hidden;margin:1vw;">
        <div class="deco" style="background: #ff4b39;position:absolute;height:100%;right:0%;width:88%;">
          <img src="/imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div>
        <img src="/imgs/file-import-solid.svg" style="position:absolute;top: 20%;font-size: 3.7vw;left: -8%;color:white;font-family:font9;height: 83%;filter: invert(0%);opacity: 11%;">
        <div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          {{ playerName }}
        </div><div style="position:absolute;top:39%;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          EROR
        </div><div style="position:absolute;top:44%;font-size:2.3vw;right:0%;color:#ffffff21;font-family:font9;">
          ERROR
        </div>
      </div>

      <div v-for="player, playerName in joinedGame.ais" :key="playerName" class="individualPlayerTag tagAnime" style="position: relative; display: inline-block; background: rgba(0, 0, 0, 0.16); height: 4vw; width: 8vw; overflow: hidden; margin: 1vw;">
        <img src="/imgs/blueprintswblue.png" style="position:absolute;width:96%;height: 100%;bottom: 0%;opacity: 1;filter: invert(0%) grayscale(0.3) hue-rotate(29deg);left: 55%;;left: -68%;/* mix-blend-mode:multiply; */"><div class="deco" style="background:#2196f3;position:absolute;height:100%;right:0%;width:88%;">
          <img src="/imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div><div style="position:absolute;top:0%;font-size:3.7vw;left:0;color:white;font-family:font9;" @click="chAI(true, playerName, player.team)" @contextmenu="chAI(false, playerName, player.team)">
          {{ player.team }}
        </div><div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          {{ playerName }}
        </div><div style="position:absolute;top:39%;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          AI
        </div>
        <div class="roleOperation" style=" position: absolute; top: 41%; font-size: 1.2vw; right: 0%;  font-family: font9;height: 1.3vw;width:3vw;margin:0;" :class="{oprtTagMask:focusedTag==playerName, oprtTagMaskGone:focusedTag!=playerName}" @mouseenter="focusedTag=playerName" @mouseleave="focusedTag=''">
          <div :class="{oprtTagFlash:focusedTag==playerName, oprtTagFlashGone:focusedTag!=playerName}" style="position:absolute; height:100%;background:white;margin:0;"></div>
          <div :class="{oprtTagTxt:focusedTag==playerName, oprtTagTxtGone:focusedTag!=playerName}" style="position:absolute;top:0%;font-size:1.2vw;right:0%;margin:0;color:white;font-family:font9;" @click="rmAIorChicken(playerName, 'AI')">
            DEL
          </div>
        </div>
        <div class="typographSpec" style="pointer-events: none; position: absolute; font-size: 2.3vw; right: 0%; color: rgba(255, 255, 255, 0.13); font-family: font9;">
          OPERATION
        </div>
      </div>

      <div v-for="player, playerName in joinedGame.chickens" :key="playerName" class="individualPlayerTag tagAnime" style="position: relative; display: inline-block; background: rgba(0, 0, 0, 0.16); height: 4vw; width: 8vw; overflow: hidden; margin: 1vw;">
        <img src="/imgs/blueprintswblue.png" style="position:absolute;width:96%;height: 100%;bottom: 0%;opacity: 1;filter: invert(0%) grayscale(0.3) hue-rotate(29deg);left: 55%;;left: -68%;/* mix-blend-mode:multiply; */"><div class="deco" style="background:#2196f3;position:absolute;height:100%;right:0%;width:88%;">
          <img src="/imgs/horizontalSep3.png" style="position:absolute;width:96%;height:6%;bottom:0%;opacity:0.7;">
        </div>
        <div style="position:absolute;top:0%;font-size:3.7vw;left:0;color:white;font-family:font9;" @click="chChicken(true, playerName, player.team)" @contextmenu="chChicken(false, playerName, player.team)">
          {{ player.team }}
        </div><div style="position:absolute;top:0%;font-size:1.8vw;right:0%;color:#5e5e5e;font-family:font9;">
          {{ playerName }}
        </div><div style="position:absolute;top:39%;font-size:1.2vw;right:0%;color:white;font-family:font9;">
          CHK
        </div>
        <div class="roleOperation" style=" position: absolute; top: 41%; font-size: 1.2vw; right: 0%;  font-family: font9;height: 1.3vw;width:3vw;margin:0;" :class="{oprtTagMask:focusedTag==playerName, oprtTagMaskGone:focusedTag!=playerName}" @mouseenter="focusedTag=playerName" @mouseleave="focusedTag=''">
          <div :class="{oprtTagFlash:focusedTag==playerName, oprtTagFlashGone:focusedTag!=playerName}" style="position:absolute; height:100%;background:white;margin:0;"></div>
          <div :class="{oprtTagTxt:focusedTag==playerName, oprtTagTxtGone:focusedTag!=playerName}" style="position:absolute;top:0%;font-size:1.2vw;right:0%;margin:0;color:white;font-family:font9;" @click="rmAIorChicken(playerName, 'Chicken')">
            DEL
          </div>
        </div>
        <div class="typographSpec" style="pointer-events: none; position: absolute; font-size: 2.3vw; right: 0%; color: rgba(255, 255, 255, 0.13); font-family: font9;">
          OPERATION
        </div>
      </div>
    </div>

    <div v-if="joinedGame.hoster == username" class="deploymentOp" style="position: absolute; width: 15%; height: 11.4vw; top: 19%; right: 9%; opacity: 0.5; text-align: right;font-size: 0.9vw;font-family: 'font9';">
      <div class="deploymentTxt" style="position: absolute; height: 100%; left: 5%; width: 89%;">
        <span @click="addAI">ADD AI</span>

        <div style="background:black;height: 0.6vw;width: 0.6vw;position:relative;display: inline-block; margin-left: 0.4vw;"></div>
        <br>
        <span @click="addChicken">ADD CHICKEN</span><div style="background:black;height: 0.6vw;width: 0.6vw;position:relative;display: inline-block; margin-left: 0.4vw;">
        </div>
      </div>
    </div>

    <div v-if="joinedGame.hoster != username" class="deploymentOp" style="position: absolute; width: 15%; height: 11.4vw; top: 19%; right: 9%; opacity: 0.5; text-align: right;font-size: 0.9vw;font-family: 'font9';">
      <div class="deploymentTxt" style="position: absolute; height: 100%; left: 5%; width: 89%;">
        <span>DATABASE READ ONLY</span>

        <div style="background:black;height: 0.6vw;width: 0.6vw;position:relative;display: inline-block; margin-left: 0.4vw;"></div>
        <br>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tagAnime{
  animation-fill-mode: forwards;
  animation-name: tagAnime;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes tagAnime {

  0% {
    left:-5%;
    opacity: 0;
  }

  100% {
    left:0%;
    opacity: 1;
  }
}

.typographSpec{
  animation-fill-mode: forwards;
  animation-name: typographSpec;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 1s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes typographSpec {

  0% {
    top:0%;
    opacity: 0;
  }

  100% {
    top:44%;
    opacity: 1;
  }
}

.typographPlayer{
  animation-fill-mode: forwards;
  animation-name: typographPlayer;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes typographPlayer {

  0% {
    top:100%;
    opacity: 0;
  }

  100% {
    top:44%;
    opacity: 1;
  }
}

.oprtTagMaskGone{
  animation-fill-mode: forwards;
  animation-name: oprtTagMaskGone;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0.6s;
  opacity: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  background: #2196f3;
}

@keyframes oprtTagMaskGone {

  0% {
    background: #2195f300;
    opacity: 1;
  }
    99% {
    background: #2195f300;
  }
  100% {
    background: #2195f300;
  }
}

.oprtTagMask{
  animation-fill-mode: forwards;
  animation-name: oprtTagMask;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0.2s;
  background: #2195f300;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes oprtTagMask {

  0% {
    background: #2195f300;
  }
  99% {
    background: #2195f300;
  }
  100% {
    opacity: 1;
    background: #2196f3;
  }
}

.oprtTagFlash{
  animation-fill-mode: forwards;
  animation-name: oprtTagFlash;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0.3s;
  opacity: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes oprtTagFlash {

  0% {
    right:100%;
    left:0;
  }
    35% {
    left:0;
    right:0%;
  }
      65% {
    left:0;
    right:0;}
  100% {
    left:100%;
    right:0;
  }
}

.oprtTagFlashGone{
  animation-fill-mode: forwards;
  animation-name: oprtTagFlashGone;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-delay: 0.3s;
  opacity: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes oprtTagFlashGone {

  0% {
    right:0%;
    left:100%;
  }
    35% {
    left:0;
    right:0%;
  }
    65% {
    left:0;
    right:0;}
  100% {
    left:0%;
    right:100%;
  }
}

.oprtTagTxt{
  animation-fill-mode: forwards;
  animation-name: oprtTagTxt;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0.6s;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes oprtTagTxt {

  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.oprtTagTxtGone{
  animation-fill-mode: forwards;
  animation-name: oprtTagTxtGone;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0.6s;
  opacity: 1;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes oprtTagTxtGone {

  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

