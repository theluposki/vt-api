<script setup>
import { onMounted, onUnmounted} from 'vue'


onMounted(() => {
 startCamera();
})

onUnmounted(() => {
  stopCamera();
  console.log("stop cam")
})


let videoTrack;
let currentCamera = 'user';


function stopCamera() {
  if (videoTrack) {
    videoTrack.stop();
  }
}

async function startCamera() {
  const cameraCanvas = document.getElementById("cameraCanvas");
  const ctx = cameraCanvas.getContext('2d');
  try {
    const constraints = {
      video: {
        width: 1280,
        aspectRatio: 21/9,
        facingMode: currentCamera
      }
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoTrack = stream.getVideoTracks()[0];
    const video = document.createElement('video');

    video.srcObject = new MediaStream([videoTrack]);
    video.autoplay = true;

    video.addEventListener('loadedmetadata', () => {
      cameraCanvas.width = video.videoWidth;
      cameraCanvas.height = video.videoHeight;
    });

    function drawFrame() {
      ctx.clearRect(0, 0, cameraCanvas.width, cameraCanvas.height);
      
      if (currentCamera === 'user') {
        ctx.save();
        ctx.scale(-1, 1); // Inverte horizontalmente
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = "high";
        ctx.translate(-cameraCanvas.width, 0);
      }
      
      ctx.drawImage(video, 0, 0, cameraCanvas.width, cameraCanvas.height);
      
      if (currentCamera === 'user') {
        ctx.restore();
      }
      
      requestAnimationFrame(drawFrame);
    }

    video.addEventListener('play', () => {
      requestAnimationFrame(drawFrame);
    });
  } catch (error) {
    console.error('Erro ao acessar a câmera:', error);
  }
}

async function switchCamera() {
  currentCamera = currentCamera === 'user' ? 'environment' : 'user';
  stopCamera();
  startCamera();
}
</script>

<template>
  <div class="panelCam">
    <button @click="switchCamera" class="camTwo">
      <i class="bx bx-transfer-alt"></i>
    </button>

    <button @click="CaptureCam" class="CaptureCam">
      <i class="bx bxs-camera"></i>
    </button>

    <canvas id="cameraCanvas"></canvas>
  </div>
</template>

<style scoped>

.panelCam {
  position: absolute;
  width: 100vw;
  max-width: 1048px;
  min-height: calc(100vh - 72px);
  max-height: calc(100vh - 72px);
  font-size: 20px;
  bottom: 0;
  left: 0;
  background-color: rgba(33,33,33, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 20000;
  overflow: hidden;
}

.panelCam > #cameraCanvas {
  background-color: rgba(33,33,33, 0.4);
  width: 100%;
  max-width: 1048px;
  aspect-ratio: 9/16;
  overflow: hidden;
  min-height: calc(100vh - 72px);
  max-height: calc(100vh - 72px);
}

.panelCam > .camTwo {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: rgba(33,33,33,0.4);
  z-index: 20010;
}

.panelCam > .CaptureCam {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(33,33,33,0.4);
  z-index: 20010;
}

.panelCam > .CaptureCam:active {
  background-color: var(--primary);
}

button {
  width: content;
  max-height: 50px;
  background: var(--dark2);
  border: solid 1px var(--dark2);
  border-radius: 4px;
  padding: 12px;
  font-size: 24px;
  font-weight: 700;
  color: var(--white);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}


button:hover {
  transition: all ease 0.4s;
  background: var(--dark);
}

button:active {
  transform: scale(0.9);
}
</style>
