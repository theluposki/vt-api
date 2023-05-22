<script setup>
import { ref, computed } from 'vue'
import { state } from "../../socket.io.js";
// import { socket } from '../../plugins/socket.io';

const clientsConected = ref(0);
const conected = ref(false);


computed(() => {
  conected.value = state.connected()
})

// socket.on('clients-conected', data => {
//   console.log(data)
//   clientsConected.value = data
// })
</script>

<template>
  <footer class="footer">
    <span>conectados: {{ conected }}</span>
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
