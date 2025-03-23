<template>
  <h1>Cadastrar Trabalho</h1>
  <div class="container" style="background-color: #f4f6f9;">
    <form>
      <div class="form-group">
        <label for="exampleFormControlInput1">Titulo Trabalho</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="TrabalhoDTO.titulo">
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Aluno</label>
        <select class="form-control" id="exampleFormControlSelect1" v-model="TrabalhoDTO.aluno.codigoUsuario">
          <option v-for="aluno in AlunosDTO" :value="aluno.codigoUsuario" :key="aluno.codigoUsuario">
            {{ aluno.nome }}
        </option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Curso</label>
        <select class="form-control" id="exampleFormControlSelect1" v-model="TrabalhoDTO.curso.codigoCurso">
          <option v-for="curso in CursosDTO" :value="curso.codigoCurso" :key="curso.codigoCurso">
            {{ curso.nomeCurso }}
        </option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Orientador</label>
        <select class="form-control" id="exampleFormControlSelect1" v-model="TrabalhoDTO.orientador.codigoUsuario">
          <option v-for="orientador in OrientadoresDTO" :value="orientador.codigoUsuario" :key="orientador.codigoUsuario">
            {{ orientador.nome }}
        </option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Descrição do Trabalho</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12"></textarea>
      </div>
    </form>
    <div class="modal-footer justify-content-between">
            <input type="submit" class="btn btn-success" value="Cadastrar Trabalho" @click="cadastrarTrabalho()">
    </div>
</div>
</template>
  
<script>
import { buscarCursos, cadastrarTrabalho, buscarAlunos, buscarOrientadores } from "@/services/cadastrarTrabalho.js";
import { useToast } from "vue-toastification";

const toast = useToast()

export default {
  name: "CadastrarTrabalho",
  data() {
    return {
      content: "",
      TrabalhoDTO: {
        aluno: {
          codigoUsuario: null,
        },
        orientador: {
          codigoUsuario: null,
        },
        curso: {
          codigoCurso: null,
        },
      },
      CursosDTO: {},
      AlunosDTO: {},
    };
  },
  mounted() {
    this.retornarAlunos()
    this.retornarOrientadores()
    this.retornarCursos()
  },
  methods: {
    retornarCursos() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarCursos((response) => {
        if (response) {
          loader.hide()
          this.CursosDTO = response.data
        }
      },
        (error) => {
          loader.hide()
          toast.error(error);
        },
        () => { }
      );
    },
    retornarAlunos() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarAlunos((response) => {
        if (response) {
          loader.hide()
          this.AlunosDTO = response.data.records
        }
      },
        (error) => {
          loader.hide()
          toast.error(error);
        },
        () => { }
      );
    },
    retornarOrientadores() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarOrientadores((response) => {
        if (response) {
          loader.hide()
          this.OrientadoresDTO = response.data.records
        }
      },
        (error) => {
          loader.hide()
          toast.error(error);
        },
        () => { }
      );
    },
    cadastrarTrabalho() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      cadastrarTrabalho(this.TrabalhoDTO, (response) => {
        if (response) {
          loader.hide()
          toast.success("Trabalho Cadastrado com Sucesso!");
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