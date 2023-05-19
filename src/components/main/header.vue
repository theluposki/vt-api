<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../stores/user.js";

const store = useUserStore();

const user = computed(() => store.user);

import panelLogin from "./header/login.vue";
import panelLogup from "./header/logup.vue";
import panelMenu from "./header/nav.vue";

const activeMenu = ref(false);
const activeLogin = ref(false);
const activeLogup = ref(false);

const fnActiveMenu = () => {
  activeMenu.value = !activeMenu.value;
};

const fnActiveLogin = () => {
  activeLogin.value = !activeLogin.value;
  activeLogup.value = false;
};

const fnActiveLogup = () => {
  activeLogup.value = !activeLogup.value;
  activeLogin.value = false;
};
</script>

<template>
  <header class="header">
    <div class="logo">
      <i class="bx bx-git-merge"></i>
      <span>MyReb</span>
    </div>

    <div v-if="!user.id" class="group-options-signin-sign-out">
      <a href="" class="link" @click.prevent="fnActiveLogup">
        abrir uma conta
      </a>
      <div class="btn-signIn" @click="fnActiveLogin">
        <i class="bx bx-log-in-circle"></i>
      </div>
    </div>

    <div v-if="user.id" class="group-options">
      <div class="user-conected">
        <span class="user-nickname"> @{{ user.nickname }} </span>
        <img :src="user.picture" class="picture" alt="picture" />
      </div>

      <div class="btn-menu" @click="fnActiveMenu">
        <i class="bx bx-x" v-if="activeMenu"></i>
        <i class="bx bx-menu" v-else></i>
      </div>
    </div>

    <panelMenu v-if="activeMenu && user.id"></panelMenu>
    <panelLogin v-if="activeLogin && !user.id"></panelLogin>
    <panelLogup v-if="activeLogup && !user.id"></panelLogup>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  min-height: 60px;
  width: 100%;
  background-color: var(--dark);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 4px;
}

.logo i {
  font-size: 33px;
  filter: drop-shadow(0 0.5mm 1mm var(--primary));
}
.logo span {
  font-size: 22px;
  font-weight: 700;
}

.group-options,
.group-options-signin-sign-out {
  display: flex;
  align-items: center;
  gap: 12px;
}

.link {
  color: var(--primary);
}

.user-conected {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 4px;
}
.user-nickname {
  font-size: 10px;
  color: var(--primary);
  display: flex;
  align-content: center;
  justify-content: center;
}
.picture {
  width: 30px;
  height: 30px;
  border-radius: 50%;

  object-fit: cover;
}

.btn-menu,
.btn-signIn {
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

.btn-menu:hover,
.btn-signIn:hover {
  transition: all ease 0.4s;
  background-color: var(--dark);
  box-shadow: inset 0 0 6px var(--primary);
}

.btn-menu:active,
.btn-signIn:active {
  transform: scale(0.9);
}
</style>
