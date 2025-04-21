<template>
  <div>
    <h1>Visualizar Tarefas</h1>
    <ComplexTable
      :headers="headers"
      :table-data="tableData"
      table-name="Tarefas"
      @editar="handleEditar"
    >
      <template #column0="{ entity }">
        {{ entity.trabalho.aluno.nome }}
      </template>
      <template #column1="{ entity }">
        {{ entity.trabalho.orientador.nome }}
      </template>
      <template #column2="{ entity }">
        {{ entity.trabalho.titulo }}
      </template>
      <template #column3="{ entity }">
        {{ formatDate(entity.dataInicio) }}
      </template>
      <template #column4="{ entity }">
        {{ formatDate(entity.dataFim) }}
      </template>
      <template #column5="{ entity }">
        {{ entity.finalizada ? "SIM" : "NÃO" }}
      </template>
      <template #column6="{ entity }">
        <AtualizarTarefa
          v-if="!entity.finalizada"
          :tarefa-id="entity.codigoTarefa"
          @atualizado="retornarTarefas"
        />
      </template>
    </ComplexTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import { buscarReunioesPorOrientador } from "@/services/cadastrarTarefa.js";
import ComplexTable from "@/components/basic/ComplexTable.vue";
import AtualizarTarefa from "./AtualizarTarefa.vue";

const toast = useToast();
const tarefas = ref([]);

const headers = ref([
  { text: "Aluno", value: "aluno.nome" },
  { text: "Orientador", value: "orientador.nome" },
  { text: "Trabalho", value: "trabalho.titulo" },
  { text: "Data Inicio", value: "dataInicio" },
  { text: "Data Fim", value: "dataFim" },
  { text: "Finalizada", value: "finalizada" },
  { text: "Ações", value: "acoes" },
]);

const tableData = computed(() => ({
  records: tarefas.value,
  totalRecords: tarefas.value.length,
  pageNumber: 1,
  pageSize: 10,
  totalPages: Math.ceil(tarefas.value.length / 10),
}));

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

onMounted(async () => {
  await retornarTarefas();
});

const retornarTarefas = async () => {
  try {
    const response = await buscarReunioesPorOrientador(2); // Substituir pelo ID do usuário logado
    if (response?.data) {
      tarefas.value = response.data.records || [];
    }
  } catch (error) {
    toast.error(error.message || "Erro ao buscar tarefas");
  }
};

const handleEditar = () => {
  // Lógica para edição se necessário
};
</script>
