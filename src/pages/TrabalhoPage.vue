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
      <CadastrarTrabalho ref="formularioCadastro" :trabalhoProp="TrabalhoDTO" />
    </ModalComponent>
  </div>
  <div>
    <ComplexTable
      :headers="headers"
      :tableData="trabalhosDTO"
      :tableName="tableName"
      @editar="handleEditar"
      @excluir="handleExcluir"
    />
  </div>
</template>

<script>
import ModalComponent from "../components/basic/ModalComponent.vue";
import CadastrarTrabalho from "../components/orientador/CadastrarTrabalho.vue";
import ComplexTable from "../components/basic/ComplexTable.vue";
import {
  buscarTrabalho,
  buscarTrabalhos,
} from "@/services/cadastrarTrabalho.js";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "TrabalhoPage",
  components: {
    ModalComponent,
    CadastrarTrabalho,
    ComplexTable,
  },
  data() {
    return {
      tableName: "Trabalhos",
      trabalhosDTO: [],
      TrabalhoDTO: {
        aluno: {
          codigoUsuario: null,
        },
        orientador: {
          codigoUsuario: null,
        },
        curso: {
          codigoCurso: null,
        },
      },
      headers: [
        { text: "Titulo", value: "titulo" },
        { text: "Aluno", value: "aluno.nome" },
        { text: "Orientador", value: "orientador.nome" },
        { text: "Curso", value: "curso.nomeCurso" },
        { text: "Problema", value: "problema" },
        { text: "Justificativa", value: "justificativa" },
        { text: "Hipotese", value: "hipotese" },
        { text: "Solucao", value: "solucao" },
      ],
    };
  },
  mounted() {
    this.retornarTrabalhos();
  },
  methods: {
    handleEditar(codigoTrabalho) {
      this.retornarTrabalho(codigoTrabalho);
      this.$refs.modalCadastro.abrirModal();
    },
    abrirModalCadastro() {
      this.TrabalhoDTO = {};
      this.$refs.modalCadastro.abrirModal();
    },
    cadastrarTrabalho() {
      this.$refs.formularioCadastro.cadastrarTrabalho();
    },
    retornarTrabalhos() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarTrabalhos(
        (response) => {
          if (response) {
            loader.hide();
            this.trabalhosDTO = response.data;
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
    retornarTrabalho(trabalhoDTO) {
      let codigoTrabalho = trabalhoDTO.codigoTrabalho;
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarTrabalho(
        codigoTrabalho,
        (response) => {
          if (response) {
            loader.hide();
            this.TrabalhoDTO = response.data?.records[0];
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
    limparTrabalhoDTO() {
      this.TrabalhoDTO = {
        titulo: "",
        problema: "",
        justificativa: "",
        hipotese: "",
        solucao: "",
        aluno: {
          codigoUsuario: null,
        },
        orientador: {
          codigoUsuario: null,
        },
        curso: {
          codigoCurso: null,
        },
      };
    },
  },
};
</script>
