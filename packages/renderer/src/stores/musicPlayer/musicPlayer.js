const fs = require('fs')
const path = require('path')
let isMusicPlaying = false
let audioCtx
let contextGain
let userVol = 100
let sourceIntro
let sourceLoop
let audioDelay
function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length)
  const view = new Uint8Array(ab)
  for (let i = 0; i < buf.length; ++i)
    view[i] = buf[i]

  return ab
}

export function setVol(uvl) {
  userVol = uvl
}
export function playSound(file, loop) {
  if (!isMusicPlaying) {
    audioCtx = new AudioContext()
    contextGain = audioCtx.createGain()
    // connect to context
    contextGain.connect(audioCtx.destination)
    actuallyPlay()
  }
  else {
    function dialDown(time) {
      const dt = time - performance.now()

      if (dt >= 1000) {
        actuallyPlay()
      }
      else {
        contextGain.gain.setValueAtTime(
          (userVol / 100) * ((1000 - dt) / 1000),
          audioCtx.currentTime,
        )
        window.requestAnimationFrame(dialDown)
      }
    }
    window.requestAnimationFrame(dialDown)
  }

  function actuallyPlay() {
    contextGain.gain.setValueAtTime(userVol / 100, audioCtx.currentTime)
    // const assets_dir = path.join(__dirname, 'music')
    try {
      sourceIntro.disconnect(contextGain)
      sourceLoop.disconnect(audioDelay)
    }
    catch {
    }

    isMusicPlaying = true
    if (loop) {
      // if is playing disconnect it
      sourceIntro = audioCtx.createBufferSource()
      sourceLoop = audioCtx.createBufferSource()

      // const bufferIntro = toArrayBuffer(fs.readFileSync(path.join(assets_dir, file)))
      // const bufferLoop = toArrayBuffer(fs.readFileSync(path.join(assets_dir, `loop_${file}`)))
      const bufferIntro = toArrayBuffer(fs.readFileSync(`/music/${file}`))
      const bufferLoop = toArrayBuffer(fs.readFileSync(`/music/loop_${file}`))
      audioCtx.decodeAudioData(bufferIntro, (buf) => {
        const duration = buf.duration
        // sourceIntro.buffer = buf;
        sourceIntro.buffer = buf
        // selfState.sourceIntro.connect(selfState.sourceIntro);
        // intro fade in
        sourceIntro.connect(contextGain)
        // set to disconnect
        // selfState.sourceIntro = gainIntro;
        // gainIntro.gain.setValueAtTime(0, context.currentTime+10);
        audioDelay = audioCtx.createDelay(duration - 0.03)
        // var delayNode = context.createDelay()
        audioDelay.delayTime.value = duration - 0.03
        audioDelay.connect(contextGain)

        audioCtx.decodeAudioData(bufferLoop, (buf) => {
          sourceLoop.buffer = buf
          sourceLoop.loop = true
          // set loop fade in
          // gainLoop.gain.setValueAtTime(0, context.currentTime);
          // gainLoop.gain.linearRampToValueAtTime(1, context.currentTime + 1);
          sourceLoop.connect(global.selfState.promethesys.audio.audioDelay)
          sourceLoop.start(0)
          sourceIntro.start(0)
        })
      })
    }
    else {
      sourceIntro = audioCtx.createBufferSource()
      const buffer = toArrayBuffer(fs.readFileSync(`music/${file}`))
      audioCtx.decodeAudioData(buffer, (buf) => {
        sourceIntro.buffer = buf
        sourceIntro.connect(contextGain)
        // selfState.contextGain.gain.setValueAtTime(selfState.userVolume/100, selfState.audioCtx.currentTime);source.start(0);},fadeDuration*1000
        sourceIntro.start(0)
      })
    }
  }
}

export function stopSound() {
  function dialDown(time) {
    const dt = time - performance.now()

    if (dt >= 1000) {
      isMusicPlaying = false
      try {
        sourceIntro.disconnect(global.selfState.promethesys.audio.contextGain)
      }
      catch {}
      try {
        sourceLoop.disconnect(global.selfState.promethesys.audio.audioDelay)
      }
      catch {}
    }
    else {
      contextGain.gain.setValueAtTime(
        (userVol / 100) * ((1000 - dt) / 1000),
        audioCtx.currentTime,
      )
      window.requestAnimationFrame(dialDown)
    }
  }
  window.requestAnimationFrame(dialDown)
}

