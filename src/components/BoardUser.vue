<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
      <Relogio :inline="true"></Relogio>
      <div>
        <InfoBox
          icon="fas fa-users"
          title="Usuários"
          subtitle="1,250"
          background="info"
        />

        <InfoBox
          icon="fas fa-check-circle"
          title="Tarefas Concluídas"
          subtitle="250"
          background="success"
        >
        </InfoBox>

        <InfoBox title="Avisos" subtitle="3" background="warning">
          <template #icon-content>
            <span style="font-size: 24px; color: white">!</span>
          </template>
        </InfoBox>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserService from "../services/user.service";
import InfoBox from "./basic/InfoBox.vue";
import Relogio from "./basic/Relogio.vue";

const content = ref("");

onMounted(() => {
  UserService.getUserBoard()
    .then((response) => {
      content.value = response.data;
    })
    .catch((error) => {
      content.value =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    });
});
</script>

<style scoped>
/* Estilos específicos para este componente (opcional) */
.container {
  margin-top: 20px;
}

.jumbotron {
  padding: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
}

h3 {
  color: #333;
  margin-bottom: 1rem;
}

.jumbotron > div {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Espaçamento entre os InfoBox */
}

/* Estilos para telas menores (opcional) */
@media (max-width: 768px) {
  .jumbotron > div {
    flex-direction: column; /* Empilha os InfoBox em telas menores */
  }
}
</style>
