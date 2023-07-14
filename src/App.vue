<template>
  <html>
    <body class="hold-transition sidebar-mini layout-fixed">
      <div v-if="currentUser">
        <div class="wrapper">
          <Preloader v-if="carregou = false"></Preloader>
          <Navbar></Navbar>
          <Sidebar></Sidebar>

          <div class="content-wrapper">
            <ContentHeader></ContentHeader>

            <section class="content">
              <div class="container-fluid">
                <div class="container">
                  <router-view />
                </div>
              </div>
            </section>
          </div>

          <Footer></Footer>
          <ControlSidebar></ControlSidebar>
        </div>
      </div>

      <div v-else>
        <router-view />
      </div>
    </body>
  </html>
</template>

<script>
import $ from "jquery";
import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "../node_modules/admin-lte/plugins/select2/css/select2.min.css";
import Preloader from "./dashboard/Preloader.vue";
import ContentHeader from "./dashboard/ContentHeader.vue";
import Navbar from "./dashboard/Navbar.vue";
import Sidebar from "./dashboard/Sidebar.vue";
import Footer from "./dashboard/Footer.vue";
import ControlSidebar from "./dashboard/ControlSidebar.vue";

export default {
  name: "App",
  components: {
    Preloader,
    ContentHeader,
    Navbar,
    Sidebar,
    Footer,
    ControlSidebar,
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
  data() {
        return {
            carregou: false,
            loading: false,
        };
  },
  methods: {
    initializeSelect2() {
      //Initialize Select2 Elements
      $(".select2").select2();

      //Initialize Select2 Elements
      $(".select2bs4").select2({
        theme: "bootstrap4",
      });
    },
    carregouPagina() {
      this.carregou = true
    },
  },
  mounted() {
    this.initializeSelect2();
    this.carregouPagina();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
html body {
  background-color: #f4f6f9;
}
</style>
