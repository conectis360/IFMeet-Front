<template>
  <div class="complex-table">
    <div class="card">
      <!-- Cabeçalho e pesquisa (mantido igual) -->
      <div class="card-header">
        <h3 class="card-title">{{ tableName }}</h3>
        <div class="card-tools">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Pesquisar..."
            @input="handleSearch"
          />
        </div>
      </div>

      <!-- Corpo da tabela -->
      <div class="card-body table-responsive p-0">
        <table class="table table-hover">
          <!-- Cabeçalhos (mantido igual) -->
          <thead style="text-align: center">
            <tr>
              <th v-for="(header, index) in headers" :key="index">
                {{ header.text }}
              </th>
              <th>Ações</th>
            </tr>
          </thead>

          <!-- Corpo da tabela - agora mostrando apenas os registros da página atual -->
          <tbody style="text-align: center">
            <tr v-for="(item, index) in paginatedRecords" :key="index">
              <td v-for="(header, headerIndex) in headers" :key="headerIndex">
                {{ getNestedValue(item, header.value) }}
              </td>
              <td>
                <button
                  class="btn btn-sm btn-primary"
                  @click="editarItem(item)"
                  style="margin-right: 5px"
                >
                  Editar
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="excluirItem(item)"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Rodapé com paginação melhorada -->
      <div class="card-footer clearfix">
        <div class="float-left">
          Mostrando {{ showingStart }} a {{ showingEnd }} de
          {{ tableData.totalRecords }} registros
        </div>
        <ul class="pagination pagination-sm m-0 float-right">
          <li
            class="page-item"
            :class="{ disabled: tableData.pageNumber === 1 }"
          >
            <button class="page-link" @click="goToPage(1)">««</button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: tableData.pageNumber === 1 }"
          >
            <button class="page-link" @click="previousPage">«</button>
          </li>

          <!-- Limita a exibição de páginas -->
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
            <button class="page-link" @click="nextPage">»</button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: tableData.pageNumber === totalPages }"
          >
            <button class="page-link" @click="goToPage(totalPages)">»»</button>
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
