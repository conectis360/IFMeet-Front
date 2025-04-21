<template>
  <div class="tarefas-container">
    <div class="row mb-4">
      <div class="col-md-6">
        <h1>Tarefas</h1>
      </div>
      <div class="col-md-6 text-end">
        <button class="btn btn-primary" @click="showCadastro = !showCadastro">
          {{ showCadastro ? "Ver Lista" : "Nova Tarefa" }}
        </button>
      </div>
    </div>

    <CadastrarTarefa v-if="showCadastro" @cadastrado="handleCadastroSucesso" />
    <VisualizarTarefas v-else />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CadastrarTarefa from "../components/orientador/CadastrarTarefa.vue";
import VisualizarTarefas from "../components/orientador/VisualizarTarefas.vue";

const showCadastro = ref(false);

const handleCadastroSucesso = () => {
  showCadastro.value = false;
};
</script>

<style scoped>
.tarefas-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
