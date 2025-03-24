<template>
  <div>
    <h1>Página de Atas</h1>
    <button type="button" class="btn btn-success" @click="abrirModalCadastro">
      Cadastrar Ata
    </button>

    <!-- Modal de Cadastro -->
    <ModalComponent
      ref="modalCadastro"
      titulo="Cadastrar Ata"
      @confirmar="cadastrarAta"
    >
      <CadastrarAta ref="formularioCadastro" :ataProp="AtaDTO" />
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
import CadastrarAta from "../components/orientador/CadastrarAta.vue";
import ComplexTable from "../components/basic/ComplexTable.vue";
import { buscarAta, buscarAtasPorTrabalho } from "@/services/cadastrarAta.js";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "TrabalhoPage",
  components: {
    ModalComponent,
    CadastrarAta,
    ComplexTable,
  },
  data() {
    return {
      tableName: "Atas",
      atasDTO: [],
      AtaDTO: {},
      headers: [
        { text: "Titulo", value: "titulo" },
        { text: "Aluno", value: "aluno.nome" },
      ],
    };
  },
  mounted() {
    //this.retornarAtas();
  },
  methods: {
    handleEditar(codigoAta) {
      this.retornarTrabalho(codigoAta);
      this.$refs.modalCadastro.abrirModal();
    },
    abrirModalCadastro() {
      this.AtaDTO = {};
      this.$refs.modalCadastro.abrirModal();
    },
    cadastrarAta() {
      this.$refs.formularioCadastro.cadastrarAta();
    },
    retornarAtas() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarAtasPorTrabalho(
        (response) => {
          if (response) {
            loader.hide();
            this.atasDTO = response.data;
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
    retornarAta(ataDTO) {
      let codigoAta = ataDTO.codigoAta;
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarAta(
        codigoAta,
        (response) => {
          if (response) {
            loader.hide();
            this.AtaDTO = response.data?.records[0];
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
    limparAtaDTO() {
      this.AtaDTO = {};
    },
  },
};
</script>
