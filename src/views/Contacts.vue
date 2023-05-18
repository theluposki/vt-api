<template>
  <div class="page">
    <div class="nav">
      <div class="nleft">
        <router-link to="/contacts/list" class="nav-link" exact-active-class="active">
           <i class="bx bxs-contact"></i>
        </router-link>

        <router-link to="/contacts/friend-requests" class="nav-link" exact-active-class="active">
          <i class='bx bx-user-check'></i>
        </router-link>
      </div>
      <div class="nright">
        <router-link to="/contacts/add" class="nav-link" exact-active-class="active">
           <i class='bx bx-user-plus' ></i>
        </router-link>
      </div>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<style scoped>
.nav {
  background-color: var(--dark3);
  width: 100%;
  min-height: 60px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;

  padding: 4px 12px;
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


.nav-link:hover {
  transition: all ease 0.4s;
  background-color: var(--dark);
  color: var(--white);
  box-shadow: inset 0 0 6px var(--primary);
}

.nav-link:active {
  transform: scale(0.9);
}
.nav-link.active {
  background-color: var(--primary);
  color: var(--dark3);
  box-shadow: inset 0 0 6px var(--dark3);
}

.nleft, .nright {
  display: flex;
  align-items: center;
  gap: 4px;
}

</style>
