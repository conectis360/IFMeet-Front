<template>
  <h1>Cadastrar Tarefa</h1>
<div class="container" style="background-color: white;">
    <form>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Data de Inicio</label>
        <input type="date" id="start" name="trip-start" v-model="TarefaDTO.dataInicio">
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Data de Fim</label>
        <input type="date" id="start" name="trip-start" v-model="TarefaDTO.dataFim">
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Descrição da Tarefa</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" v-model="TarefaDTO.descricao"></textarea>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Trabalho</label>
        <select class="form-control" id="exampleFormControlSelect1" v-model="TrabalhoDTO.trabalho.codigoTrabalho">
          <option v-for="trabalho in TrabalhoDTO" :value="trabalho.codigoCurso" :key="trabalho.codigoTrabalho">
            {{ trabalho.nomeTrabalho }}
        </option>
        </select>
        </div>
    </form>
    <div class="modal-footer justify-content-between">
            <input type="submit" class="btn btn-success" value="Cadastrar Tarefa" @click="cadastrarTarefa()">
    </div>
</div>
</template>
  
<script>
import { cadastrarTarefa } from "@/services/cadastrarTrabalho.js";
import { buscarTrabalhos } from "@/services/cadastrarReuniao.js";
import { useToast } from "vue-toastification";

const toast = useToast()
export default {
    name: "CadastrarTarefa",
    data() {
    return {
      content: "",
      TarefaDTO: {
        trabalho: {
            codigoTrabalho: null,
        },
      },
      TrabalhoDTO: {
            trabalho: {
                codigoTrabalho: null,
            },
          },
    };
  },
  mounted() {
    this.retornarTrabalhos()
  },
  methods: {
    retornarTrabalhos() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          buscarTrabalhos((response) => {
            if (response) {
              loader.hide()
              this.TrabalhoDTO = response.data
            }
          },
            (error) => {
              loader.hide()
              toast.error(error);
            },
            () => { }
          );
        },
    cadastrarTarefa() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      cadastrarTarefa(this.TarefaDTO, (response) => {
        if (response) {
          loader.hide()
          toast.success("Tarefa Cadastrado com Sucesso!");
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