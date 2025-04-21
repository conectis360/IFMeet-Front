<template>
  <div class="card card-color" :class="{ 'collapsed-card': !expandido }">
    <div class="card-header">
      <h3 class="card-title">Disponibilidades</h3>
      <div class="card-tools">
        <button
          type="button"
          class="btn btn-tool"
          @click="expandido = !expandido"
        >
          <i class="fas" :class="expandido ? 'fa-minus' : 'fa-plus'"></i>
        </button>
      </div>
    </div>

    <div class="card-body" v-show="expandido">
      <div class="table-container mt-3">
        <div class="d-flex align-items-end gap-2">
          <!-- Dia da Semana -->
          <div class="flex-grow-1 pe-2 col-sm-3">
            <!-- padding-right -->
            <label class="form-label">Dia da Semana</label>
            <select v-model="disponibilidade.diaSemana" class="form-control">
              <option
                v-for="dia in diasSemana"
                :key="dia.value"
                :value="dia.value"
              >
                {{ dia.label }}
              </option>
            </select>
          </div>

          <!-- Hora Início -->
          <div class="flex-grow-1 pe-2 col-sm-3">
            <!-- padding-right -->
            <label class="form-label">Hora Início</label>
            <input
              type="time"
              v-model="disponibilidade.horaInicio"
              class="form-control"
              step="1800"
            />
          </div>

          <!-- Hora Fim -->
          <div class="flex-grow-1 pe-2 col-sm-3">
            <!-- padding-right -->
            <label class="form-label">Hora Fim</label>
            <input
              type="time"
              v-model="disponibilidade.horaFim"
              class="form-control"
              step="1800"
            />
          </div>
          <!-- Hora Fim -->
          <div class="flex-grow-1 pe-2 col-sm-3">
            <button class="btn btn-primary" @click="salvarDisponibilidade">
              {{ editando ? "Atualizar" : "Adicionar" }}
            </button>
            <button
              class="btn btn-danger"
              @click="limparFormulario"
              style="margin: 1%"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
      <!-- Tabela de disponibilidades existentes -->
      <div class="table-container mt-3">
        <ComplexTable
          :headers="headers"
          :table-name="'Disponibilidades Cadastradas'"
          :table-data="tableData"
          @editar="editarDisponibilidadeTabela"
          @excluir="confirmarRemocao"
          @pagina-alterada="carregarDisponibilidades"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import ComplexTable from "./ComplexTable.vue";
import {
  buscarConfiguracoesDisponibilidade,
  saveDisponibilidade as apiSalvar,
  updateDisponibilidade,
  deleteDisponibilidade,
} from "@/services/disponibilidadeService";

export default {
  components: {
    ComplexTable,
  },
  props: {
    show: Boolean,
    disponibilidadeEditando: Object,
  },

  emits: ["atualizado"],
  setup(props, { emit }) {
    const toast = useToast();
    const expandido = ref(false);
    const editando = ref(false);
    const disponibilidade = ref({
      diaSemana: 1,
      horaInicio: "08:00",
      horaFim: "17:00",
    });

    // Configuração da tabela
    const headers = [
      { text: "Dia da Semana", value: "diaSemanaFormatado" },
      { text: "Hora Início", value: "horaInicio" },
      { text: "Hora Fim", value: "horaFim" },
    ];

    const tableData = ref({
      totalPages: 1,
      totalRecords: 0,
      pageNumber: 1,
      pageSize: 10,
      records: [],
    });

    const diasSemana = [
      { value: 0, label: "Domingo" },
      { value: 1, label: "Segunda-feira" },
      { value: 2, label: "Terça-feira" },
      { value: 3, label: "Quarta-feira" },
      { value: 4, label: "Quinta-feira" },
      { value: 5, label: "Sexta-feira" },
      { value: 6, label: "Sábado" },
    ];

    // Busca usuário logado
    const getUsuarioLogado = () => {
      const usuario = localStorage.getItem("user");
      return usuario ? JSON.parse(usuario) : null;
    };

    // Carrega as disponibilidades
    const carregarDisponibilidades = async () => {
      try {
        const usuario = getUsuarioLogado();
        if (!usuario?.id) {
          toast.error("Usuário não autenticado");
          return;
        }
        const response = await buscarConfiguracoesDisponibilidade(usuario.id);

        tableData.value = {
          ...response.data,
          records: response.data.records.map((disp) => ({
            ...disp,
            diaSemanaFormatado:
              diasSemana.find((d) => d.value === disp.diaSemana)?.label || "",
          })),
        };
      } catch (error) {
        toast.error("Erro ao carregar disponibilidades");
      }
    };

    onMounted(() => {
      carregarDisponibilidades();
    });

    const limparFormulario = () => {
      disponibilidade.value = {
        diaSemana: 1,
        horaInicio: "08:00",
        horaFim: "17:00",
        id: undefined,
      };
      editando.value = false;
    };

    // Quando receber uma disponibilidade para editar
    if (props.disponibilidadeEditando) {
      disponibilidade.value = { ...props.disponibilidadeEditando };
      editando.value = true;
    }
    const salvarDisponibilidade = async () => {
      try {
        if (disponibilidade.value.horaInicio >= disponibilidade.value.horaFim) {
          toast.error("Hora de término deve ser após a hora de início");
          return;
        }

        if (editando.value) {
          await updateDisponibilidade(
            disponibilidade.value.id,
            disponibilidade.value
          );
          toast.success("Disponibilidade atualizada!");
        } else {
          await apiSalvar(disponibilidade.value);
          toast.success("Disponibilidade criada!");
        }

        // Recarrega a tabela e emite evento para atualizar calendário
        await carregarDisponibilidades(tableData.value.pageNumber);
        emit("atualizado");

        // Limpa o formulário se não estiver editando
        if (!editando.value) {
          disponibilidade.value = {
            diaSemana: 1,
            horaInicio: "08:00",
            horaFim: "17:00",
          };
        }
      } catch (error) {
        toast.error(error.message || "Erro ao salvar disponibilidade");
      }
    };

    const editarDisponibilidadeTabela = (item) => {
      disponibilidade.value = { ...item };
      editando.value = true;
    };

    const confirmarRemocao = (item) => {
      if (
        confirm(
          `Deseja realmente remover a disponibilidade de ${
            diasSemana.find((d) => d.value === item.diaSemana)?.label
          }?`
        )
      ) {
        removerDisponibilidade(item.id);
      }
    };

    const removerDisponibilidade = async (id) => {
      try {
        await deleteDisponibilidade(id);
        toast.success("Disponibilidade removida!");
        await carregarDisponibilidades(tableData.value.pageNumber);
        emit("atualizado");
      } catch (error) {
        toast.error("Erro ao remover disponibilidade");
      }
    };

    return {
      expandido,
      headers,
      tableData,
      diasSemana,
      disponibilidade,
      editando,
      salvarDisponibilidade,
      editarDisponibilidadeTabela,
      confirmarRemocao,
      carregarDisponibilidades,
      limparFormulario,
    };
  },
};
</script>
<style scoped>
.card-color {
  color: white;
  background-color: #317b3c;
}

.card-body {
  color: black;
  background-color: #d1edb7;
}

.form-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
}

.table-container {
  margin: 20px 0;
}

.btn-primary {
  background-color: #317b3c;
  color: white;
  border: none;
}
</style>
