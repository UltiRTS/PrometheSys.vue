let isMusicPlaying = false
let audioCtx
let contextGain
let userVol = 100
let sourceIntro
export function setVol(uvl) {
  userVol = uvl
}
export async function playNotif(file) {
  console.log(`playing${file}`)
  if (!isMusicPlaying) {
    audioCtx = new AudioContext()
    contextGain = audioCtx.createGain()
    // connect to context
    contextGain.connect(audioCtx.destination)
    actuallyPlay()
  }
  else {
    actuallyPlay()
  }

  async function actuallyPlay() {
    sourceIntro = audioCtx.createBufferSource()

    try {
      sourceIntro.disconnect(contextGain)
    }
    catch {
    }

    isMusicPlaying = true

    sourceIntro.buffer = await fetch(`/music/${file}`).then(res => res.arrayBuffer()).then(ArrayBuffer =>
      audioCtx.decodeAudioData(ArrayBuffer),
    )
    sourceIntro.connect(contextGain)
    // selfState.contextGain.gain.setValueAtTime(selfState.userVolume/100, selfState.audioCtx.currentTime);source.start(0);},fadeDuration*1000
    sourceIntro.start(0)
  }
}
export function stopNotif() {
  const t0 = performance.now()
  function dialDown(time) {
    const dt = time - t0

    if (dt >= 1000) {
      isMusicPlaying = false
      try {
        sourceIntro.disconnect(global.selfState.promethesys.audio.contextGain)
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

