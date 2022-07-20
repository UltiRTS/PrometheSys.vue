<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'

export default {
  data() {
    return {
      percentages: [5, 45, 50],
      tags: ['hello', 'test', 'test1'],
      width: document.documentElement.clientHeight * 0.2,
      height: document.documentElement.clientHeight * 0.2,
    }
  },
  computed: {
    ...mapState(useUserStore, ['mainMenuContent', 'modelMenuContent', 'ui']),
    pieSize() {
      return {
        width: this.$refs.dodPie.clientWidth,
        height: this.$refs.dodPie.clientHeight,
      }
    },
  },

  updated() {

  },
  methods: {
    ...mapActions(useUserStore, ['setmainMenuContent', 'setmodalMenuContent', 'setactiveWindow']),
    viewDod() {
      this.setmainMenuContent('dod')
    },

    viewModelTeam() {
      this.setmodalMenuContent('dod-p-game-team')
      this.setactiveWindow('modal')
    },

    pickMap() {
      this.ui.pushGrabberAction('mapPick')
      this.ui.activateGrabber()
      this.ui.setmodalMenuContent('dodPGameMap')
      this.ui.setactiveWindow('modal')
    },
  },
}
</script>

<template>
  <div class="dodPregame" style="position: absolute; top: 0px; left: 0px; width: 176vw; height: 100%; perspective: 2vh; overflow: hidden;">
    <div class="dodPregameBg" style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background:#989ba1;">
      <img src="imgs/blueprintswblue.png" style="position:absolute;width:100%;height:100%;filter:grayscale(100%) invert(80%);opacity:0.1;"><div class="grid" style="background-size:15vh 15vh;background-image:linear-gradient(to right, grey 1px, transparent 1px),linear-gradient(to bottom, grey 1px, transparent 1px);position:absolute;width:100%;height:100%;opacity:0.5;"></div><div class="grid" style="background-size:14vh 7vh;background-image:radial-gradient(circle, #ffffff6e 1px, rgba(0, 0, 0, 0) 1px);position:absolute;width:100%;height:100%;top:7%;left:1%;"></div><div class="grid" style="background-size:7vh 7vh;background-image:radial-gradient(circle, #00000036 1px, rgba(0, 0, 0, 0) 1px);position:absolute;width:150%;height:100%;"></div>
    </div>
    <div class="dodCenterInfoPanel" style="position: absolute; bottom: 18%;  width: 100vw; left: 39vw; top: 0%;filter: grayscale(100%);mix-blend-mode:screen;">
      <img src="imgs/minimapSample.png" style="-webkit-mask-image: linear-gradient(90deg, #0000ff00, green 9%, green 91%, #ff000000);width:100%;">
    </div>
    <div class="dodBtmInfoPanel" style="position: absolute; bottom: 7%; height: 15vw; width: 87%; left: 13vw; background: rgba(255, 255, 255, 0.65); transform: rotateX(0.3deg);">
      <div class="dodBtmInfoPanelDecro" style="position:absolute;bottom:9%;height:25vh;width:0.25%;left:-0.25%;background:#2196f3;"></div><div class="dodBtmInfoPanelDecro" style="position:absolute;bottom:9%;height:25vh;width:0.25%;left:100%;background:#2196f3;"></div><div class="vote" style="position:absolute;bottom:9%;height:25vh;width:20.2vw;left:0.8vw;overflow:hidden;color:#000000a8;font-family:'font4';">
        <div class="individualVote" style="position:relative;width:100%;padding-top:1vh;">
          <details style="position:relative;padding-bottom:2vh;">
            <summary style="font-size:2vh;">
              ?(Y/n) Change Map To Comet Catcher Redux
            </summary><p>This will change the map of this operation to the map named comet catcher redux. After enought vote passed, the map change will happen. Without enought votes, the operation might be conducted with the current map.</p>
          </details><div class="voteBarBg" style="position:absolute;bottom:0;width:100%;background:#00000052;height:0.2vh;"></div><div class="voteBar" style="position:absolute;bottom:0;width:52%;background:#6e6e6e;height:1.3vh;"></div><div style="position:absolute;bottom:0vh;right:0;">
            Y
          </div>
        </div><div class="individualVote" style="position:relative;width:100%;padding-top:1vh;">
          <details style="position:relative;padding-bottom:2vh;">
            <summary style="font-size:2vh;">
              ?(Y/n) Start operation
            </summary><p>This will change the map of this operation to the map named comet catcher redux. After enought vote passed, the map change will happen. Without enought votes, the operation might be conducted with the current map.</p>
          </details><div class="voteBarBg" style="position:absolute;bottom:0;width:100%;background:#00000052;height:0.2vh;"></div><div class="voteBar" style="position:absolute;bottom:0;width:26%;background:#6e6e6e;height:1.3vh;"></div><div style="position:absolute;bottom:0vh;right:0;">
            Y
          </div>
        </div><div class="individualVote" style="position:relative;width:100%;padding-top:1vh;">
          <details style="position:relative;padding-bottom:2vh;">
            <summary style="font-size:2vh;">
              ?(Y/n) Change Map To aaa
            </summary><p>This will change the map of this operation to the map named comet catcher redux. After enought vote passed, the map change will happen. Without enought votes, the operation might be conducted with the current map.</p>
          </details><div class="voteBarBg" style="position:absolute;bottom:0;width:100%;background:#00000052;height:0.2vh;"></div><div class="voteBar" style="position:absolute;bottom:0;width:80%;background:#6e6e6e;height:1.3vh;"></div><div style="position:absolute;bottom:0vh;right:0;">
            Y
          </div>
        </div>
      </div>
      <div class="voteSearch" style="position:absolute;bottom:15%;padding-top:3%;padding-right:1%;padding-left:1%;padding-bottom:3%;left:24.8vw;overflow:hidden;background:#545454;font-size:2vw;filter:drop-shadow(8px 8px 6px #545454);mix-blend-mode:multiply;">
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
      <div class="teamPrediction" style="position: absolute; bottom: 15%; width: 40%; left: 33.8vw; overflow: hidden; font-size: 2vw; filter: drop-shadow(rgb(84, 84, 84) 8px 8px 6px); height: 73%;">
        <div class="bg" style="position: absolute; width: 100%; height: 100%; background: rgb(133, 133, 133);opacity:0.5">
          <div style="position: absolute; font-weight: 900; font-size: 10vw; top: -17%; font-family: font1; left: -6%; color: rgba(0, 0, 0, 0.2);">
            予測
          </div><div style="position: absolute; font-weight: 900; font-size: 6vw; top: 32%; font-family: font3; left: 8%; color: rgb(255, 255, 255);">
            40%
          </div><div style="position: absolute; font-weight: 900; font-size: 2vw; top: 9%; font-family: font5; left: 3%; color: rgb(0, 0, 0); background: rgb(255, 255, 255); padding-left: 1vw; padding-right: 1vw; mix-blend-mode: screen;">
            Prediction
          </div>
        </div>
        <div ref="dodPie" class="pieChart" style="position: absolute; top: 0%; margin: 0px; left: 35%; width: 20vh; height: 20vh;">
          <pie :percentages="percentages" :tags="tags" />
        </div>
        <div class="deploymentComposition" style="position:absolute;left:73%;height:100%;width:25%;">
          <div style="position:absolute;bottom:0%;font-family:'font9';font-weight:900;color: #5050502b;font-size:5vw;right:0;">
            COMPOSITION
          </div>
          <div class="compositionContent" style="position:absolute;height:100%;width:100%;">
            <div class="compositionTeam1" style="position:relative;width:100%;margin-bottom: 12%;">
              <div class="compositionTeam1Header" style="position:absolute;font-weight:900;font-family: 'font4';font-size: 2vw;opacity:0.5;left: -20%;">
                <span style="color: #b5b5b5;">0</span>1
              </div><div class="compositionTeam1Header" style="font-weight:900;font-family: 'font9';font-size: 1vw;top: -4%;padding:0;margin:0;color: white;">
                TEAM A
              </div><div class="compositionTeam1Content" style="position:relative;margin:0;padding:0;height:0;top: -0.7vw;">
                <div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.1);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.5);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.8);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.2);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.7);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.5);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.9);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.5);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.3);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.7);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.6);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.4);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.7);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.9);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:white;"></div>
              </div>
            </div><div class="compositionTeam1" style="position:relative;width:100%;">
              <div class="compositionTeam1Header" style="position:absolute;font-weight:900;font-family: 'font4';font-size: 2vw;opacity:0.5;left: -20%;">
                <span style="color: #b5b5b5;">0</span>2
              </div><div class="compositionTeam1Header" style="font-weight:900;font-family: 'font9';font-size: 1vw;top: -4%;padding:0;margin:0;color: white;">
                TEAM B
              </div><div class="compositionTeam1Content" style="position:relative;margin:0;padding:0;height:0;top: -0.7vw;">
                <div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.1);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.5);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.8);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.2);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.7);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.5);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.9);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.5);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.3);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.7);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.6);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.4);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.7);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:rgba(255,255,255,0.9);"></div><div style="position:relative;display:inline-block;height:1vw;width:1vw;background:white;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dodPanelRight" style="position: absolute; right: 0px; color: black; font-size: 5vw; font-family: font1;width: 51%; height: 100%;">
        <div class="pGameUserOperation" style="position: absolute; height: 100%; width: 9%; left: 45%;opacity: 0.3;">
        </div>
      </div>
    </div>
    <div class="dodLeftOperationPanel" style="position: absolute; bottom: 32%; height: 81vh; width: 72vh; left: 22vw; filter: drop-shadow(30px 10px 18px #000);">
      <div style="font-size:9vh;-webkit-text-stroke-width:0.2vh;-webkit-text-stroke-color:#54545499;font-family: 'font9';text-align:right;color:#ffffffd9;top: 11%;position:absolute;right:0;">
        Dr. Kaltist
      </div>
      <div style="position:absolute;top: 27%;width:100%;background: #2196f3;font-family: 'font6';font-size:4vh;text-align:right;opacity: 0.8;" @click.stop="pickMap">
        Comet Catcher Redux
      </div>

      <div class="mapTags" style="position: absolute; top: 37%;width: 100%;padding: 0vh;font-size: 3vh;text-align:right;font-family: 'font5';font-weight:900;opacity: 0.9;">
        <span style="background: #5c5c5c;padding: 0.8vh;margin: 2vh;color: #ffffffe0;">FLAT</span>

        <span style="background: #5c5c5c;padding: 0.8vh;margin: 2vh;color: #ffffffe0;">WATER</span>
      </div>
      <div class="teamSetUp" style="position:absolute;top: 48%;height: 12vh;width: 40%;overflow:hidden;" @click.stop="viewModelTeam">
        <div style="position:absolute; left:0;width: 0.4vw;height:100%;background:#2196f3"></div><div style="position:absolute; left: 18%;width: 100%;height:100%;font-size:4vh;font-family:font1;background: #5454549c;top: 0%;"></div>
        <div style="position:absolute; left: 24%;width: 100%;height:100%;font-size:4vh;font-family:font1;top: -2%;">
          配備
        </div><div style="position:absolute; left: 24%;width: 100%;height:100%;font-size:4vh;font-family: 'font2';top: 37%;">
          35/35
        </div><div style="position:absolute; left: 24%;width: 100%;height:100%;font-size: 2vh;font-family: 'font6';font-weight:900;opacity:0.5;top: 75%;">
          Deployments
        </div><i class="fa fa-pencil-square-o" aria-hidden="true" style="position:absolute; left: 73%;width: 100%;height:100%;font-size: 9vh;top: 45%;opacity: 0.5;"></i>
      </div>

      <div class="teamSetUp" style="position:absolute;top: 48%;height: 12vh;width: 40%;overflow:hidden;left: 46%;">
        <div style="position:absolute; left: 17%;width: 100%;height:100%;font-size:4vh;font-family:font1;background: #5454549c;top: 0%;"></div>
        <div style="position:absolute; left: 24%;width: 100%;height:100%;font-size:4vh;font-family:font1;top: -2%;">
          フレンズ
        </div><div style="position:absolute; left: 24%;width: 100%;height:100%;font-size:4vh;font-family: 'font2';top: 37%;">
          35/35
        </div><div style="position:absolute; left: 24%;width: 100%;height:100%;font-size: 2vh;font-family: 'font6';font-weight:900;opacity:0.5;top: 75%;">
          friends
        </div><i class="fa fa-pencil-square-o" aria-hidden="true" style="position:absolute; left: 73%;width: 100%;height:100%;font-size: 9vh;top: 45%;opacity: 0.5;"></i>
      </div>
    </div>
    <div class="dodRightOperationPanel" style="position:absolute;bottom:32%;height:65vh;width:30vw;right:34vw;">
      <div class="pGameUserOperation" style="position:absolute;width:100%;top:66%;left: -21%;mix-blend-mode:screen;">
        <div style="font-size:25vh;font-family:'font5';opacity:0.3;font-weight:900;">
          作業
        </div><p style="position:absolute;background:black;color:white;top:52%;left:10%;font-size:4vh;font-family:font1;">
          TEST
        </p>
      </div><div class="pGameUserOperationTitle" style="position:absolute;height:45%;width:100%;top:56%;left:17%;mix-blend-mode:screen;">
        <div style="width:100%;height:1%;background: #ffffff61;top:32%;position:absolute;right:0;"></div><p style="position:absolute;background:black;color:white;top:-2%;left:43%;font-size:4vh;font-family:'font2';">
          OPERATIONS
        </p>
      </div>
      <div class="pGameUserOperation" style="position: absolute; height: 14.1%; width: 40%; left: 77%; overflow:hidden;; background: #2196f3;top: 94.6%;filter:drop-shadow(8px 8px 6px #545454);">
        <div style="position:absolute;font-size: 3vw;top: 28%;left: 11%;color: #ffffffc7;font-family: font2;font-weight: 100;">
          INIT
        </div>
        <div style="position:absolute;font-size: 1vw;top: 11%;left: 13%;color: white;font-family: font5;font-weight:900;background: black;mix-blend-mode: screen;">
          OPERATION
        </div>
        <img src="imgs/btlop1.png" style="position: absolute; height: 204%; top: -28%; left: 39%;opacity: 0.2;">
      </div><div class="pGameUserOperation" style="position: absolute; height: 14.1%; width: 40%; left: 34%; overflow:hidden;; background: #545454;top: 94.6%;filter:drop-shadow(8px 8px 6px #545454);" @click="viewDod">
        <div style="position:absolute;font-size: 3vw;top: 28%;left: 11%;color: #ffffffc7;font-family: font2;font-weight: 100;">
          HALT
        </div>
        <div style="position:absolute;font-size: 1vw;top: 11%;left: 13%;color: white;font-family: font5;font-weight:900;background: black;mix-blend-mode: screen;">
          OPERATION
        </div>
        <img src="imgs/btlop3.png" style="position: absolute; height: 204%; top: -28%; left: 39%;opacity: 0.2;">
      </div>
      <div class="noncanonicalOpts" style="position:absolute;top: 62%;width:100%;height:100%;right: -33%;">
        <img src="imgs/btlop3.png" style="position:absolute;width:45%;">
        <img src="imgs/btlop2.png" style="position:absolute;width:45%;left: 26%;"><img src="imgs/btlop1.png" style="position:absolute;width:45%;left: 52%;">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

