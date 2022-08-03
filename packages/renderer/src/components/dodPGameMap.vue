<script>
import * as path from 'path'
import { mapActions, mapState } from 'pinia'
import { nativeImage } from 'electron'
import { useUserStore } from '../stores'

export default {
  // feed those
  // props: ['channels', 'chatLog'],
  data() {
    return {
      mouseOn: 0,
      /* cachedImg: {}, */
      activeSection: 'search',
      listPgNum: 0,
    }
  },
  computed: {
    ...mapState(useUserStore, ['dntpService', 'lobbyDir', 'searchMap', 'ListMap', 'ui', 'network']),
  },
  updated() {},
  methods: {
    changeMap(id) {
      this.network.setMap({ game: this.network.joinedGame.value.title, mapId: id })
    },
    pickMap() {
      this.ui.pushGrabberAction('mapPick')
      this.ui.activateGrabber()
    },
    imgPath(filename) {
      // console.log('img path:')
      // console.log(this.lobbyDir)

      /*
      if (this.cachedImg[filename]) {
        return this.cachedImg[filename]
      }
      else {
        this.cachedImg[filename] = nativeImage.createFromPath(path.join(this.lobbyDir, '/mapPreview/', filename)).toDataURL()
        return this.cachedImg[filename]
      } */
      const imgpath = `file://${path.join(this.lobbyDir, '/mapPreview/', filename)}`
      // console.log(imgpath)
      return imgpath
    },
    setPreviee(index) {
      this.mouseOn = index
    },
    setActivePanel(panel) {
      this.activeSection = panel
      if (panel === 'list') {
        this.ui.pushNewLoading('getMap')
        try{
          this.dntpService.listBatchMap(this.listPgNum).then((ret) => {
            this.dntpService.retrieveMapList(ret, this.lobbyDir).then(() => {
              this.ui.rmLoading('getMap')
              this.ui.pushUINewNotif({ title: 'MAP', msg: 'SEARCH RESULT RETRIEVED' })
            })
          })
        }
        catch(error){
          console.log(error)
          this.ui.rmLoading('getMap')
        }

      }
    },
    listMapNextPage(isNextPage) {
      if (isNextPage)
        this.listPgNum++
      else
        this.listPgNum--
      try{
        this.ui.pushNewLoading('getMap')
      this.dntpService.listBatchMap(this.listPgNum).then((ret) => {
        this.dntpService.retrieveMapList(ret, this.lobbyDir).then(() => {
          this.ui.rmLoading('getMap')
          this.ui.pushUINewNotif({ title: 'MAP', msg: 'LIST RETRIEVED' })
        })
      })
      }
      catch(error){
        console.log(error)
        this.ui.rmLoading('getMap')
      }
      
    },
  },
}
</script>

