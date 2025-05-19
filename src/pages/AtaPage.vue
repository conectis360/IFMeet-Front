<template>
  <div>
    <Ata :ata-para-edicao="ataSelecionada" @ata-salva="onAtaSalva" />

    <!-- Tabela de Atas -->
    <ComplexTable
      :headers="headers"
      :table-name="'Atas Cadastradas'"
      :table-data="tableData"
      @editar="editarAtaTabela"
      @excluir="confirmarRemocao"
      @pagina-alterada="carregarAtas"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Ata from "../components/basic/Ata.vue";
import ComplexTable from "../components/basic/ComplexTable.vue";
import { buscarAtas, excluirAta } from "@/services/cadastrarAta.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const ataSelecionada = ref(null);

const headers = [
  { text: "Trabalho", value: "evento.trabalho.titulo" },
  { text: "Reunião", value: "evento.title" },
  { text: "Resumo", value: "resumo" },
  { text: "Data", value: "dataFormatada" },
];

const tableData = ref({
  totalPages: 1,
  totalRecords: 0,
  pageNumber: 1,
  pageSize: 10,
  records: [],
});

const editarAtaTabela = (ata) => {
  ataSelecionada.value = { ...ata };
};

const onAtaSalva = () => {
  ataSelecionada.value = null;
  carregarAtas();
};

const confirmarRemocao = (ata) => {
  if (
    confirm(
      `Deseja realmente remover a ata do trabalho ${ata.reuniao.trabalho.titulo}?`
    )
  ) {
    removerAta(ata.codigoAta);
  }
};

const removerAta = async (id) => {
  try {
    await excluirAta(id);
    toast.success("Ata removida com sucesso!");
    await carregarAtas();
  } catch (error) {
    toast.error("Erro ao remover ata");
  }
};

const carregarAtas = async () => {
  try {
    const response = await buscarAtas(); // Ou buscarAtas() se for geral
    if (response?.data) {
      tableData.value = {
        ...response.data,
        records: response.data.records.map((ata) => ({
          ...ata,
          dataFormatada: formatarData(ata.reuniao?.dataInicio),
        })),
      };
    }
  } catch (error) {
    toast.error("Erro ao carregar atas");
  }
};

const formatarData = (dataString) => {
  if (!dataString) return "";
  const date = new Date(dataString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(async () => {
  await carregarAtas();
});
</script>

<style scoped>
.table-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
