<script setup>

</script>

<template>
  <div class="panel-menu">
    <router-link to="/" class="nav-link" exact-active-class="active">
      <i class="bx bxs-home"></i>
    </router-link>

    <router-link to="/about" class="nav-link" exact-active-class="active">
      <i class="bx bxs-contact"></i>
    </router-link>

    <a href="" @click="signOut" class="nav-link out">
      <i class="bx bx-log-out-circle"></i>
    </a>
  </div>
</template>

<style scoped>
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

.nav-link {
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

.nav-link.active {
  background-color: var(--primary);
  color: var(--dark3);
  box-shadow: inset 0 0 6px var(--dark3);
}

.nav-link:hover {
  transition: all ease 0.4s;
  background-color: var(--dark);
  box-shadow: inset 0 0 6px var(--primary);
}

.nav-link:active {
  transform: scale(0.9);
}

.out {
  position: absolute;
  bottom: 4px;
}
</style>
