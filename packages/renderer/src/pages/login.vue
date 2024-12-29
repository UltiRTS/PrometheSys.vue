<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'

import { useUserStore } from '../stores'
import LoginInterface from './logininterface.vue'

const uStore = useUserStore()
const userState = computed(() => uStore.userState) // dont delete this

const isActive = ref(true)
const isNetWorkOpen = uStore.network.ws_open
onBeforeUnmount(() => {
  isActive.value = false
})

onUnmounted(() => {
  // console.log('unmounted')
})

onMounted(() => {

  const c = window.c
  let w = c.width = window.innerWidth
  let h = c.height = window.innerHeight
  const ctx = c.getContext('2d')

  const opts = {
    range: 180,
    baseConnections: 5,
    addedConnections: 5,
    baseSize: 5,
    minSize: 0.5,
    dataToConnectionSize: 0.1,
    sizeMultiplier: 0.5,
    allowedDist: 40,
    baseDist: 40,
    addedDist: 30,
    connectionAttempts: 100,

    dataToConnections: 1,
    baseSpeed: 0.05,
    addedSpeed: 0.001,
    baseGlowSpeed: 0.1,
    addedGlowSpeed: 0.1,

    rotVelX: 0.0009,
    rotVelY: 0.0009,

    repaintColor: 'rgba(0,0,0,.5)',
    connectionColor: '#fff',
    rootColor: '#fff',
    endColor: '#fff',
    dataColor: '#fff',

    wireframeWidth: 0.1,
    wireframeColor: '#fff',

    depth: 175,
    focalLength: 250,
    vanishPoint: {
      x: w / 2,
      y: h / 2,
    },
  }

  const squareRange = opts.range * opts.range
  const squareAllowed = opts.allowedDist * opts.allowedDist
  const mostDistant = opts.depth + opts.range
  let sinY = 0
  let sinX = sinY
  let cosY = 0
  let cosX = cosY

  const connections: Connection[] = []
  const toDevelop: Connection[] = []
  const data = []
  const all: (Connection | Data)[] = []
  let tick = 0
  const totalProb = 0

  let animating = false

  const Tau = Math.PI * 2

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#000'
  ctx.font = '50px Verdana'
  ctx.fillText('Calculating Nodes', w / 2 - ctx.measureText('Calculating Nodes').width / 2, h / 2 - 15)

  window.setTimeout(init, 4) // to render the loading screen

  function init() {
    connections.length = 0
    data.length = 0
    all.length = 0
    toDevelop.length = 0

    const connection = new Connection(0, 0, 0, opts.baseSize)
    connection.step = connection.rootStep
    connections.push(connection)
    all.push(connection)
    connection.link()

    while (toDevelop.length > 0) {
      toDevelop[0].link()
      toDevelop.shift()
    }

    if (!animating) {
      animating = true
      anim()
    }
  }

  class Connection {
    x: number
    y: number
    z: number
    size: number
    links: Connection[]
    probabilities: []
    isEnd: boolean
    glowSpeed: number
    screen: {
      x: number
      y: number
      z: number
      scale: number
      color: string
      lastX: number
      lastY: number
    }

    step: () => void
    rootStep = () => {
      this.setScreen()
      this.screen.color = opts.rootColor
        .replace('light', `${30 + ((tick * this.glowSpeed) % 30)}`)
        .replace('alp', `${(1 - this.screen.z / mostDistant) * 0.8}`)

      for (let i = 0; i < this.links.length; ++i) {
        ctx.moveTo(this.screen.x, this.screen.y)
        ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y)
      }
    }

    constructor(x: number, y: number, z: number, size: number) {
      this.x = x
      this.y = y
      this.z = z
      this.size = size

      this.screen = {
        x: 0,
        y: 0,
        z: 0,
        scale: 0,
        color: '#fff',
        lastX: 0,
        lastY: 0,
      }

      this.links = []
      this.probabilities = []
      this.isEnd = false

      this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random()

      this.step = () => {
        this.setScreen()
        this.screen.color = (this.isEnd ? opts.endColor : opts.connectionColor)
          .replace('light', `${300 + ((tick * this.glowSpeed) % 300)}`)
          .replace('alp', `${4 + (1 - this.screen.z / mostDistant) * 0.8}`)

        for (let i = 0; i < this.links.length; ++i) {
          ctx.moveTo(this.screen.x, this.screen.y)
          ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y)
        }
      }
    }

    link() {
      if (this.size < opts.minSize)
        return this.isEnd = true

      const links = []
      const connectionsNum = opts.baseConnections + Math.random() * opts.addedConnections | 0
      let attempt = opts.connectionAttempts

      let alpha
      let beta
      let len
      let cosA
      let sinA
      let cosB
      let sinB
      const pos: { x: number; y: number; z: number } = {
        x: 0,
        y: 0,
        z: 0,
      }

      let passedExisting
      let passedBuffered

      while (links.length < connectionsNum && --attempt > 0) {
        alpha = Math.random() * Math.PI
        beta = Math.random() * Tau
        len = opts.baseDist + opts.addedDist * Math.random()

        cosA = Math.cos(alpha)
        sinA = Math.sin(alpha)
        cosB = Math.cos(beta)
        sinB = Math.sin(beta)

        pos.x = this.x + len * cosA * sinB
        pos.y = this.y + len * sinA * sinB
        pos.z = this.z + len * cosB

        if (pos.x * pos.x + pos.y * pos.y + pos.z * pos.z < squareRange) {
          passedExisting = true
          passedBuffered = true
          for (let i = 0; i < connections.length; ++i) {
            if (squareDist(pos, connections[i]) < squareAllowed)
              passedExisting = false
          }

          if (passedExisting) {
            for (let i = 0; i < links.length; ++i) {
              if (squareDist(pos, links[i]) < squareAllowed)
                passedBuffered = false
            }
          }

          if (passedExisting && passedBuffered) {
            links.push({
              x: pos.x,
              y: pos.y,
              z: pos.z,
            })
          }
        }
      }

      if (links.length === 0) {
        this.isEnd = true
      }
      else {
        for (let i = 0; i < links.length; ++i) {
          const pos = links[i]
          const connection
            = new Connection(pos.x, pos.y, pos.z, this.size * opts.sizeMultiplier)

          this.links[i] = connection
          all.push(connection)
          connections.push(connection)
        }
        for (let i = 0; i < this.links.length; ++i)
          toDevelop.push(this.links[i])
      }
    }

    draw() {
      ctx.fillStyle = this.screen.color
      ctx.beginPath()
      if (this.screen.x < 0 || this.screen.y < 0 || this.screen.scale < 0 || this.size < 0 || Tau < 0)
        return

      ctx.arc(this.screen.x, this.screen.y, this.screen.scale * this.size, 0, Tau)
      ctx.fill()
    }

    setScreen() {
      let x = this.x
      let y = this.y
      let z = this.z

      // apply rotation on X axis
      const Y = y
      y = y * cosX - z * sinX
      z = z * cosX + Y * sinX

      // rot on Y
      const Z = z
      z = z * cosY - x * sinY
      x = x * cosY + Z * sinY

      this.screen.z = z

      // translate on Z
      z += opts.depth

      this.screen.scale = opts.focalLength / z
      this.screen.x = opts.vanishPoint.x + x * this.screen.scale
      this.screen.y = opts.vanishPoint.y + y * this.screen.scale
    }
  }

  class Data {
    glowSpeed: number
    connection: Connection
    nextConnection: Connection
    x: number
    y: number
    z: number
    size: number
    ox: number
    oy: number
    oz: number
    os: number
    nx: number
    ny: number
    nz: number
    ns: number
    dx: number
    dy: number
    dz: number
    ds: number
    speed: number
    screen: {
      x: number
      y: number
      z: number
      scale: number
      color: string
      lastY: number
      lastX: number
    }

    proportion: number
    ended: number

    constructor(connection: Connection) {
      this.x = 0
      this.y = 0
      this.z = 0
      this.size = 0
      this.ended = 2
      this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random()
      this.speed = opts.baseSpeed + opts.addedSpeed * Math.random()

      this.screen = {
        x: 0,
        y: 0,
        z: 0,
        scale: 0,
        color: '',
        lastY: 0,
        lastX: 0,
      }

      if (connection.isEnd)
        connection = connections[0]

      // should be setConnection(connection)
      this.connection = connection
      this.nextConnection = connection.links[connection.links.length * Math.random() | 0]

      this.ox = connection.x // original coordinates
      this.oy = connection.y
      this.oz = connection.z
      this.os = connection.size // base size

      this.nx = this.nextConnection.x // new
      this.ny = this.nextConnection.y
      this.nz = this.nextConnection.z
      this.ns = this.nextConnection.size

      this.dx = this.nx - this.ox // delta
      this.dy = this.ny - this.oy
      this.dz = this.nz - this.oz
      this.ds = this.ns - this.os

      this.proportion = 0
    }

    setScreen() {
      let x = this.x
      let y = this.y
      let z = this.z

      // apply rotation on X axis
      const Y = y
      y = y * cosX - z * sinX
      z = z * cosX + Y * sinX

      // rot on Y
      const Z = z
      z = z * cosY - x * sinY
      x = x * cosY + Z * sinY

      this.screen.z = z

      // translate on Z
      z += opts.depth

      this.screen.scale = opts.focalLength / z
      this.screen.x = opts.vanishPoint.x + x * this.screen.scale
      this.screen.y = opts.vanishPoint.y + y * this.screen.scale
    }

    setConnection(connection: Connection) {
      if (connection.isEnd) {
        this.reset()
      }
      else {
        this.connection = connection
        this.nextConnection = connection.links[connection.links.length * Math.random() | 0]

        this.ox = connection.x // original coordinates
        this.oy = connection.y
        this.oz = connection.z
        this.os = connection.size // base size

        this.nx = this.nextConnection.x // new
        this.ny = this.nextConnection.y
        this.nz = this.nextConnection.z
        this.ns = this.nextConnection.size

        this.dx = this.nx - this.ox // delta
        this.dy = this.ny - this.oy
        this.dz = this.nz - this.oz
        this.ds = this.ns - this.os

        this.proportion = 0
      }
    }

    reset() {
      this.setConnection(connections[0])
      this.ended = 2
    }

    step() {
      this.proportion += this.speed

      if (this.proportion < 1) {
        this.x = this.ox + this.dx * this.proportion
        this.y = this.oy + this.dy * this.proportion
        this.z = this.oz + this.dz * this.proportion
        this.size = (this.os + this.ds * this.proportion) * opts.dataToConnectionSize
      }
      else {
        this.setConnection(this.nextConnection)
      }

      this.screen.lastX = this.screen.x
      this.screen.lastY = this.screen.y
      this.setScreen()
      this.screen.color = opts.dataColor
        .replace('light', `${400 + ((tick * this.glowSpeed) % 500)}`)
        .replace('alp', `${0.2 + (1 - this.screen.z / mostDistant) * 0.6}`)
    }

    draw() {
      if (this.ended)
        return --this.ended

      // not sre why the thing lasts 2 frames, but it does

      ctx.beginPath()
      ctx.strokeStyle = this.screen.color
      ctx.lineWidth = this.size * this.screen.scale
      ctx.moveTo(this.screen.lastX, this.screen.lastY)
      ctx.lineTo(this.screen.x, this.screen.y)
      ctx.stroke()
    }
  }

  interface Vector3 {
    x: number
    y: number
    z: number
  }

  function squareDist(a: Vector3, b: Vector3) {
    const x = b.x - a.x
    const y = b.y - a.y
    const z = b.z - a.z

    return x * x + y * y + z * z
  }

  function anim() {
    if (!isActive.value)
      return

    // console.log('nn animating')
    window.requestAnimationFrame(anim)

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = opts.repaintColor
    ctx.fillRect(0, 0, w, h)

    ++tick

    const rotX = tick * opts.rotVelX
    const rotY = tick * opts.rotVelY

    cosX = Math.cos(rotX)
    sinX = Math.sin(rotX)
    cosY = Math.cos(rotY)
    sinY = Math.sin(rotY)

    if (data.length < connections.length * opts.dataToConnections) {
      const datum = new Data(connections[0])
      data.push(datum)
      all.push(datum)
    }

    ctx.globalCompositeOperation = 'lighter'
    ctx.beginPath()
    ctx.lineWidth = opts.wireframeWidth
    ctx.strokeStyle = opts.wireframeColor
    all.map((item) => {
      item.step()
      return item
    })
    ctx.stroke()
    ctx.globalCompositeOperation = 'source-over'
    all.sort((a, b) => {
      return b.screen.z - a.screen.z
    })
    all.map((item) => {
      item.draw()
      return item
    })

    /* ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc( opts.vanishPoint.x, opts.vanishPoint.y, opts.range * opts.focalLength / opts.depth, 0, Tau );
    ctx.stroke(); */
  }

  window.addEventListener('resize', () => {
    opts.vanishPoint.x = (w = c.width = window.innerWidth) / 2
    opts.vanishPoint.y = (h = c.height = window.innerHeight) / 2
    ctx.fillRect(0, 0, w, h)
  })


})

