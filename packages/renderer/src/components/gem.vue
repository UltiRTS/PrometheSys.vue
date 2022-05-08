<script>
export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      isActive: false,
    }
  },
  computed: {},

  updated() {},
  methods: {},
}
</script>

<template>
  <div style="position: absolute; height: 2vw; width: 2vw; margin: 0px">
    <div
      class="outline"
      style="
        transform: rotate(45deg);
        position: absolute;
        outline: 0.2vw solid rgb(247, 126, 5);
      "
    />
    <div
      style="
        background: rgb(247, 126, 5);
        transform: rotate(45deg);
        position: absolute;
        width: 20%;
        height: 20%;
        top: 40%;
        left: 40%;
      "
    />
  </div>
</template>

<style scoped>
.outline {
  animation: outline 4s;
  animation-fill-mode: forwards;

  animation-iteration-count: infinite;
}

@keyframes outline {
  0% {
    width: 20%;
    height: 20%;
    top: 40%;
    left: 40%;
    opacity: 0;
  }
  79% {
    width: 20%;
    height: 20%;
    top: 40%;
    left: 40%;
    opacity: 0;
  }
  80% {
    width: 20%;
    height: 20%;
    top: 40%;
    left: 40%;
    opacity: 1;
  }
  100% {
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    opacity: 0;
  }
}
</style>

