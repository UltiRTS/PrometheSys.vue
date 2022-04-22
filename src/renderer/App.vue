<script setup lang="ts">
import { ipcRenderer } from './electron'
import { RouterView } from 'vue-router'

ipcRenderer.send('toMain', JSON.stringify({
  action: 'queryMap',
  data: {
    mapId: '1'
  }})
);

ipcRenderer.receive('fromMain', (data) => {
  console.log(data);
});


</script>

<style>
@font-face {
    font-family: font1;
    src: url('public/fonts/1.ttf');
}

@font-face {
    font-family: font2;
    src: url('public/fonts/2.ttf');
}

@font-face {
    font-family: font3;
    src: url('public/fonts/3.ttf');
}

@font-face {
    font-family: font4;
    src: url('public/fonts/4.ttf');
}

@font-face {
    font-family: font5;
    src: url('public/fonts/5.otf');
}

@font-face {
    font-family: font6;
    src: url('public/fonts/6.ttf');
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
