<script setup>
import { computed } from 'vue';
import { useUserStore } from './stores/user.js'

const store = useUserStore()

const user = computed(() => store.user)

import HeaderM from "./components/main/header.vue"
import MainM from "./components/main/main.vue"
import FooterM from "./components/main/footer.vue"
</script>

<template>
  <HeaderM />
  <router-view v-if="user.id"></router-view>
  <MainM v-if="!user.id" />
  <FooterM />
</template>


