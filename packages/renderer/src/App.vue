<script>
import { ipcRenderer } from 'electron'
import router from './router'
import { useUserStore } from './stores'

ipcRenderer.send('toMain', JSON.stringify({
  action: 'queryMap',
  data: {
    mapId: '1',
  },
}))

export default {
  provide() {
    return {

    }
  },
  setup() {
    const userStore = useUserStore()
    userStore.login({ username: 'test', password: 'testpassword' })
  },
  data() {
    return {

    }
  },
  mounted() {
    router.push('login')
  },

}

// ipcRenderer.receive('fromMain', (data) => {
//   console.log(data)
// })
</script>

<template>
  <div class="app-wrapper" >
    <router-view />
  </div>
</template>

<style>
@import '../public/css/font-awesome-4.7.0/css/font-awesome.css';

body{
  margin: 0;
  overflow:hidden;
}


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

@font-face {
    font-family: font8;
    src: url('/fonts/9.ttf');
}

@font-face {
    font-family: font9;
    src: url('/fonts/Roboto-Regular.ttf');
}

@font-face {
    font-family: font10;
    src: url('/fonts/ARIAL.TTF');
}
</style>

