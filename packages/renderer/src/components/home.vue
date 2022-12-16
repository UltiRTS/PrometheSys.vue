<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import type { Scene } from '@babylonjs/core'
import { ArcRotateCamera, Color3, Color4, DataReader, Engine, SceneLoader, Vector3 } from '@babylonjs/core'
import { useUserStore } from '../stores'
declare interface DataReturn {
  engine: Engine | null
  scene: Scene | null
  cam: ArcRotateCamera | null
  camAngle: number
  camRotate: number
  camRadius_2: number
  isExiting: boolean
  camRadius: number
}
export default defineComponent({
  name: 'BabylonOne',
  props: ['visible'],
  data() {
    const res: DataReturn = {
      engine: null,
      scene: null,
      cam: null,
      camAngle: 0,
      isExiting: false,
      camRadius: 10,
      camRotate: 0,
      camRadius_2: 0,
    }
    return res
  },
  computed: {
    ...mapState(useUserStore, ['joinedGame', 'mainMenuContent', 'modalMenuContent', 'activeWindow', 'network', 'ui', 'musicPlayer']),
  },
  mounted() { // lifecycle hook
    const canvas = document.querySelector('canvas')
    const engine = new Engine(canvas, true)
    SceneLoader.ShowLoadingScreen = false
    setTimeout(() => {
      SceneLoader.Load('', 'models/scene.babylon', engine, (scene) => {
        this.scene = scene
        scene.clearColor = new Color4(1, 1, 1, 1)
        scene.ambientColor = Color3.White()

        const cam = new ArcRotateCamera('Camera', 3.868476102612409, 0.31730543427941743, 33.1220, new Vector3(3.868476102612409, 0.31730543427941743, 255.24346977179576), scene)
        this.cam = cam
        scene.activeCamera = scene.cameras[1]
        scene.activeCamera?.attachControl(canvas, false)
        let t0 = performance.now()
        engine.runRenderLoop(() => {
          if (this.isExiting)
            return
          if (!this.visible)
            return
          const tPrime = performance.now()
          const dt = tPrime - t0
          t0 = tPrime
          if (cam.radius > 21)
            cam.radius = 21
          if (cam.radius < 3)
            cam.radius = 3
          if (cam.beta > 1.04)
            cam.beta = 1.04
          if (cam.alpha > 3.1415926535 * 2)
            cam.alpha = 0
          if (cam.alpha < -3.1415926535 * 2)
            cam.alpha = 0
          this.camRotate = cam.alpha
          this.camAngle = cam.beta * 5
          this.camRadius = -cam.radius + 10
          this.camRadius_2 = -cam.radius + 2
          cam.alpha = cam.alpha + dt * 0.0001
          this.musicPlayer.playSound('base.wav', true)
          scene.render()
        })

        window.addEventListener('resize', () => {
          engine.resize()
        })

        this.cam.target.x = 126.9098447689291
        this.cam.target.y = 1.0644704090000594
        this.cam.target.z = 255.24346977179576
      })
    }, 1000)
  },
  beforeUnmount() {
    if (this.scene)
      this.scene.dispose()

    if (this.engine)
      this.engine.dispose()

    this.isExiting = true
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
  <div style="position:absolute; top:0; height:100%;width:100%;left:0%;" :class="{vis:visible, invis:!visible}">
    <canvas class="babylon" style="position:absolute; top:25%; height:50%;width:50%;left:25%;transform: scale(2);" :class="{notRender:!visible}"></canvas>
    <div v-if="cam" id="uiOverlay" data-v-957c9522="" style="position: absolute; top: 0%; width: 40%; height: 100%; left: 27%; perspective: 10vh; font-size: 9vh; pointer-events: none;">
      <div class="3dMapOverlay" :style="{'transform-style': 'preserve-3d',transform: 'rotateX('+camAngle+'deg) rotateZ('+camRotate+'rad)  translateZ('+camRadius_2+'vh)', 'filter': 'drop-shadow(18vh 6vh 18px rgba(50,50,50,0.5))','transform-origin': 'center',}">
        ROTATING PLANE!
      </div>
    </div>
    <div v-if="cam" id="ui3dSpace" data-v-957c9522="" style="position: absolute; top: 0%; width: 40%; height: 100%; left: 27%; perspective: 10vh; font-size: 9vh; pointer-events: none;mix-blend-mode:multiply;">
      <div data-v-957c9522="" :style="{ position: 'absolute', background: '#00000014', 'transform-style': 'preserve-3d',transform: 'rotateX('+camAngle+'deg) translateZ('+camRadius+'vh)', 'filter': 'drop-shadow(18vh 6vh 18px rgba(50,50,50,0.5))','height':'100%','width':'100%,'}">
        <div class="updateHeader" data-v-957c9522="">
          <div style="position:absolute;font-size:16.5vh;top:7vh;font-family:font10;width:109vh;font-weight:900;color:#000000;left:59.4vh;" data-v-957c9522="">
            2
          </div><div style="position:absolute;font-size:7vh;top:9vh;font-family:font10;width:109vh;font-weight:900;color:#0000006e;left:-0.6vh;" data-v-957c9522="">
            INCOMING DATA:
          </div><div style="position:absolute;font-size:7vh;top:11vh;font-family:font10;width:109vh;/* font-weight:900;*/ color:#0000006e;left:72.4vh;" data-v-957c9522="">
            hours ago
          </div><div style="position:absolute;font-size:3.4vh;top:9vh;font-family:font10;width:109vh;/* font-weight:900;*/ color:#000000;left:79.1vh;" data-v-957c9522="">
            3 days
          </div><div style="position:absolute;font-size:3.4vh;top:19vh;font-family:font10;width:109vh;/* font-weight:900;*/ color:#000000;left:75.1vh;" data-v-957c9522="">
            5 minutes
          </div><div style="position:absolute;font-size:2.5vh;top:19vh;font-family:font2;letter-spacing:2.3vh;width:176vh;color:black;" data-v-957c9522="">
            LATEST UPDATES
          </div>
        </div><div class="contentTitle" style="position:absolute;left: 45vh;">
          <img src="/imgs/thea.png" style="position:absolute;filter:invert(1);height: 61vh;top: 6vh;opacity: 7%;">
          <div style="position:absolute;font-size: 23vh;top: 21vh;font-family:font10;width:109vh;font-weight:900;color: #000000;left:-0.6vh;" data-v-957c9522="">
            ROUTINE
          </div>
          <div style="position:absolute;font-size: 2vh;top: 44vh;font-family:font10;width:109vh;/* font-weight:900; */color: #000000;left: 2.4vh;letter-spacing: 3.9vh;">
            THEA PHARMACEUTICALS
          </div>
          <div style="position:absolute;width:4vh;height:4vh;background:black;left: -7vh;top: 52vh;"></div>

          <div style="position:absolute;width:4vh;height: 215vh;background: #00000005;left: -7vh;top: -26vh;"></div><div style="position:absolute;width: 400vw;height:4vh;background: #00000005;left: -74vw;top: 52vh;"></div>
        </div><div class="content">
          <div class="dodContent" style="position:absolute;left: 14vh;">
            <div class="dodTitle" style="height: 14vh;width: 87vh;background: #7a7a7a17;top: 93vh;left: 47vh;position:absolute;mix-blend-mode: multiply;">
              <div class="dodTitle" style="font-weight:900;color: #ffffff8c;top: 4vh;left: 68vh;position:absolute;">
                DOD
              </div>
            </div>
            <div class="dodTitle" style="text-align:right;font-family: font10;color: #000000b5;top: 61vh;left: 45vh;position:absolute;font-size: 4vh;width: 90vh;">
              <div style="background:black;color:white;width: 16vh;font-size: 4vh;right:1vh;position:absolute;">
                OBJV
              </div><div style="/* background:black; */color: black;width: 92vh;font-size: 4vh;right:1vh;position:absolute;top: 5vh;">
                Participate and organize a series of operations.
              </div><div style="background:black;color:white;width: 16vh;font-size: 4vh;right:1vh;position:absolute;top: 13vh;">
                CNDT
              </div><div style="background:black;color:white;width: 16vh;font-size: 4vh;right:1vh;position:absolute;top: 26vh;">
                AVBT
              </div><div style="/* background:black; */color: black;width: 86vh;font-size: 4vh;right:1vh;position:absolute;top: 18vh;">
                Consumes sanity while xxxx is dropped
              </div><div style="/* background:black; */color: black;width: 56vh;font-size: 4vh;right:1vh;position:absolute;top: 32vh;">
                Available daily
              </div>
            </div>
          </div>
        </div><div class="contentMenu" data-v-957c9522="" style="font-family: font5; pointer-events: auto;">
          <div data-v-957c9522="" style="position: absolute; font-size: 3vh; top: 85vh; width: 32vh; left: -0.6vh; background: rgb(90, 90, 90); text-align: right; padding-top: 4vh; padding-right: 1vh;cursor:pointer;" @click.stop="ui.setmainMenuContent('dod')">
            DOCTOR'S DESK
          </div><div data-v-957c9522="" style="position: absolute; font-size: 3vh; top: 73vh; width: 32vh; left: -0.6vh; background: rgb(90, 90, 90); text-align: right; padding-top: 4vh; padding-right: 1vh;">
            RECALL
          </div><div data-v-957c9522="" style="position: absolute; font-size: 3vh; top: 61vh; width: 32vh; left: -0.6vh; background: rgb(90, 90, 90); text-align: right; padding-top: 4vh; padding-right: 1vh;cursor:pointer;" @click.stop="ui.setmainMenuContent('rglike')">
            IVORY TOWER
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.vis{
  visibility:visible
}
.invis{
  visibility:hidden
}
.notRender{
  display:none;
}
</style>
