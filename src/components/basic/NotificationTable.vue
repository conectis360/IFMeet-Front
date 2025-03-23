<template>
  <div class="card">
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Autor</th>
            <th>Conteúdo</th>
            <th>Data</th>
            <th>Visualizado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(notification, index) in paginatedRecords"
            :key="index"
            :class="{ 'registro-visualizado': notification.visualizada }"
          >
            <td>{{ notification.tipoNotificacao }}</td>
            <td>
              <div class="user-info">
                <img
                  class="img-circle img-sm"
                  :src="formatarFoto(notification.fotoUsuario)"
                />
                <span class="username">{{ notification.nomeUsuario }}</span>
              </div>
            </td>
            <td>{{ notification.conteudoNotificacao }}</td>
            <td>{{ formatarData(notification.dataNotificacao) }}</td>
            <td>{{ notification.visualizada ? "SIM" : "NÃO" }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Controles de Paginação -->
      <div class="pagination-controls">
        <button
          :disabled="tableData.pageNumber === 1"
          @click="irParaPagina(tableData.pageNumber - 1)"
        >
          Anterior
        </button>
        <span>
          Página {{ tableData.pageNumber }} de {{ tableData.totalPages }}
        </span>
        <button
          :disabled="tableData.pageNumber === tableData.totalPages"
          @click="irParaPagina(tableData.pageNumber + 1)"
        >
          Próxima
        </button>
        <h5>{{ "Registros: " + tableData.totalRecords }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../../helpers/data";

export default {
  name: "NotificationTable",
  mixins: [data],
  props: {
    tableData: {
      type: Object,
      required: true,
      default: () => ({
        totalPages: 1,
        totalRecords: 0,
        pageNumber: 1,
        pageSize: 10,
        records: [],
      }),
    },
  },
  computed: {
    // Retorna os registros da página atual
    paginatedRecords() {
      return this.tableData.records;
    },
  },
  methods: {
    formatarData(data) {
      return this.formatarDataHelper(data);
    },
    formatarFoto(byteArray) {
      return `data:image/jpeg;base64,${byteArray}`;
    },
    // Navega para uma página específica
    irParaPagina(pagina) {
      if (pagina >= 1 && pagina <= this.tableData.totalPages) {
        this.$emit("pagina-alterada", pagina); // Emite um evento para o componente pai
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.card {
  margin: 20px;
}
.user-info {
  display: flex;
  align-items: center;
}
.img-circle.img-sm {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.username {
  font-weight: bold;
}
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination-controls button {
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  cursor: pointer;
}
.pagination-controls button:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

/* Estilo para registros visualizados */
.registro-visualizado {
  background-color: #f0f0f0; /* Cor de fundo cinza */
  opacity: 0.8; /* Opacidade reduzida */
}

th,
td {
  text-align: center;
}
</style>
