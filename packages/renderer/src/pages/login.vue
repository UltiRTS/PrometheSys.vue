<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'

import { useUserStore } from '../stores'

const uStore = useUserStore()
const userState = computed(() => uStore.userState)
const isActive = ref(true)

onBeforeUnmount(() => {
  isActive.value = false
})

onUnmounted(() => {
  console.log('unmounted')
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

  const connections = []
  const toDevelop = []
  const data = []
  const all = []
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
    connection.step = Connection.rootStep
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

  function Connection(x, y, z, size) {
    this.x = x
    this.y = y
    this.z = z
    this.size = size

    this.screen = {}

    this.links = []
    this.probabilities = []
    this.isEnd = false

    this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random()
  }

  Connection.prototype.link = function () {
    if (this.size < opts.minSize)
      return this.isEnd = true

    const links = []
    const connectionsNum = opts.baseConnections + Math.random() * opts.addedConnections | 0
    let attempt = opts.connectionAttempts

    let alpha; let beta; let len
    let cosA; let sinA; let cosB; let sinB
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
        for (var i = 0; i < connections.length; ++i) {
          if (squareDist(pos, connections[i]) < squareAllowed)
            passedExisting = false
        }

        if (passedExisting) {
          for (var i = 0; i < links.length; ++i) {
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

    if (links.length === 0) { this.isEnd = true }
    else {
      for (var i = 0; i < links.length; ++i) {
        const pos = links[i]
        const connection
          = new Connection(pos.x, pos.y, pos.z, this.size * opts.sizeMultiplier)

        this.links[i] = connection
        all.push(connection)
        connections.push(connection)
      }
      for (var i = 0; i < this.links.length; ++i)
        toDevelop.push(this.links[i])
    }
  }
  Connection.prototype.step = function () {
    this.setScreen()
    this.screen.color = (this.isEnd ? opts.endColor : opts.connectionColor)
      .replace('light', `${300 + ((tick * this.glowSpeed) % 300)}`)
      .replace('alp', `${4 + (1 - this.screen.z / mostDistant) * 0.8}`)

    for (let i = 0; i < this.links.length; ++i) {
      ctx.moveTo(this.screen.x, this.screen.y)
      ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y)
    }
  }
  Connection.rootStep = function () {
    this.setScreen()
    this.screen.color = opts.rootColor
      .replace('light', `${30 + ((tick * this.glowSpeed) % 30)}`)
      .replace('alp', `${(1 - this.screen.z / mostDistant) * 0.8}`)

    for (let i = 0; i < this.links.length; ++i) {
      ctx.moveTo(this.screen.x, this.screen.y)
      ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y)
    }
  }
  Connection.prototype.draw = function () {
    ctx.fillStyle = this.screen.color
    ctx.beginPath()
    if (this.screen.x < 0 || this.screen.y < 0 || this.screen.scale < 0 || this.size < 0 || Tau < 0)
      return

    ctx.arc(this.screen.x, this.screen.y, this.screen.scale * this.size, 0, Tau)
    ctx.fill()
  }

  function Data(connection) {
    this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random()
    this.speed = opts.baseSpeed + opts.addedSpeed * Math.random()

    this.screen = {}

    this.setConnection(connection)
  }
  Data.prototype.reset = function () {
    this.setConnection(connections[0])
    this.ended = 2
  }
  Data.prototype.step = function () {
    this.proportion += this.speed

    if (this.proportion < 1) {
      this.x = this.ox + this.dx * this.proportion
      this.y = this.oy + this.dy * this.proportion
      this.z = this.oz + this.dz * this.proportion
      this.size = (this.os + this.ds * this.proportion) * opts.dataToConnectionSize
    }
    else { this.setConnection(this.nextConnection) }

    this.screen.lastX = this.screen.x
    this.screen.lastY = this.screen.y
    this.setScreen()
    this.screen.color = opts.dataColor
      .replace('light', `${400 + ((tick * this.glowSpeed) % 500)}`)
      .replace('alp', `${0.2 + (1 - this.screen.z / mostDistant) * 0.6}`)
  }
  Data.prototype.draw = function () {
    if (this.ended)
      return --this.ended // not sre why the thing lasts 2 frames, but it does

    ctx.beginPath()
    ctx.strokeStyle = this.screen.color
    ctx.lineWidth = this.size * this.screen.scale
    ctx.moveTo(this.screen.lastX, this.screen.lastY)
    ctx.lineTo(this.screen.x, this.screen.y)
    ctx.stroke()
  }
  Data.prototype.setConnection = function (connection) {
    if (connection.isEnd) { this.reset() }

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
  Connection.prototype.setScreen = Data.prototype.setScreen = function () {
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

  function squareDist(a, b) {
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
    })
    ctx.stroke()
    ctx.globalCompositeOperation = 'source-over'
    all.sort((a, b) => {
      return b.screen.z - a.screen.z
    })
    all.map((item) => {
      item.draw()
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

const username = ref('')
const password = ref('')
const yijingqichuang = ref('')

const qichuangdachenggong = () => {
  yijingqichuang.value = 'qichuangyijingchenggong'
  // console.log('setting var')
}

function loginWrapper() {
  // do something else
  uStore.login({
    username: username.value,
    password: password.value,
  })
}
// setup the canvas based on the window size

</script>

<template>
  <div class="blackFadeIn" style="position:absolute;width:100%;height:100%;top:0%;left:0%;background: #000;margin:0;" />
  <div id="mainContent" class="mainContent" style=" position:absolute;height:100%;width:100%;overflow:hidden;margin:0;top:0%;left:0%">
    <div style="position:absolute;width:100%;height:100%;top:0%;left:0%;background: #95928a;" />
    <img src="/imgs/bg.png" style="position: absolute;width: 100%;height: 100%;left: 0%;top: 0%;filter: grayscale(100%) contrast(22%) brightness(99%);-webkit-mask-image: linear-gradient(rgb(80 80 80 / 0%), rgb(0, 0, 0));">
    <canvas id="c" ref="canvas" style="position: absolute;top: 0;left: 0;opacity: .2;pointer-events: none;" />
    <div id="stupidCanvas" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events: none;">
      <PBubbles :active="isActive" />
    </div>
    <div v-if="yijingqichuang" id="spotlight" style="position: absolute; height: 100%; width: 100%; top: 0%; left: 0%;">
      <div class="leftSpotLight" style="position: absolute; width: 50%; height: 164%;  left: 0%;top: -60%;"></div>
      <div class="rightSpotLight" style="position: absolute; width: 50%; height: 164%;right: 0%;top: -60%;"></div>
    </div>
    <div id="cover" :class="{cover:yijingqichuang}" style="width: 43%; height: 20%; top: 33%; left: 27%; position: absolute;">
      <img src="/imgs/thea_frame.png" style="position: absolute;width: 11vw;filter: drop-shadow(8px 20px 16px #000);">

      <a id="preClick" class="edgy-link" :class="yijingqichuang" style="filter: drop-shadow(rgb(0, 0, 0) 8px 20px 16px); position: absolute; margin: 2vw; top: -4%; left: 5vw; font-size: 2vw;color:white;" @click="qichuangdachenggong()">
        <span style="font-family: font6;position: relative;opacity: 0.95;left: 0vw;font-weight: 900;color: rgba(255,255,255,0.9);">目覚める</span>
        <span style="font-family: font8; position: relative; opacity: 0.95; left: -7.95vw;">目覚める</span>
      </a>

      <div id="postClick">
        <div v-if="yijingqichuang" class="theaTitle" style="position:absolute;font-family:font2;top:9%;left:19%;font-size:2vw;color:white;opacity:0;">
          THEA,
        </div>
        <div v-if="yijingqichuang" class="theaTitle2" style="position:absolute;font-family:font2;top:29%;%;opacity:0;font-size:1.2vw;left:19%;color:white;">
          INC.
        </div>
      </div>
    </div>

    <div id="loginInterface" :style="{'display':(yijingqichuang? '':'none')}">
      <img src="/imgs/thea_auth.png" :class="{loginInterface_bgWaterMark:yijingqichuang}" style="opacity:0.00; position: absolute;width: 50vw;top: 70%; ">

      <div id="loginbox" class="loginbox" style="position: absolute; height: 100%; width: 100%; mix-blend-mode: screen;">
        <div class="PRTSLOGO" style="position:absolute;top:45%;color:white;margin:0;left:30%;width:12vw;overflow:hidden;">
          <div style="background:white;position:absolute;top:0;width:100%;height:2px;" />
          <p class="corpName" style="position:absolute;margin:0;top:0.5vw;font-family:font2;font-weight:900;font-size:2vw;">
            THEA
          </p>
          <p id="prtsPharma" class="corpJob" style="position:absolute;margin:0;top:2.5vw;font-family:font2;font-size:0.8vw;">
            PHARMACEUTICALS
          </p>

          <div class="corpProduct" style="position:absolute;margin:0;font-size:1vw;width:100%;top:55%;font-family:font5;">
            <span id="prtsOS" style="">Analysis&nbsp;</span>
            <span id="prtsOS1" style="font-weight:900;">OS</span>
            <span id="prtsVer" class="theaTitle" style="font-size:0.6vw;position:absolute;right:0;top:80%;">&nbsp;LTS BUILD
              V11.04</span>
          </div>
          <div id="underlinePRTS" class="" style="background:white;position:absolute;width:100%;height:2px;top:90%;" />
        </div>
        <div id="logininput" :class="{logininput:!userState.isLoggedIn,logininputOut:userState.isLoggedIn}" style="position:absolute;height:5.5vw;top:45%;filter: drop-shadow(10px 10px 2px rgba(255,255,255,0.5));left:45%;background:rgb(177 170 160 / 78%);width:20%;overflow:hidden;">
          <img src="/imgs/thea.png" style="position:absolute;width: 48%;top: 31%;right: 1%;filter: invert(0.1);opacity:0.1">
          <p style="cursor: default;top:1.2vw;position:absolute;left:1.2vw;font-size:1.5vw;background-color:black;color:white;margin:0;padding:0;filter: drop-shadow(4px 5px 2px rgba(0,0,0,0.5));">
            Dr.&nbsp;
          </p>
          <input id="usr" v-model="username" style="cursor: text;top:1.2vw;position:absolute;left:3.5vw;font-size:1.5vw; display: inline;border:none;outline:none;width:18vw;background: transparent;color:black;" type="text" placeholder="Name" name="uname" required="">

          <input id="passwd" v-model="password" style="font-size:1.5vw;margin:0;cursor: text;top:3.2vw;position:absolute;left:1.2vw;border:none;outline:none;background: transparent;" type="password" placeholder="Password" name="psw" required="">

          <p
            id="loginInputStatus" class="connect"
            style="cursor: pointer;top:3.2vw;position:absolute;left:85%;font-size: 1vw;margin:0;color:black;font-weight:900;filter: drop-shadow(4px 5px 2px rgba(0,0,0,0.5));" @click="loginWrapper"
          >
            ▶
          </p>
        </div>

        <div
          style="position:absolute;top:80%;left:30%;height:10vw;width:37vw;font-size:0.8vw;height:100%;overflow:hidden;"
        >
          <div id="" class="button-block" style="position:absolute;top:0%;width:100%;" onclick="rememberMe()">
            <button id="rememberName" style="width:100%;height:3vw;" class="">
              Persistent Neural Link
            </button>
          </div>
          <div class="button-block" style="position:absolute;top:4vw;width:100%;" onclick="registerMe()">
            <button id="register" style="width:100%;height:3vw;" class="">
              Register this Neural Link
            </button>
          </div>
        </div>

        <div v-if="userState.isLoggedIn" id="welcomeMsg" style="position:absolute;left:48%;height:6vw;top:45%;color:white;width:100%;overflow:hidden; " class="welcomeMsg">
          <div id="welcomeHeading" class="welcomeHeading" style="font-size:6vw;top:-2vw;">
            歓迎
          </div>

          <div id="welcomeUser" class="welcomeUser" style="font-size:3vw;position:absolute;">
            <span style="font-size:3vw;font-weight:900;opacity:0.4">Dr.&nbsp;{{ username }}</span>
          </div>

          <div id="welcomeSubline1" class="welcomeSubline1" style="font-size:0.5vw;position: absolute; top: 3vw; height:0.4vw;width:0.4vw;">
            <div class="welcomeSublineBar1" style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)">
            </div>
            <div class="welcomeSublineTxt1" style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;">
              Releasing neural transmitters
            </div>
          </div>
          <div id="welcomeSubline2" class="welcomeSubline2" style="font-size:0.5vw;position: absolute; top: 3.5vw; height:0.4vw;width:0.4vw;">
            <div class="welcomeSublineBar2" style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)">
            </div>
            <div class="welcomeSublineTxt2" style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;">
              Connecting to the neuralnetwork
            </div>
          </div>
          <div id="welcomeSubline3" class="welcomeSubline3" style="font-size:0.5vw;position: absolute; top: 4vw; height:0.4vw;width:0.4vw;">
            <div class="welcomeSublineBar3" style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)">
            </div>
                        <div class="welcomeSublineTxt3" style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;">
              Polling databse
            </div>
          </div>
          <div id="welcomeSubline4" class="welcomeSubline4" style="font-size:0.5vw;position: absolute; top: 4.5vw; height:0.4vw;width:0.4vw;">
            <div class="welcomeSublineBar4" style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)">
            </div>
                        <div class="welcomeSublineTxt4" style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;">
              Connecting through /dev/neuralTTY0
            </div>
          </div>
          <div id="welcomeSubline5" class="welcomeSubline5" style="font-size:0.5vw;position: absolute; top: 5vw; height:0.4vw;width:0.4vw;">
            <div class="welcomeSublineBar5" style="margin-left:200%;position:absolute;top:0;left:0;height:100%; background:rgba(255,255,255,1)">
            </div>
                        <div class="welcomeSublineTxt5" style="position:absolute; color:white; font-size:0.5vw;font-family:font5;width:4000%;margin:0;top:-40%;left:300%;opacity:0;">
              Welcome
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="position: absolute; top: 98%; left: 44%; font-family: font1; font-size: 1.5vh; color: white;">
      © THEA Pharmaceuticals, Inc.
    </div>
  </div>
</template>

<style scoped>
.logininputOut{
	background-color: white;
opacity:0;
	mix-blend-mode: screen;
overflow:hidden;
	top:-2vw;
color:white;
	animation-fill-mode: forwards;
	animation-name: logininputGoneAnime;
	animation-duration: 0.7s;
	animation-iteration-count: 1;
	animation-delay:0s;
	animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
	width:22vw;left:45%;opacity:1;
}

@keyframes logininputGoneAnime {

	0%   {width:22vw;left:45%;opacity:1;}

	100%   {width:0.1vw;left:45%;opacity:1;}
}

.welcomeSublineBar1{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 3.5s;
  animation-iteration-count: 1;
  animation-delay:4.0s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.welcomeSublineBar2{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 3.5s;
  animation-iteration-count: 1;
  animation-delay:4.1s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.welcomeSublineBar3{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 3.5s;
  animation-iteration-count: 1;
  animation-delay:4.4s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.welcomeSublineBar4{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 3.5s;
  animation-iteration-count: 1;
  animation-delay:4.5s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.welcomeSublineBar5{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineBar;
  animation-duration: 3.5s;
  animation-iteration-count: 1;
  animation-delay:4.8s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

  @keyframes welcomeSublineBar {
  0%   {opacity:0; left:0%;right:2000%;}
  15.9% {opacity:1;}
  16% {opacity:0;}
  17% {opacity:0;}
  17.1% {opacity:1;}
  20%   {opacity:1;left:0%;right:-2500%;}
  40%   {opacity:1;left:0%;right:-2500%;}
  70%   {opacity:0;left:2500%;right:-2500;}
}



.welcomeSublineTxt1{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay:4.0s;
}

.welcomeSublineTxt2{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay:4.1s;
}

.welcomeSublineTxt3{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay:4.4s;
}

.welcomeSublineTxt4{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay:4.5s;
}

.welcomeSublineTxt5{
  animation-fill-mode: forwards;
  animation-name: welcomeSublineTxt;
  animation-duration: 2.2s;
  animation-iteration-count: 1;
  animation-delay:4.8s;
}

  @keyframes welcomeSublineTxt {
  0%   {opacity:0;}
  50% {opacity:0;}
  51% {opacity:1;}
  100% {opacity:1;}
}
.welcomeSubline1{
  font-family:font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay:4.0s;
  background:rgba(255,255,255,0);
}
.welcomeSubline2
{
  font-family:font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay:4.1s;
  background:rgba(255,255,255,0);
  }
.welcomeSubline3
{
font-family:font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay:4.4s;
  background:rgba(255,255,255,0);
  }
.welcomeSubline4
{
font-family:font5;
  animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay:4.5s;
  background:rgba(255,255,255,0);
  }
.welcomeSubline5
{
  font-family:font5;
    animation-fill-mode: forwards;
  animation-name: welcomeSubline;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-delay:4.8s;
  background:rgba(255,255,255,0);
  }
  @keyframes welcomeSubline {
  0%   {background:rgba(255,255,255,0.5);}
  20%   {background:rgba(255,255,255,0.5);}
  21%   {background:rgba(255,255,255,0);}
  40%   {background:rgba(255,255,255,0);}
  41%   {background:rgba(255,255,255,0.5);}
  60%   {background:rgba(255,255,255,0.5);}
  61%   {background:rgba(255,255,255,0);}
  80%   {background:rgba(255,255,255,0);}
  81%   {background:rgba(255,255,255,0.5);}
  100%   {background:rgba(255,255,255,0.5);}
}

.welcomeHeading{
  left:0%;
  opacity:0;
  position:absolute;
  color:white;
  animation-fill-mode: forwards;
  animation-name: welcomeHeading;
  animation-duration: 2.5s;
  animation-iteration-count: 1;
  animation-delay:0.8s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);

}

@keyframes welcomeHeading {
  0%   {left:10%;opacity:0;}
  30%   {left:0%;opacity:0.4;}
  60%   {left:0%;opacity:0.4;}
  100%   {left:-20%;opacity:0;}
}

.welcomeUser{
  top:7vw;
  opacity:0;
  position:absolute;
  color:white;
  animation-fill-mode: forwards;
  animation-name: welcomeUserAnime;
  animation-duration: 0.7s;
  animation-iteration-count: 1;
  animation-delay:3.3s;
  animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);

}

@keyframes welcomeUserAnime {
  0%   {top:7vw;opacity:0;}
  100%   {top:-0.6vw;opacity:1;}
}

.leftSpotLight{
   opacity:0;
  animation-fill-mode: forwards;
  animation-name: leftSpotLight;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-delay:0s;
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

.rightSpotLight{
   opacity:0;
  animation-fill-mode: forwards;
  animation-name: rightSpotLight;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-delay:0s;
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
  visibility:hidden;
}
}
.logininput{
    background-color: white;
  opacity:0;
    mix-blend-mode: screen;
  overflow:hidden;
  top:-2vw;
  color:white;
  animation-fill-mode: forwards;
  animation-name: logininputAnime;
    animation-duration: 1.5s;
    animation-iteration-count: 1;
    animation-delay:2.5s;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
    width:1vw;
}

@keyframes logininputAnime {
    0%   {left:80%;width:0.2vw;opacity:0;}
    30% {opacity:0;}
    50% {left:45%;width:0.2vw;opacity:1;}
    51% {left:45%;width:0.2vw;opacity:0;}
    60% {left:45%;width:0.2vw;opacity:0;}
    61% {left:45%;width:0.2vw;opacity:1;}
    70% {left:45%;width:0.2vw;opacity:1;}
    71% {left:45%;width:0.2vw;opacity:0;}
    80% {left:45%;width:0.2vw;opacity:0;}
    81% {left:45%;width:0.2vw;opacity:1;}
    100%   {width:22vw;left:45%;opacity:1;}
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
        left:25%;
        opacity: 0;
    }

}
.cover{
    animation-delay: 2.4s;
    animation-name: theaVanish;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes logoIn {
    0% {
        left:5%;
        opacity: 0;
    }

    100% {
        left:0%;
        opacity: 1;
    }

}
.corpName{
    opacity: 0;
    animation-delay: 3.5s;
    animation-name: logoIn;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.corpJob{
    opacity: 0;
    animation-delay: 3.55s;
    animation-name: logoIn;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

.corpProduct
{opacity: 0;
    animation-delay: 3.6s;
    animation-name: logoIn;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes loginInterface_bgWaterMark {
    0% {
        left: -3%;
        opacity:0.00;
    }

    100% {
        left: -5%;
        opacity:0.05;
    }

}
.loginInterface_bgWaterMark{

    animation-delay: 3s;
    animation-name: loginInterface_bgWaterMark;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes PRTSLOGO {
    0% {
        height:0vw;
    }

    100% {
        height:6vw;
    }

}
.PRTSLOGO{
    height:0vw;
    animation-delay: 3.4s;
    animation-name: PRTSLOGO;
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
.theaTitle{

    animation-name: theaTitle;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-delay: 0.75s;
}

.theaTitle2{

    animation-name: theaTitle;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-delay: 0.80s;
}

.qichuangyijingchenggong{
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
        left:-2.5vw;
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

 .button-block {
  display: inline-block;
  border-left: 10px solid rgba(70, 66, 47, 0.75);
  padding: 0 30px;
  position: relative;
}
.button-block::before {
  content: "";
  position: absolute;
  width: 4px;
  top: 0;
  height: 100%;
  left: 4px;
  background: rgba(70, 66, 47, 0.75);
}

button {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 2px solid transparent;
  color: #46422f;
  background: transparent;
  border-style: solid none;
  margin: 0 auto;
  display: block;
  font-family: "Noto Sans", sans-serif;
  font-size: 1em;
  padding: 10px 20px;
  min-width: 200px;
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
  height: calc(100% - 10px);
  left: 0px;
  top: 5px;
  background: transparent linear-gradient(to right, #46422f 50%, rgba(70, 66, 47, 0.75) 50%, rgba(70, 66, 47, 0.25) 100%) 100% 0/200% 100% no-repeat;
  transition: all 0.35s;
  z-index: -1;
}
button::after {
  content: "";
  display: inline-block;
  float: left;
  width: 15px;
  height: 15px;
  margin: 2.5px 10px 2.5px 0;
  background: currentColor;
  border-right: 0.1x solid #46422f;
}
button:hover, button:focus,.button-clicked {
  color: #c9c3ab;
  border-color: #46422f;
}
button:focus ,button-clicked {
  border-color: transparent;
  opacity: 0.8;
  outline: none;
}
button:hover::before, button:focus::before,.button-clicked:before {
  background-position-x: 0;
}
button:focus::before,.button-clicked:before {
  padding-right: 30px;
}

button + button {
  margin-top: 10px;
}

@media (max-width: 800px) {
  select, option {
    text-align: center;
    text-align-last: center;
  }
}

</style>
