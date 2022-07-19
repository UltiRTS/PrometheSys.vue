import { ref } from 'vue'
import * as lib from './maplib.js'
const fs = require('fs')
const path = require('node:path')

export const searchMap = ref([])
export const ListMap = ref([])

export async function listMatchMap(input) {
  const ret = await lib.vague_search(input)
  console.log(ret)
  return ret
}
export async function retrieveMap(ret, dir) {
  searchMap.value = []
  fs.access(path.join(dir, '/mapPreview/'), () => {
    fs.mkdirSync(path.join(dir, '/mapPreview/'))
  })

  for (const mapItem of ret.maps) {
    const imgPath = path.join(dir, '/mapPreview/', mapItem.minimap_filename)

    fs.access(imgPath, (err) => {
      if (err) {
        downloadMap(ret.prefix + mapItem.minimap_filename, dir, mapItem.minimap_filename).then(() => {
          searchMap.value.push(mapItem)
        })
      }
      else { searchMap.value.push(mapItem) }
    })
  }
}

export async function listBatchMap(index) {
  const ret = await lib.getMapListByBatch(index)
  console.log(ret)
  return ret
}

export async function retrieveMapList(ret, dir) {
  ListMap.value = []
  fs.access(path.join(dir, '/mapPreview/'), () => {
    fs.mkdirSync(path.join(dir, '/mapPreview/'))
  })

  for (const mapItem of ret.maps) {
    const imgPath = path.join(dir, '/mapPreview/', mapItem.minimap_filename)

    fs.access(imgPath, (err) => {
      if (err) {
        downloadMap(ret.prefix + mapItem.minimap_filename, dir, mapItem.minimap_filename).then(() => {
          ListMap.value.push(mapItem)
        })
      }
      else { ListMap.value.push(mapItem) }
    })
  }
}

function downloadMap(dlUrl, dir, filename) {
  return new Promise((resolve, reject) => {
    const path = require('path')
    const { startDownload } = require('su-downloader3')

    const url = dlUrl
    const savePath = path.join(dir, filename)
    const locations = { url, savePath }
    const options = {
      threads: 3,
      throttleRate: 100,
    }

    startDownload(locations, options).subscribe({
      next: progressInfo => console.log(progressInfo),
      error: e => reject(new Error(e)),
      complete: () => resolve('downloaded'),
    })
  })
}
