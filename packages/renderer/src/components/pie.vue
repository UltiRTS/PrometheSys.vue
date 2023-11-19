<script lang="ts" setup>
import { randomInt } from 'crypto'
import { computed, onMounted, ref } from 'vue'
import Two from 'two.js'

const twoTag = ref<HTMLElement | null>(null)

const fillColors = ['black', 'gray', 'cyan']

const props = defineProps<{
  percentages: number[]
  tags: string[]
}>()

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

onMounted(() => {
  const tagsPosition = (radius: number, centre: { x: number; y: number }) => {
    const percentages: number[] = props.percentages
    const r = radius * 0.90
    const positions: [number, number][] = []

    const total = percentages.reduce((acc, curr) => acc + curr, 0)
    const angles = percentages.map(percentage => percentage / total * Math.PI * 2)

    let acc = 0
    for (let i = 0; i < angles.length; i++) {
      const angle = angles[i] + acc
      const x = centre.x + Math.cos(angle / 2) * r
      const y = centre.y + Math.sin(angle / 2) * r
      positions.push([x, y])

      acc += angle
    }

    return positions
  }

  if (twoTag.value === null)
    return

  const two = new Two({
    width: twoTag.value.clientWidth,
    height: twoTag.value.clientHeight,
  }).appendTo(twoTag.value)

  const radius = Math.min(two.height, two.width) / 2
  const centre = { x: two.width / 2, y: two.height / 2 }
  const tagsPositions = tagsPosition(radius, centre)

  // console.log(`twoTag: ${twoTag.value.clientWidth}, ${twoTag.value.clientHeight}`)
  // console.log(`two- width: ${two.width}, height: ${two.height}`)
  // console.log(`center ${centre.x}, ${centre.y}`)

  for (const angle of anglePairs.value) {
    const [start, end] = angle
    const arc = two.makeArcSegment(centre.x, centre.y, radius * 0.6, radius * 0.7, start, end - 0.1)
    arc.fill = fillColors[randomInt(fillColors.length)]
    arc.linewidth = 0
  }

  for (let i = 0; i < tagsPositions.length; i++) {
    const tagPosition = tagsPositions[i]
    const text = two.makeText(props.tags[i], tagPosition[0], tagPosition[1])
  }

  two.update()
})
</script>

<template>
  <div ref="twoTag" class="pie-container" />
</template>

<style>
.pie-container {
  width: 100%;
  height: 100%;

  background: url('https://cdn-icons-png.flaticon.com/256/7602/7602742.png') no-repeat center center;
  background-size: 50% 50%;
}

</style>
