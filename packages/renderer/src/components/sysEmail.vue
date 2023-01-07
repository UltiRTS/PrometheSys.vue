<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
import corpEmoji from './corpEmoji.vue'
export default {
  components: { corpEmoji },
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      isReloaded: true,
    }
  },
  computed: {
    ...mapState(useUserStore, ['confirmations', 'network', 'ui']),
    cardInfo() {
      // if (this.isReloaded)
      return this.confirmations[0]
      // return this.confirmations[1]
    },

  },

  updated() {

  },
  methods: {
    getPosiData(index) {
      // console.log(`aaaaaaaaaaaaaaaa${String(index)}`)
      if (index <= 9 && this.isReloaded)
        return `positionData${index}`
      else if (index > 0 && index <= 10 && !this.isReloaded)
        return `positionData${index - 1}`
      return 'overflew'
    },
    getCardCateg(type) {
      switch (type) {
        case 'friend':
          return 'SOCIAL'
        default:
          return 'SYSTEM'
      }
    },
    confirmFCard() {
      const confID = 0

      this.ui.pushConfirm('INCOMING REQUEST', 'FRIEND CONFIRM').then(() => {
        this.isReloaded = false
        const params = {
          confirmationId: this.confirmations[confID].id,
          type: this.confirmations[confID].type,
          agree: true,
        }

        setTimeout(() => {
          this.network.confirmEmail(params)
          this.isReloaded = true
        }, 1000)
        this.ui.pushUINewNotif({ title: 'FRND', msg: 'Accepted Friend', class: 'aaa' })
      },
        () => {
          this.isReloaded = false
          const params = {
            confirmationId: this.confirmations[confID].id,
            type: this.confirmations[confID].type,
            agree: false,
          }
          setTimeout(() => {
            this.network.confirmEmail(params)
            this.isReloaded = true
          }, 1000)
          this.ui.pushUINewNotif({ title: 'FRND', msg: 'Rejected Friend', class: 'aaa' })
        })
    },
  },
}
</script>

