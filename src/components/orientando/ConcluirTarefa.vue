<template>
<div class="container" style="background-color: white;">
    <form>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Data de Inicio</label>
        <input type="date" id="start" name="trip-start" v-model="TarefasDTO.dataInicio" disabled>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Data de Fim</label>
        <input type="date" id="start" name="trip-start" v-model="TarefasDTO.dataFim" disabled>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Descrição da Tarefa</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" v-model="TarefasDTO.descricao" disabled></textarea>
      </div>
    </form>
    <div class="modal-footer justify-content-between">
            <input type="submit" class="btn btn-success" value="Concluir Tarefa" @click="concluirTarefa()">
    </div>
</div>
</template>

<script>
import { concluirTarefa, buscarTarefas } from "@/services/cadastrarTrabalho.js";
import { useToast } from "vue-toastification";

const toast = useToast()
export default {
    name: "ConcluirTarefa",
    data() {
    return {
      content: "",
      TarefaDTO: {
        trabalho: {
            codigoTrabalho: null,
        },
      },
      TarefasDTO: {},
    };
  },
  mounted() {
    this.retornarTrabalhos()
  },
  methods: {
    buscarTarefas() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarTarefas((response) => {
        if (response) {
          loader.hide()
          this.TarefasDTO = response.data
        }
      },
        (error) => {
          loader.hide()
          toast.error(error);
        },
        () => { }
      );
    },
    concluirTarefa() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      concluirTarefa(this.TarefaDTO, (response) => {
        if (response) {
          loader.hide()
          toast.success("Tarefa Concluida com Sucesso!");
        }
      },
        (error) => {
          loader.hide()
          toast.error(error);
        },
        () => { }
      );
    },
  },
};
</script>