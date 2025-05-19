<template>
  <div class="container-fluid py-4 bg">
    <!-- Header Section -->
    <div class="row mb-4">
      <div class="col-12">
        <div
          class="d-flex justify-content-between align-items-center bg-light p-4 rounded-3"
        >
          <h3 class="mb-0">SEJA BEM-VINDO {{ currentUser.nome }}</h3>
          <Relogio :inline="true" class="fs-5"></Relogio>
        </div>
      </div>
    </div>

    <!-- Info Boxes -->
    <div class="row mb-4 g-3 info-box">
      <InfoBox
        icon="fas fa-users"
        title="Usuários"
        subtitle="1,250"
        background="info"
        class="h-100"
      />
      <InfoBox
        icon="fas fa-check-circle"
        title="Tarefas Concluídas"
        subtitle="250"
        background="success"
        class="h-100"
      />
      <InfoBox title="Avisos" subtitle="3" background="warning" class="h-100">
        <template #icon-content>
          <span style="font-size: 24px; color: white">!</span>
        </template>
      </InfoBox>
      <InfoBox title="Avisos" subtitle="3" background="warning" class="h-100">
        <template #icon-content>
          <span style="font-size: 24px; color: white">!</span>
        </template>
      </InfoBox>
    </div>

    <!-- Table Section -->
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
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

const store = useStore();
const currentUser = computed(() => {
  return store.state.auth.user;
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
    label: "Aceitar",
    class: "btn-aceitar",
    icon: "",
    handler: "aceitar",
  },
  {
    label: "Recusar",
    class: "btn-recusar",
    icon: "",
    handler: "recusar",
  },
]);

const handleUserAction = (actionInfo) => {
  if (actionInfo.handler === "aceitar") {
    console.log("aceitar");
  } else if (actionInfo.handler === "recusar") {
    console.log("recusar");
  }
};
</script>

<style scoped>
/* Estilos opcionais para ajustes finos */

.card {
  border: none;
}

.table-responsive {
  overflow-x: auto;
}

/* Ajuste de altura máxima para a tabela */
.card-body {
  max-height: 500px;
  overflow-y: auto;
}

/* Espaçamento para telas grandes */
@media (min-width: 1200px) {
  .container-fluid {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.bg {
  background-color: #d1edb7;
}

.info-box {
  text-align: center;
}
</style>
