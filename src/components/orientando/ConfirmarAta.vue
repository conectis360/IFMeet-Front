<template>
    <div class="container" style="background-color: white;">
        <form>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Resumo</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" v-model="AtaDTO.pauta" disabled></textarea>
          </div>
        </form>
        <div class="modal-footer justify-content-between">
                <input type="submit" class="btn btn-success" value="Cadastrar Tarefa" @click="confirmarAta()">
        </div>
    </div>
    </template>
      
    <script>
    import { confirmarAta, buscarUltimaAta } from "@/services/cadastrarAta.js";
    import { useToast } from "vue-toastification";
    
    const toast = useToast()
    export default {
        name: "CadastrarAta",
        data() {
        return {
          content: "",
          AtaDTO: {
            trabalho: {
                codigoTrabalho: null,
            },
          },
          ReuniaoDTO: {},
        };
      },
      mounted() {
        this.retornarUltimaAta()
      },
      methods: {
        retornarUltimaAta() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          buscarUltimaAta((response) => {
            if (response) {
              loader.hide()
              this.ReuniaoDTO = response.data
            }
          },
            (error) => {
              loader.hide()
              toast.error(error);
            },
            () => { }
          );
        },
        confirmarAta() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          confirmarAta(this.AtaDTO, (response) => {
            if (response) {
              loader.hide()
              toast.success("Ata Confirmada com Sucesso!");
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