<script setup>
import { ref, computed } from 'vue'
import listContactsMock from '../../mocks/contacts.js'
import { useConversationStore } from '../../stores/conversation.js'
import { useRouter } from 'vue-router'

const store = useConversationStore()

const { push } = useRouter()

const list = ref(listContactsMock)
const search = ref("")

const friend = computed(() => store.conversation)


const startConversation = (item) => {
  push("/chat")
  store.start(item)
}

const searchRegex = () => {
  if (search.value !== "") {
    setTimeout(() => {
      const reg = new RegExp(search.value, 'ig')
      const result = listContactsMock.filter(item => item.nickname.match(reg))
      return list.value = result
    }, 400)
  } else {
    return list.value = listContactsMock
  }
}

</script>

<template>
  <div class="page-int">
    <header class="header">
      <div class="form-control">
        <input type="text" v-model="search" @keyup="searchRegex" placeholder="Buscar contato">
        <button class="btn-primary" @click="searchRegex">
          <i class='bx bx-search-alt-2'></i>
        </button>
      </div>
    </header>
    <ul>
      <li v-for="item in list" :key="item.id" @click="startConversation(item)">
        <img :src="item.picture" alt="picture">
        <span>{{ item.nickname }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  min-height: 60px;
  padding: 4px 12px;
}

.form-control {
  width: 100%;
  display: flex;
  gap: 4px;
}

.form-control input {
  width: 100%;
  background: var(--dark);
  border: solid 1px var(--dark2);
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  caret-color: var(--primary);
  color: var(--white);
}

.form-control input:hover {
  transition: all ease 0.4s;
  background: var(--dark2);
  outline: solid 2px var(--primary);
}

.form-control input:active {
  transform: scale(0.9);
}


.form-control button {
  width: content;
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

.form-control button:hover {
  transition: all ease 0.4s;
  background: var(--dark);
}

.form-control button:active {
  transform: scale(0.9);
}

.btn-primary {
  background: var(--primary) !important;
  color: var(--dark) !important;
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
  padding: 4px 12px;
}

li {
  width: 100%;
  min-height: 60px;
  background: var(--dark3);
  padding: 0 12px;

  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  border-right: solid 4px transparent;
  cursor: pointer;
}

li:hover {
  transition: all ease .4s;
  border-right: solid 4px var(--primary);
}

li:active {
  transform: scale(0.9);
}

li img {
  width: 50px;
  height: 50px;

  object-fit: cover;
  border-radius: 4px;
}

li span {
  font-size: 18px;
}
</style>
