<script setup>
import { ref, computed } from 'vue'
import PanelCam from './PanelCam.vue'
import { useConversationStore } from '../../stores/conversation.js';

const store = useConversationStore()

const friend = computed(() => store.conversation)

const activeCam = ref(false)

const showPanelCam = async () => {
  if(activeCam.value  === false) {
    activeCam.value = true
  } else {
    activeCam.value = false
  }
}

</script>
<template>
  <div class="activeViewOptions">
    <button @click="showPanelCam">
      <i class="bx bxs-camera"></i>
    </button>
    <button>
      <i class="bx bx-file"></i>
    </button>
    <button>
      <i class="bx bxs-photo-album"></i>
    </button>
    <button>
      <i class="bx bxs-music"></i>
    </button>
    <button>
      <i class="bx bxs-location-plus"></i>
    </button>
    <button>
      <i class="bx bxs-user-rectangle"></i>
    </button>
  </div>

  <PanelCam v-if="friend.id && activeCam" />

  <button @click="showPanelCam" v-if="activeCam" class="closeCan">
      <i v-if="activeCam" class="bx bx-x"></i>
  </button>

</template>

<style scoped>
.activeViewOptions {
  position: absolute;
  width: 260px;
  min-height: 200px;
  max-height: 200px;
  font-size: 20px;
  padding: 12px;
  top: -204px;
  left: 12px;
  overflow-y: auto;
  background-color: var(--dark3);
  border: solid 2px var(--dark);
  border-radius: 8px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 12px;
}

.closeCan {
  position: absolute;
  top: -26px;
  right: 12px;
  background-color: rgba(33,33,33,0.4);
  z-index: 20010;
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
</style>
