<script>
import { ipcRenderer } from 'electron'
import { RouterView } from 'vue-router'
import router from './router'

ipcRenderer.send('toMain', JSON.stringify({
  action: 'queryMap',
  data: {
    mapId: '1',
  },
}))

export default {
  provide() {
    return {
      mouse_pos: this.mouse_pos,
      window_size: this.window_size,
    }
  },
  data() {
    return {
      mouse_pos: {
        x: 0,
        y: 0,
      },
      window_size: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    }
  },
  mounted() {
    router.push('prelogin')
  },
  methods: {
    onMouseMove(e) {
      this.mouse_pos.x = e.clientX
      this.mouse_pos.y = e.clientY
    },
  },
}

// ipcRenderer.receive('fromMain', (data) => {
//   console.log(data)
// })
</script>

<template>
  <div class="app-wrapper" @mousemove="onMouseMove">
    <router-view />
  </div>
</template>



<style>
@font-face {
    font-family: font1;
    src: url('/fonts/1.ttf');
}

@font-face {
    font-family: font2;
    src: url('/fonts/2.ttf');
}

@font-face {
    font-family: font3;
    src: url('/fonts/3.ttf');
}

@font-face {
    font-family: font4;
    src: url('/fonts/4.ttf');
}

@font-face {
    font-family: font5;
    src: url('/fonts/5.otf');
}

@font-face {
    font-family: font6;
    src: url('/fonts/6.ttf');
}

@font-face {
    font-family: font7;
    src: url('/fonts/nagayama_kai08.otf');
}

@font-face {
    font-family: font8;
    src: url('/fonts/genkai-mincho.ttf');
}
</style>

