<template>
  <div class="card card-color" :class="{ 'collapsed-card': !expandido }">
    <div class="card-header">
      <h3 class="card-title">Trabalhos</h3>
      <div class="card-tools">
        <button
          type="button"
          class="btn btn-tool"
          @click="expandido = !expandido"
        >
          <i class="fas" :class="expandido ? 'fa-minus' : 'fa-plus'"></i>
        </button>
      </div>
    </div>

    <div class="card-body" v-show="expandido">
      <!-- Formulário de Trabalho -->
      <div class="d-flex flex-column gap-3">
        <!-- Título -->
        <div class="flex-grow-1">
          <label class="form-label">Título do Trabalho *</label>
          <input
            type="text"
            class="form-control"
            v-model="TrabalhoDTO.titulo"
            required
          />
        </div>

        <!-- Problema e Justificativa -->
        <div class="row">
          <div class="col-md-6">
            <label class="form-label">Problema *</label>
            <textarea
              class="form-control"
              rows="3"
              v-model="TrabalhoDTO.problema"
              required
            ></textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label">Justificativa *</label>
            <textarea
              class="form-control"
              rows="3"
              v-model="TrabalhoDTO.justificativa"
              required
            ></textarea>
          </div>
        </div>

        <!-- Hipótese e Solução -->
        <div class="row">
          <div class="col-md-6">
            <label class="form-label">Hipótese</label>
            <textarea
              class="form-control"
              rows="2"
              v-model="TrabalhoDTO.hipotese"
            ></textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label">Solução Proposta</label>
            <textarea
              class="form-control"
              rows="2"
              v-model="TrabalhoDTO.solucao"
            ></textarea>
          </div>
        </div>

        <!-- Aluno, Curso e Orientador -->
        <div class="row">
          <div class="col-md-4">
            <label class="form-label">Aluno *</label>
            <select
              class="form-control"
              v-model="TrabalhoDTO.aluno.codigoUsuario"
              required
            >
              <option value="">Selecione um aluno</option>
              <option
                v-for="aluno in AlunosDTO"
                :key="aluno.codigoUsuario"
                :value="aluno.codigoUsuario"
              >
                {{ aluno.nome }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Curso *</label>
            <select
              class="form-control"
              v-model="TrabalhoDTO.curso.codigoCurso"
              required
            >
              <option value="">Selecione um curso</option>
              <option
                v-for="curso in CursosDTO"
                :key="curso.codigoCurso"
                :value="curso.codigoCurso"
              >
                {{ curso.nomeCurso }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Orientador *</label>
            <select
              class="form-control"
              v-model="TrabalhoDTO.orientador.codigoUsuario"
              required
            >
              <option value="">Selecione um orientador</option>
              <option
                v-for="orientador in OrientadoresDTO"
                :key="orientador.codigoUsuario"
                :value="orientador.codigoUsuario"
              >
                {{ orientador.nome }}
              </option>
            </select>
          </div>
        </div>

        <!-- Botões -->
        <div class="d-flex justify-content-end gap-2 mt-3">
          <button class="btn btn-danger" @click="limparTrabalhoDTO">
            Limpar
          </button>
          <button class="btn btn-primary" @click="cadastrarTrabalhoFunction">
            {{ trabalhoProp.codigoTrabalho ? "Atualizar" : "Salvar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useToast } from "vue-toastification";
import {
  buscarCursos,
  cadastrarTrabalho,
  buscarAlunos,
  buscarOrientadores,
} from "@/services/cadastrarTrabalho.js";
import { defineProps, defineEmits } from "vue"; // Adicione esta linha

const toast = useToast();
const expandido = ref(false);
const editando = ref(false);

// Dados do formulário
const TrabalhoDTO = ref({
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
});

// Listas para selects
const CursosDTO = ref([]);
const AlunosDTO = ref([]);
const OrientadoresDTO = ref([]);

// Props
const props = defineProps({
  trabalhoProp: {
    type: Object,
    default: () => ({}),
  },
});

// Watcher para atualizar o formulário quando a prop mudar
watch(
  () => props.trabalhoProp,
  (newVal) => {
    if (newVal?.codigoTrabalho) {
      TrabalhoDTO.value = {
        ...newVal,
        aluno: {
          codigoUsuario: newVal.aluno?.codigoUsuario || null,
        },
        orientador: {
          codigoUsuario: newVal.orientador?.codigoUsuario || null,
        },
        curso: {
          codigoCurso: newVal.curso?.codigoCurso || null,
        },
      };
      editando.value = true;
      expandido.value = true;
    }
  },
  { deep: true, immediate: true }
);

// Carregar dados iniciais
onMounted(async () => {
  await Promise.all([
    retornarCursos(),
    retornarAlunos(),
    retornarOrientadores(),
  ]);
});

// Métodos
const retornarCursos = async () => {
  try {
    const response = await buscarCursos();
    CursosDTO.value = response.data;
  } catch (error) {
    toast.error("Erro ao carregar cursos: " + error.message);
  }
};

const retornarAlunos = async () => {
  try {
    const response = await buscarAlunos();
    AlunosDTO.value = response.data.records;
  } catch (error) {
    toast.error("Erro ao carregar alunos: " + error.message);
  }
};

const retornarOrientadores = async () => {
  try {
    const response = await buscarOrientadores();
    OrientadoresDTO.value = response.data.records;
  } catch (error) {
    toast.error("Erro ao carregar orientadores: " + error.message);
  }
};

const limparTrabalhoDTO = () => {
  TrabalhoDTO.value = {
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
  editando.value = false;
  emit("limpo");
};

const cadastrarTrabalhoFunction = async () => {
  try {
    // Validações básicas
    if (!TrabalhoDTO.value.titulo) {
      toast.error("Informe o título do trabalho");
      return;
    }

    if (!TrabalhoDTO.value.problema) {
      toast.error("Descreva o problema");
      return;
    }

    if (!TrabalhoDTO.value.justificativa) {
      toast.error("Informe a justificativa");
      return;
    }

    if (!TrabalhoDTO.value.aluno.codigoUsuario) {
      toast.error("Selecione um aluno");
      return;
    }

    if (!TrabalhoDTO.value.curso.codigoCurso) {
      toast.error("Selecione um curso");
      return;
    }

    if (!TrabalhoDTO.value.orientador.codigoUsuario) {
      toast.error("Selecione um orientador");
      return;
    }

    let response;
    if (props.trabalhoProp.codigoTrabalho) {
      response = await cadastrarTrabalho({
        ...TrabalhoDTO.value,
        codigoTrabalho: props.trabalhoProp.codigoTrabalho,
      });
      toast.success("Trabalho atualizado com sucesso!");
    } else {
      response = await cadastrarTrabalho(TrabalhoDTO.value);
      toast.success("Trabalho cadastrado com sucesso!");
    }

    emit("salvo", response.data);
    limparTrabalhoDTO();
  } catch (error) {
    toast.error(error.message);
  }
};

// Emits
const emit = defineEmits(["salvo", "limpo"]);
</script>

<style scoped>
.card-color {
  color: white;
  background-color: #317b3c;
}

.card-body {
  color: black;
  background-color: #d1edb7;
}

.table-container {
  margin: 20px 0;
}

.btn-primary {
  background-color: #317b3c;
  color: white;
  border: none;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.form-control {
  margin-bottom: 0.5rem;
}
</style>
