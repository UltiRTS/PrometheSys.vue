<script>
export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {

      isBottom: false,

    }
  },
  computed: {

  },

  updated() {

  },
  methods: {

  },
}
</script>

<template>
  <div>
    <div class="dodPregame" style="position:absolute;top:0;left:0;width: 176vw;height:100%;perspective:2vh;overflow:hidden;">
      <div class="dodPregameBg" style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background:#989ba1;">
        <img src="imgs/blueprintswblue.png" style="position:absolute;width:100%;height:100%;filter:grayscale(100%) invert(80%);opacity:0.1;"><div class="grid" style="background-size: 15vh 15vh;background-image: linear-gradient(to right, grey 1px, transparent 1px),linear-gradient(to bottom, grey 1px, transparent 1px);position:absolute;width:100%;height:100%;opacity:0.5;" /><div class="grid" style="background-size:14vh 7vh;background-image:radial-gradient(circle, #ffffff6e 1px, rgba(0, 0, 0, 0) 1px);position:absolute;width:100%;height:100%;top:7%;left:1%;" /><div class="grid" style="background-size:7vh 7vh;background-image:radial-gradient(circle, #00000036 1px, rgba(0, 0, 0, 0) 1px);position:absolute;width:150%;height:100%;" />
      </div><div class="dodBtmInfoPanel" style="position:absolute;bottom: 7%;height:29vh;width: 87%;left: 13vw;background:#ffffffa6;transform:rotateX(0.3deg);">
        <div class="dodBtmInfoPanelDecro" style="position:absolute;bottom:9%;height:25vh;width:0.25%;left:-0.25%;background:#2196f3;" /><div class="dodBtmInfoPanelDecro" style="position:absolute;bottom:9%;height:25vh;width:0.25%;left: 100%;background:#2196f3;" /><div class="vote" style="position:absolute;bottom:9%;height:25vh;width:20.2vw;left:0.8vw;overflow:hidden;color: #000000a8;font-family: 'font4';">
          <div class="individualVote" style="position:relative;width:100%;padding-top:1vh;">
            <details style="position:relative;padding-bottom:2vh;">
              <summary style="font-size:2vh;">
                ?(Y/n) Change Map To Comet Catcher Redux
              </summary><p>This will change the map of this operation to the map named comet catcher redux. After enought vote passed, the map change will happen. Without enought votes, the operation might be conducted with the current map.</p>
            </details><div class="voteBarBg" style="position:absolute;bottom:0;width:100%;background:#00000052;height:0.2vh;" /><div class="voteBar" style="position:absolute;bottom:0;width:52%;background:#6e6e6e;height:1.3vh;" /><div style="position:absolute;bottom:0vh;right:0;">
              Y
            </div>
          </div><div class="individualVote" style="position:relative;width:100%;padding-top:1vh;">
            <details style="position:relative;padding-bottom:2vh;">
              <summary style="font-size:2vh;">
                ?(Y/n) Start operation
              </summary><p>This will change the map of this operation to the map named comet catcher redux. After enought vote passed, the map change will happen. Without enought votes, the operation might be conducted with the current map.</p>
            </details><div class="voteBarBg" style="position:absolute;bottom:0;width:100%;background:#00000052;height:0.2vh;" /><div class="voteBar" style="position:absolute;bottom:0;width:26%;background:#6e6e6e;height:1.3vh;" /><div style="position:absolute;bottom:0vh;right:0;">
              Y
            </div>
          </div><div class="individualVote" style="position:relative;width:100%;padding-top:1vh;">
            <details style="position:relative;padding-bottom:2vh;">
              <summary style="font-size:2vh;">
                ?(Y/n) Change Map To aaa
              </summary><p>This will change the map of this operation to the map named comet catcher redux. After enought vote passed, the map change will happen. Without enought votes, the operation might be conducted with the current map.</p>
            </details><div class="voteBarBg" style="position:absolute;bottom:0;width:100%;background:#00000052;height:0.2vh;" /><div class="voteBar" style="position:absolute;bottom:0;width:80%;background:#6e6e6e;height:1.3vh;" /><div style="position:absolute;bottom:0vh;right:0;">
              Y
            </div>
          </div>
        </div><div class="voteSearch" style="position:absolute;bottom: 15%;padding-top: 3%;padding-right: 1%;padding-left: 1%;padding-bottom: 3%;left: 24.8vw;overflow:hidden;background: #545454;font-size:2vw;filter: drop-shadow(8px 8px 6px #545454);mix-blend-mode:multiply;">
          <i class="fa fa-search" aria-hidden="true" />
        </div><div class="teamPrediction" style="position:absolute;bottom: 15%;width:40%;left: 33.8vw;overflow:hidden;font-size:2vw;filter: drop-shadow(8px 8px 6px #545454);height: 73%;/* background: #8b8b8b; */">
          <div class="bg" style="position:absolute;width:100%;height:100%;background: #858585;">
            <div style="position:absolute;font-weight:900;font-size: 23vh;top: -17%;font-family: 'font1';left: -6%;color: #00000033;">
              予測
            </div>
            <div style="position:absolute;font-weight:900;font-size: 11vh;top: 32%;font-family: 'font3';left: 8%;color: #ffffff;">
              40%
            </div><div style="position:absolute;font-weight:900;font-size: 4vh;top: 9%;font-family: 'font5';left: 3%;color: #000000;background: #ffffff;padding-left:1vw;padding-right:1vw;mix-blend-mode: screen;">
              Prediction
            </div>
          </div>
        </div>
      </div><div class="dodLeftOperationPanel" style="position:absolute;bottom:32%;height:65vh;width:30vw;left:0vw;background:red;" /><div class="dodRightOperationPanel" style="position:absolute;bottom:32%;height:65vh;width:30vw;right:0vw;background:red;" /><div class="dodCenterInfoPanel" style="position:absolute;bottom:32%;height:65vh;width:38vw;left:31vw;background:red;" />
    </div>
  </div>
</template>

<style scoped>

</style>

