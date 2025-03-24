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
          @change="handleChangeTitulo"
          :value="trabalhoProp?.titulo"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput2">Problema</label>
        <textarea
          type="text"
          rows="2"
          class="form-control"
          id="exampleFormControlInput2"
          placeholder=""
          @change="handleChangeProblema"
          :value="trabalhoProp?.problema"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">Justificativa</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="2"
          @change="handleChangeJustificativa"
          :value="trabalhoProp?.justificativa"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="exampleFormControlInput3">Hipótese</label>
        <textarea
          type="text"
          class="form-control"
          rows="2"
          id="exampleFormControlInput3"
          placeholder=""
          @change="handleChangeHipotese"
          :value="trabalhoProp?.hipotese"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea2">Solução</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea2"
          rows="2"
          @change="handleChangeSolucao"
          :value="trabalhoProp?.solucao"
        ></textarea>
      </div>
      <div class="form-group">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Aluno</label>
          <MySelect2
            :value="trabalhoProp.aluno?.codigoUsuario"
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
            :value="trabalhoProp.curso?.codigoCurso"
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
          :value="trabalhoProp.orientador?.codigoUsuario"
          :options="OrientadoresDTO"
          id="exampleFormControlSelect1"
          label="Escolha uma opção"
          placeholder="Selecione..."
          @change="handleChangeOrientador"
          keyName="codigoUsuario"
          valueName="nome"
        />
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
  props: {
    trabalhoProp: {
      type: Object,
      default: () => ({
        codigoTrabalho: "",
        titulo: "",
        problema: "",
        justificativa: "",
        hipotese: "",
        solucao: "",
        aluno: {
          codigoUsuario: null,
        },
        orientador: {
          codigoUsuario: null,
        },
        curso: {
          codigoCurso: null,
        },
      }),
    },
  },
  data() {
    return {
      content: "",
      TrabalhoDTO: {
        titulo: "",
        problema: "",
        justificativa: "",
        hipotese: "",
        solucao: "",
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
    handleChangeTitulo(value) {
      this.TrabalhoDTO.titulo = value;
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
    atualizarTrabalhoDTO(trabalhoProp, TrabalhoDTO) {
      if (trabalhoProp?.codigoTrabalho != null) {
        const {
          codigoTrabalho,
          titulo,
          problema,
          justificativa,
          hipotese,
          solucao,
          aluno,
          orientador,
          curso,
        } = trabalhoProp;

        return {
          ...TrabalhoDTO, // Mantém as propriedades existentes
          codigoTrabalho,
          titulo,
          problema,
          justificativa,
          hipotese,
          solucao,
          aluno: {
            codigoUsuario: aluno?.codigoUsuario ?? null,
          },
          orientador: {
            codigoUsuario: orientador?.codigoUsuario ?? null,
          },
          curso: {
            codigoCurso: curso?.codigoCurso ?? null,
          },
        };
      }
      return TrabalhoDTO; // Retorna o objeto original se a condição não for atendida
    },
    limparTrabalhoDTO() {
      this.TrabalhoDTO = {
        titulo: "",
        problema: "",
        justificativa: "",
        hipotese: "",
        solucao: "",
        aluno: {
          codigoUsuario: null,
        },
        orientador: {
          codigoUsuario: null,
        },
        curso: {
          codigoCurso: null,
        },
      };
    },
    cadastrarTrabalho() {
      if (this.trabalhoProp.codigoTrabalho != null) {
        this.TrabalhoDTO = this.atualizarTrabalhoDTO(
          this.trabalhoProp,
          this.TrabalhoDTO
        );
      }
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
        () => {
          this.limparTrabalhoDTO();
        }
      );
    },
  },
  expose: ["cadastrarTrabalho", "limparTrabalhoDTO"],
};
</script>
