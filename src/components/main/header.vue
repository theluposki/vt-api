<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../../stores/user.js'

const store = useUserStore()

const user = computed(() => store.user)

const name = ref("")
const email = ref("")
const password = ref("")
const confpassword = ref("")
  
const activeMenu = ref(false)
const activeLogin = ref(false)
const activeLogup = ref(false)
const lockPass = ref(false)
const lockConfPass = ref(false)

const signIn = () => {
  store.signIn()
}

const signOut = () => {
  store.signOut()
}

const fnActiveMenu = () => {
  activeMenu.value = !activeMenu.value
}

const fnActiveLogin = () => {
  activeLogin.value = !activeLogin.value
  activeLogup.value = false
}

const fnActiveLogup = () => {
  activeLogup.value = !activeLogup.value
  activeLogin.value = false
}

const fnLockPass = () => {
  const password = document.getElementById("password")
  
  if(password.type === "password") {
    password.type = "text"
    lockPass.value = true
  } else {
    password.type = "password"
    lockPass.value = false
  }
}

const fnLockConfPass = () => {
  const confpassword = document.getElementById("confpassword")
  
  if(confpassword.type === "password") {
    confpassword.type = "text"
    lockConfPass.value = true
  } else {
    confpassword.type = "password"
    lockConfPass.value = false
  }
}


const clearLogin = () => {
  email.value = ""
  password.value = ""
}

const clearLogup = () => {
  name.value = ""
  email.value = ""
  password.value = ""
  confpassword.value = ""
}


const fnVerifyConfPassword = () => {
  
  setTimeout(() => {
    const elPassword = document.getElementById("password")
    const elConfpassword = document.getElementById("confpassword")
    
    if(password.value != confpassword.value) {
      elPassword.classList.add("input-danger")
      elConfpassword.classList.add("input-danger")
      return
    } 
    
    elPassword.classList.remove("input-danger")
    elConfpassword.classList.remove("input-danger")
  }, 400)
}

</script>

<template>
    <header class="header">
        <div class="logo">
            <i class='bx bx-git-merge'></i>
            <span>MyReb</span>
        </div>
        
        <div v-if="!user.id" class="group-options-signin-sign-out">
          <a href="" class="link" @click.prevent="fnActiveLogup">
            abrir uma conta
          </a>
          <div class="btn-signIn" @click="fnActiveLogin">
            <i class='bx bx-log-in-circle'></i>
          </div>
        </div>
        
        <div v-if="user.id" class="group-options">
          <div class="user-conected">
              <img :src="user.picture" class="picture" alt="picture"/>
              <span class="user-nickname">
                @{{ user.nickname }}
              </span>
          </div>
          
          <div class="btn-menu" @click="fnActiveMenu">
            <i class='bx bx-x' v-if="activeMenu"></i>
            <i class='bx bx-menu' v-else></i>
          </div>
        </div>
        
        <div class="panel-menu" v-if="activeMenu">
            <a href="" class="nav-link">
                <i class='bx bxs-home'></i>
            </a>

            <a href="" class="nav-link">
                <i class='bx bxs-contact' ></i>
            </a>
            
            <a href="" @click="signOut" class="nav-link out">
                <i class='bx bx-log-out-circle'></i>
            </a>
        </div>
        
        <div class="panel-login" v-if="activeLogin && !user.id">
          <h1 class="title">Login</h1>
          
          {{ user }}
          
          <div class="form-control">
            <label for="email">E-mail</label>
            <input tabindex="1" type="text" v-model="email" id="email" placeholder="digite seu e-mail">
          </div>
          
          <div class="form-control">
            <label for="password">Senha</label>
            <div class="form-control-group">
              <input tabindex="2" type="password" v-model="password" id="password" placeholder="digite a senha">
              <button @click="fnLockPass">
                <i v-if="lockPass" class='bx bx-lock-open' ></i>
                <i v-if="!lockPass" class='bx bx-lock' ></i>
              </button>
            </div>
          </div>
          
          <div class="form-control">
            <div class="form-control-group">
              <button @click="clearLogin">Limpar</button>
              <button @click="signIn" tabindex="3" id="btnLogin" class="btn-primary">
                Acessar
                <i class='bx bx-ghost' ></i>
              </button>
            </div>
          </div>
          
        </div>
        
        <div class="panel-logup" v-if="activeLogup && !user.id">
          <h1 class="title">Abrir uma conta agora</h1>
          
          <div class="form-control">
            <label for="name">Nome</label>
            <input tabindex="1" type="text" v-model="name" id="name" placeholder="digite o seu nome">
          </div>
          
          <div class="form-control">
            <label for="email">E-mail</label>
            <input tabindex="2" type="text" v-model="email" id="email" placeholder="digite seu e-mail">
          </div>
          
          <div class="form-control">
            <label for="password">Senha</label>
            <div class="form-control-group">
              <input tabindex="3" type="password" v-model="password" id="password" placeholder="digite a senha">
              <button @click="fnLockPass">
                <i v-if="lockPass" class='bx bx-lock-open' ></i>
                <i v-if="!lockPass" class='bx bx-lock' ></i>
              </button>
            </div>
          </div>
          
          <div class="form-control">
            <label for="confpassword">Confirmar senha</label>
            <div class="form-control-group">
              <input @keyup="fnVerifyConfPassword" tabindex="4" type="password" v-model="confpassword" id="confpassword" placeholder="digite a senha novamente">
              <button @click="fnLockConfPass">
                <i v-if="lockConfPass" class='bx bx-lock-open' ></i>
                <i v-if="!lockConfPass" class='bx bx-lock' ></i>
              </button>
            </div>
          </div>
          
          <div class="form-control">
            <div class="form-control-group">
              <button @click="clearLogup">Limpar</button>
              <button tabindex="5" id="btnLogup" class="btn-primary">
                Abrir AGORA 
                <i class='bx bx-wink-smile' ></i>
              </button>
            </div>
          </div>
          
        </div>
    </header>

