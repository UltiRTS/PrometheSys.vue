<script lang="ts">
import { defineComponent } from 'vue'
import type { Scene } from '@babylonjs/core'
import { Color3, Color4, DataReader, Engine, SceneLoader } from '@babylonjs/core'
declare interface DataReturn {
  engine: Engine | null
  scene: Scene | null
}
export default defineComponent({
  name: 'BabylonOne',
  data() {
    const res: DataReturn = {
      engine: null,
      scene: null,
    }
    return res
  },
  mounted() { // lifecycle hook
    const canvas = document.querySelector('canvas')
    const engine = new Engine(canvas, true)
    SceneLoader.Load('', 'http://144.126.145.172/scene.babylon', engine, (scene) => {
      this.scene = scene
      scene.clearColor = new Color4(1, 1, 1, 1)
      scene.ambientColor = Color3.White()
      scene.activeCamera?.attachControl(canvas, false)

      engine.runRenderLoop(() => {
        scene.render()
      })

      window.addEventListener('resize', () => {
        engine.resize()
      })
    })
  },
  methods: {
    moveCam() {
      if (this.scene && this.scene.activeCamera) {
        // this.scene.activeCamera.inputs.attached.x = 126.9098447689291
        // this.scene.activeCamera.y = 1.0644704090000594
        // this.scene.activeCamera.z = 255.24346977179576

        // // scene.activeCamera._currentTarget.x=126.9098447689291
        // // scene.activeCamera._currentTarget.y=1.0644704090000594
        // // scene.activeCamera._currentTarget.z=255.24346977179576

        // this.scene.activeCamera.alpha = 3.868476102612409
        // this.scene.activeCamera.beta = 0.31730543427941743
      }
    },
  },
})
</script>
<template>
  <div>
    <h3>BabylonOne</h3>
    <canvas class="babylon"></canvas>
  </div>
</template>