<template>
  <div data-v-6fa0e716="" style="background: rgb(237, 234, 231); position: absolute; height: 100%; width: 100%; margin: 0px; top: 0px; left: 0px;">
    <div class="emailBg" style="position:absolute;height:100%;top:0;width:100%;">
      <div style="position:absolute;height:100%;top:0%;width: 0.1vw;background: #000000a1;left: 20%;">
      </div>
      <div style="position:absolute;top: 29%;left: 11%;height: 27%;width: 21%;background:black;overflow:hidden;">
        <div id="confirmCheckBg" style="position:absolute;left: 214%;top: -155%;height: 529%;width: 184%;transform:rotate(108deg);">
          <img src="/imgs/aaaa.jpg" style="position:absolute;top:85%;width:423%;opacity: 0.7;filter: invert(0) contrast(2) grayscale(1000%) brightness(149.7%);">
          <div style="position:absolute;top:42%;height:229%;width:141%;background-image: linear-gradient(to right, #000000 2px, transparent -1px), linear-gradient(#000000 2px, transparent -1px);background-repeat:repeat;background-size: 4px 4px;;">
          </div>
        </div>
        <div style="position:absolute;top: 7%;height:4vh;width:4vh;border-radius:50%;background: #ffffff61; right: 5%;">
        </div>
        <div style="position:absolute;color:white;top: 48%;left: 4%;font-size: 1.9vh;width: 47vh;letter-spacing: 0.4vh;text-align:center;font-family: font10;font-weight:900;">
          Powered by THEA, Inc.
        </div>
        <div style="position:absolute;color:white;top: 15%;left: 14%;font-size: 14vh;font-family: font5;font-weight:900;letter-spacing: -0.5vh;mix-blend-mode:screen;">
          RQST
          <div style="position:absolute;background:black;color:white;top: 46%;left: 7%;font-size: 2.3vh;width: 27.2vh;letter-spacing: 0vh;text-align:center;font-family: font1;">
            FRIEND REQUEST
          </div>
        </div>
      </div>
    </div>
    <div class="email3dSpace" style="position:absolute;top:0%;height:100%;left:-6%;width:40%;perspective:36vh;">
      <div v-if="confirmations.length > 0" class="card3dStack" style="position:absolute;height:52%;left:0%;width:125%;transform:translateY(96vh) translateX(12vh) rotateY(-1deg) rotateX(0deg);transform-style:preserve-3d;">
        <div v-for="(confirmation, index) in confirmations" :key="index" :class="[{ individualEmailCardDepletion: !isReloaded }, getPosiData(index)]" style="position:absolute;backdrop-filter:blur(3.6px);top:40%;left:40%;height:30%;width:19%;">
          <div style="position:absolute;top:-5%;right:-50%;color:black;">
            {{ index }}
          </div>
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);">
            </div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div>
          <div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;">
            </div>
            <div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%; text-transform: uppercase;">
              {{ confirmation.type }}
            </div>
            <div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div>
            <div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;color:white;font-weight:900;padding-left:4vh;">
              4{{ index }} HRs
            </div>
            <div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              {{ getCardCateg(confirmation.type) }} ‣
            </div>
            <div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right:11%;height:67%;color:white;font-weight:900;">
              BETA TESTING REWARDS <div style="position:absolute;width:100%;height:25%;top:28%;left:0%;overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width:163%;top:-2%;left:-12%;opacity:1;filter:invert(100%);">
              </div>
            </div>
            <div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="emailDetailContent" style="position:absolute;top:0%;right:0%;height:100%;width:63%;perspective:36vh;">
      <div style="position:absolute;height:73%;right:6%;width:209vh;transform:rotateY(-1deg);top:11%;transform-style: preserve-3d;">
        <div class="emailBtmBg" style="position:absolute;top:-2%;right:1%;height:100%;width:83%;background:#00000042;">
        </div>
        <div v-if="confirmations.length > 0 && isReloaded" style="transform-style: preserve-3d;position:absolute;top:0;height:100%;right:0;width:100%;background:#fffbf094;overflow:hidden;backdrop-filter:blur(9px);filter:drop-shadow(9px 13px 0px rgba(255,255,255,0.5));">
          <img src="/imgs/hexabg.jpg" style="position:absolute;filter:grayscale(99%);right:0%;height:96%;opacity:0.1;-webkit-mask-image:linear-gradient(87deg,rgb(0 255 220 / 0%) 49%, rgb(255 0 0));">
          <!----<div v-if="cardInfo.type === 'friend'" class="frdReq">
            <div style="position:absolute;font-family:font5;font-weight:900;top:0%;right:-1%;font-size:29vh;color:#daa70e4f;">
              REQUEST
            </div>
            <div class="usrOptionalInfo" style="position:absolute;top:19%;left:21%;height:29%;width:53%;background:#ffffff7a;filter:drop-shadow(9px 13px 0px rgba(255,255,255,0.3));">
              <div style="position:absolute;top:0;left:0;height:19%;background:black;color:white;width:100%;overflow:hidden;">
                <div style="font-weight:900;position:absolute;font-size:7vh;font-family:font5;color:#ffffff38;top:-21%;right:4%;">
                  {{ JSON.parse(cardInfo.payload).targetVal }}
                </div><div style="position:absolute;font-size:4vh;font-family:font5;color:white;top:26%;right:1%;">
                  Dr.&nbsp;{{ JSON.parse(cardInfo.payload).targetVal }}
                </div>
              </div><div style="position:absolute;top:52px;left:0;height:80%;color:white;width:100%;overflow:hidden;">
                <div style="position:absolute;font-size:4vh;font-family:font5;color:black;top:52%;left:12%;width:14vh;height:14vh;background:#ffffff00;">
                  <div style="top:18%;left:18%;position:absolute;border-radius:100%;width:64%;aspect-ratio:1;background:conic-gradient(#0000000f 0deg 172deg, #a9ff00 172deg 360deg);"></div><div style="position:absolute;background:#f6f5f2;width:50%;height:50%;border-radius:50%;top:25%;left:25%;font-size:3.2vh;"></div><div style="position:absolute;top:63%;width:39%;text-align:right;font-weight:900;color:#ffffff94;font-family:font5;overflow:hidden;background:#7a7a7ac4;left:44%;font-size:2vh;filter:drop-shadow(9px 7px 7px rgba(0,0,0,0.5));">
                    40%
                  </div>
                </div><div style="position:absolute;font-size:4vh;font-family:font5;color:black;top:52%;left:24%;width:14vh;height:14vh;background:#ffffff00;">
                  <div style="top:18%;left:18%;position:absolute;border-radius:100%;width:64%;aspect-ratio:1;background:conic-gradient(#0000000f 0deg 172deg, #a9ff00 172deg 360deg);"></div><div style="position:absolute;background:#f6f5f2;width:50%;height:50%;border-radius:50%;top:25%;left:25%;font-size:3.2vh;"></div><div style="position:absolute;top:63%;width:39%;text-align:right;font-weight:900;color:#ffffff94;font-family:font5;overflow:hidden;background:#7a7a7ac4;left:44%;font-size:2vh;filter:drop-shadow(9px 7px 7px rgba(0,0,0,0.5));">
                    40%
                  </div>
                </div><div style="width:0;height:0;border-left:1vh solid transparent;border-right:1vh solid transparent;border-bottom:1vh solid black;top:24%;position:absolute;transform:rotate(45deg);left:92%;filter:drop-shadow(9px 7px 7px rgba(0,0,0,0.5));"></div><div style="position:absolute;font-size:2.8vh;color:#ffffff8c;top:35%;right:6.7%;font-family:font1;background:#767676;mix-blend-mode:multiply;width: 31.5%;filter:drop-shadow(9px 7px 7px rgba(0,0,0,0.5));">
                  BASIC_USER_INFO
                </div><div style="position:absolute;font-size:2.8vh;color:#0000008c;top:48%;right:10%;font-family:font1;">
                  LEVEL 1
                </div><div style="position:absolute;font-size:2.8vh;color:#0000008c;top:57%;right:10%;font-family:font1;">
                  91/100 Upvotes
                </div><div style="position:absolute;font-size:1.7vh;color:#0000002e;top:57%;right:10%;font-family:font1;">
                  FEMALE<br>GRADUATED FROM YALE BIO<br>RESEARCH FOCUSES ON MOLECULAR AND GENETIC PATHWAY<br> Ph. D., M. D. in MOLECULAR AND GENETIC BIOLOGY
                </div><div style="position:absolute;font-size:2.8vh;color:#ffffff8c;top: 36.2%;left: 7.7%;font-family:font1;background: #4a48481a;width: 23%;filter:drop-shadow(9px 7px 7px rgba(0,0,0,0.5));height: 10%;">
                </div><div style="position: absolute; font-size: 4vh; color: rgb(118, 118, 118); top: 8%; left: 8%; font-family: font5; font-weight: 900;width: 53%;">
                  {{ cardInfo.text }}
                </div><div style="position:absolute;width:25%;height:9%;top:25%;left:62%;overflow:hidden;">
                  <img src="/imgs/barC.png" style="position:absolute;width:163%;top:-2%;left:-12%;opacity:0.6;filter:invert(0%);">
                </div>
              </div>
            </div>
            <div class="usrAvt">
              <img src="/imgs/avtSample.png" style="position:absolute;top:10%;width:28vh;height:28vh;left:10%;filter:drop-shadow(9px 13px 6.5px rgba(0,0,0,0.4));">
            </div>
            <div class="usrIngameInfo" style="position:absolute;top:0;left:-43px;width:100%;height:100%;">
              <div style="cursor:pointer;position:absolute;font-family:font5;font-weight:900;top:68%;left:6%;font-size:16.7vh;color:#d9d9d9;background:black;mix-blend-mode:multiply;padding-top:0vh;height:23.3vh;overflow:hidden;width:80.9vh;filter:drop-shadow(9px 13px 11px rgba(0,0,0,0.3));opacity:0.9;" @click="confirmFCard()">
                <div style="position:absolute;top:-18%;font-family:font5;font-size:15vh;left:4vh;">
                  FRIEND
                </div><div style="position:absolute;top:35%;font-family:font5;font-size:15vh;left:19vh;">
                  REQUEST
                </div>
              </div>
              <div style="position:absolute;top:76%;left:46%;height:17%;width:30%;filter:drop-shadow(9px 13px 11px rgba(0,0,0,0.3));">
                <div style="position:absolute;height:100%;width:1.6%;left:1%;background:#000000b5;top:13%;filter:drop-shadow(9px 13px 11px rgba(0,0,0,0.3));"></div><div style="position:absolute;height:1%;width:194.6%;left:-198%;background:#0000001f;top:72%;"></div><div style="position:absolute;top:16%;font-family:font5;font-size:4vh;left:4vh;color:#0000007d;mix-blend-mode:multiply;white-space:nowrap;">
                  Exclusive <span style="background:black;color:white;padding-left:6%;padding-top:2%;">NOTIFICATION</span> in ACTIVITIES
                </div><div style="position:absolute;top:53%;font-family:font5;font-size:4vh;left:4vh;color:#0000007d;mix-blend-mode:multiply;white-space:nowrap;">
                  Reserved Slot in Operations
                </div><div style="position:absolute;top:88%;font-family:font5;font-size:4vh;left:4vh;color:#0000007d;mix-blend-mode:multiply;white-space:nowrap;">
                  Multi Dimensional&nbsp;<span style="background:black;color:white;padding-left:6%;padding-top:2%;">COOPERATION</span>
                </div>
              </div>
            </div>
          </div>-->
          <div data-v-b484bd42="" style="position:absolute;top:0px;left:0px;width:100%;height:100%;transform-style:preserve-3d;">
            <div style="position:absolute;width: 55%;height: 17%;top:20%;overflow:hidden;filter: invert(76%) hue-rotate(166deg) sepia(101%) contrast(101%);transform: translateZ(-68vh);opacity: 0.3;right:2%;">
              <img src="/imgs/angles-right-solid.svg" style="position:absolute;height: 170%;top: -35%;">
              <img src="/imgs/angles-right-solid.svg" style="position:absolute;height: 170%;top: -35%;left: 14%;"><img src="/imgs/angles-right-solid.svg" style="position:absolute;height: 170%;top: -35%;left: 28%;"><img src="/imgs/angles-right-solid.svg" style="position:absolute;height: 170%;top: -35%;left: 42%;"><img src="/imgs/angles-right-solid.svg" style="position:absolute;height: 170%;top: -35%;left: 56%;"><img src="/imgs/angles-right-solid.svg" style="position:absolute;height: 170%;top: -35%;left: 70%;"><img src="/imgs/angles-right-solid.svg" style="position:absolute;height: 170%;top: -35%;left: 84%;">
            </div>
            <div style="position:absolute;top: 39%;left: 54%;font-family: font10;font-size: 4vh;color:black;/* font-weight:900; */width: 51%;background:white;mix-blend-mode:screen;opacity: 0.3;">ENGINEERING SECTION</div>
            <div style="position:absolute;top: 9%;left: 54%;font-family: font10;font-size: 4vh;color:black;height:45%;width: 26%;/* background:white; */mix-blend-mode: multiply;/* opacity: 0.3; */">
              <div style="position:absolute;font-size: 2vh;font-weight:900;left: 8%;top: 12%;letter-spacing: 1.2vh;">COLLABORATION INVITE</div>

              <div style="position:absolute;font-size: 5vh;font-weight:900;left: 8%;top: 2.1%;background:black;color:white;width: 84%;padding-left: 2%;">Dr. Kal'tsit</div>
              <div style="position:absolute;font-size: 8vh;font-weight:900;left:0%;">[</div>
              <div style="position:absolute;font-size: 8vh;font-weight:900;right: 0%;">]</div>
            </div>
            <div class="remoteAcess" style="position:absolute;width: 49%;height: 33%;top: 51%;left: 28%;transform: translateZ(68vh);">
              <div class="props" style="position:absolute;top: 87%;right: -13%;font-family: font10;font-size: 4vh;color:black;font-weight:900;width: 100%;text-align:right;">
                <i class="fa fa-superpowers" aria-hidden="true"></i>
                <i class="fa fa-grav" aria-hidden="true"></i>
                <i class="fa fa-microchip" aria-hidden="true"></i>
                <i class="fa fa-podcast" aria-hidden="true"></i>
                <i class="fa fa-binoculars" aria-hidden="true"></i>
                <i class="fa fa-bomb" aria-hidden="true"></i>

              </div>

              <div style="position:absolute;width: 100%;height: 100%;background: #ffffff7a;top: 10%;left: 19%;"></div>
              <div style="position:absolute;width: 76%;height: 3%;border-top: 2px solid #0000003d;border-bottom: 2px solid #0000003d;top: 66.5%;left: 16.4%;"></div>
              <div style="position:absolute;width: 45%;height: 1.5%;background:black;top: 67.8%;left: 16.4%;"></div>
              <div style="position:absolute;top: 33%;left: 16%;font-family: font10;font-size: 11vh;color:black;font-weight:900;width:100%;">REMOTE ACCESS</div>
              <div style="position:absolute;top: 63%;left: 94.8%;font-family: font10;font-size: 4vh;color:black;/* font-weight:900; *//* letter-spacing: 6.3vh; */">ACTIVE</div>
            </div>
            <div class="floorDesc3D" data-v-b484bd42="" style="position:absolute;top:10%;left: 36%;height:78%;width:20%;transform-style:preserve-3d;">
              <div class="descWire" style="position:absolute;height:100%;border-style:dotted;left: -36%;"></div>
              <div class="descWire" style="position:absolute;height:100%;background: #00000024;width:2px;left: -9%;"></div>
              <div class="descWire" style="position:absolute;height:100%;background: #00000024;width:2px;left: 23%;top: -5%;"></div>
              <div class="descWire" style="position:absolute;height:100%;background: #00000024;width:2px;left: 57%;"></div>
              <div class="elevator" data-v-b484bd42="" style="position:absolute;top: 13%;left:0%;height:20vh;width:20vh;background: #ffcc31;transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="elevator" data-v-b484bd42="" style="position:absolute;top: 12.6%;left: -49.5%;height: 0.3vh;width:20vh;color:black;font-size: 2vh;font-weight:900;font-family: font5;transform: translateY(4vh) translateX(-18vh);">
                TRANSMISSION ACTIVE
              </div>
              <div class="elevator" data-v-b484bd42="" style="position:absolute;top: 12.6%;left: -49%;height: 0.3vh;width:20vh;background: #000000;transform: translateY(4vh) translateX(-18vh);"></div>
              <div class="elevator" data-v-b484bd42="" style="position:absolute;top: 13%;left: -14%;height: 0.5vh;width:20vh;background: #000000;transform: translateY(6vh) translateZ(27vh) translateX(-16vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="elevator1" data-v-b484bd42="" style="position:absolute;top: 0%;left: -14%;height: 0.5vh;width:20vh;background: #000000;transform: translateY(6vh) translateZ(27vh) translateX(-16vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="elevator2" data-v-b484bd42="" style="position:absolute;top: -0.4%;left: -49.5%;height: 0.3vh;width:20vh;background: #000000;transform: translateY(4vh) translateX(-18vh);"></div>
              <div class="elevator3" data-v-b484bd42="" style="position:absolute;top: -0.4%;left: -49%;height: 0.3vh;width:20vh;color:black;font-size: 2vh;font-weight:900;font-family: font5;transform: translateY(4vh) translateX(-18vh);">GROUND ZERO
              </div>
              <div class="elevator1" data-v-b484bd42="" style="position:absolute;top: 91%;left: -14%;height: 0.5vh;width:20vh;background: #000000;transform: translateY(6vh) translateZ(27vh) translateX(-16vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="elevator2" data-v-b484bd42="" style="position:absolute;top: 90.6%;left: -49.5%;height: 0.3vh;width:20vh;background: #000000;transform: translateY(4vh) translateX(-18vh);"></div>
              <div class="elevator3" data-v-b484bd42="" style="position:absolute;top: 90.6%;left: -49%;height: 0.3vh;width:20vh;color:black;font-size: 2vh;font-weight:900;font-family: font5;transform: translateY(4vh) translateX(-18vh);">SUCCESSFUL COLLABORATION
              </div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:0%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:7%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:14%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:21%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:28%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:35%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:42%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:49%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:56%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:63%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:70%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:77%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:84%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
              <div class="floor" data-v-b484bd42="" style="position:absolute;top:91%;left:0%;height:20vh;width:20vh;background:rgba(141, 141, 141, 0.45);transform:translateY(0vh) translateZ(0vh) rotateY(180deg) rotateX(69deg) rotateZ(135deg);"></div>
            </div>
          </div>
          <!--<div v-else class="unknownReq">
            <div style="position:absolute;font-size: 17vh;color:black;cursor:pointer;" @click="confirmFCard()">
              Process unknown req
            </div>
          </div>-->
        </div>
        <div v-if="confirmations.length <= 0 || !isReloaded" style="position: absolute; top: 30%; left: 29%; height: 100%; width: 100%;">
          <corpEmoji :emoji-seq="['questionMark', 'good']" />
          <div data-v-b484bd42="" style="position: absolute; height: 100%; width: 100%; top: -32%; left: -11%; font-family: font5; font-size: 2vw;overflow:hidden;">
            <div style="font-family: font2;top: 39%;left: 32%;font-size: 23vh;transform:rotate(90deg);position:absolute;color: #6464640d;">
              THEA, INC
            </div>
            <div class="emoLabel" style="position: absolute;  font-family: font2; padding-top: 2%; padding-left: 5.6%; font-size: 2vh; background: white; color: rgb(176, 173, 171); overflow: hidden; filter: drop-shadow(rgba(255, 255, 255, 0.5) 7.3px 6px 4px); top: 39%;">
              INSTRUCTIONS AWAIT <img src="/imgs/thea.png" data-v-b484bd42="" style="position: absolute; height: 147%; filter: invert(100%); opacity: 0.1; left: 3%; top: 12%;">
            </div>
            <div data-v-b484bd42="" style="position: absolute; top: 45%; font-family: font3; font-size: 1.8vh; left: 29%; font-weight: 900;color: #ffffffa8;">
              SOFTWARE REVISION: 8db1a24
            </div>
            <div class="emoLabel2" style="position: absolute; top: 35.8%; font-size:3.75vh; ">
              WELL DONE
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.emoLabel {
  animation: emoLabel 0.4s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-delay: 3.7s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  opacity: 0;
}

