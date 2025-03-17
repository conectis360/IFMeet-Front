<template>
  <h1>Cadastrar Documentação</h1>
    <div class="container" style="background-color: white;">
        <form>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Descrição</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" v-model="DocumentacaoDTO.descricao"></textarea>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Trabalho</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="DocumentacaoDTO.trabalho.codigoTrabalho">
              <option v-for="trabalho in TrabalhoDTO" :value="trabalho.codigoTrabalho" :key="trabalho.codigoTrabalho">
                {{ trabalho.titulo }}
            </option>
            </select>
            </div>
        </form>
        <div class="modal-footer justify-content-between">
                <input type="submit" class="btn btn-success" value="Cadastrar Documentação" @click="cadastrarDocumentacao()">
        </div>
    </div>
    </template>
      
    <script>
    import { cadastrarDocumentacao, buscarTrabalhos } from "@/services/cadastrarDocumentacao.js";
    import { useToast } from "vue-toastification";
    
    const toast = useToast()
    export default {
        name: "CadastrarDocumentacao",
        data() {
        return {
          content: "",
          DocumentacaoDTO: {
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
        cadastrarDocumentacao() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          cadastrarDocumentacao(this.DocumentacaoDTO, (response) => {
            if (response) {
              loader.hide()
              toast.success("Documentação Cadastrado com Sucesso!");
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