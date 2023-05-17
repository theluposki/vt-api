<script setup>
import { computed } from 'vue';
import { useUserStore } from '../../stores/user.js'

const store = useUserStore()

const user = computed(() => store.user)
</script>

<template>
    <main v-if="user.id" class="main">
        Ben-vindo {{ user.nickname }}
    </main>

    <main v-if="!user.id" class="main">
        <h1>Myreb</h1>
    </main>
</template>

<style scoped>
  .main {
    width: 100%;
    min-height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
  }
</style>
