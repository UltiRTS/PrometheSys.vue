<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
export default {
  // feed those
  props: ['emojiSeq'],
  data() {
    return {
      currentEmoji: 0,
      emojiName: 'none',
      emojiTime: {
        questionMark: 1,
        good: 0.7,

      },

    }
  },
  computed: {

  },
  onMounted() {
    console.log('aaa')
    console.log(this.emojiSeq)
    this.switchEmji()
  },

  updated() {

  },
  methods: {
    switchEmji() {
      this.emojiName = this.emojiSeq[currentEmoji]
      const time = this.emojiTime[emojiName]
      setTimeout(() => {
        this.currentEmoji += 1
        this.emojiName = this.emojiSeq[currentEmoji]
        this.switchEmji()
        console.log('switching emoji')
      }, time)
    },

  },
}
</script>

<template>
<div>
  <div v-if="emojiName == 'good'" id="good" style="position:absolute;height: 25vw;width: 25vw;background:green;">
    <img src="bnqk_0000s_0000_左眼.png" style="position:absolute;top: 39%;left: 21%;/* height:100%; */width: 16%;">
    <img src="bnqk_0000s_0001_右眼.png" style="position:absolute;top: 39%;right: 21%;/* height:100%; */width: 16%;"><img src="bnqk_0000s_0002_手.png" class="goodHand" style="position:absolute;left: 64%;/* height:100%; */width: 40%;"><img src="bnqk_0000s_0003_嘴.png" style="position:absolute;top: 63%;left: 26%;/* height:100%; */width: 47%;"><img src="bnqk_0000s_0004_脸.png" style="position:absolute;top: 0%;left:0;height:100%;width:100%;">
  </div>

  <div v-if="emojiName == 'questionMark'" id="questionMark" style="position:absolute;height: 25vw;width: 25vw;background:green;">
    <img src="bnqk_0001s_0000_手.png" class="qestionHand" style="position:absolute;top: 63%;width: 56%;"><img src="bnqk_0001s_0001__3.png" style="position:absolute;top: -13%;left: 91%;/* height:100%; */width: 36%;"><img src="bnqk_0001s_0002__2.png" style="position:absolute;top: -37%;left: 75%;height: 36%;/* width:100%; */"><img src="bnqk_0001s_0003__1.png" style="position:absolute;top: -32%;left: 46%;/* height:100%; */width: 19%;"><img src="bnqk_0001s_0004_右眼.png" class="qestionEye1" style="position:absolute;/* height:100%; */width: 16%;"><img src="bnqk_0001s_0005_左眼.png" class="qestionEye2" style="position:absolute;top: 26%;/* height:100%; */width: 16%;"><img src="bnqk_0001s_0006_嘴.png" class="qestionMouth" style="position:absolute;width: 19%;"><img src="bnqk_0001s_0007_脸.png" style="position:absolute;top: 0%;left:0;height:100%;width:100%;">
  </div>
  </div>
</template>

<style scoped>
.qestionHand {
  animation: qestionHand 1s;
  animation-fill-mode: forwards;
  animation-iteration-count:3;
  -webkit-animation-direction: alternate-reverse;
  animation-direction: alternate-reverse;
}

@keyframes qestionHand {
  0% {
    left: 42%;
  }

  100% {
    left: 22%;
  }
}

.qestionEye1 {
  animation: qestionEye1 1s;
  animation-fill-mode: forwards;
  animation-iteration-count:3;
  -webkit-animation-direction: alternate-reverse;
  animation-direction: alternate-reverse;
}

@keyframes qestionEye1 {
  0% {
    top: 26%;left: 58%;
  }

  100% {
    top: 39%;left: 68%;
  }
}

.qestionEye2 {
  animation: qestionEye2 1s;
  animation-fill-mode: forwards;
  animation-iteration-count:3;
  -webkit-animation-direction: alternate-reverse;
  animation-direction: alternate-reverse;
}

@keyframes qestionEye2 {
    0% {
    top: 26%;left:15%;;
  }

  100% {
    top: 39%;left: 21%;
  }
}

.qestionMouth {
  animation: qestionMouth 1s;
  animation-fill-mode: forwards;
  animation-iteration-count:3;
  -webkit-animation-direction: alternate-reverse;
  animation-direction: alternate-reverse;
}

@keyframes qestionMouth {
    0% {
        top: 49%;left: 26%;
  }

  100% {
    top: 63%;left: 39%;
  }
}

.goodHand {
  animation: goodHand 0.7s;
  animation-fill-mode: forwards;
  animation-iteration-count:1;

  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);

}

@keyframes goodHand {
    0% {
        top: 73%; opacity:0;
  }

  100% {
    top: 63%;opacity:1;
  }
}

</style>

