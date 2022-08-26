<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
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
  <div style="background: #EDEAE7;position:absolute;height:100%;width:100%;margin:0;top:0;left:0;">
    <div class="email3dSpace" style="position:absolute;top: 0%;height:100%;left: -6%;width:40%;perspective: 36vh;">
      <div class="card3dStack" style="position:absolute;height:52%;left:0%;width:125%;transform:translateY(96vh) translateX(12vh) rotateY(-1deg) rotateX(0deg);transform-style:preserve-3d;">
        <div class="individualEmailCard" style="position:absolute;transform:translateZ(-24vh) translateY(-17vh) translateX(-96vh) rotateY(5deg);backdrop-filter:blur(3.6px);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(9px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(-23vh) translateY(-17vh) translateX(-89vh) rotateY(5deg);backdrop-filter:blur(3.6px);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(8px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(-21vh) translateY(-17vh) translateX(-81vh) rotateY(5deg);backdrop-filter:blur(3.6px);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(7px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(-18vh) translateY(-17vh) translateX(-73vh) rotateY(5deg);backdrop-filter:blur(3.6px);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(6px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(-13vh) translateY(-17vh) translateX(-63vh) rotateY(4deg);backdrop-filter:blur(3.6px);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(5px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(-8vh) translateY(-17vh) translateX(-54vh) rotateY(3deg);backdrop-filter:blur(3.6px);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(4px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(-3vh) translateY(-17vh) translateX(-46vh) rotateY(2deg);backdrop-filter:blur(3.6px);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(3px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(2vh) translateY(-17vh) translateX(-39vh) rotateY(1deg);backdrop-filter:blur(3.6px);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(2px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(7vh) translateY(-17vh) translateX(-33vh) rotateY(0deg);backdrop-filter:blur(3.6px);filter: drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(1px);top:40%;left:40%;height:30%;width:19%;">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div><div class="individualEmailCard" style="position:absolute;transform:translateZ(12vh) translateY(-17vh) translateX(-28vh) rotateY(-1deg);top:40%;left:40%;height:26vh;width:33vh;backdrop-filter:blur(3.6px);filter: drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5));">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;/* left:18%;*/height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%;">
              CLAIMABLE
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;/* background:white;*/color:white;font-weight:900;padding-left:4vh;">
              4 HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;/* background:white;*/color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              SYSTEM ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right: 11%;/* padding-right:3%; */height: 67%;color:white;font-weight:900;/* padding-left:4vh; */">
              BETA TESTING REWARDS
              <div style="position:absolute;width: 100%;height: 25%;top: 28%;left: 0%;/* background:green; */overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width: 163%;top: -2%;left: -12%;opacity: 1;filter:invert(100%)">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