// 起床大成功？？？？
const qichuangdachenggong = () => {
  uStore.network.initNetWork()
  // yijingqichuang.value = 'qichuangyijingchenggong'
  uStore.soundPlayer.playNotif('acknowledge.wav')
  uStore.musicPlayer.playSound('title.wav', true)
}

// setup the canvas based on the window size
</script>

<template>
  <div class="blackFadeIn" style="position:absolute;width:100%;height:100%;top:0%;left:0%;background: #000;margin:0;" />
  <div id="mainContent" class="mainContent" style="position:absolute;height:100%;width:100%;overflow:hidden;margin:0;top:0%;left:0%">
    <div style="position:absolute;width:100%;height:100%;top:0%;left:0%;background: #95928a;" />
    <img src="/imgs/bg.png" style="position: absolute; width: 100%;height: 100%;left: 0%;top: 0%;filter: grayscale(100%) contrast(22%) brightness(99%);-webkit-mask-image: linear-gradient(rgb(80 80 80 / 0%), rgb(0, 0, 0));">
    <canvas id="c" ref="canvas" style="position: absolute;top: 0;left: 0;opacity: .2;pointer-events: none;" />
    <div id="stupidCanvas" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events: none;">
      <PBubbles :active="isActive" />
    </div>
    <div v-if="isNetWorkOpen" id="spotlight" style="position: absolute; height: 100%; width: 100%; top: 0%; left: 0%;">
      <div class="leftSpotLight" style="position: absolute; width: 50%; height: 164%;  left: 0%;top: -60%;"></div>
      <div class="rightSpotLight" style="position: absolute; width: 50%; height: 164%;right: 0%;top: -60%;"></div>
    </div>
    <div id="cover" :class="{ cover: isNetWorkOpen }" style="width: 43%; height: 20%; top: 33%; left: 27%; position: absolute;">
      <img src="/imgs/thea_frame.png" style="position: absolute;width: 11vw;filter: drop-shadow(8px 20px 16px #000);">

      <a id="preClick" class="edgy-link" :class="{ qichuangyijingchenggong: isNetWorkOpen }" style="filter: drop-shadow(rgb(0, 0, 0) 8px 20px 16px); position: absolute; margin: 2vw; top: -4%; left: 5vw; font-size: 2vw;color:white;cursor:pointer;" @click="qichuangdachenggong()">
        <span style="font-family: font6;position: relative;opacity: 0.95;left: 0vw;font-weight: 900;color: rgba(255,255,255,0.9);">目覚める</span>
        <span style="font-family: font8; position: relative; opacity: 0.95; left: -7.95vw;">目覚める</span>
      </a>

      <div id="postClick">
        <div v-if="isNetWorkOpen" class="theaTitle" style="position:absolute;font-family:font2;top:9%;left:19%;font-size:2vw;color:white;opacity:0;">
          THEA,
        </div>
        <div v-if="isNetWorkOpen" class="theaTitle2" style="position:absolute;font-family:font2;top:29%;opacity:0;font-size:1.2vw;left:19%;color:white;">
          INC.
        </div>
      </div>
    </div>

    <LoginInterface />
    <div style="position: absolute; top: 98%; left: 44%; font-family: font1; font-size: 1.5vh; color: white;">
      © THEA Pharmaceuticals, Inc.
    </div>
  </div>
