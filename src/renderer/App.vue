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

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
