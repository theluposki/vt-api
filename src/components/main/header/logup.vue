<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../../stores/user.js";

const store = useUserStore();

const name = ref("");
const email = ref("");
const password = ref("");
const confpassword = ref("");

const lockConfPass = ref(false);

const messageStore = computed(() => store.message)

const fnLockConfPass = () => {
  const confpassword = document.getElementById("confpassword");

  if (confpassword.type === "password") {
    confpassword.type = "text";
    lockConfPass.value = true;
  } else {
    confpassword.type = "password";
    lockConfPass.value = false;
  }
};

const clearLogup = () => {
  name.value = "";
  email.value = "";
  password.value = "";
  confpassword.value = "";
};

const fnVerifyConfPassword = () => {
  setTimeout(() => {
    const elPassword = document.getElementById("password");
    const elConfpassword = document.getElementById("confpassword");

    if (password.value != confpassword.value) {
      elPassword.classList.add("input-danger");
      elConfpassword.classList.add("input-danger");
      return;
    }

    elPassword.classList.remove("input-danger");
    elConfpassword.classList.remove("input-danger");
  }, 400);
};

const signUp = async () => {
 if(password.value !== confpassword.value) return
 await store.signUp(name.value, email.value, password.value)
}

</script>

<template>
  <div class="panel-logup">
    <h1 class="title">Abrir uma conta agora</h1>

    <div class="form-control">
      <label for="name">Nome</label>
      <input
        tabindex="1"
        type="text"
        v-model="name"
        id="name"
        placeholder="digite o seu nome"
      />
    </div>

    <div class="form-control">
      <label for="email">E-mail</label>
      <input
        tabindex="2"
        type="text"
        v-model="email"
        id="email"
        placeholder="digite seu e-mail"
      />
    </div>

    <div class="form-control">
      <label for="password">Senha</label>
      <div class="form-control-group">
        <input
          tabindex="3"
          type="password"
          v-model="password"
          id="password"
          placeholder="digite a senha"
        />
        <button @click="fnLockPass">
          <i v-if="lockPass" class="bx bx-lock-open"></i>
          <i v-if="!lockPass" class="bx bx-lock"></i>
        </button>
      </div>
    </div>

    <div class="form-control">
      <label for="confpassword">Confirmar senha</label>
      <div class="form-control-group">
        <input
          @keyup="fnVerifyConfPassword"
          tabindex="4"
          type="password"
          v-model="confpassword"
          id="confpassword"
          placeholder="digite a senha novamente"
        />
        <button @click="fnLockConfPass">
          <i v-if="lockConfPass" class="bx bx-lock-open"></i>
          <i v-if="!lockConfPass" class="bx bx-lock"></i>
        </button>
      </div>
    </div>

    <span class="messageStore">{{ messageStore }}</span>

    <div class="form-control">
      <div class="form-control-group">
        <button @click="clearLogup">Limpar</button>
        <button tabindex="5" id="btnLogup" @click="signUp" class="btn-primary">
          Abrir AGORA
          <i class="bx bx-wink-smile"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-logup {
  position: absolute;
  top: 64px;
  right: 8px;
  background-color: var(--dark);
  width: calc(100% - 12px);
  min-height: calc(100vh - 88px);
  max-height: calc(100vh - 88px);
  overflow-y: auto;
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

.messageStore {
  display: flex;
  align-items: center;
  color: var(--success);
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
  transition: all ease 0.4s;
  background: var(--dark2);
  outline: solid 2px var(--primary);
}

.form-control input:active {
  transform: scale(0.9);
}

.input-danger {
  outline: solid 2px red !important;
}

.form-control button,
.form-control-group > button {
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
  transition: all ease 0.4s;
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
</style>
