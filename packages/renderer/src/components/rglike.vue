<!-- eslint-disable no-unmodified-loop-condition -->
<script>
import { mapActions, mapState } from 'pinia'
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
      nodesConnection: [], // this will eventually be fed from the server. at this moment it's fed by server_genLevel
      distanceBetween: 400,
      canvasHeight: 0,
    }
  },
  computed: {

  },
  mounted() {
    this.canvasHeight = this.$refs.container.clientHeight
    const canvas = this.$refs.rg
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    this.render()
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
  <div class="rgLike" style="position:absolute;height:100%; width: 100%;" @wheel="scrl">
    <img :style="{'left':'0','transform': 'translateX('+horizontalDistance+'vw)', 'position': 'absolute','width':'344vw','height':'100vw'}" src="/imgs/When_the_city_but_FOGG.png">
    <div ref="container" :style="{'left':'0', 'transform': 'translateX('+2*horizontalDistance+'vw)', 'position': 'absolute','width':'511vw','height':'100vw','font-size':'8vh','top': '1vh','overflow':'hidden'}">
      <canvas ref="rg" style="position:absolute; width: 100%; height: 100%;"> </canvas>
      <div v-for="node, index in coors" :key="index" style="position: relative;">
        <div :style="`top: ${node.y}px; left: ${node.x}px; position: absolute;`">
          {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

