<template>
    <a href="#" class="nav-link active">
      <i class="nav-icon fas fa-tachometer-alt"></i>
      <p>
        Menu Orientador
        <i class="right fas fa-angle-left"></i>
      </p>
    </a>
    <ul class="nav nav-treeview">
      <li class="nav-item">
        <registrar-usuario/>
      </li>
      <li class="nav-item">
        <router-link to="/reunioes" class="nav-link">
          <i class="fa fa-calendar"></i>
            <p class="opcaoMenu">Reuniões</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/trabalhos" class="nav-link">
          <i class="fa fa-book"></i>
            <p class="opcaoMenu">Trabalhos</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/tarefas" class="nav-link">
          <i class="fa fa-pen"></i>
            <p class="opcaoMenu">Tarefas</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cadastrarTrabalho" class="nav-link">
          <i class="fa fa-book"></i>
            <p class="opcaoMenu">Cadastrar Trabalho</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cadastrarTarefa" class="nav-link">
          <i class="fa fa-book"></i>
            <p class="opcaoMenu">Cadastrar Tarefa</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cadastrarAta" class="nav-link">
          <i class="fa fa-book"></i>
            <p class="opcaoMenu">Cadastrar Ata</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cadastrarDocumentacao" class="nav-link">
          <i class="fa fa-book"></i>
            <p class="opcaoMenu">Cadastrar Documentação</p>
        </router-link>
      </li>
    </ul>
</template>
<script>
import RegistrarUsuario from "@/components/RegistrarUsuario";
export default {
  name: "MenuOrientador",
  components: {
    RegistrarUsuario
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
