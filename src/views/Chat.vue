<script setup>
import { useConversationStore } from '../stores/conversation';
import { useUserStore } from '../stores/user.js'
import { ref, computed, onMounted } from 'vue'
import { formatDistanceToNow } from 'date-fns/esm';
import { ptBR } from 'date-fns/esm/locale';

import Emojis from '../components/chat/Emojis.vue'
import Options from '../components/chat/Options.vue'

const store = useConversationStore()
const storeUser = useUserStore()

const friend = computed(() => store.conversation)
const user = computed(() => storeUser.user)

const messages = ref([])
const inputValue = ref('');
const activeEmojis = ref(false)
const activeOptions = ref(false)

function scrollToBottom () {
  const messageContainer = document.getElementById("messageContainer")
  if(messageContainer) {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
  }
}

storeUser.socket.on("messageReceived", (data) => {
  const messageContainer = document.getElementById("messageContainer")
  messages.value.push(data)

  if((messageContainer.scrollTop + messageContainer.clientHeight) + 1 < messageContainer.scrollHeight) {
    console.log("akdasdas")
    return 
  }
  scrollToBottom()
})

onMounted(() => {
  scrollToBottom()
})

const showPanelEmojis = () => {
  activeOptions.value = false
  activeEmojis.value = !activeEmojis.value
}

const showPanelOptions = () => {
  activeEmojis.value = false
  activeOptions.value = !activeOptions.value
}

const veryMessage = (userFrom) => {
  if (userFrom === user.value.nickname) {
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

const sendMessage = async () => {
  console.log("message")

  const data = {
    id: window.crypto.randomUUID(),
    from: user.value.nickname,
    to: friend.value.nickname,
    message: inputValue.value,
    createdAt: Date.now(),
  }

  storeUser.socket.emit('sendMessageToNickname', data);
  messages.value.push(data)
  setTimeout(() => scrollToBottom(), 100) 
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
      <button @click="sendMessage" class="btn-primary">
        <i class='bx bxs-send'></i>
      </button>

      <Emojis v-if="activeEmojis" />
      <Options v-if="activeOptions" />
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
