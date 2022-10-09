let isMusicPlaying = false
let audioCtx
let contextGain
let userVol = 100
let sourceIntro
let sourceLoop
let audioDelay

export function setVol(uvl) {
  userVol = uvl
}
export async function playSound(file, loop) {
  console.log(`playing${file}`)
  if (!isMusicPlaying) {
    audioCtx = new AudioContext()
    contextGain = audioCtx.createGain()
    // connect to context
    contextGain.connect(audioCtx.destination)
    actuallyPlay()
  }
  else {
    console.log('trying to stop music')
    const t0 = performance.now()
    function dialDown(time) {
      const dt = time - t0
      console.log(dt)
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

  async function actuallyPlay() {
    contextGain.gain.setValueAtTime(userVol / 100, audioCtx.currentTime)
    // const assets_dir = path.join(__dirname, 'music')
    try {
      sourceIntro.disconnect(contextGain)
      sourceLoop.disconnect(audioDelay)
    }
    catch {
    }

    isMusicPlaying = true
    sourceIntro = audioCtx.createBufferSource()
    sourceLoop = audioCtx.createBufferSource()
    if (loop) {
      // if is playing disconnect it

      // const bufferIntro = toArrayBuffer(fs.readFileSync(path.join(assets_dir, file)))
      // const bufferLoop = toArrayBuffer(fs.readFileSync(path.join(assets_dir, `loop_${file}`)))

      sourceIntro.buffer = await fetch(`/music/${file}`).then(res => res.arrayBuffer()).then(ArrayBuffer => audioCtx.decodeAudioData(ArrayBuffer))

      const duration = sourceIntro.buffer.duration
      sourceIntro.connect(contextGain)
      audioDelay = audioCtx.createDelay(duration - 0.001)
      audioDelay.delayTime.value = duration - 0.001
      audioDelay.connect(contextGain)

      sourceLoop.buffer = await fetch(`/music/loop_${file}`).then(res => res.arrayBuffer()).then(ArrayBuffer => audioCtx.decodeAudioData(ArrayBuffer))
      sourceLoop.loop = true
      // set loop fade in
      // gainLoop.gain.setValueAtTime(0, context.currentTime);
      // gainLoop.gain.linearRampToValueAtTime(1, context.currentTime + 1);
      sourceLoop.connect(audioDelay)
      sourceLoop.start(0)
      sourceIntro.start(0)
    }
    else {
      sourceIntro.buffer = await fetch(`/music/${file}`).then(res => res.arrayBuffer()).then(ArrayBuffer =>
        audioCtx.decodeAudioData(ArrayBuffer),
      )
      sourceIntro.connect(contextGain)
      // selfState.contextGain.gain.setValueAtTime(selfState.userVolume/100, selfState.audioCtx.currentTime);source.start(0);},fadeDuration*1000
      sourceIntro.start(0)
    }
  }
}

export function stopSound() {
  const t0 = performance.now()
  function dialDown(time) {
    const dt = time - t0

    if (dt >= 1000) {
      isMusicPlaying = false
      try {
        sourceIntro.disconnect(global.selfState.promethesys.audio.contextGain)
      }
      catch { }
      try {
        sourceLoop.disconnect(global.selfState.promethesys.audio.audioDelay)
      }
      catch { }
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

