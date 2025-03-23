<template>
  <div class="container" style="background-color: #f4f6f9">
    <form>
      <div class="form-group">
        <label for="exampleFormControlInput1">Titulo Trabalho</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
          v-model="TrabalhoDTO.titulo"
        />
      </div>
      <div class="form-group">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Aluno</label>
          <MySelect2
            :options="AlunosDTO"
            id="exampleFormControlSelect1"
            label="Escolha uma opção"
            placeholder="Selecione..."
            @change="handleChangeAluno"
            keyName="codigoUsuario"
            valueName="nome"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Curso</label>
          <MySelect2
            :options="CursosDTO"
            id="exampleFormControlSelect1"
            label="Escolha uma opção"
            placeholder="Selecione..."
            @change="handleChangeCurso"
            keyName="codigoCurso"
            valueName="nomeCurso"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Orientador</label>
        <MySelect2
          :options="OrientadoresDTO"
          id="exampleFormControlSelect1"
          label="Escolha uma opção"
          placeholder="Selecione..."
          @change="handleChangeOrientador"
          keyName="codigoUsuario"
          valueName="nome"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Descrição do Trabalho</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="12"
        ></textarea>
      </div>
    </form>
  </div>
</template>

<script>
import {
  buscarCursos,
  cadastrarTrabalho,
  buscarAlunos,
  buscarOrientadores,
} from "@/services/cadastrarTrabalho.js";
import { useToast } from "vue-toastification";
import MySelect2 from "../formularios/MySelect2.vue";

const toast = useToast();

export default {
  name: "CadastrarTrabalho",
  components: {
    MySelect2,
  },
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
      OrientadoresDTO: [],
    };
  },
  mounted() {
    this.retornarAlunos();
    this.retornarOrientadores();
    this.retornarCursos();
  },
  methods: {
    handleChangeOrientador(value) {
      this.TrabalhoDTO.orientador.codigoUsuario = value;
    },
    handleChangeCurso(value) {
      this.TrabalhoDTO.curso.codigoCurso = value;
    },
    handleChangeAluno(value) {
      this.TrabalhoDTO.aluno.codigoUsuario = value;
    },
    retornarCursos() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarCursos(
        (response) => {
          if (response) {
            loader.hide();
            this.CursosDTO = response.data;
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
    retornarAlunos() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarAlunos(
        (response) => {
          if (response) {
            loader.hide();
            this.AlunosDTO = response.data.records;
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
    retornarOrientadores() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarOrientadores(
        (response) => {
          if (response) {
            loader.hide();
            this.OrientadoresDTO = response.data.records;
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
    cadastrarTrabalho() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      cadastrarTrabalho(
        this.TrabalhoDTO,
        (response) => {
          if (response) {
            loader.hide();
            toast.success("Trabalho Cadastrado com Sucesso!");
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
  },
  expose: ["cadastrarTrabalho"],
};
</script>
