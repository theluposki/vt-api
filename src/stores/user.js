import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const defaultUser = { 
    id: 1, 
    nickname: "luposki",
    picture: "https://i.pravatar.cc/150?img=33"   
  }
  
  let user = ref({})
  
  async function signIn(email, password) {
    const data = { email, password }

    const url = `https://localhost:4004/api/v1/auth`
    const url2 = `https://localhost:4004/api/v1/users/myprofile`

    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "origin",
        body: JSON.stringify(data)
      });

      if (response.headers.has('Set-Cookie')) {
        const cookies = response.headers.get('Set-Cookie').split(',');
        cookies.forEach(cookie => {
          document.cookie = cookie;
        });
      }

      const result = await response.json();
      
      if(result.error) return console.log(result)

      const response2 = await fetch(url2, {
        method: 'GET',
        credentials: 'include'
      })

      const result2 = await response2.json();

      if(result2.id) {
        user.value = result2
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function signUp(name, email, password) {
    const data = { name, email, password }

    const url = `https://localhost:4004/api/v1/register`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  function signOut() {
    setTimeout(()=> {
      user.value = {}
    }, 400)
  }
  
  return { user, signIn, signUp }
})
