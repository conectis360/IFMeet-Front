<template>
    <div class="container" style="background-color: white;">
        <form>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Hora de Inicio</label>
            <input type="time" id="appt" name="appt" min="09:00" max="18:00" required v-model="ReuniaoDTO.horaInicio">
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Hora Fim</label>
            <input type="time" id="appt" name="appt" min="09:00" max="18:00" required v-model="ReuniaoDTO.horaFim">
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Pauta</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" v-model="ReuniaoDTO.pauta"></textarea>
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
                <input type="submit" class="btn btn-success" value="Cadastrar Tarefa" @click="cadastrarReuniao()">
        </div>
    </div>
    </template>
      
    <script>
    import { cadastrarReuniao, buscarTrabalhos } from "@/services/cadastrarReuniao.js";
    import { useToast } from "vue-toastification";
    
    const toast = useToast()
    export default {
        name: "CadastrarReuniao",
        data() {
        return {
          content: "",
          ReuniaoDTO: {
            trabalho: {
                codigoTrabalho: null,
            },
          },
          TrabalhoDTO: {},
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
        cadastrarReuniao() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          cadastrarReuniao(this.ReuniaoDTO, (response) => {
            if (response) {
              loader.hide()
              toast.success("Reunião Cadastrado com Sucesso!");
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