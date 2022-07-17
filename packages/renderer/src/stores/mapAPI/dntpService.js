import * as lib from './maplib.js'
export async function listMatchMap(input) {
  const ret = await lib.vague_search(input)
  for (const mapItem of ret)
    await download(mapItem.minimap_filename)
  return ret
}
