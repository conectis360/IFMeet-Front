<template>
  <div class="card card-color" :class="{ 'collapsed-card': !expandido }">
    <div class="card-header">
      <h3 class="card-title">Tarefas</h3>
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
      <!-- Formulário de Tarefa -->
      <div class="d-flex flex-wrap align-items-end gap-2 mb-4">
        <!-- Trabalho -->
        <div class="flex-grow-1 pe-2 col-sm-6">
          <label class="form-label">Trabalho *</label>
          <select
            class="form-control"
            v-model="tarefaDTO.trabalho.codigoTrabalho"
            :disabled="editando"
            required
          >
            <option value="">Selecione um trabalho</option>
            <option
              v-for="trabalho in trabalhos"
              :value="trabalho.codigoTrabalho"
              :key="trabalho.codigoTrabalho"
            >
              {{ trabalho.titulo }}
            </option>
          </select>
        </div>

        <!-- Status (apenas para edição) -->
        <div class="flex-grow-1 pe-2 col-sm-6" v-if="editando">
          <label class="form-label">Status</label>
          <select class="form-control" v-model="tarefaDTO.finalizada">
            <option :value="false">Pendente</option>
            <option :value="true">Finalizada</option>
          </select>
        </div>

        <!-- Descrição -->
        <div class="flex-grow-1 pe-2 col-12">
          <label class="form-label">Descrição *</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="tarefaDTO.descricao"
            required
          ></textarea>
        </div>

        <!-- Botões -->
        <div
          class="flex-grow-1 pe-2 col-12 d-flex justify-content-end gap-2 mt-2"
        >
          <button class="btn btn-primary" @click="salvarTarefa">
            {{ editando ? "Atualizar" : "Adicionar" }}
          </button>
          <button class="btn btn-danger" @click="limparFormulario">
            Limpar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import { useToast } from "vue-toastification";
import {
  cadastrarTarefa as apiSalvarTarefa,
  atualizarTarefa,
} from "@/services/cadastrarTarefa.js";
import { buscarTrabalhos } from "@/services/cadastrarTrabalho.js";

const props = defineProps({
  tarefaParaEdicao: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["tarefa-salva"]);

const toast = useToast();
const expandido = ref(false);
const editando = ref(false);
const trabalhos = ref([]);
const tarefaDTO = ref({
  trabalho: {
    codigoTrabalho: null,
  },
  descricao: null,
  finalizada: false,
});

// Watcher para observar mudanças na prop tarefaParaEdicao
watch(
  () => props.tarefaParaEdicao,
  (novaTarefa) => {
    if (novaTarefa) {
      editarTarefa(novaTarefa);
    }
  },
  { deep: true }
);

const editarTarefa = (tarefa) => {
  tarefaDTO.value = {
    codigoTarefa: tarefa.codigoTarefa,
    trabalho: {
      codigoTrabalho: tarefa.trabalho?.codigoTrabalho || null,
    },
    descricao: tarefa.descricao,
    finalizada: tarefa.finalizada || false,
  };
  editando.value = true;
  expandido.value = true; // Expande o card ao editar
};

const limparFormulario = () => {
  tarefaDTO.value = {
    trabalho: { codigoTrabalho: null },
    descricao: null,
    finalizada: false,
  };
  editando.value = false;
};

const salvarTarefa = async () => {
  try {
    // Validações básicas
    if (!tarefaDTO.value.trabalho.codigoTrabalho) {
      toast.error("Selecione um trabalho");
      return;
    }

    if (!tarefaDTO.value.descricao) {
      toast.error("Informe a descrição da tarefa");
      return;
    }

    const payload = { ...tarefaDTO.value };
    let response;

    if (editando.value) {
      response = await atualizarTarefa(tarefaDTO.value.codigoTarefa, payload);
      toast.success("Tarefa atualizada com sucesso!");
    } else {
      delete payload.finalizada;
      response = await apiSalvarTarefa(payload);
      toast.success("Tarefa cadastrada com sucesso!");
    }

    limparFormulario();
    emit("tarefa-salva", response.data);
  } catch (error) {
    toast.error(error.message || "Erro ao salvar tarefa");
  }
};

const retornarTrabalhos = async () => {
  try {
    const response = await buscarTrabalhos();
    if (response?.data) {
      trabalhos.value = response.data.records;
    }
  } catch (error) {
    toast.error(error.message || "Erro ao buscar trabalhos");
    trabalhos.value = [];
  }
};

onMounted(async () => {
  await retornarTrabalhos();
});
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

.btn-primary {
  background-color: #317b3c;
  color: white;
  border: none;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.form-control {
  margin-bottom: 0.5rem;
}
</style>
