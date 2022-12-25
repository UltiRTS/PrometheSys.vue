<!-- eslint-disable no-unmodified-loop-condition -->
<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'

export default {

  data() {
    return {
      adj_list: {
        0: [3, 1, 7, 4],
        1: [14, 7, 13, 11, 2, 12],
        2: [6, 5, 7, 11],
        3: [6, 10, 7],
        4: [11, 7, 10],
        5: [10],
        6: [10, 12, 9, 13],
        7: [8, 9],
        8: [13],
        9: [12],
        10: [13, 14, 12, 11],
        11: [12, 13],
        12: [13, 14],
        13: [14],
        14: [],
      },
      coors: {},
      horizontalDistance: 0,
      // nodesConnection: [], // this will eventually be fed from the server. at this moment it's fed by server_genLevel
      distanceBetween: 400,
      canvasHeight: 0,
      resizeMon: 0,
    }
  },
  computed: {
    ...mapState(useUserStore, ['gameListing', 'joinedGame', 'ui', 'musicPlayer', 'network']),
  },
  mounted() {
    this.musicPlayer.playSound('rglike.wav', true)
    this.canvasHeight = this.$refs.container.clientHeight
    const canvas = this.$refs.rg

    let heighxWidth = 0
    this.resizeMon = setInterval(() => {
      if (heighxWidth !== canvas.offsetWidth * canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        heighxWidth = canvas.width * canvas.height
        this.render()
      }
    }, 1000)
  },

  unmounted() {
    clearInterval(this.resizeMon)
  },

  updated() {

  },
  methods: {
    scrl(ev) {
      if (this.horizontalDistance + 0.02 * ev.deltaY < 0 && this.horizontalDistance + 0.02 * ev.deltaY > -168)
        this.horizontalDistance += 0.02 * ev.deltaY
    },
    drawCurve(ctx, start, end) {
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      const crHeight = Math.abs(end.y - start.y)
      const cp1 = {
        x: end.x,
        y: end.y + crHeight,
      }

      ctx.quadraticCurveTo(cp1.x, cp1.y, end.x, end.y)
      ctx.stroke()
    },
    render() {
      const ctx = this.$refs.rg.getContext('2d')
      const topolist = Object.keys(this.adj_list)
      const adj_list = this.adj_list
      const coords = this.coors
      const distanceBetween = this.distanceBetween
      const canvasHeight = this.canvasHeight

      function drawCircle(center, radius) {
        ctx.beginPath()
        ctx.arc(center.x, center.y, radius, 2 * Math.PI, 0)
        ctx.fill()
      }

      function drawCurve(start, end) {
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        const crHeight = Math.abs(end.y - start.y)
        const cp1 = {
          x: end.x,
          y: end.y + crHeight,
        }

        ctx.quadraticCurveTo(cp1.x, cp1.y, end.x, end.y)
        ctx.stroke()
      }

      function draw_graph() {
        let y = 20
        let x = 20
        for (let i = 0; i < topolist.length; i++) {
          coords[topolist[i]] = {
            x, y,
          }

          drawCircle({ x, y }, 5)
          y = Math.ceil(Math.random() * canvasHeight)
          x += distanceBetween
        }

        for (const node in adj_list) {
          for (const adj of adj_list[node])
            // drawLine(coords[adj], coords[node])
            drawCurve(coords[adj], coords[node])
        }
      }

      draw_graph()
    },

    // server_genLevel() {
    //   function getConnectedNode(currentNode, maxNode) {
    //     let maxConnection = Math.floor(Math.random() * (5 - 1) + 1)
    //     while (maxConnection > maxNode - currentNode)
    //       maxConnection = Math.floor(Math.random() * (5 - 1) + 1)
    //     // console.log('max connections:')
    //     // console.log(maxConnection)
    //     const connectedNodes = []
    //     for (let i = 0; i < maxConnection; i++) { // get connected nodes for the current node
    //       let connectableNode = Math.floor(Math.random() * (maxNode - currentNode) + currentNode + 1)// the node that we are connecting to could only be nodes in the future, not in the back!

    //       while (connectedNodes.includes(connectableNode)) // reroll if it includes duplicates
    //         connectableNode = Math.floor(Math.random() * (maxNode - currentNode) + currentNode + 1)

    //       connectedNodes.push(connectableNode)
    //     }
    //     return connectedNodes
    //   }
    //   const totalNodes = Math.floor(Math.random() * (60 - 1) + 1)
    //   // generate connection:
    //   for (let i = 0; i < totalNodes - 1; i++)
    //     this.nodesConnection[i] = getConnectedNode(i, totalNodes - 1)
    //   this.nodesConnection[totalNodes - 1] = 'exit'
    //   console.log(this.nodesConnection)
    // },

  },
}
</script>

