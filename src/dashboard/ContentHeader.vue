<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">{{ currentRouteName }}</h1>
        </div>
        <!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <!-- Página Inicial -->
            <router-link to="/home" class="breadcrumb-item" tag="li">
              <i class="fas fa-home"></i> Página Inicial
            </router-link>

            <!-- Rota Atual -->
            <li class="breadcrumb-item active">
              <i class="fas fa-chevron-right"></i> {{ currentRouteName }}
            </li>
          </ol>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->
</template>

<script>
export default {
  data: function () {
    return {
      currentUrl: "",
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style></style>
