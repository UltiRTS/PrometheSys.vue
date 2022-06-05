<script lang="ts" setup>
import { ref } from 'vue'

const percentages = ref([5, 10, 20])
const tags = ref(['hello', 'test', 'test1'])
</script>

<template>
  <div class="pie">
    <pie :percentages="percentages" :tags="tags" />
  </div>
</template>

<style>
.pie {
  width: 400px;
  height: 300px;
}
</style>
