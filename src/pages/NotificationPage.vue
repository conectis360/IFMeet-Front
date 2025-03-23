<template>
  <div>
    <NotificationTable
      :tableData="tableData"
      @pagina-alterada="carregarDados"
    />
  </div>
</template>

<script>
import NotificationTable from "../components/basic/NotificationTable.vue";
import { buscarTodasNotificacoes } from "../services/notificacoes";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  components: {
    NotificationTable,
  },
  mounted() {
    this.carregarDados(1); // Carrega os dados pela primeira vez
  },
  data() {
    return {
      tableData: {
        totalPages: 1,
        totalRecords: 0,
        pageNumber: 1,
        pageSize: 10,
        records: [],
      },
      page: {
        pageSize: 10,
        pageNumber: 1,
      },
    };
  },
  methods: {
    carregarDados(pagina) {
      this.page.pageNumber = pagina;
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarTodasNotificacoes(
        this.page,
        (response) => {
          if (response) {
            loader.hide();
            this.tableData = {};
            this.tableData = {
              totalPages: response.data.totalPages,
              totalRecords: response.data.totalRecords,
              pageNumber: response.data.pageNumber,
              pageSize: response.data.pageSize,
              records: response.data.records,
            };
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
