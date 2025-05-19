<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img
        src="~@/assets/img/AdminLTELogo.png"
        class="logoSideBar"
        alt="AdminLTE Logo"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light"></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="~@/assets/img/avatar6.png" class="img-circle elevation-2" />
        </div>
        <div class="info" id="nomeUsuarioSideBar">
          {{ currentUser.nome }}
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li
            v-if="this.currentUser['roles'].includes('ROLE_ADMIN')"
            class="nav-item menu"
          >
            <MenuAdmin></MenuAdmin>
          </li>
          <li
            v-if="this.currentUser['roles'].includes('ROLE_ORIENTADOR')"
            class="nav-item menu"
          >
            <MenuOrietandor></MenuOrietandor>
          </li>
          <li
            v-if="this.currentUser['roles'].includes('ROLE_ORIENTANDO')"
            class="nav-item menu"
          >
            <MenuAluno></MenuAluno>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<style>
.opcaoMenu {
  padding-left: 13px;
}
</style>
<script>
import MenuOrietandor from "./MenuOrientador.vue";
import MenuAdmin from "./MenuAdmin.vue";
import MenuAluno from "./MenuOrientando.vue";

export default {
  name: "SideBar",
  components: {
    MenuOrietandor,
    MenuAluno,
    MenuAdmin,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_MODERATOR");
      }
      return false;
    },
  },
};
</script>

<style>
#nomeUsuarioSideBar {
  color: white;
}
.logoSideBar {
  height: 50px;
  width: 60%;
  margin-left: 20%;
}
</style>
