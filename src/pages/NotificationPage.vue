<template>
  <div>
    <ComplexTable
      :headers="headers"
      :table-name="'Notificações'"
      :table-data="tableData"
      @editar="editarDisponibilidadeTabela"
      @excluir="confirmarRemocao"
      @pagina-alterada="carregarDados"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ComplexTable from "../components/basic/ComplexTable.vue";
import { buscarTodasNotificacoes } from "../services/notificacoes";
import { useToast } from "vue-toastification";
import { useLoading } from "vue-loading-overlay";

const toast = useToast();
const loadingInstance = useLoading();

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

// Computed properties
const headers = computed(() => [
  { text: "ID", value: "id" },
  { text: "Tipo", value: "tipo" },
  { text: "Mensagem", value: "mensagem" },
  { text: "Data", value: "data" },
  { text: "Ações", value: "actions", sortable: false },
]);

// Methods
const carregarDados = async (pagina) => {
  page.value.pageNumber = pagina;
  const loader = loadingInstance.show();

  try {
    const response = await buscarTodasNotificacoes(page.value);
    if (response?.data) {
      tableData.value = {
        totalPages: response.data.totalPages,
        totalRecords: response.data.totalRecords,
        pageNumber: response.data.pageNumber,
        pageSize: response.data.pageSize,
        records: response.data.records,
      };
    }
  } catch (error) {
    toast.error(error.message || "Erro ao carregar notificações");
  } finally {
    loader.hide();
  }
};

// Lifecycle hook
onMounted(() => {
  carregarDados(1);
});
</script>
