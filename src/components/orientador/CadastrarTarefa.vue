<template>
  <div class="container" style="background-color: white">
    <h1>Cadastrar Tarefa</h1>
    <form @submit.prevent="cadastrarTarefa">
      <div class="form-group">
        <label>Data de Inicio</label>
        <input
          type="date"
          v-model="tarefaDTO.dataInicio"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Data de Fim</label>
        <input type="date" v-model="tarefaDTO.dataFim" class="form-control" />
      </div>
      <div class="form-group">
        <label>Descrição da Tarefa</label>
        <textarea
          class="form-control"
          rows="12"
          v-model="tarefaDTO.descricao"
        ></textarea>
      </div>
      <div class="form-group">
        <label>Trabalho</label>
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
      <div class="modal-footer justify-content-between">
        <button type="submit" class="btn btn-success">Cadastrar Tarefa</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { cadastrarTarefa as apiCadastrarTarefa } from "@/services/cadastrarTrabalho.js";
import { buscarTrabalhos } from "@/services/cadastrarReuniao.js";

const toast = useToast();
const trabalhos = ref([]);
const tarefaDTO = ref({
  trabalho: {
    codigoTrabalho: null,
  },
  dataInicio: null,
  dataFim: null,
  descricao: null,
});

onMounted(async () => {
  await retornarTrabalhos();
});

const retornarTrabalhos = async () => {
  try {
    const response = await buscarTrabalhos();
    if (response?.data) {
      trabalhos.value = response.data;
    }
  } catch (error) {
    toast.error(error.message || "Erro ao buscar trabalhos");
  }
};

const cadastrarTarefa = async () => {
  try {
    await apiCadastrarTarefa(tarefaDTO.value);
    toast.success("Tarefa cadastrada com sucesso!");
    // Limpa o formulário após cadastro
    tarefaDTO.value = {
      trabalho: { codigoTrabalho: null },
      dataInicio: null,
      dataFim: null,
      descricao: null,
    };
  } catch (error) {
    toast.error(error.message || "Erro ao cadastrar tarefa");
  }
};
</script>
