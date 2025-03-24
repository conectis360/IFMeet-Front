<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ tableName }}</h3>
      <div class="card-tools">
        <!-- Campo de pesquisa -->
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Pesquisar..."
        />
      </div>
    </div>
    <div class="card-body table-responsive p-0">
      <table class="table table-hover">
        <thead>
          <tr>
            <!-- Renderiza os headers dinamicamente -->
            <th
              v-for="(header, index) in headers"
              :key="index"
              style="text-align: center"
            >
              {{ header.text }}
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <!-- Renderiza as linhas da tabela -->
          <tr v-for="(item, index) in filteredRecords" :key="index">
            <!-- Renderiza as colunas dinamicamente com base no "value" do header -->
            <td v-for="(header, headerIndex) in headers" :key="headerIndex">
              {{ getNestedValue(item, header.value) }}
            </td>
            <td>
              <!-- Botões personalizados -->
              <button
                class="btn btn-sm btn-primary"
                @click="editarItem(item)"
                style="margin-right: 5px"
              >
                Editar
              </button>
              <button class="btn btn-sm btn-danger" @click="excluirItem(item)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer clearfix">
      <!-- Paginação -->
      <ul class="pagination pagination-sm m-0 float-right">
        <li class="page-item" :class="{ disabled: tableData.pageNumber === 1 }">
          <button class="page-link" @click="previousPage">«</button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: tableData.pageNumber === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li
          class="page-item"
          :class="{ disabled: tableData.pageNumber === totalPages }"
        >
          <button class="page-link" @click="nextPage">»</button>
        </li>
      </ul>
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
      searchQuery: "", // Termo de pesquisa
    };
  },
  computed: {
    // Filtra os registros com base na pesquisa
    filteredRecords() {
      if (!this.searchQuery) return this.tableData.records;
      return this.tableData.records.filter((item) =>
        this.headers.some((header) =>
          String(this.getNestedValue(item, header.value))
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        )
      );
    },
    // Total de páginas (vem diretamente do objeto tableData)
    totalPages() {
      return this.tableData.totalPages;
    },
  },
  methods: {
    // Função para acessar propriedades aninhadas
    getNestedValue(obj, path) {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    },
    // Navega para a página anterior
    previousPage() {
      if (this.tableData.pageNumber > 1) {
        this.$emit("pagina-alterada", this.tableData.pageNumber - 1);
      }
    },
    // Navega para a próxima página
    nextPage() {
      if (this.tableData.pageNumber < this.totalPages) {
        this.$emit("pagina-alterada", this.tableData.pageNumber + 1);
      }
    },
    // Vai para uma página específica
    goToPage(page) {
      if (page !== this.tableData.pageNumber) {
        this.$emit("pagina-alterada", page);
      }
    },
    // Ação do botão Editar
    editarItem(item) {
      this.$emit("editar", item);
    },
    // Ação do botão Excluir
    excluirItem(item) {
      console.log(item);
      this.$emit("excluir", item);
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.card {
  margin: 20px;
}
</style>
