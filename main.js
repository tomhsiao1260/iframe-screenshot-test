import './style.css'

const width = 500
const height = 300

const canvas = document.getElementById('capturedCanvas')
const ctx = canvas.getContext('2d')
canvas.style.position = 'absolute'
canvas.style.bottom = 0
canvas.style.left = 0
canvas.width = width
canvas.height = height

const iframe = document.querySelector('#frame')
iframe.style.position = 'absolute'
iframe.style.top = 0
iframe.style.left = 0
iframe.style.margin = 0
iframe.style.padding = 0
iframe.style.border = 0
iframe.width = width
iframe.height = height

const btnStart = document.querySelector('#btn1')
const btnStop = document.querySelector('#btn2')
const btnSnap = document.querySelector('#btn3')
btnStart.style.position = 'absolute'
btnStop.style.position = 'absolute'
btnSnap.style.position = 'absolute'
btnStart.style.bottom = '80px'
btnStop.style.bottom = '40px'
btnSnap.style.bottom = '0px'
btnStart.style.right = 0
btnStop.style.right = 0
btnSnap.style.right = 0

const video = document.createElement("video")
video.style.position = 'absolute'
video.style.top = 0
video.style.right = 0
// video.style.visibility = 'hidden'
video.autoplay = true
video.muted = true
video.playsInline = true
video.width = width
video.height = height
document.body.appendChild(video)

btnStart.onclick = async function() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    preferCurrentTab: true,
    video: { frameRate: 50 },
  })

  video.srcObject = stream
}

btnStop.onclick = async function() {
  video.srcObject.getTracks().forEach((t) => t.stop());
  video.srcObject = null
}

btnSnap.onclick = async function() {
  const p = window.devicePixelRatio
  const g = 10
  ctx.drawImage(video, p * g, p * g, width * p - 2 * p * g, height * p - 2 * p * g, 0, 0, width, height)

  // canvas.toBlob((blob) => {
  //   const blobUrl = URL.createObjectURL(blob)
  //   console.log(blobUrl)
  //   download(blobUrl)
  // })
}

function download(blobUrl) {
  const downloadLink = document.createElement('a')
  downloadLink.href = blobUrl
  downloadLink.download = 'canvas_image.png'

  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}



