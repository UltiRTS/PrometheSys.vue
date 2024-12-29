import { ref } from 'vue'


let isMusicPlaying = false
let isTransitioning = false
let audioCtx
let contextGain
let userVol = 100
let sourceIntro
let sourceLoop
let audioDelay
let soundFile = ref('')
let automaticVolume = 1

export function setVol(uvl) {
  userVol = uvl
}
export async function playSound(file, loop) {
  if (isTransitioning)
    return
  if (file === soundFile.value && isMusicPlaying) // if requesting to play the same music that is playing
    return
  soundFile.value = file
  // console.log(`playing${file}`)
  if (!isMusicPlaying) {
    audioCtx = new AudioContext()
    contextGain = audioCtx.createGain()
    // connect to context
    contextGain.connect(audioCtx.destination)
    actuallyPlay()
  }
  else {
    isTransitioning = true
    // console.log('trying to stop music')
    const t0 = performance.now()
    function dialDown(time) {
      const dt = time - t0
      if (automaticVolume == 0)
        return
      automaticVolume = (1000 - dt) / 1000
      if (dt >= 1000) {
        automaticVolume = 0
        actuallyPlay()
      }
      else {
        contextGain.gain.setValueAtTime(

          automaticVolume * (userVol / 100),
          audioCtx.currentTime,
        )
        console.log('lp1')
        window.requestAnimationFrame(dialDown)
      }
    }
    window.requestAnimationFrame(dialDown)
  }

  async function actuallyPlay() {
    // const assets_dir = path.join(__dirname, 'music')
    try {
      sourceIntro.disconnect(contextGain)
      sourceLoop.disconnect(audioDelay)
    }
    catch {
    }
    automaticVolume = 1
    contextGain.gain.setValueAtTime(automaticVolume * userVol / 100, audioCtx.currentTime)
    isMusicPlaying = true
    sourceIntro = audioCtx.createBufferSource()
    sourceLoop = audioCtx.createBufferSource()
    if (loop) {
      // if is playing disconnect it

      // const bufferIntro = toArrayBuffer(fs.readFileSync(path.join(assets_dir, file)))
      // const bufferLoop = toArrayBuffer(fs.readFileSync(path.join(assets_dir, `loop_${file}`)))

      sourceIntro.buffer = await fetch(`music/${file}`).then(res => res.arrayBuffer()).then(ArrayBuffer => audioCtx.decodeAudioData(ArrayBuffer))

      const duration = sourceIntro.buffer.duration
      sourceIntro.connect(contextGain)
      audioDelay = audioCtx.createDelay(duration - 0.001)
      audioDelay.delayTime.value = duration - 0.001
      audioDelay.connect(contextGain)

      sourceLoop.buffer = await fetch(`music/loop_${file}`).then(res => res.arrayBuffer()).then(ArrayBuffer => audioCtx.decodeAudioData(ArrayBuffer))
      sourceLoop.loop = true
      // set loop fade in
      // gainLoop.gain.setValueAtTime(0, context.currentTime);
      // gainLoop.gain.linearRampToValueAtTime(1, context.currentTime + 1);
      sourceLoop.connect(audioDelay)
      sourceLoop.start(0)
      sourceIntro.start(0)
    }
    else {
      sourceIntro.buffer = await fetch(`music/${file}`).then(res => res.arrayBuffer()).then(ArrayBuffer =>
        audioCtx.decodeAudioData(ArrayBuffer),
      )
      sourceIntro.connect(contextGain)
      // selfState.contextGain.gain.setValueAtTime(selfState.userVolume/100, selfState.audioCtx.currentTime);source.start(0);},fadeDuration*1000
      sourceIntro.start(0)
    }
    isTransitioning = false
  }
}

export function toggleSound() {
  if (automaticVolume == 1)
    stopSound()
  else
    resumeSound()
}

export function stopSound() {
  if (!isMusicPlaying)
    return
  if (isTransitioning)
    return
  const t0 = performance.now()
  isTransitioning = true
  function dialDown(time) {
    const dt = time - t0

    if (dt >= 1000) {
      isTransitioning = false
      automaticVolume = 0
      contextGain.gain.setValueAtTime(automaticVolume * userVol / 100, audioCtx.currentTime)
    }
    else {
      automaticVolume = (1000 - dt) / 1000
      contextGain.gain.setValueAtTime(
        (userVol / 100) * (automaticVolume),
        audioCtx.currentTime,
      )
      console.log('lp2')
      window.requestAnimationFrame(dialDown)
    }
  }
  window.requestAnimationFrame(dialDown)
}

export function resumeSound() {
  if (!isMusicPlaying)
    return
  if (isTransitioning)
    return
  isTransitioning = true
  // console.log('trying to stop music')
  const t0 = performance.now()
  function dialUp(time) {
    const dt = time - t0
    if (automaticVolume == 1)
      return
    automaticVolume = (dt) / 1000
    if (dt >= 1000) {
      automaticVolume = 1
      isTransitioning = false
    }
    else {
      contextGain.gain.setValueAtTime(

        automaticVolume * (userVol / 100),
        audioCtx.currentTime,
      )
      console.log('lp1')
      window.requestAnimationFrame(dialUp)
    }
  }
  window.requestAnimationFrame(dialUp)
}
