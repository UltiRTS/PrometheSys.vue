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
    ...mapState(useUserStore, ['ui']),
  },

  updated() {

  },
  methods: {

  },
}
</script>

<template>
  <div id="loading" :class="ui.loadingClass.value"
       style=" position:fixed;background: #000000ad;width:102%;left:-1%;height: 11vw;bottom:0;"
  >
    <div style="position:absolute;top: 3vw;left: 30vw;width: 3vw;height: 3vw;border: solid 1.4vh #fff;transform: rotate(45deg);"
         class="loadingIcon1"
    ></div>
    <div id="loadingIcon" class="loadingIcon"
         style="position:absolute;border: solid 1.4vh #fff;transform: rotate(45deg);"
    ></div>
    <div style="font-family:font10;font-size: 2vw;color: #adadad;top: 40%;left: 36%;position:absolute;">
      Submitting feedback to the
      neural network.
    </div>
    <div style="font-family:font6;position:absolute;top: 61%;left: 36.1%;font-size: 0.6vw;color:white">
      <i class="fa fa-copyright"
         aria-hidden="true"
      ></i>
      THEA Pharmaceuticals, <span style="font-family:font8;">Inc.</span>
    </div>
    <div style="font-size: 36vh;color: #ffffff0d;top: -8%;left: 0%;position:absolute;">
      <i class="fa fa-clock-o"
         aria-hidden="true"
      ></i>
    </div>
  </div>
</template>
<style scoped>

.loadingIcon{
    top: 3vw;
    left: 30vw;
    width: 3vw;
    height: 3vw;

    animation-fill-mode: forwards;
    animation-name: loadingIcon;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-delay: 0s;
}

@keyframes loadingIcon {
    0% {
        opacity:0;
        top: 3vw;
        left: 30vw;
        width: 3vw;
        height: 3vw;
    }
    10% {
        top: 3vw;
        left: 30vw;
        opacity:1;
        width: 3vw;
        height: 3vw;

    }
    50% {
        top: 1.5vw;
        left: 28.5vw;
        opacity:0;
        width: 6vw;
        height: 6vw;
    }
    100% {
        top: 1.5vw;
        left: 28.5vw;
        opacity:0;
        width: 6vw;
        height: 6vw;
    }
}

.alive{
    animation-fill-mode: forwards;
    animation-name: loading;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-delay: 0s;
}

@keyframes loading {
    0% {
        bottom:-1vw;
        opacity:0;
    }

    100% {
        opacity:1;
        bottom:0vw;
    }
}

.dying{
    animation-fill-mode: forwards;
    animation-name: dying;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-delay: 0s;
}

@keyframes dying {
    0% {
    opacity:1;
        bottom:0vw;

    }

    100% {
        bottom:-1vw;
        opacity:0;
    }
}

.died{
  display:none;
}

</style>

