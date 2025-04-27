<template>
  <div>
    <NotificationTable
      :tableData="tableData"
      @pagina-alterada="carregarDados"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NotificationTable from "../components/basic/NotificationTable.vue";
import { buscarTodasNotificacoes } from "../services/notificacoes";
import { useToast } from "vue-toastification";

const toast = useToast();

// Reactive state
const tableData = ref({
  totalPages: 1,
  totalRecords: 0,
  pageNumber: 1,
  pageSize: 10,
  records: [],
});

const page = ref({
  pageSize: 10,
  pageNumber: 1,
});

// Methods
const carregarDados = async (pagina) => {
  try {
    page.value.pageNumber = pagina;
    const response = await buscarTodasNotificacoes(page.value);

    // Update table data
    tableData.value = {
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      pageNumber: response.pageNumber,
      pageSize: response.pageSize,
      records: response.records,
    };
  } catch (error) {
    toast.error(error.message || "Erro ao carregar notificações");
  }
};

// Lifecycle hook
onMounted(() => {
  carregarDados(1); // Carrega os dados pela primeira vez
});
</script>
