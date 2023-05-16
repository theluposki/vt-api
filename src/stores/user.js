import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const defaultUser = { 
    id: 1, 
    nickname: "luposki",
    picture: "https://i.pravatar.cc/150?img=33"   
  }
  const user = ref({})
  
  return { user }
})