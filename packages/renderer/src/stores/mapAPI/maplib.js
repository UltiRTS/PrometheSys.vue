import axios from 'axios'
const provider = 'http://144.126.145.172:3000'

const request = axios.create({
  baseURL: provider,
  timeout: 10000,
})

export async function getMapListByBatch(batch) {
  const resp = await request.get(`/map_list/${batch}`)
  try {
    return resp.data
  }
  catch (e) {
    console.log(e)
    return null
  }
}

export async function mapExists(id) {
  try {
    const resp = await request.get(`/exists/${id}`)
    if (resp.data.success)
      return resp.data.existance
  }
  catch (e) {
    console.log(e)
    return null
  }
}

export async function getMap(id) {
  try {
    const resp = await request.get(`/maps/${id}`)
    return resp.data
  }
  catch (e) {
    console.log(e)
    return null
  }
}

export async function vague_search(query) {
  try {
    const resp = await request.get(`/vague_search/${query}`)
    return resp.data
  }
  catch (e) {
    console.log(e)
    return null
  }
}
