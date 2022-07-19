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
      mapSearchUrl: [],
      cachedImg: {},
    }
  },
  computed: {
    ...mapState(useUserStore, ['dntpService', 'lobbyDir', 'searchMap']),
    nativePathListSearch() {
      for (const map in this.searchMap)
        mapSearchUrl[map] = nativeImage.createFromPath(this.lobbyDir + this.searchMap[map].filename)

      return mapSearchUrl
    },
  },
  updated() {},
  methods: {
    imgPath(filename, who = 'deflt') {
      if (this.cachedImg[filename]) {
        return this.cachedImg[filename]
      }
      else {
        this.cachedImg[filename] = nativeImage.createFromPath(this.lobbyDir + filename).toDataURL()
        return this.cachedImg[filename]
      }
    },
    setPreviee(index) {
      this.mouseOn = index
    },
  },
}
</script>

<template>
  <div style="position: absolute; height: 100%; width: 100%; background: transparent;">
    <div class="pickerBG" style="position:absolute;height:100%;width:100%;overflow:hidden;  background-size: 36px 40px;
  background-image: radial-gradient(circle, rgb(0 0 0) 1px, rgba(0, 0, 0, 0) 2px);"
    >
      <img src="imgs/thea.png" style="position:absolute;top: 63%;left: -11%;height: 60%;opacity: 9%;">
      <img src="imgs/blueprintswblue.png" style="position:absolute;top: 0%;height: 100%;filter: grayscale(100%) brightness(227%);left: -52%;opacity: 0.1;">
    </div>
    <div v-if="searchMap.length>0" class="pickerMainBody" style="position:absolute;height:95%;width:91%;background:rgba(255, 255, 255, 0.22);bottom:0%;padding-left:2vw;padding-top:2vh;background-size:40px 40px;background-image: linear-gradient(to right, #80808017 1px, transparent 1px), linear-gradient(to bottom, #8080800f 1px ,transparent 1px);">
      <div v-for="(map, mapNum) in searchMap" :key="mapNum" class="singleMapTag" style="position:relative;height:2.6vw;width:2vw;display:inline-block;margin:1vw;" @mouseenter="setPreviee(mapNum)">
        <img :src="imgPath(map.minimap_filename, 'list')" style="top:16%;left:13%;position:absolute;width:71%;height:71%;filter:grayscale(100%) contrast(250%);mix-blend-mode:screen;">
        <div style="position:absolute;color:white;font-weight:900;font-size: 1.3vw;bottom: -23%;right: -24%;font-family: font5;opacity: 0.4;">
          {{ mapNum }}
        </div>
      </div>
    </div>
    <div class="pickerRightPanel" style="position:absolute;height:100%;width:20%;background:#2196f3;right:0%;">
      <div style="position:absolute;height:100%;width:100%;overflow:hidden;opacity: 53%;">
        <img src="imgs/blueprintswblue.png" style="position:absolute;top: 0%;height: 100%;filter: grayscale(100%) brightness(227%);left: -297%;">
      </div>
      <div v-if="searchMap.length>0" style="position:absolute;top:10%;height:40%;width:100%;left:-22%;background:#585858;filter:drop-shadow(9px 10px 10px rgba(0,0,0,0.8));">
        <img :src="imgPath(searchMap[mouseOn].minimap_filename)" style="position:absolute;top:10%;left:6%;width:82%;"><div style="position:absolute;height:7%;width:99%;top:64%;left:-1%;font-size:1vw;color:white;font-family:font1;text-align:right;">
          DATABASE PRIMARY INDEX
        </div><div style="position:absolute;height:7%;width:80%;top:87%;right:12%;font-size:0.8vw;color:white;font-family:font5;">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span style="margin-left:0.8vw;"> WATER</span>
        </div><div style="position:absolute;height:7%;width:80%;top:93%;right:12%;font-size:0.8vw;color:white;font-family:font5;">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span style="margin-left:0.8vw;"> ASYMMETRICAL</span>
        </div><div style="position:absolute;height:7%;width:99%;top:77%;left:6%;background:#9b9b9b;text-align:right;padding-top:1%;font-family:font5;color:white;padding-right:0.2vw;filter:drop-shadow(9px 10px 28px #9b9b9b);">
          Comet Catacher Oxidize
        </div>
      </div><div class="pager" style="position:absolute;width:100%;height:18vw;font-family:font1;color:white;top:68%;">
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
    <div class="pickerTopBar" style="position:absolute;height:3%;width:100%;background:#2196f3;top:0%;">
      <div class="mapSearch" style="position:absolute;height:100%;background:#34343487;width:11%;left:3%;filter:drop-shadow(11px 9px 6px #fff);">
        <div style="position:absolute;width:100%;height:10%;background:#ffffff;"></div><div style="position:absolute;width:1%;height:80%;bottom:8%;right:-3%;background:#0000005c;font-size:1.7vh;font-family:font5;"></div><div style="position:absolute;width:100%;height:10%;bottom:72%;right:-39%;color:#ffffff;font-size:1.7vh;font-family:font5;">
          SEARCH
        </div>
      </div><div class="mapList" style="position:absolute;height:100%;background:#bf000000;width:11%;left:14.4%;">
        <div style="position:absolute;width:100%;height:10%;"></div><div style="position:absolute;width:100%;height:10%;bottom:72%;right:-72%;color:#145b93;font-size:1.7vh;font-family:font5;font-weight:900;">
          LIST
        </div><div style="position:absolute;width:1%;height:80%;bottom:8%;right:-3%;background:#0000005c;font-size:1.7vh;font-family:font5;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.singleMapTag:hover{
  filter: drop-shadow(30px 10px 4px #4444dd);
  outline:0.1vw solid white;
}
</style>

  function setImmediate(arg0) {
    throw new Error('Function not implemented.')
  }
