<script lang="ts" setup>
import { ref } from 'vue'
import BabylonScene from '../components/babylonScene.vue'

const percentages = ref([5, 10, 20])
const tags = ref(['hello', 'test', 'test1'])

</script>

<template>
  <BabylonScene />
</template>

<style>
.pie {
  width: 400px;
  height: 300px;
}
</style>
