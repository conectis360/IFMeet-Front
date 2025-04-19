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

<script>
export default {
  name: "ComplexTable",
  props: {
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
        pageSize: 10,
        records: [],
      }),
    },
  },
  data() {
    return {
      searchQuery: "",
      maxVisiblePages: 5, // Número máximo de páginas visíveis na paginação
    };
  },
  computed: {
    // Registros paginados e filtrados
    paginatedRecords() {
      // Se não houver termo de pesquisa, retorna todos os registros da página atual
      if (!this.searchQuery) return this.tableData.records;

      // Aplica o filtro de pesquisa
      return this.tableData.records.filter((item) =>
        this.headers.some((header) => {
          const value = this.getNestedValue(item, header.value);
          // Verifica se o valor existe e contém o termo de pesquisa
          return (
            value !== undefined &&
            value !== null &&
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        })
      );
    },

    totalPages() {
      return this.tableData.totalPages;
    },

    showingStart() {
      return (this.tableData.pageNumber - 1) * this.tableData.pageSize + 1;
    },

    showingEnd() {
      const end = this.tableData.pageNumber * this.tableData.pageSize;
      return end > this.tableData.totalRecords
        ? this.tableData.totalRecords
        : end;
    },

    // Calcula as páginas visíveis na paginação
    visiblePages() {
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = this.tableData.pageNumber - half;
      let end = this.tableData.pageNumber + half;

      if (start < 1) {
        start = 1;
        end = this.maxVisiblePages;
      }

      if (end > this.totalPages) {
        end = this.totalPages;
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  methods: {
    getNestedValue(obj, path) {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    },

    handleSearch() {
      // Quando pesquisa, volta para a primeira página
      this.$emit("pagina-alterada", 1);
    },

    previousPage() {
      if (this.tableData.pageNumber > 1) {
        this.$emit("pagina-alterada", this.tableData.pageNumber - 1);
      }
    },

    nextPage() {
      if (this.tableData.pageNumber < this.totalPages) {
        this.$emit("pagina-alterada", this.tableData.pageNumber + 1);
      }
    },

    goToPage(page) {
      if (page !== this.tableData.pageNumber) {
        this.$emit("pagina-alterada", page);
      }
    },

    editarItem(item) {
      this.$emit("editar", item);
    },

    excluirItem(item) {
      this.$emit("excluir", item);
    },
  },
};
</script>

<style scoped></style>
