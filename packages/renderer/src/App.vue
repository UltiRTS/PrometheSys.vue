<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { RouterView } from 'vue-router'

ipcRenderer.send('toMain', JSON.stringify({
  action: 'queryMap',
  data: {
    mapId: '1',
  },
}),
)

// ipcRenderer.receive('fromMain', (data) => {
//   console.log(data)
// })
</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo-box {
  display: flex;
  width: 100%;
  justify-content: center;
}

.logo-box span {
  width: 74px;
}

.static-public {
  display: flex;
  align-items: center;
  justify-content: center;
}

.static-public code {
  background-color: #eee;
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

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