</template>

<style scoped>
.header {
    position: relative;
    min-height: 60px;
    width: 100%;
    background-color: var(--dark);

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 4px;
}

.logo i {
    font-size: 33px;
    filter: drop-shadow(0 0.5mm 1mm var(--primary));
}
.logo span {
    font-size: 22px;
    font-weight: 700;
}

.group-options, .group-options-signin-sign-out {
  display: flex;
  align-items: center;
  gap: 12px;
}

.link {
  color: var(--primary);
}

.user-conected {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1px;
}
.user-nickname {
  font-size: 10px;
  color: var(--primary);
  display: flex;
  align-content: center;
  justify-content: center;
}
.picture {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  
  object-fit: cover;
}

.panel-menu {
    position: absolute;
    top: 64px;
    right: 8px;
    background-color: var(--dark);
    width: 60px;
    min-height: calc(100vh - 88px);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    padding: 4px 0;
}

.panel-login, .panel-logup {
  position: absolute;
    top: 64px;
    right: 8px;
    background-color: var(--dark);
    width: 100%;
    min-height: calc(100vh - 88px);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    padding: 12px;
}

.title {
  font-size: 1.2rem;
  padding: 20px 0;
}

.form-control-group {
 display: flex;
 justify-content: space-between;
 gap: 4px;
}

.form-control {
  width: 100%;
 display: flex;
 flex-direction: column;
 padding: 16px;
 gap: 4px;
}

.form-control input {
  width: 100%;
  background: var(--dark);
  border: solid 1px var(--dark2);
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  caret-color: var(--primary);
  color: var(--white);
}

.form-control input:hover {
  transition: all ease .4s;
  background: var(--dark2);
  outline: solid 2px var(--primary);
}

.form-control input:active {
  transform: scale(0.9);
}

.input-danger {
  outline: solid 2px red !important;
}

.form-control button, .form-control-group > button {
  width: content;
  background: var(--dark2);
  border: solid 1px var(--dark2);
  border-radius: 4px;
  padding: 12px;
  font-weight: 700;
  color: var(--white);
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.form-control button:hover {
  transition: all ease .4s;
  background: var(--dark);
}
.form-control button:active {
  transform: scale(0.9);
}

.form-control-group > button {
  flex-grow: 1;
}

.btn-primary {
  background: var(--primary) !important;
  color: var(--dark) !important;
}

.form-control button > i {
  font-size: 22px;
}

.nav-link, .btn-menu, .btn-signIn {
  width: 50px;
  height: 50px;
  background-color: var(--dark2);

  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 4px;
  box-shadow: 0 0 1px var(--primary);
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
  user-select: none;
}

.nav-link:hover, .btn-menu:hover, .btn-signIn:hover {
  transition: all ease .4s;
  background-color: var(--dark);
  box-shadow: inset 0 0 6px var(--primary);
}

.nav-link:active, .btn-menu:active, .btn-signIn:active {
  transform: scale(0.9);
}

.out {
  position: absolute;
  bottom: 4px;
  
}

</style>
