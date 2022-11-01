import { ref } from 'vue'
import * as musicPlayer from '../musicPlayer/musicPlayer'
let enginesRunning = 0
// const fsPromises = require('fs').promises
const fs = require('fs')
let engine = ''
let wdir = ''
let isLinux = true
const path = require('node:path')
export const gameLoaded = ref(false)

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
  console.log(writeLine)
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

function launchEngine() {
  engineLaunched()
  const exec = require('child_process').exec

  let result = ''
  let engineCmdLine
  if (isLinux)
    engineCmdLine = `${engine} -write-dir ${path.join(wdir, 'springwritable')} ${path.join(wdir, 'springwritable', 'script.txt')}`
  else
    engineCmdLine = `start \"\" \"${engine}\" \"${path.join(wdir, 'springwritable', 'script.txt')}\" --write-dir \"${path.join(wdir, 'springwritable')}\"`

  const child = exec(engineCmdLine)

  child.stdout.on('data', (data) => {
    data = data.toString()

    result += data

    if (data.includes('Game Loaded')) {
      console.log('game loaded')
      gameLoaded.value = true
    }
  })

  child.on('close', () => {
    console.log(result)
    engineClosed()
  })
}

function engineClosed() {
  enginesRunning--
  if (!isEngineRunning()) {
    musicPlayer.resumeSound()
    console.log('resuming music')
  }
}

function engineLaunched() {
  musicPlayer.stopSound()
  enginesRunning++
}

