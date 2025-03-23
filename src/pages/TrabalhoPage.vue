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
      <CadastrarTrabalho ref="formularioCadastro" />
    </ModalComponent>
  </div>
</template>

<script>
import ModalComponent from "../components/basic/ModalComponent.vue"; // Importe o modal
import CadastrarTrabalho from "../components/orientador/CadastrarTrabalho.vue";

export default {
  name: "TrabalhoPage",
  components: {
    ModalComponent,
    CadastrarTrabalho,
  },
  data() {
    return {
      novoTrabalho: {
        nome: "",
        codigo: "",
      },
    };
  },
  methods: {
    abrirModalCadastro() {
      this.$refs.modalCadastro.abrirModal(); // Abre o modal
    },
    cadastrarTrabalho() {
      // Acessa o componente CadastrarTrabalho e chama a função de cadastro
      this.$refs.formularioCadastro.cadastrarTrabalho();
    },
  },
};
</script>
