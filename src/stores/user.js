import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const defaultUser = { 
    id: 1, 
    nickname: "luposki",
    picture: "https://i.pravatar.cc/150?img=33"   
  }
  
  let user = ref({})
  
  function signIn() {
    setTimeout(()=> {
      user.value = defaultUser
    }, 400)
  }
  
  function signOut() {
    setTimeout(()=> {
      user.value = {}
    }, 400)
  }
  
  return { user, signIn }
})