<template>
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>
          {{ editando ? "Editar Disponibilidade" : "Nova Disponibilidade" }}
        </h3>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>

      <!-- Formulário de disponibilidade -->
      <div class="form-container">
        <div class="form-group">
          <label>Dia da Semana</label>
          <select v-model="disponibilidade.diaSemana" class="form-input">
            <option
              v-for="dia in diasSemana"
              :key="dia.value"
              :value="dia.value"
            >
              {{ dia.label }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Hora Início</label>
          <input
            type="time"
            v-model="disponibilidade.horaInicio"
            class="form-input"
            step="1800"
          />
        </div>

        <div class="form-group">
          <label>Hora Fim</label>
          <input
            type="time"
            v-model="disponibilidade.horaFim"
            class="form-input"
            step="1800"
          />
        </div>

        <div class="form-actions">
          <button class="btn btn-primary" @click="salvarDisponibilidade">
            {{ editando ? "Atualizar" : "Adicionar" }}
          </button>
        </div>
      </div>

      <!-- Tabela de disponibilidades existentes -->
      <div class="table-container">
        <ComplexTable
          :headers="headers"
          :table-name="'Disponibilidades Cadastradas'"
          :table-data="tableData"
          @editar="editarDisponibilidadeTabela"
          @excluir="confirmarRemocao"
          @pagina-alterada="carregarDisponibilidades"
        />
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">Fechar</button>
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
  salvarDisponibilidade as apiSalvar,
  atualizarDisponibilidade,
} from "@/services/disponibilidadeService";

export default {
  components: {
    ComplexTable,
  },
  props: {
    show: Boolean,
    disponibilidadeEditando: Object,
  },

  emits: ["close", "refresh"],

  setup(props, { emit }) {
    const toast = useToast();
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
        console.log("aqui");
        const response = await buscarConfiguracoesDisponibilidade(usuario.id);
        console.log(response);

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

    // Quando receber uma disponibilidade para editar
    if (props.disponibilidadeEditando) {
      disponibilidade.value = { ...props.disponibilidadeEditando };
      editando.value = true;
    }

    const closeModal = () => {
      emit("close");
    };

    const salvarDisponibilidade = async () => {
      try {
        if (disponibilidade.value.horaInicio >= disponibilidade.value.horaFim) {
          toast.error("Hora de término deve ser após a hora de início");
          return;
        }

        if (editando.value) {
          await atualizarDisponibilidade(
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
        emit("refresh");

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
        await removerDisponibilidade(id);
        toast.success("Disponibilidade removida!");
        await carregarDisponibilidades(tableData.value.pageNumber);
        emit("refresh");
      } catch (error) {
        toast.error("Erro ao remover disponibilidade");
      }
    };

    return {
      headers,
      tableData,
      diasSemana,
      disponibilidade,
      editando,
      closeModal,
      salvarDisponibilidade,
      editarDisponibilidadeTabela,
      confirmarRemocao,
      carregarDisponibilidades,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
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

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.btn-primary {
  background-color: #3788d8;
  color: white;
  border: none;
}

.btn-secondary {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
