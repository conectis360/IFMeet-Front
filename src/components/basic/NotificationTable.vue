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
              <!--<div class="user-info">
                <img
                  class="img-circle img-sm"
                  :src="formatarFoto(notification.fotoUsuario)"
                  :alt="notification.nomeUsuario"
                /></div>-->
              <span class="username">{{ notification.nomeUsuario }}</span>
            </td>
            <td>{{ notification.conteudoNotificacao }}</td>
            <td>{{ formatarData(notification.dataNotificacao) }}</td>
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

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import dataHelpers from "../../helpers/data"; // Importa o objeto default

const props = defineProps({
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
});

const emit = defineEmits(["pagina-alterada"]);

// Computed
const paginatedRecords = computed(() => props.tableData.records);

// Métodos
const formatarData = (data) => {
  return dataHelpers.methods.formatarDataHelper(data);
};

// eslint-disable-next-line no-unused-vars
const formatarFoto = (byteArray) => {
  return byteArray ? `data:image/jpeg;base64,${byteArray}` : "";
};

const irParaPagina = (pagina) => {
  if (pagina >= 1 && pagina <= props.tableData.totalPages) {
    emit("pagina-alterada", pagina);
  }
};
</script>

<style scoped>
/* Seus estilos permanecem os mesmos */
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

.registro-visualizado {
  background-color: #f0f0f0;
  opacity: 0.8;
}

th,
td {
  text-align: center;
}
</style>
