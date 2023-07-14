<template>
    <div class="container" style="background-color: white;">
        <form>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Resumo</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" v-model="AtaDTO.pauta"></textarea>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Reunião</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="ReuniaoDTO.codigoReuniao">
              <option v-for="reuniao in ReuniaoDTO" :value="reuniao.codigoReuniao" :key="reuniao.codigoReuniao">
                {{ reuniao.codigoReuniao }}
            </option>
            </select>
           </div>
        </form>
        <div class="modal-footer justify-content-between">
                <input type="submit" class="btn btn-success" value="Cadastrar Tarefa" @click="cadastrarAta()">
        </div>
    </div>
    </template>
      
    <script>
    import { cadastrarAta, buscarReunioes } from "@/services/CadastrarAta.js";
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
        this.retornarReunioes()
      },
      methods: {
        retornarReunioes() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          buscarReunioes((response) => {
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
        cadastrarAta() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          cadastrarAta(this.AtaDTO, (response) => {
            if (response) {
              loader.hide()
              toast.success("Ata Cadastrado com Sucesso!");
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