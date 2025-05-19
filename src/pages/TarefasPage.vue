<template>
  <div>
    <Tarefa
      :tarefa-para-edicao="tarefaSelecionada"
      @tarefa-salva="onTarefaSalva"
    ></Tarefa>

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
</template>

<script setup>
import { ref, onMounted } from "vue";
import Tarefa from "../components/basic/Tarefa.vue";
import ComplexTable from "../components/basic/ComplexTable.vue";
import { buscarTarefas, excluirTarefa } from "@/services/cadastrarTarefa.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const tarefaSelecionada = ref(null);

const headers = [
  { text: "Trabalho", value: "trabalho.titulo" },
  { text: "Data Início", value: "dataInicioFormatada" },
  { text: "Descrição", value: "descricao" },
  { text: "Data Fim", value: "dataFimFormatada" },
  { text: "Status", value: "statusFormatado" },
];

const tableData = ref({
  totalPages: 1,
  totalRecords: 0,
  pageNumber: 1,
  pageSize: 10,
  records: [],
});

const editarTarefaTabela = (tarefa) => {
  tarefaSelecionada.value = { ...tarefa };
};

const onTarefaSalva = () => {
  tarefaSelecionada.value = null;
  carregarTarefas();
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
          statusFormatado: tarefa.finalizada ? "✅" : "❌",
        })),
      };
    }
  } catch (error) {
    toast.error("Erro ao carregar tarefas");
  }
};

const formatarData = (dataString) => {
  if (!dataString) return "";
  const date = new Date(dataString);
  return date.toLocaleDateString("pt-BR");
};

onMounted(async () => {
  await carregarTarefas();
});
</script>
