<template>
  <div>
    <h1>Página de Trabalhos</h1>
    <button type="button" class="btn btn-success" @click="abrirModalCadastro">
      Cadastrar Trabalho
    </button>

    <!-- Modal de Cadastro -->
    <ModalComponent
      ref="modalCadastro"
      titulo="Cadastrar Trabalho"
      @confirmar="cadastrarTrabalho"
    >
      <CadastrarTrabalho ref="formularioCadastro" :trabalhoProp="trabalhoDTO" />
    </ModalComponent>
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
import ModalComponent from "../components/basic/ModalComponent.vue";
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

const abrirModalCadastro = () => {
  limparTrabalhoDTO();
  modalCadastro.value.abrirModal();
};

const cadastrarTrabalho = () => {
  formularioCadastro.value.cadastrarTrabalho();
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

const limparTrabalhoDTO = () => {
  trabalhoDTO.value = {
    titulo: "",
    problema: "",
    justificativa: "",
    hipotese: "",
    solucao: "",
    aluno: { codigoUsuario: null },
    orientador: { codigoUsuario: null },
    curso: { codigoCurso: null },
  };
};

// Lifecycle hooks
onMounted(async () => {
  await retornarTrabalhos();
});
</script>
