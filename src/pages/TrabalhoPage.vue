<template>
  <div>
    <CadastrarTrabalho ref="formularioCadastro" :trabalhoProp="trabalhoDTO" />
  </div>
  <div v-if="trabalhos">
    <ComplexTable
      :headers="headers"
      :table-name="tableName"
      :tableData="trabalhos"
      @editar="handleEditar"
      @excluir="handleExcluir"
      @pagina-alterada="handlePaginaAlterada"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import CadastrarTrabalho from "../components/orientador/CadastrarTrabalho.vue";
import ComplexTable from "../components/basic/ComplexTable.vue";
import { buscarTrabalhos } from "@/services/cadastrarTrabalho.js";

const toast = useToast();

// Refs
const modalCadastro = ref(null);
const formularioCadastro = ref(null);
const tableName = ref("Trabalhos");
const trabalhos = ref(null); // Inicializa como array vazio
const trabalhoDTO = ref({
  aluno: { codigoUsuario: null },
  orientador: { codigoUsuario: null },
  curso: { codigoCurso: null },
});

// Objeto reativo para os dados da tabela

const headers = ref([
  { text: "Titulo", value: "titulo" },
  { text: "Aluno", value: "aluno.nome" },
  { text: "Orientador", value: "orientador.nome" },
  { text: "Curso", value: "curso.nomeCurso" },
  { text: "Problema", value: "problema" },
  { text: "Justificativa", value: "justificativa" },
  { text: "Hipotese", value: "hipotese" },
  { text: "Solucao", value: "solucao" },
]);

// Métodos
const handleEditar = (trabalho) => {
  trabalhoDTO.value = { ...trabalho };
  modalCadastro.value.abrirModal();
};

const handlePaginaAlterada = (page) => {
  // Lógica para mudar de página se necessário
  console.log("Página alterada:", page);
};

const retornarTrabalhos = async () => {
  try {
    const response = await buscarTrabalhos();
    if (response?.data) {
      console.log(response.data);
      trabalhos.value = response.data;
    }
  } catch (error) {
    toast.error(error.message || "Erro ao buscar trabalhos");
    trabalhos.value = []; // Garante que tenha um array vazio em caso de erro
  }
};

// Lifecycle hooks
onMounted(async () => {
  await retornarTrabalhos();
});
</script>
