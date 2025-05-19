<template>
  <div class="">
    <div class="card-header" v-if="header">
      <h5 class="card-title">{{ header }}</h5>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">
              {{ column.label }}
            </th>
            <th v-if="actions && actions.length > 0">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              {{ row[column.key] }}
            </td>
            <td v-if="actions && actions.length > 0">
              <button
                v-for="(action, actionIndex) in actions"
                :key="actionIndex"
                class="btn btn-sm"
                :class="action.class"
                @click="emitAction(action.handler, row)"
              >
                <i v-if="action.icon" :class="action.icon" class="me-1"></i>
                {{ action.label }}
              </button>
            </td>
          </tr>
          <tr v-if="data.length === 0">
            <td
              :colspan="
                columns.length + (actions && actions.length > 0 ? 1 : 0)
              "
              class="text-center"
            >
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer" v-if="footer">
      <small class="text-muted">{{ footer }}</small>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  header: {
    type: String,
    default: "",
    description: "Texto do cabeçalho do card.",
  },
  columns: {
    type: Array,
    required: true,
    description:
      "Array de objetos definindo as colunas da tabela ({ label: String, key: String }).",
  },
  data: {
    type: Array,
    default: () => [],
    description: "Array de objetos contendo os dados da tabela.",
  },
  actions: {
    type: Array,
    default: () => [],
    description:
      "Array de objetos definindo os botões de ação ({ label: String, class: String, icon: String, handler: String }).",
  },
  emptyText: {
    type: String,
    default: "Nenhum dado encontrado.",
    description: "Texto exibido quando não há dados na tabela.",
  },
  footer: {
    type: String,
    default: "",
    description: "Texto do rodapé do card.",
  },
});

const emit = defineEmits(["action"]);

const emitAction = (handlerName, rowData) => {
  emit("action", { handler: handlerName, data: rowData });
};
</script>

<style scoped>
@import "@/assets/css/calendar-theme.css";
.table-responsive {
  text-align: center !important;
}

.btn {
  margin-left: 1%;
}
.card-footer {
  margin-top: 10%;
}
</style>