</template>

<style scoped>
.leftSpotLight {
  opacity: 0;
  animation-fill-mode: forwards;
  animation-name: leftSpotLight;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  /*animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);*/
}

@keyframes leftSpotLight {
  0% {
    opacity: 0;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(0, 0, 0), black);
  }

  100% {
    opacity: 0.5;
    background-image: linear-gradient(305deg, rgba(0, 0, 0, 0), rgb(0, 0, 0), black);
  }
}

.rightSpotLight {
  opacity: 0;
  animation-fill-mode: forwards;
  animation-name: rightSpotLight;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  /*animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);*/
}

@keyframes rightSpotLight {
  0% {
    opacity: 0;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(0, 0, 0), black);
  }

  100% {
    opacity: 0.5;
    background-image: linear-gradient(55deg, rgba(0, 0, 0, 0), rgb(0, 0, 0), black);
  }
}

@keyframes mainContent {
  0% {
    opacity: 0;
  }

  30% {
    opacity: 0;
  }

  75% {
    opacity: 1;
    visibility: hidden;
  }
}

/* The element to apply the animation to */
.mainContent {
  animation-name: mainContent;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}

@keyframes theaVanish {
  0% {
    opacity: 1;
  }

  100% {
    left: 25%;
    opacity: 0;
  }

}

