<template>
  <a href="#" class="menu-item nav-link active">
    <p>
      👨‍🏫 Menu Orientador
      <i class="right fas fa-angle-left"></i>
    </p>
  </a>
  <ul class="nav nav-treeview">
    <li class="nav-item">
      <registrar-usuario />
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'Reunioes' }" class="nav-link">
        <i class="fa fa-calendar"></i>
        <p class="opcaoMenu">Reuniões</p>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'Trabalhos' }" class="nav-link">
        <i class="fa fa-book"></i>
        <p class="opcaoMenu">Trabalhos</p>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'Tarefas' }" class="nav-link">
        <i class="fa fa-pen"></i>
        <p class="opcaoMenu">Tarefas</p>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'Atas' }" class="nav-link">
        <i class="fa fa-pen"></i>
        <p class="opcaoMenu">Atas</p>
      </router-link>
    </li>
  </ul>
</template>
<script>
import RegistrarUsuario from "@/components/RegistrarUsuario";
export default {
  name: "MenuOrientador",
  components: {
    RegistrarUsuario,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
