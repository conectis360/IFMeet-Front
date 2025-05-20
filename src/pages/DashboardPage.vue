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
      <InfoBox title="Trabalhos" subtitle="1" background="info" class="h-100">
        <template #icon-content>
          <span style="font-size: 36px; color: white">📚</span>
        </template>
      </InfoBox>
      <InfoBox title="Reuniões" subtitle="5" background="success" class="h-100"
        ><template #icon-content>
          <span style="font-size: 36px; color: white">🤝🏼</span>
        </template>
      </InfoBox>
      <InfoBox title="Atas" subtitle="4" background="warning" class="h-100">
        <template #icon-content>
          <span style="font-size: 36px; color: white">📑</span>
        </template>
      </InfoBox>
      <InfoBox title="Tarefas" subtitle="3" background="" class="h-100">
        <template #icon-content>
          <span style="font-size: 36px; color: white">✍️</span>
        </template>
      </InfoBox>
    </div>

    <!-- Table Section -->
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <TableWidget
            header="Reuniões Pendentes"
            :columns="reunioesColunas"
            :data="reunioesData"
            :actions="reunoesAcoes"
            emptyText="Nenhuma reunião encontrada."
            footer="Apenas para aceitação/recusa rápida"
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
import InfoBox from "../components/basic/InfoBox.vue";
import Relogio from "../components/basic/Relogio.vue";
import TableWidget from "../components/basic/TableWidget.vue";
import { buscarReunioesView } from "../services/calendarService";
import { useToast } from "vue-toastification";

const toast = useToast();

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
const reunioesColunas = ref([
  { label: "Titulo", key: "titulo" },
  { label: "Trabalho", key: "trabalhoTitulo" },
  { label: "Data Sugerida", key: "dataInicial" },
  { label: "Orientando", key: "nomeAluno" },
]);

const reunioesData = ref([]);

const reunoesAcoes = ref([
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

// Methods
const carregarReunioesPendentes = async () => {
  try {
    const response = await buscarReunioesView();
    if (response?.data) {
      reunioesData.value = {
        ...response.data.records.map((tarefa) => ({
          ...tarefa,
          dataInicial: formatarData(tarefa.dataInicial),
        })),
      };
    }
    console.log(reunioesData);
  } catch (error) {
    toast.error("Erro ao carregar tarefas");
  }
};

const formatarData = (dataString) => {
  if (!dataString) return "";

  const date = new Date(dataString);

  const dia = date.getDate().toString().padStart(2, "0");
  const mes = date.toLocaleString("pt-BR", { month: "long" });
  const hora = date.getHours().toString().padStart(2, "0");
  const minuto = date.getMinutes().toString().padStart(2, "0");

  return `${dia} de ${mes} às ${hora}:${minuto}`;
};

// Lifecycle hook
onMounted(() => {
  carregarReunioesPendentes();
});
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
