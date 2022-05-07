<script>
import { mapState } from 'pinia'
import { useUserStore } from '../stores'

export default {
  data() {
    return {
      activeWindow: 'menu',
      mouseOn: 'default',
    }
  },
  computed: {
    ...mapState(useUserStore, ['chatLog']),
    shouldIlightUpModal() {
      if (this.activeWindow === 'modal')
        return 1

      else if (this.mouseOn === 'modal')
        return 0.3

      else
        return 0.1
    },

    shouldIlightUpMenu() {
      if (this.activeWindow === 'menu')
        return 1

      else if (this.mouseOn === 'menu')
        return 0.3

      else
        return 0.1
    },
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<template>
  <div
    id="bg"
    style="top:0%; position:fixed;width:100%;height:100%;background: linear-gradient(to bottom, #1e5799 -75%, rgba(0, 29, 60, 0) 75%);"
  >
    <img id="bgPic" alt="background" src="../../public/imgs/bg.png" style="position:fixed; width:100%;top:0;left:0;">
  </div>
  <div
    id="home" data-depth="2" style="perspective: 500vw; backface-visibility: hidden;
  position: absolute;height: 100%;width: 100%;top: 0px;left: 0px;/* margin: 0px; */overflow:hidden;margin:0;"
  >
    <div id="homeUIContainer" :class="activeWindow" style="perspective: 100vw; position: absolute; height: 100%; width: 100%; display: block; left: 0px; top: 0px;">
      <div
        id="mainContent" style="transform: translateZ(0vw);
                      position:absolute;color:white;width: 181%;height: 181%;top: -39%;left: -18%;background:rgba(255,255,255,0.05);" @click="activeWindow='default'"
      />
      <div id="modalMenu" :style="{opacity:shouldIlightUpModal}" style="transform: rotateY(15.6deg) translateZ(10vw) translateX(-55vw); top: 5%;width: 56%; height: 84%; position: absolute; backdrop-filter: blur(9px);" @click="activeWindow='modal'" @mouseover="mouseOn=&quot;modal&quot;" @mouseleave="mouseOn='default'">
        <Chat :chat-log="chatLog" />
      </div>
      <div id="rightHome" class="rightHome" :style="{opacity:shouldIlightUpMenu}" style="transform:rotateY(-15.6deg) translateZ(-147vw) translateX(209vw); width: 100%; height: 102%; position: absolute; backdrop-filter: blur(53px);top: -41%;" @click="activeWindow='menu'" @mouseover="mouseOn=&quot;menu&quot;" @mouseleave="mouseOn='default'">
        <img src="assets/horizontalSep1.png" style="position:absolute;top:-1%;height: 5px;width: 93%;opacity:0.3;">
        <div style="position:absolute;height: 6%;width: 93%;background: rgb(202 246 255 / 5%);top: 0%;padding:2%;">
          <i class="fa fa-wifi" aria-hidden="true" style="font-size: 2vw;color: #ffffff8c;" />
          <span id="sysStatusPing" style="font-size: 2vw;color: #ffffff8c;margin-left: 2%;">100ms</span>
          <i class="fa fa-sitemap" aria-hidden="true" style="font-size: 2vw;color: #ffffff8c;margin-left: 5%;" />
          <span id="sysStatusInt" style="font-size: 2vw;color: #ffffff8c;margin:1%;">All Systems Online</span>
          <i class="fa fa-clock-o" aria-hidden="true" style="font-size: 2vw;color: #ffffff8c;margin-left: 5%;" />
          <span style="font-size: 2vw;color: #ffffff8c;margin:1%;">2024/09/28 22:15</span>
          <i class="fa fa-id-card-o" aria-hidden="true" style="font-size: 2vw;color: #ffffff8c;margin-left: 5%;" />
          <span id="sysStatusUsr" style="font-size: 2vw;color: #ffffff8c;margin:1%;">Dr. Kal'tist</span>
        </div>

        <div style="overflow:hidden;top:11%;position:absolute;height:100%;width:100%;">
          <div id="" class="ttblock3" style="position:absolute;width:25%;left:-12.5%;transform: skew(20deg);height:100%;" />
          <div id="" class="ttblock" style="position:absolute;width:25%;left:12.5%;      transform: skew(20deg);height:100%;" />
          <div id="" class="ttblock2" style="position:absolute;width:25%;left:37.5%;      transform: skew(20deg);height:100%;" />
          <div id="" class="ttblock" style="position:absolute;width:25%;left:62.5%;      transform: skew(20deg);height:100%;" />
          <div id="" class="ttblock3" style="position:absolute;width:25%;left:87.5%;        transform: skew(20deg);height:100%;" />
        </div>

        <div class="sanity rightHomeMainBtns" style="top:11%;position:absolute;height:25%;width:45%;background: rgb(177 182 183);">
          <div style="position:absolute;width: 50.1%;/* height:80%; */left: 11%;font-size: 10vw;overflow:hidden;height:100%;">
            <p style="position:absolute;width: 93.7%;background: #00000045;color: #ffffff96;font-size:2vw;bottom: 20%;padding-top: 5%;padding-bottom: 5%;text-align:right;padding-right: 4%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              SANITY
            </p>
            <i class="fa fa-bolt" aria-hidden="true" style="position:absolute;top: 20%;left: 3%;color: #949494fa;font-size: 13vw;" />
            <span style="position:absolute;top: 36%;left: 34%;font-size: 7vw;color: #00000082;filter: drop-shadow(8px 6px 6px black);">125</span>
          </div>

          <div style="position:absolute;width: 23%;height: 100%;left: 63%;font-size: 10vw;overflow:hidden;">
            <span style="position:absolute;top: 42%;/* left: 31%; */font-size: 4vw;color: #00000082;width: 88.5%;text-align:right;filter: drop-shadow(8px 6px 6px black);">/240</span><i class="fa fa-plus" aria-hidden="true" style="position:absolute;top: 65.7%;/* left: -9%; *//* color: #9e9e9e; */font-size:2vw;background: #00000045;color: #ffffff96;width: 91%;text-align:center;padding-top: 7.8%;padding-bottom: 3.8%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));" />
          </div>
        </div>

        <div class="personalStats rightHomeMainBtns" style="position:absolute;height:25%;width: 53%;background:rgba(255,255,255,0.5);left: 44.9%;top:11%;">
          <div style="position:absolute;width: 36%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 6vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              戦い
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 2.8vw;/* font-weight:900; */background: #00000045;color: #ffffff73;padding: 5.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              BATTLE
            </p>
          </div>
          <div style="position:absolute;width: 48%;/* height:30%; */right: 6%;overflow:hidden;height:100%;">
            <i class="fa fa-gg" aria-hidden="true" style="position:absolute;font-weight:900;font-size: 21vw;color: #0000000d;left: -1%;" />

            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 6%;line-height: 2vw;font-weight:900;">
              Paradox Simulation
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 27%;line-height: 2vw;font-weight:900;">
              PROMOTED: leader
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 50%;line-height: 2vw;font-weight:900;">
              Lone Journey
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 62%;line-height: 2vw;font-weight:900;">
              floor 3, stage 41
            </p>
            <div style="position:absolute;height: 9px;background:#2196f3;width:100%;bottom:0%;" />
          </div>
        </div>

        <div class="commander rightHomeMainBtns" style="position:absolute;height: 19%;width: 53%;background: rgb(177 182 183);top: 39%;overflow:hidden;">
          <div style="position:absolute;width: 55%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 37%;font-size: 6vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              司令
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;/* font-weight:900; */background: #00000045;color: #ffffff73;padding: 4.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              COMMANDANT
            </p>
          </div>
          <div style="position:absolute;width: 51%;/* height:30%; */right: 0%;overflow:hidden;height:100%;">
            <i class="fa fa-graduation-cap" aria-hidden="true" style="position:absolute;/* font-weight:900; */font-size: 16vw;color: #0000000d;left: 32%;" />

            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 6%;line-height: 2vw;font-weight:900;right: 5%;">
              Primary Commander
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 27%;line-height: 2vw;font-weight:900;right: 5%;">
              Guardian
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 50%;line-height: 2vw;font-weight:900;right: 5%;">
              Commander Configs
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 74%;line-height: 2vw;font-weight:900;right: 5%;">
              Rifle, Heavy Machine Guns
            </p>
            <div style="position:absolute;height: 9px;background:#2196f3;width:100%;bottom:0%;" />
          </div>
        </div>

        <div class="taskForce rightHomeMainBtns" style="position:absolute;height: 19%;width: 36%;background:rgba(255,255,255,0.5);left: 53.9%;top: 39%;overflow:hidden;">
          <div style="position:absolute;width: 46%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 6vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              軍
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;/* font-weight:900; */background: #00000045;color: #ffffff73;padding: 5.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              TASKFORCE
            </p>
          </div>
          <div style="position:absolute;width: 48%;/* height:30%; */right: -7%;overflow:hidden;height:100%;">
            <i class="fa fa-users" aria-hidden="true" style="position:absolute;/* font-weight:900; */font-size: 10vw;color: #0000000d;left: 15%;top: 16%;" />

            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 6%;line-height: 2vw;font-weight:900;">
              Primary Squad
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 31%;line-height: 2vw;font-weight:900;">
              Jump Jets
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #2196f3;font-size: 2vw;top: 53%;line-height: 2vw;font-weight:900;">
              Squad Members
            </p>
            <p style="position:absolute;width: 73%;text-align:right;color: #4e4e4eb3;font-size: 1.4vw;top: 77%;line-height: 2vw;font-weight:900;">
              Edit Members
            </p>
            <div style="position:absolute;height: 9px;background:#2196f3;width:100%;bottom:0%;" />
          </div>
        </div>

        <div class="forum rightHomeMainBtns" style="position:absolute;height: 19%;width: 30%;background: #2196f3;left: -0.1%;top: 60%;">
          <div style="position:absolute;width: 100%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 3vw;font-weight:900;color: #ffffffad;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.5));">
              フォーラム
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;font-weight:900;background: #ffffff82;color: #2196f3;padding: 4.1%;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.9));">
              FORUMS
            </p>
          </div>

          <i class="fa fa-comments-o" aria-hidden="true" style="position:absolute;/* font-weight:900; */font-size: 10vw;color: #ffffff0d;left: 65%;top: 16%;" />
        </div>

        <div class="moderationNaccount rightHomeMainBtns" style="position:absolute;height: 19%;width: 64%;background: #2196f3;left: 30.9%;top: 60%;overflow:hidden;">
          <div style="position:absolute;width: 33%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 3vw;font-weight:900;color: #ffffffad;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.5));">
              節度
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;font-weight:900;background: #ffffff82;color: #2196f3;padding: 4.1%;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.9));">
              Moderation
            </p>
            <i class="fa fa-book" aria-hidden="true" style="position:absolute;/* font-weight:900; */font-size: 10vw;color: #ffffff0d;left: 52%;top: 26%;" />
          </div>
          <img src="assets/separator.png" style="position:absolute;left: 43%;height:100%;width:4px;opacity: 50%;">

          <div style="position:absolute;width: 41%;height:100%;left: 51%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 3vw;font-weight:900;color: #ffffffad;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.5));">
              プロフィール
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;font-weight:900;background: #ffffff82;color: #2196f3;padding: 3.1%;filter: drop-shadow(8px 6px 6px rgba(255,255,255,0.9));">
              Account Management
            </p>

            <i class="fa fa-wrench" aria-hidden="true" style="position:absolute;/* font-weight:900; */font-size: 10vw;color: #ffffff0d;left: 58%;top: 20%;" />
          </div>
        </div>

        <div class="warehouse rightHomeMainBtns" style="position:absolute;height: 19%;width: 34%;background:rgba(255,255,255,0.5);left: -0.1%;top: 81%;">
          <div style="position:absolute;width: 100%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 4vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              ストレージ
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;/* font-weight:900; */background: #00000045;color: #ffffff73;padding: 3.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              STORAGE
            </p>
          </div>
          <i class="fa fa-home" aria-hidden="true" style="position:absolute;/* font-weight:900; */font-size: 10vw;color: #0000000d;left: 74%;top: 16%;" />
        </div>

        <div class="researchCenter rightHomeMainBtns" style="position:absolute;height: 19%;width: 34%;background:rgba(255,255,255,0.5);left: 34.9%;top: 81%;">
          <div style="position:absolute;width: 100%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 4vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              リサーチ
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;/* font-weight:900; */background: #00000045;color: #ffffff73;padding: 3.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              RESEARCH
            </p>
          </div>
          <i class="fa fa-flask" aria-hidden="true" style="position:absolute;/* font-weight:900; */font-size: 10vw;color: #0000000d;left: 74%;top: 16%;" />
        </div>

        <div class="homePlanet rightHomeMainBtns" style="position:absolute;height: 19%;width: 34%;background:rgba(255,255,255,0.5);left: 69.9%;top: 81%;">
          <div style="position:absolute;width: 100%;height:100%;left: 9%;overflow:hidden;">
            <p style="position:absolute;top: 39%;font-size: 4vw;font-weight:900;color: #3a3a3ae6;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.5));">
              ベース
            </p>
            <p style="position:absolute;top: 65.7%;font-size: 1.8vw;/* font-weight:900; */background: #00000045;color: #ffffff73;padding: 3.1%;filter: drop-shadow(8px 6px 6px rgba(50,50,50,0.9));">
              BASE
            </p>
          </div>
          <i class="fa fa-globe" aria-hidden="true" style="position:absolute;/* font-weight:900; */font-size: 10vw;color: #0000000d;left: 36%;top: 16%;" />
        </div>

        <img src="assets/horizontalSep2.png" style="position:absolute;top: 101%;height: 5px;width: 93%;opacity:0.3;">
      </div>
    </div>
  </div>
</template>

<style scoped>

@font-face {
            font-family: JuneBug;
            src: url('assets/iosevka-ss09-extralight.ttf');
        }

        @font-face {
            font-family: JuneBug2;
            src: url('assets/Monoid-Regular.ttf');
        }

        @font-face {
            font-family: JuneBug3;
            src: url('assets/Envy Code R.ttf');
        }

        body {
            font-family: "Roboto Condensed", sans-serif;
        }

        @font-face {
            font-family: JuneBug4;
            src: url('assets/good_times_rg.ttf');
        }

        @font-face {
            font-family: JuneBug5;
            src: url('assets/URWGothic-Book.otf');
        }

        .rightHome {

            animation-fill-mode: forwards;
            animation-name: homeAnime;
            animation-duration: 0.7s;
            animation-iteration-count: 1;

            animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);

        }

        @keyframes homeAnime {

            0% {
                height: 0%;
            }

            100% {
                height: 172%;
            }
        }

        .rightHomeMainBtns {

            animation-fill-mode: forwards;
            animation-name: rightHomeMainBtns;
            animation-duration: 0.7s;
            animation-iteration-count: 1;
            animation-delay: 1s;
            opacity: 0;

        }

        @keyframes rightHomeMainBtns {

            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        .ttblock {
            opacity: 1;
            animation-fill-mode: forwards;
            animation-name: ttblock;
            animation-duration: 0.35s;
            animation-iteration-count: 1;
            animation-delay: 0.5s;
        }

        .ttblock2 {
            opacity: 1;
            animation-fill-mode: forwards;
            animation-name: ttblock;
            animation-duration: 0.35s;
            animation-iteration-count: 1;
            animation-delay: 0.6s;
        }

        .ttblock3 {
            opacity: 1;
            animation-fill-mode: forwards;
            animation-name: ttblock;
            animation-duration: 0.35s;
            animation-iteration-count: 1;
            animation-delay: 0.7s;

        }

        @keyframes ttblock {
            0% {
                background: rgba(255, 255, 255, 0)
            }

            25% {
                background: rgba(255, 255, 255, 1)
            }

            50% {
                background: rgba(255, 255, 255, 0)
            }

            51% {
                background: rgba(0, 0, 0, 0)
            }

            95% {
                background: rgba(0, 0, 0, 0.5)
            }

            99% {
                background: rgba(0, 0, 0, 0)
            }

            100% {
                opacity: 0;
            }
        }

        .default{
            animation-fill-mode: forwards;
            animation-name: homeUIContainerDefault;
            animation-duration: 0.7s;
            animation-iteration-count: 1;
            animation-delay: 0s;
        }

        @keyframes homeUIContainerDefault {
            0% {

            }

            100% {
                transform:rotateY(3deg) translateZ(-376vw) translateX(0vw);
            }
        }

        .menu{
            animation-fill-mode: forwards;
            animation-name: homeUIContainerRight;
            animation-duration: 0.3s;
            animation-iteration-count: 1;
            animation-delay: 0s;
            transform: rotateY(0deg) translateZ(-197vw) translateX(-17vw);
        }

        @keyframes homeUIContainerRight {
            0% {
                transform:rotateY(3deg) translateZ(-376vw) translateX(0vw);
            }

            100% {
                transform:rotateY(10.3deg) translateZ(-381vw) translateX(0vw)
            }
        }

        .modal{
            transform: rotateY(0deg) translateZ(-197vw) translateX(-17vw);
            animation-fill-mode: forwards;
            animation-name: homeUIContainerLeft;
            animation-duration: 0.3s;
            animation-iteration-count: 1;
            animation-delay: 0s;
        }

        @keyframes homeUIContainerLeft {
            0% {
                transform:rotateY(3deg) translateZ(-376vw) translateX(0vw);
            }

            100% {
                transform: rotateY(-8deg) translateZ(-381vw) translateX(0vw);
            }
        }
</style>
