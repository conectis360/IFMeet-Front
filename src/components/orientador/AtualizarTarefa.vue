<template>
  <button type="button" class="btn btn-primary" @click="updateTarefa">
    <i class="fa fa-pen"></i>
  </button>

  <div
    v-if="showModal"
    class="modal fade show modalAtualizar"
    style="padding-right: 17px"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Atualizar Tarefa:</h4>
          <button
            type="button"
            class="close"
            @click="showModal = false"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Tarefa:</label><br />
            <label class="form-label">Data: {{ tarefaDTO.dataInicio }}</label
            ><br />
            <label class="form-label"
              >Descrição: {{ tarefaDTO.descricao }}</label
            ><br />
          </div>
          <div class="mb-3">
            <label class="form-label">Finalizada:</label><br />
            <div>
              <input
                type="radio"
                id="finalizadaSim"
                v-model="tarefaDTO.finalizada"
                :value="true"
              />
              <label for="finalizadaSim">SIM</label>
            </div>
            <div>
              <input
                type="radio"
                id="finalizadaNao"
                v-model="tarefaDTO.finalizada"
                :value="false"
              />
              <label for="finalizadaNao">NÃO</label>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button
            type="button"
            class="btn btn-danger"
            @click="showModal = false"
          >
            Fechar
          </button>
          <button type="button" class="btn btn-success" @click="enviarEmail">
            Atualizar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useToast } from "vue-toastification";
import { buscarTarefa, atualizarTarefa } from "@/services/cadastrarTarefa.js";

const toast = useToast();
const props = defineProps({
  tarefaId: Number,
});

const showModal = ref(false);
const tarefaDTO = ref({
  dataInicio: null,
  descricao: null,
  finalizada: null,
});

const updateTarefa = async () => {
  try {
    const response = await buscarTarefa(props.tarefaId);
    if (response?.data) {
      tarefaDTO.value = response.data;
      showModal.value = true;
    }
  } catch (error) {
    toast.error(error.message || "Erro ao buscar tarefa");
  }
};

const enviarEmail = async () => {
  try {
    await atualizarTarefa(props.tarefaId, tarefaDTO.value);
    toast.success("Tarefa atualizada com sucesso!");
    showModal.value = false;
    emit("atualizado");
  } catch (error) {
    toast.error(error.message || "Erro ao atualizar tarefa");
  }
};

const emit = defineEmits(["atualizado"]);
</script>

<style>
.modal-backdrop {
  display: none;
}
.modalAtualizar {
  color: black;
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
