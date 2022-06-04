<script lang="ts" setup>
import { ref } from 'vue'

const percentages = ref([5, 10, 20])
const tags = ref(['hello', 'test', 'test1'])
const width = ref('200px')
const height = ref('200px')
</script>

<template>
  <pie :percentages="percentages" :tags="tags" :width="width" :height="height" />
</template>
