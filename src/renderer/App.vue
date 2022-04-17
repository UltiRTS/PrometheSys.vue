<script setup lang="ts">
import Hello from './components/Hello.vue'
import { ipcRenderer } from './electron'

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
    <Hello/>
  </div>
</template>
