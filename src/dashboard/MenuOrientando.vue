<template>
    <a href="#" class="nav-link active">
      <i class="nav-icon fas fa-tachometer-alt"></i>
      <p>
        Menu Orientando
        <i class="right fas fa-angle-left"></i>
      </p>
    </a>
    <ul class="nav nav-treeview">
      <li class="nav-item">
        <router-link to="/reunioes" class="nav-link">
          <i class="fa fa-calendar"></i>
            <p class="opcaoMenu">Reuniões</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/trabalhos" class="nav-link">
          <i class="fa fa-book"></i>
            <p class="opcaoMenu">Trabalho</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/tarefas" class="nav-link">
          <i class="fa fa-pen"></i>
            <p class="opcaoMenu">Tarefas</p>
        </router-link>
      </li>
    </ul>
</template>
<script>
export default {
  name: "MenuOrientando",
  components: {
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
