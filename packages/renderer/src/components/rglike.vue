<!-- eslint-disable no-unmodified-loop-condition -->
<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores'
export default {

  data() {
    return {

      horizontalDistance: 0,
      nodesConnection: [], // this will eventually be fed from the server. at this moment it's fed by server_genLevel

    }
  },
  computed: {

  },

  updated() {

  },
  methods: {
    scrl(ev) {
      if (this.horizontalDistance + 0.02 * ev.deltaY < 0 && this.horizontalDistance + 0.02 * ev.deltaY > -168)
        this.horizontalDistance += 0.02 * ev.deltaY
    },

    server_genLevel() {
      function getConnectedNode(currentNode, maxNode) {
        let maxConnection = Math.floor(Math.random() * (5 - 1) + 1)
        while (maxConnection > maxNode - currentNode)
          maxConnection = Math.floor(Math.random() * (5 - 1) + 1)
        // console.log('max connections:')
        // console.log(maxConnection)
        const connectedNodes = []
        for (let i = 0; i < maxConnection; i++) { // get connected nodes for the current node
          let connectableNode = Math.floor(Math.random() * (maxNode - currentNode) + currentNode + 1)// the node that we are connecting to could only be nodes in the future, not in the back!

          while (connectedNodes.includes(connectableNode)) // reroll if it includes duplicates
            connectableNode = Math.floor(Math.random() * (maxNode - currentNode) + currentNode + 1)

          connectedNodes.push(connectableNode)
        }
        return connectedNodes
      }
      const totalNodes = Math.floor(Math.random() * (60 - 1) + 1)
      // generate connection:
      for (let i = 0; i < totalNodes - 1; i++)
        this.nodesConnection[i] = getConnectedNode(i, totalNodes - 1)
      this.nodesConnection[totalNodes - 1] = 'exit'
      console.log(this.nodesConnection)
    },

  },
}
</script>

<template>
  <div class="rgLike" style="position:absolute;height:100%;width:100%;background:black" @wheel="scrl">
    <img :style="{'left':'0','transform': 'translateX('+horizontalDistance+'vw)', 'position': 'absolute','width':'344vw','height':'100vw'}" src="/imgs/When_the_city_but_FOGG.png">
    <div :style="{'left':'0', 'transform': 'translateX('+2*horizontalDistance+'vw)', 'position': 'absolute','width':'688vw','height':'100vw','font-size':'8vh','top': '1vh','overflow':'hidden'}">
    </div>
    <div style="font-size:50vh; color:white;top:50%;left:50%;position:absolute;" @click="server_genLevel">
      GET SERVER RESPONSE
    </div>
  </div>
</template>

<style scoped>

</style>

