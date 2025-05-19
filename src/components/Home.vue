<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Seja bem-vindo <strong>{{ currentUser.nome }}</strong>
      </h3>
      <p>{{ content }}</p>
    </header>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import UserService from "../services/user.service";

const store = useStore();
const content = ref("");

const currentUser = computed(() => {
  return store.state.auth.user;
});

onMounted(() => {
  UserService.getPublicContent().then(
    (response) => {
      content.value = response.data;
    },
    (error) => {
      content.value =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  );
});
</script>

<!-- Opcional: manter se precisar de configurações específicas do componente -->
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeComponent",
});
</script>

<style scoped>
/* Estilos permanecem os mesmos */
.jumbotron {
  padding: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
  margin-top: 20px;
}
</style>
