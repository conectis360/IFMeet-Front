<template>
  <div class="container" style="background-color: white;">
    <form>
      <div class="form-group">
        <label for="exampleFormControlInput1">Titulo Trabalho</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="TrabalhoDTO.titulo" disabled>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Aluno</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" v-model="TrabalhoDTO.aluno.nome" disabled></textarea>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Curso</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" v-model="TrabalhoDTO.curso.nome" disabled></textarea>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Orientador</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" v-model="TrabalhoDTO.orientador.nome" disabled></textarea>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Descrição do Trabalho</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" v-model="TrabalhoDTO.descricao" disabled></textarea>
      </div>
    </form>
</div>
</template>
  
<script>
import { retornarTrabalho } from "@/services/cadastrarTrabalho.js";
import { useToast } from "vue-toastification";

const toast = useToast()

export default {
  name: "Trabalho",
  data() {
    return {
      content: "",
      TrabalhoDTO: {},
    };
  },
  mounted() {
    this.retornarTrabalho()
  },
  methods: {
    retornarTrabalho() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      retornarTrabalho((response) => {
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
  },
};
</script>