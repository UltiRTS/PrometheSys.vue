import { ipcRenderer } from 'electron'
// import { ref } from 'vue'
import * as musicPlayer from '../musicPlayer/musicPlayer'
let enginesRunning = 0
// const fsPromises = require('fs').promises
const fs = require('fs')
let engine = ''
let wdir = ''
let isLinux = true

const path = require('node:path')

export function setWDir(pa) {
  wdir = pa
  if (isLinux)
    engine = path.join(pa, 'engine/spring')
  else
    engine = path.join(pa, 'engine/spring.exe')
}

export function setPlatform(Linux) {
  isLinux = Linux
}

export function isEngineRunning() {
  if (enginesRunning > 0)
    return true

  else
    return false
}

export function configureToLaunch(params = {
  host: '127.0.0.1',
  port: 8080,
  permittedUsername: 'test',
  token: '',
}) {
  const writeLine = '[GAME]{' + `

        HostIP=${params.host};
        HostPort=${params.port};       // (optional) default is 8452    
        MyPlayerName=${params.permittedUsername};
        MyPasswd=${params.token};
        IsHost=0;           // tell the engine this is a client
    
    ` + '}'
  // console.log(writeLine)
  const scriptPath = path.join(wdir, 'springwritable', 'script.txt')
  fs.writeFile(scriptPath, writeLine, () => {
    launchEngine()
  })
  // fsPromises.writeFile(scriptPath, writeLine).then(
  //   () => {
  //     launchEngine()
  //   },
  // )
}

let loadingScreenShown = false
function launchEngine() {
  engineLaunched()
  const { execFile } = require('child_process')

  let result = ''
  /* let engineCmdLine
if (isLinux)
    engineCmdLine = `${engine} -write-dir ${path.join(wdir, 'springwritable')} ${path.join(wdir, 'springwritable', 'script.txt')}`
  else
    engineCmdLine = `start \"\" \'${engine}\' \'${path.join(wdir, 'springwritable', 'script.txt')}\' --write-dir \'${path.join(wdir, 'springwritable')}\'`
*/
  const child = execFile(engine, [path.join(wdir, 'springwritable', 'script.txt'), '-write-dir', path.join(wdir, 'springwritable')], { maxBuffer: 1024 * 1024000 })
// print launch error like exe not found
  child.stderr.on('data', (data) => {
    data = data.toString()
    result += data
    console.log(data)
  })

  child.stdout.on('data', (data) => {
    data = data.toString()
    ipcRenderer.send('pass2popup', 'engine messages')

    result += data
    if (data.includes('GameID:')) {
      if (loadingScreenShown) {
        ipcRenderer.invoke('popdown')
        loadingScreenShown = false
      }
    }
    if (data.includes('SDL_WINDOWEVENT_SHOWN')) {
      // console.log('game loaded')
      // console.log('poping down')
      if (!loadingScreenShown) {
        ipcRenderer.invoke('popup')
        loadingScreenShown = true
      }
    }
  })

  child.on('close', () => {
    console.log(result)
    engineClosed()
  })
}

function engineClosed() {
  enginesRunning--

  if (!isEngineRunning())
    musicPlayer.resumeSound()
    // console.log('resuming music')
}

function engineLaunched() {
  musicPlayer.stopSound()
  // console.log('poping up')

  enginesRunning++
}

