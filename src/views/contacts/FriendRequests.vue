<script setup>
import { ref } from 'vue'

const numPending = ref(2)
const numAdded = ref(5)
const numReject = ref(30)

</script>

<template>
  <header class="header">
    <h2 class="title">Pedidos de amizade</h2>

    <div class="actionsList">
      <button class="pending" :data-pending="numPending">
        <i class='bx bx-user-pin' ></i>
      </button>
      <button class="added" :data-added="numAdded">
        <i class='bx bxs-user-plus' ></i>
      </button>
      <button class="reject" :data-reject="numReject">
        <i class='bx bx-user-x' ></i>
      </button>
    </div>
  </header>


  <ul>
    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=28" alt="picture">
          <span>Natali Ferrari</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>
    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>





    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>    <li>
        <div class="lleft">
          <img src="https://i.pravatar.cc/150?img=53" alt="picture">
          <span>Jonas Salamandriel</span>
        </div>
        <div class="lright">
          <button class="btn-danger">
            <i class='bx bx-trash' ></i>
          </button>
          <button class="btn-success">
            <i class='bx bx-plus' ></i>
          </button>
        </div>
    </li>
  </ul>

</template>

<style scoped>
.header {
  width: 100%;
  min-height: 60px;
  padding: 4px 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--dark);
}
.title {
  font-size: 16px;
}

.actionsList {
  display: flex;
  align-items: center;
  gap: 4px;
}

button {
  position: relative;
  width: content;
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
  cursor: pointer;
  gap: 8px;
}

button:hover {
  transition: all ease 0.4s;
  background: var(--dark);
}

button:active {
  transform: scale(0.9);
}

.pending::after {
  content: attr(data-pending);
  font-size: 12px;
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: brown;
  border-radius: 2px;
  width: 15px;
  height: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.added::after {
  content: attr(data-added);
  font-size: 12px;
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: var(--success);
  border-radius: 2px;
  width: 15px;
  height: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.reject::after {
  content: attr(data-reject);
  font-size: 12px;
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: var(--danger);
  border-radius: 2px;
  width: 15px;
  height: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: var(--primary) !important;
  color: var(--dark) !important;
}

.btn-danger {
  background: var(--danger) !important;
  color: var(--white) !important;
}

.btn-success {
  background: var(--success) !important;
  color: var(--white) !important;
}

ul {
  background: var(--dark2);
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  min-height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 4px 12px;
}

li {
  width: 100%;
  min-height: 60px;
  background: var(--dark3);
  padding: 0 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 4px;
  border-right: solid 4px transparent;
  cursor: pointer;
}

.lleft , .lright {
  display: flex;
  align-items: center;
  gap: 12px;
}

li:hover {
  transition: all ease .4s;
  border-right: solid 4px var(--primary);
}

li:active {
  transform: scale(0.9);
}

li img {
  width: 50px;
  height: 50px;

  object-fit: cover;
  border-radius: 4px;
}

li span {
  font-size: 18px;
  user-select: none;
}


</style>
