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

      <div class="">
        <TableWidget
          header="Lista de Usuários"
          :columns="userColumns"
          :data="userData"
          :actions="userActions"
          emptyText="Nenhum usuário cadastrado."
          footer="Última atualização: ontem"
          @action="handleUserAction"
        />
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserService from "../services/user.service";
import InfoBox from "./basic/InfoBox.vue";
import Relogio from "./basic/Relogio.vue";
import TableWidget from "./basic/TableWidget.vue";

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

const userColumns = ref([
  { label: "ID", key: "id" },
  { label: "Nome", key: "name" },
  { label: "Email", key: "email" },
]);

const userData = ref([
  { id: 1, name: "João Silva", email: "joao.silva@email.com" },
  { id: 2, name: "Maria Souza", email: "maria.souza@email.com" },
]);

const userActions = ref([
  {
    label: "Editar",
    class: "btn-primary",
    icon: "fas fa-edit",
    handler: "editUser",
  },
  {
    label: "Excluir",
    class: "btn-danger",
    icon: "fas fa-trash",
    handler: "deleteUser",
  },
]);

const handleUserAction = (actionInfo) => {
  console.log("Ação de Usuário:", actionInfo.handler, actionInfo.data);
  // Implemente a lógica para editar ou excluir o usuário com base no actionInfo
  if (actionInfo.handler === "editUser") {
    // Lógica de edição
  } else if (actionInfo.handler === "deleteUser") {
    // Lógica de exclusão
  }
};
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
