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
      if (this.isReloaded)
        return this.confirmations[0]
      return this.confirmations[1]
    },
  },

  updated() {

  },
  methods: {
    getPosiData(index) {
      console.log(`showing index${index}`)
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
      let confID
      if (this.isReloaded)
        confID = 0
      else
        confID = 1
      this.ui.pushConfirm('INCOMING REQUEST', 'FRIEND CONFIRM').then(() => {
        const params = {
          confirmationId: this.confirmations[confID].id,
          type: this.confirmations[confID].type,
          agree: true,
        }
        this.isReloaded = false
        setTimeout(() => {
          this.network.confirmEmail(params)
          this.isReloaded = true
        }, 1000)
        this.ui.pushUINewNotif({ title: 'FRND', msg: 'Accepted Friend', class: 'aaa' })
      },
      () => {
        const params = {
          confirmationId: this.confirmations[confID].id,
          type: this.confirmations[confID].type,
          agree: false,
        }
        this.isReloaded = false
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
          <img src="/imgs/aaaa.jpg" style="position:absolute;top:85%;width:423%;opacity: 0.7;filter: invert(0) contrast(2) grayscale(1000%) brightness(149.7%);"><div style="position:absolute;top:42%;height:229%;width:141%;background-image: linear-gradient(to right, #000000 2px, transparent -1px), linear-gradient(#000000 2px, transparent -1px);background-repeat:repeat;background-size: 4px 4px;;"></div>
        </div><div style="position:absolute;top: 7%;height:4vh;width:4vh;border-radius:50%;background: #ffffff61; right: 5%;"></div>
        <div style="position:absolute;color:white;top: 48%;left: 4%;font-size: 1.9vh;width: 47vh;letter-spacing: 0.4vh;text-align:center;font-family: font10;font-weight:900;">
          Powered by THEA, Inc.
        </div><div style="position:absolute;color:white;top: 15%;left: 14%;font-size: 14vh;font-family: font5;font-weight:900;letter-spacing: -0.5vh;mix-blend-mode:screen;">
          RQST
          <div style="position:absolute;background:black;color:white;top: 46%;left: 7%;font-size: 2.3vh;width: 27.2vh;letter-spacing: 0vh;text-align:center;font-family: font1;">
            FRIEND REQUEST
          </div>
        </div>
      </div>
    </div>
    <div class="email3dSpace" style="position:absolute;top:0%;height:100%;left:-6%;width:40%;perspective:36vh;">
      <div v-if="confirmations.length>0" class="card3dStack" style="position:absolute;height:52%;left:0%;width:125%;transform:translateY(96vh) translateX(12vh) rotateY(-1deg) rotateX(0deg);transform-style:preserve-3d;">
        <div v-for="(confirmation, index) in confirmations" :key="index" class="individualEmailCard" :class="getPosiData(index)" style="position:absolute;backdrop-filter:blur(3.6px);top:40%;left:40%;height:30%;width:19%;transition: transform 0.5s, filter 0.5s; transition-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);">
          <div class="cardBg" style="position:absolute;width:100%;height:100%;overflow:hidden;opacity:0.6;">
            <div style="position:absolute;height:100%;width:101%;background-image:linear-gradient(214deg, #fffdffc7 -2%, #b3ac9c 50%,#fffdffc7 123%);"></div><img src="/imgs/miniWhiteBtn.png" style="position:absolute;width:70%;mix-blend-mode:multiply;opacity:0.4;"><img src="/imgs/thea.png" style="position:absolute;width:84%;top:38%;left:-11%;opacity:0.2;">
          </div><div style="position:absolute;font-size:4vh;color:white;font-family:font1;top:8%;height:40%;width:100%;text-align:right;">
            <div style="position:absolute;height:37%;width:69%;background-image:linear-gradient(90deg, transparent, #00000040);top:39%;right:3%;opacity:0.6;"></div><div style="position:absolute;font-size:4vh;color:white;font-family:font5;top:32%;right:0;padding-right:3%; text-transform: uppercase;">
              {{ confirmation.type }}
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:28%;padding-right:3%;background:white;color:black;mix-blend-mode:screen;padding-left:4vh;filter:drop-shadow(7.3px 6px 4px rgba(255,255,255,0.5));">
              EXPIRED:
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:105%;right:8%;padding-right:3%;color:white;font-weight:900;padding-left:4vh;">
              4{{ index }} HRs
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:27%;left:-12%;padding-right:3%;color:black;font-weight:900;padding-left:4vh;transform:rotate(-90deg);background:white;mix-blend-mode:screen;filter:drop-shadow(-5.7px 6px 4px rgba(255,255,255,0.5));">
              {{ getCardCateg(confirmation.type) }} ‣
            </div><div style="position:absolute;font-size:1.5vh;font-family:font5;top:128%;right:11%;height:67%;color:white;font-weight:900;">
              BETA TESTING REWARDS <div style="position:absolute;width:100%;height:25%;top:28%;left:0%;overflow:hidden;">
                <img src="/imgs/barC.png" style="position:absolute;width:163%;top:-2%;left:-12%;opacity:1;filter:invert(100%);">
              </div>
            </div><div style="position:absolute;font-size:1vh;color:white;font-family:font2;top:87%;right:0;letter-spacing:1.6vh;">
              THEA, INC
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="emailDetailContent" style="position:absolute;top:0%;right:0%;height:100%;width:63%;perspective:36vh;">
      <div style="position:absolute;height:73%;right:6%;width:209vh;transform:rotateY(-1deg);top:11%;">
        <div class="emailBtmBg" style="position:absolute;top:-2%;right:1%;height:100%;width:83%;background:#00000042;"></div>
        <div v-if="confirmations.length>0" style="position:absolute;top:0;height:100%;right:0;width:100%;background:#fffbf094;overflow:hidden;backdrop-filter:blur(9px);filter:drop-shadow(9px 13px 0px rgba(255,255,255,0.5));">
          <img src="/imgs/hexabg.jpg" style="position:absolute;filter:grayscale(99%);right:0%;height:96%;opacity:0.1;-webkit-mask-image:linear-gradient(87deg,rgb(0 255 220 / 0%) 49%, rgb(255 0 0));">
          <div v-if="cardInfo.type === 'friend'" class="frdReq">
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
              <div style="position:absolute;font-family:font5;font-weight:900;top:68%;left:6%;font-size:16.7vh;color:#d9d9d9;background:black;mix-blend-mode:multiply;padding-top:0vh;height:23.3vh;overflow:hidden;width:80.9vh;filter:drop-shadow(9px 13px 11px rgba(0,0,0,0.3));opacity:0.9;" @click="confirmFCard()">
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
          </div>
          <div v-else class="unknownReq">
            <div style="position:absolute;font-size: 17vh;color:black;" @click="confirmFCard()">
              Process unknown req
            </div>
          </div>
        </div>
        <corpEmoji v-if="confirmations.lengt<=0" :corpEmoji="['questionMark','good']" />
      </div>
    </div>
  </div>
</template>

<style scoped>

  .positionData0{
    transform:translateZ(12vh) translateY(-17vh) translateX(-28vh) rotateY(-1deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5));
  }

    .positionData1{
    transform:translateZ(7vh) translateY(-17vh) translateX(-33vh) rotateY(0deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(1px);
  }

    .positionData2{
    transform:translateZ(2vh) translateY(-17vh) translateX(-39vh) rotateY(1deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(2px);
  }

    .positionData3{
    transform:translateZ(-3vh) translateY(-17vh) translateX(-46vh) rotateY(2deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(3px);
  }

    .positionData4{
    transform:translateZ(-8vh) translateY(-17vh) translateX(-54vh) rotateY(3deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(4px);
  }

    .positionData5{
    transform:translateZ(-13vh) translateY(-17vh) translateX(-63vh) rotateY(4deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(5px);
  }

    .positionData6{
    transform:translateZ(-18vh) translateY(-17vh) translateX(-73vh) rotateY(5deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(6px);
  }

    .positionData7{
    transform: translateZ(-21vh) translateY(-17vh) translateX(-84vh) rotateY(6deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(7px);
  }

    .positionData8{
    transform: translateZ(-23vh) translateY(-17vh) translateX(-96vh) rotateY(7deg);filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(8px);
  }

    .positionData9{
    transform: translateZ(-24vh) translateY(-17vh) translateX(-109vh) rotateY(8deg); filter:drop-shadow(7.3px 6px 4px rgba(100,100,100,0.5))  blur(9px);

  }
      .overflew{
      display: none;
    }
</style>