.cover {
  animation-delay: 2.4s;
  animation-name: theaVanish;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes theaTitle {
  0% {
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  60% {
    opacity: 0;

  }

  100% {
    opacity: 1;
  }

}

.theaTitle {

  animation-name: theaTitle;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-delay: 0.75s;
}

.theaTitle2 {

  animation-name: theaTitle;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-delay: 0.80s;
}

.qichuangyijingchenggong {
  animation: qichuangyijingchenggong 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes qichuangyijingchenggong {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    left: -2.5vw;
  }
}

.edgy-link {
  position: relative;
}

.edgy-link span {
  position: relative;
  z-index: 999;
}

.edgy-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background: rgba(255, 255, 255, .5);
  top: 0;
  left: 0;
  transition: all 0.55s ease;
}

.edgy-link::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  top: 0;
  left: 0;
  transition: all 0.35s ease;
}

.edgy-link:hover span {
  color: #001d3c;
}

.edgy-link:hover::after {
  width: 100%;
  transition: all 0.35s ease;
}

.edgy-link:hover::before {
  width: 100%;
  transition: all 0.55s ease;
}

button {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 0.02vw solid transparent;
  color: #46422f;
  background: transparent;
  border-style: solid none;
  margin: 0 auto;
  display: block;
  font-family: font5;
  font-size: 1vw;
  padding: 0.5vw 0.5vw;
  min-width: 5vw;
  cursor: pointer;
  position: relative;
  transition: all 0.25s;
  text-align: left;
}

button::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: calc(100% - 0.56vw);
  left: 0px;
  top: 0.26vw;
  background: transparent linear-gradient(to right, #46422f 50%, rgba(70, 66, 47, 0.75) 50%, rgba(70, 66, 47, 0.25) 100%) 100% 0/200% 100% no-repeat;
  transition: all 0.35s;
  z-index: -1;
}

button::after {
  content: "";
  display: inline-block;
  /*float: left;*/
  width: 0.8vw;
  height: 0.8vw;
  margin-top: 0.31vw;
  position: absolute;
  left: 29vw;
  background: currentColor;
  border-right: 0.1px solid #46422f;
}

button:focus,
button-clicked {
  border-color: transparent;
  opacity: 0.8;
  outline: none;
}

button+button {
  margin-top: 10px;
}

@media (max-width: 800px) {

  select,
  option {
    text-align: center;
    text-align-last: center;
  }
}
</style>
