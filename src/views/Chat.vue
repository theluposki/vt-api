<script setup>
import { useConversationStore } from '../stores/conversation';
import { ref, computed, onMounted } from 'vue'
import { formatDistanceToNow } from 'date-fns/esm';
import { ptBR } from 'date-fns/esm/locale';
import MessagesMock from '../mocks/message.js'
import dataEmojis from '../emojis.js'

const store = useConversationStore()

const friend = computed(() => store.conversation)

const messages = ref(MessagesMock)
const inputValue = ref('');
const activeEmojis = ref(false)
const activeOptions = ref(false)
const activeCam = ref(false)
const emojis = ref(dataEmojis)

onMounted(() => {
  const messageContainer = document.getElementById("messageContainer")

  if (messageContainer) {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
  }
})

const showPanelEmojis = () => {
  activeOptions.value = false
  activeEmojis.value = !activeEmojis.value
}

const showPanelOptions = () => {
  activeEmojis.value = false
  activeOptions.value = !activeOptions.value
}

let videoTrack;
let currentCamera = 'user';

function stopCamera() {
  if (videoTrack) {
    videoTrack.stop();
  }
}

async function startCamera() {
  const cameraCanvas = document.getElementById("cameraCanvas")
  const ctx = cameraCanvas.getContext('2d');
  try {
    const constraints = {
      video: {
        facingMode: currentCamera
      }
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoTrack = stream.getVideoTracks()[0];
    const video = document.createElement('video');

    video.srcObject = new MediaStream([videoTrack]);
    video.autoplay = true;

    video.addEventListener('loadedmetadata', () => {
      const aspectRatio = 9 / 16;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      let canvasWidth = videoWidth;
      let canvasHeight = videoWidth * aspectRatio;

      if (canvasHeight > videoHeight) {
        canvasHeight = videoHeight;
        canvasWidth = videoHeight / aspectRatio;
      }

      cameraCanvas.width = canvasWidth;
      cameraCanvas.height = canvasHeight;
    });

    function drawFrame() {
      ctx.clearRect(0, 0, cameraCanvas.width, cameraCanvas.height);
      ctx.filter = 'grayscale(20%) brightness(120%)';
      ctx.scale(-1, 1); // Inverte horizontalmente o contexto
      
      ctx.drawImage(video, 0, 0, -cameraCanvas.width, cameraCanvas.height);
      ctx.scale(-1, 1); // Restaura a escala horizontal
      requestAnimationFrame(drawFrame);
    }

    video.addEventListener('play', () => {
      requestAnimationFrame(drawFrame);
    });
  } catch (error) {
    console.error('Erro ao acessar a câmera:', error);
  }
}

const CamTwo = async () => {
  if (currentCamera === 'user') {
    currentCamera = 'environment';
  } else {
    currentCamera = 'user';
  }

  stopCamera();
  startCamera();
}

const showPanelCam = async () => {
  activeEmojis.value = false
  activeOptions.value = false

  if(activeCam.value === false) {
    activeCam.value = true
    setTimeout(() => startCamera(), 100)
  } else {
    activeCam.value = false
    stopCamera()
  }
}

const handleEmojiClick = (e) => {
  const input = document.getElementById("input")
  const emoji = e.target.innerText

  const startPos = input.selectionStart;
  const endPos = input.selectionEnd;

  input.value = input.value.slice(0, startPos) + emoji + input.value.slice(endPos);

  input.selectionStart = startPos + emoji.length;
  input.selectionEnd = startPos + emoji.length;
  input.focus();
};

const veryMessage = (userFrom) => {
  if (userFrom === 'luposki') {
    return 'me'
  } else {
    return 'friend'
  }
}

function formatRelativeDate(date) {
  const now = new Date(date);
  const relativeDate = formatDistanceToNow(now, { locale: ptBR });
  return relativeDate
}

</script>

<template>
  <div class="page">
    <header class="header">
      <div class="userSelected">
        <router-link to="/contacts/list" class="nav-link">
          <i class='bx bx-arrow-back'></i>
        </router-link>
        <img :src="friend.picture" v-if="friend.id" alt="imagem profile">
        <span v-if="friend.id">{{ friend.nickname }}</span>
      </div>

      <div class="hright" v-if="friend.id">
        <button>
          <i class='bx bxs-video' ></i>
        </button>
        <button>
          <i class='bx bxs-phone-call' ></i>
        </button>
      </div>
    </header>

    <ul v-if="friend.id" id="messageContainer">
      <li v-for="item in messages" :key="item.id" :class="'message ' + veryMessage(item.from)">
        <span class="name">{{ item.from }}</span>
        <span class="msg">{{ item.message }}</span>
        <span class="createdAt">{{ formatRelativeDate(item.createdAt) }}</span>
      </li>
    </ul>

    <footer class="footer" v-if="friend.id">
      <button @click="showPanelOptions">
        <i v-if="!activeOptions" class='bx bxs-grid'></i>
        <i v-if="activeOptions" class='bx bx-x'></i>
      </button>
      <button @click="showPanelEmojis">
        <i v-if="!activeEmojis" class='bx bx-smile'></i>
        <i v-if="activeEmojis" class='bx bx-x'></i>
      </button>
      <input type="text" class="input" id="input" v-model="inputValue" placeholder="Mensagem">
      <button class="btn-primary">
        <i class='bx bxs-send'></i>
      </button>

      <div class="activeViewEmojis" id="activeViewEmojis" v-if="activeEmojis">
        <div class="divEmojis" v-for="(item, index) in emojis" :key="index" @click="handleEmojiClick">
          {{ item }}
        </div>
      </div>

      <div class="activeViewOptions" v-if="activeOptions">
        <button @click="showPanelCam">
          <i class='bx bxs-camera'></i>
        </button>
        <button>
          <i class='bx bx-file'></i>
        </button>
        <button>
          <i class='bx bxs-photo-album'></i>
        </button>
        <button>
          <i class='bx bxs-music'></i>
        </button>
        <button>
          <i class='bx bxs-location-plus' ></i>
        </button>
        <button>
          <i class='bx bxs-user-rectangle' ></i>
        </button>
      </div>


      <div class="panelCam" v-if="friend.id && activeCam">
        <button @click="showPanelCam" class="close">
          <i v-if="activeCam" class='bx bx-x'></i>
        </button>

        <button @click="CamTwo" class="camTwo">
          <i class='bx bx-transfer-alt'></i>
        </button>

        <canvas id="cameraCanvas"></canvas>
      </div>
    </footer>

  </div>
</template>

<style scoped>
.header {
  background-color: var(--dark3);
  width: 100%;
  min-height: 60px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;

  padding: 4px 12px;
}

.hright {
  display: flex;
  align-items: center;
  gap: 12px;
}

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

.panelCam > .close {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(33,33,33,0.4);
  z-index: 20010;
}

.panelCam > .camTwo {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: rgba(33,33,33,0.4);
  z-index: 20010;
}

.nav-link {
  width: 50px;
  height: 50px;
  background-color: var(--dark2);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  box-shadow: 0 0 1px var(--primary);
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
  user-select: none;
}

.userSelected {
  display: flex;
  align-items: center;
  gap: 12px;
}


.userSelected img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.nav-link:hover {
  transition: all ease 0.4s;
  background-color: var(--dark);
  color: var(--white);
  box-shadow: inset 0 0 6px var(--primary);
}

.nav-link:active {
  transform: scale(0.9);
}


ul {
  background: var(--dark2);
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  min-height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 12px;
  scroll-behavior: smooth;
}

.message {
  background-color: var(--dark3);
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 85%;
  padding: 8px 16px;
  border-radius: 8px;
}

.message.me {
  align-self: flex-end;
  background-color: var(--dark);
  border-radius: 8px 0px 4px 8px;
}

.message.friend {
  align-self: flex-start;
  background-color: var(--dark3);
}

.message>.name {
  font-size: 12px;
  font-style: italic;
  color: var(--primary);
}

.message>.msg {
  margin-top: 12px;
}

.message>.createdAt {
  font-size: 12px;
  font-style: italic;
  color: #ddd;
}

.footer {
  position: relative;
  background-color: var(--dark3);
  width: 100%;
  min-height: 60px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  gap: 6px;

  padding: 4px 12px;
}

.activeViewEmojis {
  position: absolute;
  width: 260px;
  min-height: 300px;
  max-height: 300px;
  font-size: 20px;
  padding: 12px;
  top: -304px;
  left: 12px;
  overflow-y: auto;
  background-color: var(--dark3);
  border: solid 2px var(--dark);
  border-radius: 8px;

  display: flex;
  flex-wrap: wrap;
}

.divEmojis {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 4px;
  cursor: pointer;
}

.divEmojis:hover {
  transform: rotateZ(360deg);
  background-color: var(--dark);
  border-radius: 4px;
}

.divEmojis:active {
  transform: scale(0.9);
}

.activeViewOptions {
  position: absolute;
  width: 260px;
  min-height: 200px;
  max-height: 200px;
  font-size: 20px;
  padding: 12px;
  top: -204px;
  left: 12px;
  overflow-y: auto;
  background-color: var(--dark3);
  border: solid 2px var(--dark);
  border-radius: 8px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 12px;
}

.input {
  width: 100%;
  background: var(--dark);
  border: solid 1px var(--dark2);
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  caret-color: var(--primary);
  color: var(--white);
}


.input:hover {
  transition: all ease 0.4s;
  background: var(--dark2);
  outline: solid 2px var(--primary);
}


.input:active {
  transform: scale(0.9);
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

.btn-primary {
  background: var(--primary) !important;
  color: var(--dark) !important;
}
</style>
