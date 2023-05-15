<script setup>
import { ref } from 'vue';

const activeMenu = ref(false)

const fnActiveMenu = () => {
  activeMenu.value = !activeMenu.value
}

</script>

<template>
    <header class="header">
        <div class="logo">
            <i class='bx bx-git-merge'></i>
            <span>MyReb</span>
        </div>

        <div class="btn-menu" @click="fnActiveMenu">
          <i class='bx bx-x' v-if="activeMenu"></i>
          <i class='bx bx-menu' v-else></i>
        </div>

        <div class="panel-menu" v-if="activeMenu">
            <a href="" class="nav-link">
                <i class='bx bxs-home'></i>
            </a>

            <a href="" class="nav-link">
                <i class='bx bxs-contact' ></i>
            </a>
        </div>
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

.panel-menu {
    position: absolute;
    top: 64px;
    right: 8px;
    background-color: var(--dark);
    width: 60px;
    min-height: calc(100vh - 88px);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    padding: 4px 0;
}

.nav-link, .btn-menu {
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

.nav-link:hover, .btn-menu:hover {
  transition: all ease .4s;
  background-color: var(--dark);
  box-shadow: inset 0 0 6px var(--primary);
}

.nav-link:active, .btn-menu:active {
  transform: scale(0.9);
}

</style>
