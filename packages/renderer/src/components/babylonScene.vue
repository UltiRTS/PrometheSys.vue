<script lang="ts">
import { defineComponent } from 'vue'
import type { Scene } from '@babylonjs/core'
import { ArcRotateCamera, Color3, Color4, DataReader, Engine, SceneLoader, Vector3 } from '@babylonjs/core'
declare interface DataReturn {
  engine: Engine | null
  scene: Scene | null
  cam: ArcRotateCamera | null
}
export default defineComponent({
  name: 'BabylonOne',
  data() {
    const res: DataReturn = {
      engine: null,
      scene: null,
      cam: null,
    }
    return res
  },
  mounted() { // lifecycle hook
    const canvas = document.querySelector('canvas')
    const engine = new Engine(canvas, true)
    // let cam = null
    SceneLoader.Load('', 'models/scene.babylon', engine, (scene) => {
      this.scene = scene
      scene.clearColor = new Color4(1, 1, 1, 1)
      scene.ambientColor = Color3.White()

      this.cam = new ArcRotateCamera('Camera', 3.868476102612409, 0.31730543427941743, 33.1220, new Vector3(3.868476102612409, 0.31730543427941743, 255.24346977179576), scene)
      // scene.activeCamera = this.cam
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
      if (this.cam) {
        // this.cam?.position = new Vector3(3.868476102612409, 0.31730543427941743, 33.1220)
        this.cam.target.x = 126.9098447689291
        this.cam.target.y = 1.0644704090000594
        this.cam.target.z = 255.24346977179576

        this.cam.alpha = 3.868476102612409
        this.cam.beta = 0.31730543427941743
        // // scene.activeCamera._currentTarget.x=126.9098447689291
        // // scene.activeCamera._currentTarget.y=1.0644704090000594
        // // scene.activeCamera._currentTarget.z=255.24346977179576
        // this.scene.activeCamera.setTarget(new Vector3(3.868476102612409, 0.31730543427941743, 33.1220))
        // this.scene.activeCamera.alpha = 3.868476102612409
        // this.scene.activeCamera.beta = 0.31730543427941743
        // const cam = new ArcRotateCamera('Camera', 3.868476102612409, 0.31730543427941743, 33.1220, new Vector3(3.868476102612409, 0.31730543427941743, 255.24346977179576), this.scene)
        // this.cam?.setTarget(new Vector3(126.9098447689291, 1.0644704090000594, 255.24346977179576))
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