<template>
  <div class="floor" style="visibility:hidden; position:absolute;height:100%; width: 100%;" @wheel="scrl">
    <img
      :style="{ 'left': '0', 'transform': 'translateX(' + horizontalDistance + 'vw)', 'position': 'absolute', 'width': '344vw', 'height': '177vh' }"
      src="/imgs/When_the_city_but_FOGG.png">
    <div ref="container"
      :style="{ 'left': '2vh', 'transform': 'translateX(' + 2 * horizontalDistance + 'vw)', 'position': 'absolute', 'width': '900vh', 'height': '172vh', 'font-size': '8vh', 'top': '3vh', 'overflow': 'hidden' }">
      <canvas ref="rg" style="position:absolute; width: 100%; height: 100%;"> </canvas>
      <div v-for="node, index in coors" :key="index" style="position: relative;">
        <div :style="`top: ${node.y}px; left: ${node.x}px; position: absolute;`">
          {{ index }}
        </div>
      </div>
    </div>
  </div>
  <div id="welcome">
    <div style="position:absolute;background:#ffcc31;height:100%;width:100%;">
      <div
        style="position:absolute;color:#423e38;top:0%;left:calc(50vw - -25vh);height:68.2vh;overflow:hidden;font-size:54vh;padding:1.1vh;width:100%;">
        工学試験 </div>
      <div
        style="position:absolute;color:#423e38;top:46%;left:calc(50vw - 115vh);height:68.2vh;overflow:hidden;font-size:54vh;padding:1.1vh;width:100%;">
        工学試験 </div>
      <div
        style="position:absolute;color:#ffcc31;background:#423e38;top:32%;left:calc(50vw - 0vh);height:41.2vh;overflow:hidden;font-size:26vh;padding:10.1vh;font-family:font10;">
        <div style="font-size:9.5vh;margin:0;font-family:font2;">THEA ENGINEERING </div>TESTING
      </div>
      <div
        style="position:absolute;color:#ffcc31;top:12%;height:8.2vw;font-size:1vw;padding:0.2vw;width:55%;right:45vw;font-family:font1;">
        <div
          style="position:absolute;left:2vw;top:7%;color:#423e38;width:123%;font-weight:900;font-size:5vw;mix-blend-mode:multiply;height:4vw;">
          <div
            style="position:absolute;left:1vw;top:-13%;color:#423e38;width:150%;background:white;font-size:7.3vw;font-family:font10;">
            INVITE</div>
          <div
            style="position:absolute;left:1.3vw;top:70.5%;color:#423e38;width:20%;background:white;font-size:1.3vw;text-align:center;">
            2022-12-24T08:31:02.894Z</div>
        </div>
        <div
          style="position:absolute;left:3vw;top:81%;width:25.2%;font-weight:900;font-size:1.4vw;background:#423e38;color:ffcc31;text-align:left;padding-left:0.5vw;">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> PROTOCOL INITIATE</div>
      </div>
      <div
        style="position:absolute;color:#ffcc31;top:78%;left:107vw;height:9.2vw;font-size:1vw;padding:0.2vw;width:19%;opacity:0.6;">
        <div style="height:1.7vw;color:#423e38;width:100%;position:relative;">
          <hr style="border-top:dotted 2px;position:absolute;top:0.4vw;width:96%;">
          <div style="position:absolute;left:-5%;background:#ffcc31;top:1%;padding-left:1vw;padding-right:1vw;">CHAN
          </div>
          <div style="position:absolute;left:73%;background:#ffcc31;top:0.6%;padding-left:1vw;">[READY]</div>
        </div>
        <div style="height:1.7vw;color:#423e38;width:100%;position:relative;">
          <hr style="border-top:dotted 2px;position:absolute;top:0.4vw;width:96%;">
          <div style="position:absolute;left:-5%;background:#ffcc31;top:1%;padding-left:1vw;padding-right:1vw;">CHAN
          </div>
          <div style="position:absolute;left:73%;background:#ffcc31;top:0.6%;padding-left:1vw;">[READY]</div>
        </div>
        <div
          style="background:#423e38;left:2vw;top:98%;color:#ffcc31;width:100%;letter-spacing:0.3vw;text-align:center;">
          COLLABORATORS AWAIT</div>
        <div style="text-align:right;left:2vw;top:98%;color:#423e38;width:100%;">2022-12-24T08:31:02.894Z</div>
      </div>
      <div
        style="position:absolute;transform:skew(19deg);background:#423e38;height:176vh;width:137vh;top:1vh;left:calc(4vw - 63.5vh);">
        <div style="position:absolute;height:100%;width:100%;overflow:hidden;">
          <div style="position:absolute;transform:skew(-19deg);background:#423e38;height:176vh;width:137vh;">
            <div
              style="font-size:86vh;color:#ffcc31;top:-16vh;position:absolute;left:48vh;font-family:font3;font-weight:900;">
              C</div>
            <div style="font-size:4.4vh;color:#423e38;top:62vh;position:absolute;left:53vh;font-family:font2;">
              COLLABORATORS</div>
            <div
              style="width:49vh;height:33vh;color:#423e38;top:1vh;position:absolute;left:52vh;background:repeating-linear-gradient(  45deg,  #423e38,  #423e38 1vh,  #ffcc3100 1vh,  #ffcc3100 2vh);">
            </div>
          </div>
        </div>
        <div
          style="position:absolute;bottom:1%;left:29%;height: 40%;width:76%;transform:skew(-19deg);color:#ffcc31;overflow:auto;">
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
          <div
            style="position:relative;width:31%;height:20%;background: #ffffff66;overflow:hidden;display:inline-block;margin-left:1vh;">
            <div style="position:absolute;top:1%;left:-10%;font-size:12vh;font-weight:900;font-family:font5;"><span
                style="color: #6c6c6c99;">0</span>2
              <div
                style="position:absolute;top: 44%;left: 21%;font-size: 2vh;font-weight:900;font-family: font9;width: 83%;background: #8b8b8b;text-align:center;">
                RECRUITED</div>
            </div>
            <div style="position:absolute;top: 5%;right: 5%;font-size: 5vh;font-weight:900;font-family: font10;">Eddog
            </div>
            <div style="position:absolute;top: 47%;left: 71%;font-size: 2vh;font-weight:900;font-family:font5;">LEVEL 21
            </div>
            <div
              style="position:absolute;top: 69%;width:100%;right:5%;font-size: 2vh;font-weight:900;font-family:font5;text-align:right;">
              <span style="background: #ffcc31;color:#8b8b8b;padding-left:1vh;padding-right:1vh;">PING</span> 114514
            </div>
          </div>
        </div>
      </div>
      <div
        style="position:absolute;transform:skew(19deg);background:#423e38;height:176vh;width:137vh;top:1vh;right:calc(15vw - 63.5vh);overflow:hidden;">
        <div style="position:absolute;transform:skew(-19deg);background:#423e38;height:176vh;width:137vh;">
          <div
            style="font-size: 15.4vh;color: #4a4a4a;top: 88vh;position:absolute;left: -74vh;font-family: font2;transform:rotate(90deg);">
            THEA PHARMACEUTICALS</div>
          <div
            style="font-size:86vh;color:#ffcc31;bottom:-19vh;position:absolute;left:27vh;font-family:font3;font-weight:900;">
            O</div>
          <div
            style="font-size:4.4vh;color:#423e38;bottom:33vh;position:absolute;left:18vh;font-family:font2;transform:rotate(90deg);">
            OPERATIONS</div>
          <div
            style="width:49vh;height:79vh;color:#423e38;bottom:1vh;position:absolute;left:52vh;background:repeating-linear-gradient(  45deg,  #423e38,  #423e38 1vh,  #ffcc3100 1vh,  #ffcc3100 2vh);">
          </div>

          <div style="position:absolute;height: 19%;width: 67%;background: #0000001f;top: 6%;overflow:hidden;">
            <i class="fa fa-chain-broken" aria-hidden="true"
              style="position:absolute;font-size: 27vh;color: #00000021;right:4%;top: 29%;"></i>
            <div style="position:absolute;height: 43%;width: 2%;background: #ffcc31;top: 6%;">

            </div>
            <div style="position:absolute;font-size:4vw;color: #ffffffb8;top: 2%;font-family: font10;left: 4%;">New
              Engineering Parameters
            </div>
            <div
              style="position:absolute;font-size: 1.1vw;color: #ffffff87;top: 52%;font-family: font5;left: 4%;width:90%;">
              Start or join a new engineering test. If you have a saved test or the test is ongoing, you will be
              dismissed from the previous test. Penalties will be applied to your previous team and the team might
              choose to go on without you. In the next dislogue, you will be asked to join or created a new test
            </div>


          </div>
          <div style="position:absolute;height: 19%;width: 67%;background: #0000001f;top: 32%;overflow:hidden;">
            <i class="fa fa-chain" aria-hidden="true"
              style="position:absolute;font-size: 27vh;color: #00000021;right:4%;top: 29%;"></i>
            <div style="position:absolute;height: 43%;width: 2%;background: #ffcc31;top: 6%;">

            </div>
            <div style="position:absolute;font-size:4vw;color: #ffffffb8;top: 2%;font-family: font10;left: 4%;">Resume
              Previous Parameters
            </div>
            <div
              style="position:absolute;font-size: 1.1vw;color: #ffffff87;top: 52%;font-family: font5;left: 4%;width:90%;">
              Resume a saved test. In the next dialogue, you will send an invitation to all the members participated in
              the test that has been saved.
            </div>


          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