<template>
  <div style="position: absolute; height: 100%; width: 100%; background: transparent;">
    <div class="pickerBG" style="position:absolute;height:100%;width:100%;overflow:hidden;  background-size: 36px 40px;
  background-image: radial-gradient(circle, rgb(0 0 0) 1px, rgba(0, 0, 0, 0) 2px);"
    >
      <img src="/imgs/thea.png" style="position:absolute;top: 63%;left: -11%;height: 60%;opacity: 9%;">
      <img src="/imgs/blueprintswblue.png" style="position:absolute;top: 0%;height: 100%;filter: grayscale(100%) brightness(227%);left: -52%;opacity: 0.1;">
    </div>
    <div class="pickerTopBar" style="position:absolute;height:3%;width:100%;background:#2196f3;top:0%;">
      <div class="mapSearch" :class="{activeTopBar: activeSection== 'search'}" style="position:relative;display:inline-block;height:100%;padding-left:1vw;width:10vh;" @click="setActivePanel('search')">
        <div :class="{activeTopBarDecro: activeSection== 'search'}" style="position:absolute;width:10vh;height:10%;"></div>
        <div :class="{activeTopBarText: activeSection== 'search'}" style="position:absolute;width:100%;height:10%;bottom:72%;right:-39%;font-size:1.7vh;font-family:font5;" @click="pickMap">
          SEARCH
        </div>
      </div>
      <div style="position:relative;display:inline-block;width:0.15%;height:80%;bottom:8%;background:#0000005c;font-size:1.7vh;font-family:font5;margin-left:0.5vh;margin-right:0.5vh;"></div>
      <div class="mapList" :class="{activeTopBar: activeSection== 'list'}" style="position:relative;display:inline-block;height:100%;width:10vh;" @click="setActivePanel('list')">
        <div :class="{activeTopBarDecro: activeSection== 'list'}" style="position:absolute;width:100%;height:10%;"></div>
        <div :class="{activeTopBarText: activeSection== 'list'}" style="position:absolute;width:100%;height:10%;bottom:72%;right:-72%;font-size:1.7vh;font-family:font5;">
          LIST
        </div>
      </div>
      <div style="position:relative;display:inline-block;width:0.15%;height:80%;bottom:8%;background:#0000005c;font-size:1.7vh;font-family:font5;margin-left:0.5vh;margin-right:0.5vh;"></div>
    </div>
    <div v-if="activeSection== 'search'" class="mapSearch">
      <div v-if="searchMap.length>0" class="pickerMainBody" style="position: absolute; height: 95%; width: 73%; background: linear-gradient(to right, rgba(128, 128, 128, 0.09) 1px, transparent 1px) 0% 0% / 40px 40px, linear-gradient(rgba(128, 128, 128, 0.06) 1px, transparent 1px) rgba(255, 255, 255, 0.22); bottom: 0%; padding-left: 2vw; padding-top: 2vh;padding-right: 2.1vw;overflow:auto;">
        <div v-for="(map, mapNum) in searchMap" :key="mapNum" class="singleMapTag" style="position:relative;height:2.6vw;width:2vw;display:inline-block;margin:1vw;" @mouseenter="setPreviee(mapNum)" @click="changeMap(map.id)">
          <img :src="imgPath(map.minimap_filename, 'list')" style="top:16%;left:13%;position:absolute;width:71%;height:71%;filter:grayscale(100%) contrast(250%);mix-blend-mode:screen;">
          <div style="position:absolute;color:white;font-weight:900;font-size: 1.3vw;bottom: -23%;right: -24%;font-family: font5;opacity: 0.4;">
            {{ mapNum }}
          </div>
        </div>
      </div>
      <div class="pickerRightPanel" style="position:absolute;height:100%;width:20%;background:#2196f3;right:0%;">
        <div style="position:absolute;height:100%;width:100%;overflow:hidden;opacity: 53%;">
          <img src="/imgs/blueprintswblue.png" style="position:absolute;top: 0%;height: 100%;filter: grayscale(100%) brightness(227%);left: -297%;">
        </div>
        <div v-if="searchMap.length>0" style="position:absolute;top:5%;height:20vw;width:100%;left:-22%;background:#585858;filter:drop-shadow(9px 10px 10px rgba(0,0,0,0.8));">
          <img v-if="searchMap[mouseOn]" :src="imgPath(searchMap[mouseOn].minimap_filename)" style="position:absolute;top:10%;left:6%;width:82%;"><div style="position:absolute;height:7%;width:99%;top:64%;left:-1%;font-size:1vw;color:white;font-family:font1;text-align:right;">
            DATABASE PRIMARY INDEX
          </div><div style="position:absolute;height:7%;width:80%;top:87%;right:12%;font-size:0.8vw;color:white;font-family:font5;">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span style="margin-left:0.8vw;"> WATER</span>
          </div><div style="position:absolute;height:7%;width:80%;top:93%;right:12%;font-size:0.8vw;color:white;font-family:font5;">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span style="margin-left:0.8vw;"> ASYMMETRICAL</span>
          </div>
          <div v-if="searchMap[mouseOn]" style="position:absolute;height:7%;width:99%;top:77%;left:6%;background:#9b9b9b;text-align:right;padding-top:1%;font-family:font5;color:white;padding-right:0.2vw;filter:drop-shadow(9px 10px 28px #9b9b9b);font-size:0.9vw;overflow:hidden;">
            {{ searchMap[mouseOn].map_name }}
          </div>
        </div>
        <div class="pager" style="position:absolute;width:100%;height:18vw;font-family:font1;color:white;top:78%;">
          <div style="position:absolute;font-family:font1;color:#ffffff59;top:2%;right:3%;font-size:2.1vw;">
            50
          </div><div style="position:absolute;font-weight:900;font-size:9vw;font-family:font9;color:white;top:-23%;right:13%;">
            51
          </div><div style="position:absolute;font-family:font1;color:white;top:13%;right:3%;font-size:2.1vw;">
            52
          </div><div style="position:absolute;background:#2196f3;font-family:font2;color:white;top:8%;right:28%;width:57%;text-align:right;padding-top:0.9vh;">
            PAGE
          </div><div style="position:absolute;background:#ffffff69;font-family:font2;color:white;top:18%;right:0%;width:126%;text-align:right;padding-top:2.9vh;font-size:0.9vw;">
            RELATED QUERIES
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeSection== 'list'" class="mapList">
      <div v-if="ListMap.length>0" class="pickerMainBody" style="position: absolute; height: 95%; width: 73%; background: linear-gradient(to right, rgba(128, 128, 128, 0.09) 1px, transparent 1px) 0% 0% / 40px 40px, linear-gradient(rgba(128, 128, 128, 0.06) 1px, transparent 1px) rgba(255, 255, 255, 0.22); bottom: 0%; padding-left: 2vw; padding-top: 2vh;padding-right: 2.1vw;overflow:auto;">
        <div v-for="(map, mapNum) in ListMap" :key="mapNum" class="singleMapTag" style="position:relative;height:2.6vw;width:2vw;display:inline-block;margin:1vw;" @mouseenter="setPreviee(mapNum)" @click="changeMap(map.id)">
          <img :src="imgPath(map.minimap_filename, 'list')" style="top:16%;left:13%;position:absolute;width:71%;height:71%;filter:grayscale(100%) contrast(250%);mix-blend-mode:screen;">
          <div style="position:absolute;color:white;font-weight:900;font-size: 1.3vw;bottom: -23%;right: -24%;font-family: font5;opacity: 0.4;">
            {{ mapNum }}
          </div>
        </div>
      </div>
      <div class="pickerRightPanel" style="position:absolute;height:100%;width:20%;background:#2196f3;right:0%;">
        <div style="position:absolute;height:100%;width:100%;overflow:hidden;opacity: 53%;">
          <img src="/imgs/blueprintswblue.png" style="position:absolute;top: 0%;height: 100%;filter: grayscale(100%) brightness(227%);left: -297%;">
        </div>
        <div v-if="ListMap.length>0" style="position:absolute;top:5%;height:20vw;width:100%;left:-22%;background:#585858;filter:drop-shadow(9px 10px 10px rgba(0,0,0,0.8));">
          <img v-if="ListMap[mouseOn]" :src="imgPath(ListMap[mouseOn].minimap_filename)" style="position:absolute;top:10%;left:6%;width:82%;"><div style="position:absolute;height:7%;width:99%;top:64%;left:-1%;font-size:1vw;color:white;font-family:font1;text-align:right;">
            DATABASE PRIMARY INDEX
          </div><div style="position:absolute;height:7%;width:80%;top:87%;right:12%;font-size:0.8vw;color:white;font-family:font5;">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span style="margin-left:0.8vw;"> WATER</span>
          </div><div style="position:absolute;height:7%;width:80%;top:93%;right:12%;font-size:0.8vw;color:white;font-family:font5;">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span style="margin-left:0.8vw;"> ASYMMETRICAL</span>
          </div><div v-if="ListMap[mouseOn]" style="position:absolute;height:7%;width:99%;top:77%;left:6%;background:#9b9b9b;text-align:right;padding-top:1%;font-family:font5;color:white;padding-right:0.2vw;filter:drop-shadow(9px 10px 28px #9b9b9b);font-size:0.9vw;overflow:hidden;">
            {{ ListMap[mouseOn].map_name }}
          </div>
        </div>
        <div class="pager" style="position:absolute;width:100%;height:18vw;font-family:font1;color:white;top:78%;">
          <div style="position:absolute;background:#ffffff69;font-family:font2;color:white;top:18%;right:0%;width:126%;text-align:right;padding-top:2.9vh;font-size:0.9vw;">
            RELATED QUERIES
          </div>
          <div v-if="listPgNum-1>=0" style="position:absolute;font-family:font1;color:#ffffff59;top:2%;right:3%;font-size:2.1vw;" @click="listMapNextPage(false)">
            {{ listPgNum-1 }}
          </div><div style="position:absolute;font-weight:900;font-size:8vw;font-family:font9;color:white;top:-17%;right:20%;">
            {{ listPgNum }}
          </div>
          <div style="position:absolute;font-family:font1;color:white;top:13%;right:3%;font-size:2.1vw;&quot;" @click="listMapNextPage(true)">
            {{ listPgNum+1 }}
          </div><div style="position:absolute;background:#2196f3;font-family:font2;color:white;top:8%;right:28%;width:57%;text-align:right;padding-top:0.9vh;">
            PAGE
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.singleMapTag:hover{
  filter: drop-shadow(30px 10px 4px #4444dd);
  outline:0.1vw solid white;
}

.activeTopBar{
  background:#34343487;
  filter:drop-shadow(11px 9px 6px #fff);
}

.activeTopBarDecro{
  background:#ffffff;
}

.activeTopBarText{
  color:#ffffff;
}
</style>
