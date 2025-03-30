<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
          <i class="fas fa-bars"></i>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/home" class="nav-link">
          <font-awesome-icon icon="home" /> Home
        </router-link>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Itens do lado direito -->
      <li class="nav-item">
        <ThemeToggle />
      </li>
      <li class="nav-item">
        <ul class="navbar-nav ml-auto">
          <NotificationMenu
            :notifications="notifications"
            @notification-click="handleNotificationClick"
            @see-all="handleSeeAll"
          />
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" /> Sair
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
import NotificationMenu from "../components/basic/NotificationMenu.vue";
import ThemeToggle from "../components/basic/ThemeToggle.vue";

export default {
  components: {
    NotificationMenu,
    ThemeToggle,
  },
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
      window.location.reload(true);
    },
  },
};
</script>

<style></style>
