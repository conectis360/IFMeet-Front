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
        <!-- Data de Início -->
        <div class="flex-grow-1 pe-2 col-sm-3">
          <label class="form-label">Data de Início</label>
          <input
            type="date"
            v-model="tarefaDTO.dataInicio"
            class="form-control"
          />
        </div>

        <!-- Data de Fim -->
        <div class="flex-grow-1 pe-2 col-sm-3">
          <label class="form-label">Data de Fim</label>
          <input type="date" v-model="tarefaDTO.dataFim" class="form-control" />
        </div>

        <!-- Trabalho -->
        <div class="flex-grow-1 pe-2 col-sm-3">
          <label class="form-label">Trabalho</label>
          <select
            class="form-control"
            v-model="tarefaDTO.trabalho.codigoTrabalho"
          >
            <option
              v-for="trabalho in trabalhos"
              :value="trabalho.codigoTrabalho"
              :key="trabalho.codigoTrabalho"
            >
              {{ trabalho.titulo }}
            </option>
          </select>
        </div>

        <!-- Finalizada -->
        <div class="flex-grow-1 pe-2 col-sm-3">
          <label class="form-label">Status</label>
          <select class="form-control" v-model="tarefaDTO.finalizada">
            <option :value="false">Pendente</option>
            <option :value="true">Finalizada</option>
          </select>
        </div>

        <!-- Descrição -->
        <div class="flex-grow-1 pe-2 col-12">
          <label class="form-label">Descrição</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="tarefaDTO.descricao"
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
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import {
  salvarTarefa as apiSalvarTarefa,
  atualizarTarefa,
} from "@/services/cadastrarTarefa.js";

const toast = useToast();
const expandido = ref(true);
const editando = ref(false);
const trabalhos = ref([]);
const tarefaDTO = ref({
  trabalho: {
    codigoTrabalho: null,
  },
  dataInicio: null,
  dataFim: null,
  descricao: null,
  finalizada: false,
});

const limparFormulario = () => {
  tarefaDTO.value = {
    trabalho: { codigoTrabalho: null },
    dataInicio: null,
    dataFim: null,
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

    if (!tarefaDTO.value.dataInicio) {
      toast.error("Informe a data de início");
      return;
    }

    if (editando.value) {
      await atualizarTarefa(tarefaDTO.value.id, tarefaDTO.value);
      toast.success("Tarefa atualizada com sucesso!");
    } else {
      await apiSalvarTarefa(tarefaDTO.value);
      toast.success("Tarefa cadastrada com sucesso!");
    }

    //await carregarTarefas();
    limparFormulario();
  } catch (error) {
    toast.error(error.message || "Erro ao salvar tarefa");
  }
};

// Inicialização
onMounted(async () => {});
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

.table-container {
  margin: 20px 0;
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
