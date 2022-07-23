let enginesRunning = 0
const fsPromises = require('fs').promises
let engine = ''
let wdir = ''
const path = require('node:path')

export function setWDir(pa) {
  wdir = pa
  engine = path.join(pa, 'engine/spring')
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
  const writeLine = '\[GAME\]\{' + `

        HostIP=${params.host};
        HostPort=${params.port};       // (optional) default is 8452    
        MyPlayerName=${params.permittedUsername};
        MyPasswd=${params.token};
        IsHost=0;           // tell the engine this is a client
    
    ` + '\}'
  const scriptPath = path.join(wdir, 'springwritable', 'script.txt')
  fsPromises.writeFile(scriptPath, writeLine).then(
    () => {
      launchEngine()
    },
  )
}

function launchEngine() {
  engineLaunched()
  const exec = require('child_process').exec

  let result = ''
  const engineCmdLine = `${engine} -config ${path.join(wdir, 'springwritable', 'script.txt')} -write-dir ${path.join(wdir, 'springwritable')}`

  const child = exec(engineCmdLine)

  child.stdout.on('data', (data) => {
    result += data
  })

  child.on('close', () => {
    console.log(result)
    engineClosed()
  })
}

function engineClosed() {
  enginesRunning--
}

function engineLaunched() {
  enginesRunning++
}

