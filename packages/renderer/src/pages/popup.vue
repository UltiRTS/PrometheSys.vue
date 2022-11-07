<script lang="ts" setup>
import { ipcRenderer } from 'electron'

ipcRenderer.on('popupData', (e, data) => {
  console.log(data)
})

</script>

<template>
  <div>Pop up page</div>
</template>
