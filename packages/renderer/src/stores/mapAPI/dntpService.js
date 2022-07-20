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

  try {
    await fs.promises.access(path.join(dir, '/mapPreview/'))
    // The check succeeded
  }
  catch (error) {
    fs.mkdirSync(path.join(dir, '/mapPreview/'))
  }
  for (const mapItem of ret.maps) {
    const imgPath = path.join(dir, '/mapPreview/', mapItem.minimap_filename)
    const savePath = path.join(dir, '/mapPreview/')

    try {
      await fs.promises.access(imgPath)
      searchMap.value.push(mapItem)
    }
    catch (error) {
      await downloadMap(ret.prefix + mapItem.minimap_filename, savePath, mapItem.minimap_filename).then(() => {
        searchMap.value.push(mapItem)
      })
    }
  }
}

export async function listBatchMap(index) {
  const ret = await lib.getMapListByBatch(index)
  console.log(ret)
  return ret
}

export async function retrieveMapList(ret, dir) {
  ListMap.value = []

  try {
    await fs.promises.access(path.join(dir, '/mapPreview/'))
    // The check succeeded
  }
  catch (error) {
    fs.mkdirSync(path.join(dir, '/mapPreview/'))
  }
  for (const mapItem of ret.maps) {
    const imgPath = path.join(dir, '/mapPreview/', mapItem.minimap_filename)
    const savePath = path.join(dir, '/mapPreview/')

    try {
      await fs.promises.access(imgPath)
      ListMap.value.push(mapItem)
    }
    catch (error) {
      await downloadMap(ret.prefix + mapItem.minimap_filename, savePath, mapItem.minimap_filename).then(() => {
        ListMap.value.push(mapItem)
      })
    }
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
