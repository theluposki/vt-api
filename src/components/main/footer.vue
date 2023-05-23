<script setup>
import { ref, computed } from 'vue'

import { useUserStore } from '../../stores/user';

const { socket } = useUserStore()

const clientsConected = ref(0);

socket.on('clients-conected', data => {
  clientsConected.value = data
})

</script>

<template>
  <footer class="footer">
    <span>conectados: {{ clientsConected }}</span>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  min-height: 20px;
  width: 100%;
  background-color: var(--dark);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 12px;
}
</style>
