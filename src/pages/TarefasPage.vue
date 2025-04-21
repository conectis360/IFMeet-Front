<template>
  <div class="tarefas-container">
    <div class="row mb-4">
      <div class="col-md-6">
        <h1>Tarefas</h1>
      </div>
      <div>
        <Tarefa></Tarefa>
        <!-- Tabela de Tarefas -->
        <div class="table-container mt-3">
          <ComplexTable
            :headers="headers"
            :table-name="'Tarefas Cadastradas'"
            :table-data="tableData"
            @editar="editarTarefaTabela"
            @excluir="confirmarRemocao"
            @pagina-alterada="carregarTarefas"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Tarefa from "../components/basic/Tarefa.vue";
import ComplexTable from "../components/basic/ComplexTable.vue";
import {
  buscarTarefas,
  buscarTarefa,
  excluirTarefa,
} from "@/services/cadastrarTarefa.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const headers = [
  { text: "Trabalho", value: "trabalho.titulo" },
  { text: "Data Início", value: "dataInicioFormatada" },
  { text: "Data Fim", value: "dataFimFormatada" },
  { text: "Status", value: "statusFormatado" },
];

const editando = ref(false);

const tarefaDTO = ref({
  trabalho: {
    codigoTrabalho: null,
  },
  dataInicio: null,
  dataFim: null,
  descricao: null,
  finalizada: false,
});

const tableData = ref({
  totalPages: 1,
  totalRecords: 0,
  pageNumber: 1,
  pageSize: 10,
  records: [],
});

const editarTarefaTabela = async (tarefa) => {
  try {
    const response = await buscarTarefa(tarefa.codigoTarefa);
    if (response?.data) {
      tarefaDTO.value = {
        ...response.data,
        id: tarefa.codigoTarefa,
      };
      editando.value = true;
    }
  } catch (error) {
    toast.error("Erro ao carregar tarefa para edição");
  }
};

const confirmarRemocao = (tarefa) => {
  if (
    confirm(
      `Deseja realmente remover a tarefa do trabalho ${tarefa.trabalho.titulo}?`
    )
  ) {
    removerTarefa(tarefa.codigoTarefa);
  }
};

const removerTarefa = async (id) => {
  try {
    await excluirTarefa(id);
    toast.success("Tarefa removida com sucesso!");
    await carregarTarefas();
  } catch (error) {
    toast.error("Erro ao remover tarefa");
  }
};

// Carrega as tarefas
const carregarTarefas = async () => {
  try {
    const response = await buscarTarefas();
    if (response?.data) {
      tableData.value = {
        ...response.data,
        records: response.data.records.map((tarefa) => ({
          ...tarefa,
          dataInicioFormatada: formatarData(tarefa.dataInicio),
          dataFimFormatada: formatarData(tarefa.dataFim),
          statusFormatado: tarefa.finalizada ? "Finalizada" : "Pendente",
        })),
      };
    }
  } catch (error) {
    toast.error("Erro ao carregar tarefas");
  }
};

// Formata data para exibição
const formatarData = (dataString) => {
  if (!dataString) return "";
  const date = new Date(dataString);
  return date.toLocaleDateString("pt-BR");
};
</script>

<style scoped>
.tarefas-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
