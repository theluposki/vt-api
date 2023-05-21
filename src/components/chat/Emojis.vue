<script setup>
import { ref } from 'vue'
import dataEmojis from '../../emojis.js'

const emojis = ref(dataEmojis)

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

</script>

<template>
  <div class="activeViewEmojis" id="activeViewEmojis">
    <div class="divEmojis" v-for="(item, index) in emojis" :key="index" @click="handleEmojiClick">
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
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
</style>