@keyframes emoLabel {
  0% {
    left: 15%;
    opacity: 0;
  }

  100% {
    left: 22%;
    opacity: 1;
  }
}

.emoLabel2 {
  animation: emoLabel2 0.4s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-delay: 3.7s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
  opacity: 0;
}

@keyframes emoLabel2 {
  0% {
    left: 28.2%;
    opacity: 0;
  }

  100% {
    left: 30.2%;
    opacity: 1;
  }
}

.individualEmailCardDepletion {
  transition: transform 0.5s, filter 0.5s;
  transition-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.positionData0 {
  transform: translateZ(12vh) translateY(-17vh) translateX(-28vh) rotateY(-1deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5));
}

.positionData1 {
  transform: translateZ(7vh) translateY(-17vh) translateX(-33vh) rotateY(0deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(1px);
}

.positionData2 {
  transform: translateZ(2vh) translateY(-17vh) translateX(-39vh) rotateY(1deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(2px);
}

.positionData3 {
  transform: translateZ(-3vh) translateY(-17vh) translateX(-46vh) rotateY(2deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(3px);
}

.positionData4 {
  transform: translateZ(-8vh) translateY(-17vh) translateX(-54vh) rotateY(3deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(4px);
}

.positionData5 {
  transform: translateZ(-13vh) translateY(-17vh) translateX(-63vh) rotateY(4deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(5px);
}

.positionData6 {
  transform: translateZ(-18vh) translateY(-17vh) translateX(-73vh) rotateY(5deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(6px);
}

.positionData7 {
  transform: translateZ(-21vh) translateY(-17vh) translateX(-84vh) rotateY(6deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(7px);
}

.positionData8 {
  transform: translateZ(-23vh) translateY(-17vh) translateX(-96vh) rotateY(7deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(8px);
}

.positionData9 {
  transform: translateZ(-24vh) translateY(-17vh) translateX(-109vh) rotateY(8deg);
  filter: drop-shadow(7.3px 6px 4px rgba(100, 100, 100, 0.5)) blur(9px);

}

.overflew {
  display: none;
}
</style>

