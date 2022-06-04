<script lang="ts" setup>
import { onMounted, ref, computed} from 'vue'
import Two from 'two.js'
import { randomInt } from 'crypto'

const twoTag = ref<HTMLElement | null>(null)

const fillColors = ['black', 'gray', 'cyan']

const props = defineProps<{
  percentages: number[]
  tags: string[]
  width: string
  height: string
}>()

const centrolImg = {
  x: `${parseInt(props.width) * 0.33}px`,
  y: `${parseInt(props.width) * 0.33}px`,
  width: `${parseInt(props.width) * 0.33}px`,
  height: `${parseInt(props.height) * 0.33}px`,
}

const centre = computed(() => {
  const width = twoTag.value!.clientWidth
  const height = twoTag.value!.clientHeight
  return {
    x: width / 2,
    y: height / 2,
  }
})

const radius = computed(() => {
  const width = twoTag.value!.clientWidth
  const height = twoTag.value!.clientHeight
  return Math.min(width, height) / 2
})

const anglePairs = computed(() => {
  const percentages = props.percentages
  const total = percentages.reduce((acc, curr) => acc + curr, 0)
  const angles = percentages.map(percentage => percentage / total * Math.PI * 2)
  const pairs: [number, number][] = []

  let acc = 0
  for (let i = 0; i < angles.length; i++) {
    const angle = angles[i]
    pairs.push([acc, angle + acc])
    acc += angle
  }

  return pairs
})

const tagsPosition = computed(() => {
  const percentages: number[] = props.percentages
  const r = radius.value * 0.90
  const positions: [number, number][] = []

  const total = percentages.reduce((acc, curr) => acc + curr, 0)
  const angles = percentages.map(percentage => percentage / total * Math.PI * 2)

  let acc = 0
  for (let i = 0; i < angles.length; i++) {
    const angle = angles[i] + acc
    const x = centre.value.x + Math.cos(angle / 2) * r
    const y = centre.value.y + Math.sin(angle / 2) * r
    positions.push([x, y])

    acc += angle
  }

  return positions
})

onMounted(() => {
  if (twoTag.value === null)
    return

  const two = new Two({
    fitted: true,
  }).appendTo(twoTag.value)

  for (const angle of anglePairs.value) {
    const [start, end] = angle
    const arc = two.makeArcSegment(centre.value.x, centre.value.y, radius.value * 0.6, radius.value * 0.7, start, end - 0.1)
    arc.fill = fillColors[randomInt(fillColors.length)]
    arc.linewidth = 0
  }

  for (let i=0; i<tagsPosition.value.length; i++) {
    const tagPosition = tagsPosition.value[i];
    const text = two.makeText(props.tags[i], tagPosition[0], tagPosition[1])
  }

  two.update()
})
</script>

<template>
  <div ref="twoTag" class="pie-container">
    <img src="data:image/png;base64,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" alt="">
  </div>
</template>

<style>
.pie-container {
  margin-top: 200px;
  width: v-bind('width');
  height: v-bind('height');
}

.pie-container > img {
  position: absolute;
  margin-top: v-bind('centrolImg.y');
  margin-left: v-bind('centrolImg.x');
  width: v-bind('centrolImg.width');
  height: v-bind('centrolImg.height');
  z-index: -1;
}

</style>
