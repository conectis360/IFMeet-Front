<template>
    <div class="container" style="background-color: white;">
        <div>
          <h6 for="exampleFormControlSelect1">Ultima Reunião:</h6>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Hora de Inicio</label>
            <input type="time" id="appt" name="appt" min="09:00" max="18:00" required v-model="UltimaReuniaoDTO.horaInicio" disabled>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Hora Fim</label>
            <input type="time" id="appt" name="appt" min="09:00" max="18:00" required v-model="UltimaReuniaoDTO.horaFim" disabled>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Pauta</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" v-model="UltimaReuniaoDTO.pauta" disabled></textarea>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
                <input type="submit" class="btn btn-success" value="Requisitar nova Reunião" @click="requisitarReuniao()">
        </div>
    </div>
    </template>
      
    <script>
    import { requisitarReuniao, retornarUltimaReuniao } from "@/services/cadastrarReuniao.js";
    import { useToast } from "vue-toastification";
    
    const toast = useToast()
    export default {
        name: "RequisitarReuniao",
        data() {
        return {
          content: "",
          ReuniaoDTO: {
            trabalho: {
                codigoTrabalho: null,
            },
          },
          UltimaReuniaoDTO: {},
        };
      },
      mounted() {
        this.retornarTrabalhos()
      },
      methods: {
        retornarUltimaReuniao() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          retornarUltimaReuniao((response) => {
            if (response) {
              loader.hide()
              this.UltimaReuniaoDTO = response.data
            }
          },
            (error) => {
              loader.hide()
              toast.error(error);
            },
            () => { }
          );
        },
        requisitarReuniao() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          requisitarReuniao(this.ReuniaoDTO, (response) => {
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