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
  if (ret.error)
    return

  for (const mapItem of ret.maps) {
    const imgPath = path.join(dir, '/mapPreview/', mapItem.minimap_filename)
    const savePath = path.join(dir, '/mapPreview/')

    try {
      await fs.promises.access(imgPath)
      searchMap.value.push(mapItem)
    }
    catch (error) {
      await downloadMap(ret.prefix + mapItem.minimap_filename, savePath, mapItem.minimap_filename)
      searchMap.value.push(mapItem)
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
      await downloadMap(ret.prefix + mapItem.minimap_filename, savePath, mapItem.minimap_filename)
      ListMap.value.push(mapItem)
    }
  }
}

export async function getMapActualFile(id, dir) {
  const mapsPath = path.join(dir, '/springwritable/maps')
  let redlNeeded = false
  try {
    await fs.promises.access(mapsPath)
    // The check succeeded
  }
  catch (error) {
    await fs.promises.mkdir(mapsPath, { recursive: true })
  }
  const ret = await lib.getMap(id)

  try {
    await fs.promises.access(path.join(mapsPath, ret.map.map_filename))
    // The check succeeded
  }
  catch (error) {
    redlNeeded = true
  }
  if (!ret.map.map_filename)
    return

  if (ret.success && redlNeeded)
    await downloadMap(ret.prefix + ret.map.map_filename, mapsPath, ret.map.map_filename)
}

function downloadMap(dlUrl, dir, filename) {
  return new Promise((resolve, reject) => {
    const { startDownload } = require('su-downloader3')

    const url = dlUrl
    console.log(dir)
    console.log(filename)
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

