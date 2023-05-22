<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user';

const { signOut } = useUserStore()

const search = ref('')
const usersFound = ref([])

const searchUsers = async () => {
  const url = `https://localhost:4004/api/v1/users/search-users`;
  const data = {
    nickname: search.value
  }

  if(search.value === "") return 

  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    console.log(response.status)
    if(response.status === 401) {
      alert("Sua sessão expirou, Faça login para continuar.")
      signOut()
      return 
    }

    const result = await response.json();

    if (result.length > 0) {
      usersFound.value = result
    } else {
      usersFound.value = []
    }
  } catch (error) {
    console.log(error);
  }
};


const sendFriendRequest = async (nickname) => {
  const url = `https://localhost:4004/api/v1/users/send-friend-request`;
  const data = {
    to: nickname
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    if(response.status === 401) {
      signOut()
      alert("Sua sessão expirou, Faça login para continuar.")
      return 
    }

    const result = await response.json();

    console.log(result)
    alert(result.message)
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="page-int">
    <haeader class="header">
      <div class="hleft">
        <h2 class="title">Adicionar novo contato</h2>
      </div>
      <div class="hleft">
        <input type="search" v-model="search" @keyup="searchUsers" class="input" placeholder="digite o nickname" />
        <button @click="searchUsers">
          <i class="bx bx-search-alt-2"></i>
        </button>
      </div>
    </haeader>

    <ul v-if="usersFound.length > 0">
      <li v-for="item in usersFound" :key="item.id">
        <div class="lleft">
          <img :src="item.picture" alt="picture" />
          <span class="name">{{ item.nickname }}</span>
        </div>
        <div class="lright">
          <button class="btn-success" @click="sendFriendRequest(item.nickname)">
            <span class="text">Solicitar</span>
            <i class="bx bx-mail-send"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  background-color: var(--dark);
  width: 100%;
  min-height: 60px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;

  padding: 4px 12px;
}

.hleft,
.hright {
  display: flex;
  align-items: center;
  gap: 12px;
}

.name {
  font-size: 14px;
}

.title {
  font-size: 16px;
}

button {
  position: relative;
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
  cursor: pointer;
  gap: 8px;
}

button:hover {
  transition: all ease 0.4s;
  background: var(--dark);
}

button:active {
  transform: scale(0.9);
}

button .text {
  font-size: 12px !important;
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
  justify-content: space-between;
  gap: 12px;
  border-radius: 4px;
  border-right: solid 4px transparent;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary) !important;
  color: var(--dark) !important;
}

.btn-danger {
  background: var(--danger) !important;
  color: var(--white) !important;
}

.btn-success {
  background: var(--success) !important;
  color: var(--white) !important;
}

.lleft,
.lright {
  display: flex;
  align-items: center;
  gap: 12px;
}

li:hover {
  transition: all ease 0.4s;
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
  user-select: none;
}
</style>
