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
                  <router-link to="/home" class="nav-link">
                    <li class="breadcrumb-item"><a href="#">Página Inicial</a></li>
                  </router-link>                  
                  <li class="breadcrumb-item active">{{ currentRouteName }}</li>
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
data: function() {
    return {
      currentUrl: "",
    };
},
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
}
}
</script>

<style>

</style>