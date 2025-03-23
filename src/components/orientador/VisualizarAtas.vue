<template>
  <h1>Visualizar Atas</h1>
  <div>
    <ComplexTable
      :headers="headers"
      :tableData="atasDTO"
      :tableName="tableName"
      @editar="handleEditar"
      @excluir="handleExcluir"
    />
  </div>
</template>

<script>
import { buscarAtasPorTrabalho } from "@/services/cadastrarAta.js";
import ComplexTable from "../basic/ComplexTable.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  name: "VisualizarAtas",
  components: {
    ComplexTable,
  },
  data() {
    return {
      content: "",
      AtaDTO: {
        trabalho: {
          codigoTrabalho: null,
        },
      },
      tableName: "Atas do trabalho",
      atasDTO: {},
      headers: [
        { text: "Data da reunião", value: "reuniao.data" },
        { text: "Resumo", value: "resumo" },
      ],
    };
  },
  mounted() {
    this.retornarAtas();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    retornarAtas() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarAtasPorTrabalho(
        2,
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
  },
};
</script>
