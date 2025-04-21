<template>
  <div class="complex-table">
    <div class="card shadow-sm">
      <!-- Cabeçalho com pesquisa -->
      <div
        class="card-header d-flex align-items-center justify-content-between py-3"
      >
        <h3 class="card-title m-0 text-truncate">
          <i class="fas fa-table mr-2"></i>{{ tableName }}
        </h3>
        <div class="card-tools" style="min-width: 200px">
          <div class="input-group input-group-sm">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control form-control-sm border-right-0"
              placeholder="Pesquisar..."
              @input="handleSearch"
            />
            <div class="input-group-append">
              <span class="input-group-text bg-transparent">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Corpo da tabela -->
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="text-center">
              <tr>
                <th
                  v-for="(header, index) in headers"
                  :key="index"
                  class="align-middle"
                >
                  {{ header.text }}
                </th>
                <th class="align-middle" style="width: 120px">Ações</th>
              </tr>
            </thead>

            <tbody class="text-center">
              <tr v-for="(item, index) in paginatedRecords" :key="index">
                <td
                  v-for="(header, headerIndex) in headers"
                  :key="headerIndex"
                  class="align-middle"
                >
                  {{ getNestedValue(item, header.value) }}
                </td>
                <td class="align-middle">
                  <div class="btn-group btn-group-sm" role="group">
                    <button
                      class="btn btn-action btn-edit"
                      @click="editarItem(item)"
                      title="Editar"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-action btn-delete"
                      @click="excluirItem(item)"
                      title="Excluir"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedRecords.length === 0">
                <td :colspan="headers.length + 1" class="text-center py-4">
                  Nenhum registro encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Rodapé com paginação -->
      <div
        class="card-footer d-flex flex-column flex-md-row align-items-center justify-content-between py-2"
      >
        <div class="text-muted small mb-2 mb-md-0">
          Mostrando <strong>{{ showingStart }} a {{ showingEnd }}</strong> de
          <strong>{{ tableData.totalRecords }}</strong> registros
        </div>

        <ul class="pagination pagination-sm m-0">
          <li
            class="page-item"
            :class="{ disabled: tableData.pageNumber === 1 }"
          >
            <button
              class="page-link"
              @click="goToPage(1)"
              title="Primeira página"
            >
              <i class="fas fa-angle-double-left"></i>
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: tableData.pageNumber === 1 }"
          >
            <button
              class="page-link"
              @click="previousPage"
              title="Página anterior"
            >
              <i class="fas fa-angle-left"></i>
            </button>
          </li>

          <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{ active: tableData.pageNumber === page }"
          >
            <button class="page-link" @click="goToPage(page)">
              {{ page }}
            </button>
          </li>

          <li
            class="page-item"
            :class="{ disabled: tableData.pageNumber === totalPages }"
          >
            <button class="page-link" @click="nextPage" title="Próxima página">
              <i class="fas fa-angle-right"></i>
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: tableData.pageNumber === totalPages }"
          >
            <button
              class="page-link"
              @click="goToPage(totalPages)"
              title="Última página"
            >
              <i class="fas fa-angle-double-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { defineProps, defineEmits } from "vue"; // Adicione esta linha

const props = defineProps({
  headers: {
    type: Array,
    required: true,
    validator: (headers) =>
      headers.every((header) => "text" in header && "value" in header),
  },
  tableName: {
    type: String,
    default: "Nome da tabela",
  },
  tableData: {
    type: Object,
    required: true,
    default: () => ({
      totalPages: 1,
      totalRecords: 0,
      pageNumber: 1,
      pageSize: 3,
      records: [],
    }),
  },
});

const emit = defineEmits(["pagina-alterada", "editar", "excluir"]);

const searchQuery = ref("");
const maxVisiblePages = ref(5);

// Computed properties
const paginatedRecords = computed(() => {
  if (!searchQuery.value) return props.tableData.records;

  return props.tableData.records.filter((item) =>
    props.headers.some((header) => {
      const value = getNestedValue(item, header.value);
      return (
        value !== undefined &&
        value !== null &&
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    })
  );
});

const totalPages = computed(() => props.tableData.totalPages);

const showingStart = computed(
  () => (props.tableData.pageNumber - 1) * props.tableData.pageSize + 1
);

const showingEnd = computed(() => {
  const end = props.tableData.pageNumber * props.tableData.pageSize;
  return end > props.tableData.totalRecords
    ? props.tableData.totalRecords
    : end;
});

const visiblePages = computed(() => {
  const half = Math.floor(maxVisiblePages.value / 2);
  let start = props.tableData.pageNumber - half;
  let end = props.tableData.pageNumber + half;

  if (start < 1) {
    start = 1;
    end = maxVisiblePages.value;
  }

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(1, end - maxVisiblePages.value + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Methods
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const handleSearch = () => {
  emit("pagina-alterada", 1);
};

const previousPage = () => {
  if (props.tableData.pageNumber > 1) {
    emit("pagina-alterada", props.tableData.pageNumber - 1);
  }
};

const nextPage = () => {
  if (props.tableData.pageNumber < totalPages.value) {
    emit("pagina-alterada", props.tableData.pageNumber + 1);
  }
};

const goToPage = (page) => {
  if (page !== props.tableData.pageNumber) {
    emit("pagina-alterada", page);
  }
};

const editarItem = (item) => {
  emit("editar", item);
};

const excluirItem = (item) => {
  emit("excluir", item);
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
