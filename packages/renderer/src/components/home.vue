<script lang="ts">
import { defineComponent } from 'vue'
import type { Scene } from '@babylonjs/core'
import { ArcRotateCamera, Color3, Color4, DataReader, Engine, SceneLoader, Vector3 } from '@babylonjs/core'
declare interface DataReturn {
  engine: Engine | null
  scene: Scene | null
  cam: ArcRotateCamera | null
  camAngle: number
  isExiting: boolean
  camRadius: number
}
export default defineComponent({
  name: 'BabylonOne',
  data() {
    const res: DataReturn = {
      engine: null,
      scene: null,
      cam: null,
      camAngle: 0,
      isExiting: false,
      camRadius: 10,
    }
    return res
  },
  computed: {
  },
  mounted() { // lifecycle hook
    const canvas = document.querySelector('canvas')
    const engine = new Engine(canvas, true)
    // let cam = null
    SceneLoader.Load('', 'models/scene.babylon', engine, (scene) => {
      this.scene = scene
      scene.clearColor = new Color4(1, 1, 1, 1)
      scene.ambientColor = Color3.White()

      const cam = new ArcRotateCamera('Camera', 3.868476102612409, 0.31730543427941743, 33.1220, new Vector3(3.868476102612409, 0.31730543427941743, 255.24346977179576), scene)
      this.cam = cam
      scene.activeCamera = scene.cameras[1]
      scene.activeCamera?.attachControl(canvas, false)

      engine.runRenderLoop(() => {
        scene.render()
      })

      window.addEventListener('resize', () => {
        engine.resize()
      })
      let t0 = performance.now()
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const parent = this
      function rotateCam(timestamp: number) {
        parent.camAngle = cam.beta * 45
        parent.camRadius = -10 * cam.radius + 300
        const dt = timestamp - t0
        t0 = timestamp
        if (scene.activeCamera)
          cam.alpha = cam.alpha + dt * 0.0001
        if (!parent.isExiting)
          requestAnimationFrame(rotateCam) // call requestAnimationFrame again to animate next frame
      }
      requestAnimationFrame(rotateCam)
      this.cam.target.x = 126.9098447689291
      this.cam.target.y = 1.0644704090000594
      this.cam.target.z = 255.24346977179576
    })
    /* setInterval(() => {
      if (this.cam)
        this.cam.alpha += 0.1
      console.log(this.cam.alpha)
    }, 40) */
  },
  beforeUnmount() {
    if (this.scene)
      this.scene.dispose()
    this.isExiting = true
  },
  methods: {
    moveCam() {
      if (this.cam) {
        // this.cam?.position = new Vector3(3.868476102612409, 0.31730543427941743, 33.1220)
        this.cam.target.x = 126.9098447689291
        this.cam.target.y = 1.0644704090000594
        this.cam.target.z = 255.24346977179576
        console.log('moving')
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
    /*
    camAngle() {
      if (this.cam)
        return this.cam.beta
      else
        return 0
    }, */
  },
})
</script>
<template>
  <div style="position:absolute; top:0; height:100%;width:100%;left:0%;">
    <canvas class="babylon" style="position:absolute; top:25%; height:50%;width:50%;left:25%;transform: scale(2);"></canvas>
    <div v-if="cam" id="ui3dSpace" style="position:absolute;top:0%;width:40%;height:100%;left: 27%;perspective: 100vh;font-size:9vh;pointer-events: none;">
      <div :style="{ position: 'absolute', background: 'black', 'transform-style': 'preserve-3d',transform: 'rotateX('+camAngle+'deg) translateZ('+camRadius+'vh)', }">
        MOVE CAM
        {{ cam.beta }}
      </div>
    </div>
  </div>
</template>
