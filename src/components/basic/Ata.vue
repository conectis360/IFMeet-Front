<template>
  <div class="card card-color" :class="{ 'collapsed-card': !expandido }">
    <div class="card-header">
      <h3 class="card-title">Atas de Reunião</h3>
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
      <!-- Formulário de Ata -->
      <div class="d-flex flex-wrap align-items-end gap-2 mb-4">
        <!-- Evento/Reunião -->
        <div class="flex-grow-1 pe-2 col-sm-6">
          <label class="form-label">Evento/Reunião *</label>
          <select
            class="form-control"
            v-model="ataDTO.evento.codigoEvento"
            :disabled="editando"
            required
          >
            <option value="">Selecione um evento</option>
            <option
              v-for="evento in eventos"
              :value="evento.codigoEvento"
              :key="evento.codigoEvento"
            >
              {{ evento.title }} - {{ evento.trabalho.titulo }}
            </option>
          </select>
        </div>

        <!-- Pauta -->
        <div class="flex-grow-1 pe-2 col-12">
          <label class="form-label">Pauta *</label>
          <textarea
            class="form-control"
            rows="2"
            v-model="ataDTO.pauta"
            required
            placeholder="Itens que serão discutidos na reunião"
          ></textarea>
        </div>

        <!-- Resumo -->
        <div class="flex-grow-1 pe-2 col-12">
          <label class="form-label">Resumo *</label>
          <textarea
            class="form-control"
            rows="4"
            v-model="ataDTO.resumo"
            required
            placeholder="Resumo do que foi discutido e decidido"
          ></textarea>
        </div>

        <!-- Botões -->
        <div
          class="flex-grow-1 pe-2 col-12 d-flex justify-content-end gap-2 mt-2"
        >
          <button class="btn btn-primary" @click="salvarAta">
            {{ editando ? "Atualizar" : "Salvar Ata" }}
          </button>
          <button class="btn btn-danger" @click="limparFormulario">
            Limpar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import { useToast } from "vue-toastification";
import {
  cadastrarAta as apiSalvarAta,
  atualizarAta,
} from "@/services/cadastrarAta.js";
import { buscarEventosCalendario } from "@/services/calendarService.js";

const props = defineProps({
  ataParaEdicao: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["ata-salva"]);

const toast = useToast();
const expandido = ref(false);
const editando = ref(false);
const eventos = ref([]);
const ataDTO = ref({
  evento: {
    codigoEvento: null,
  },
  pauta: null,
  resumo: null,
});

// Watcher para observar mudanças na prop ataParaEdicao
watch(
  () => props.ataParaEdicao,
  (novaAta) => {
    if (novaAta) {
      editarAta(novaAta);
    }
  },
  { deep: true }
);

const editarAta = (ata) => {
  ataDTO.value = {
    codigoAta: ata.codigoAta,
    evento: {
      codigoEvento: ata.evento?.codigoEvento || null,
    },
    pauta: ata.pauta,
    resumo: ata.resumo,
  };
  editando.value = true;
  expandido.value = true; // Expande o card ao editar
};

const limparFormulario = () => {
  ataDTO.value = {
    evento: { codigoEvento: null },
    pauta: null,
    resumo: null,
  };
  editando.value = false;
};

const salvarAta = async () => {
  try {
    // Validações básicas
    if (!ataDTO.value.evento.codigoEvento) {
      toast.error("Selecione um evento/reunião");
      return;
    }

    if (!ataDTO.value.pauta) {
      toast.error("Informe a pauta da reunião");
      return;
    }

    if (!ataDTO.value.resumo) {
      toast.error("Informe o resumo da reunião");
      return;
    }

    const payload = { ...ataDTO.value };
    let response;

    if (editando.value) {
      response = await atualizarAta(ataDTO.value.codigoAta, payload);
      toast.success("Ata atualizada com sucesso!");
    } else {
      response = await apiSalvarAta(payload);
      toast.success("Ata cadastrada com sucesso!");
    }

    limparFormulario();
    emit("ata-salva", response.data);
  } catch (error) {
    toast.error(error.message || "Erro ao salvar ata");
  }
};

const carregarEventos = async () => {
  try {
    const response = await buscarEventosCalendario();
    if (response?.data) {
      eventos.value = response.data.records;
    }
  } catch (error) {
    toast.error(error.message || "Erro ao buscar eventos");
    eventos.value = [];
  }
};

onMounted(async () => {
  await carregarEventos();
});
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
