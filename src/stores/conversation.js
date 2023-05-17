import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useConversationStore = defineStore('conversation', () => {
  let conversation = ref({})

  function start(friend) {
    conversation.value = friend
  }
  
  function end() {
    conversation.value = {}
  }
  
  return { conversation, start, end }
})
