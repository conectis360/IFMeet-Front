<template>
  <div class="container" style="background-color: #f4f6f9">
    <form>
      <!-- Campo para o código da reunião -->
      <div class="form-group">
        <label for="codigoReuniao">Código da Reunião</label>
        <input
          type="text"
          class="form-control"
          id="codigoReuniao"
          placeholder="Código da Reunião"
          @change="handleChangeCodigoReuniao"
          :value="Ata.reuniao.codigoReuniao"
        />
      </div>

      <!-- Campo para o resumo da ata -->
      <div class="form-group">
        <label for="resumoAta">Resumo da Ata</label>
        <textarea
          class="form-control"
          id="resumoAta"
          rows="4"
          placeholder="Digite o resumo da ata"
          @change="handleChangeResumo"
          :value="Ata.resumo"
        ></textarea>
      </div>

      <!-- Botão para cadastrar a ata -->
      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="cadastrarAta">
          Cadastrar Ata
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { cadastrarAta } from "@/services/cadastrarAta.js";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "CadastrarAta",
  props: {
    ataProp: {
      type: Object,
      default: () => ({
        id: null,
        reuniao: {
          codigoReuniao: null,
        },
        resumo: "",
      }),
    },
  },
  data() {
    return {
      Ata: {
        id: null,
        reuniao: {
          codigoReuniao: null,
        },
        resumo: "",
      },
    };
  },
  mounted() {
    // Se a prop `ataProp` for passada, atualiza o estado interno
    if (this.ataProp?.id != null) {
      this.Ata = this.atualizarAtaDTO(this.ataProp, this.Ata);
    }
  },
  methods: {
    // Método para atualizar o código da reunião
    handleChangeCodigoReuniao(event) {
      this.Ata.reuniao.codigoReuniao = event.target.value;
    },

    // Método para atualizar o resumo da ata
    handleChangeResumo(event) {
      this.Ata.resumo = event.target.value;
    },

    // Método para cadastrar a ata
    async cadastrarAta() {
      try {
        const response = await cadastrarAta(this.Ata);
        if (response) {
          toast.success("Ata cadastrada com sucesso!");
          this.limparFormulario(); // Limpa o formulário após o cadastro
        }
      } catch (error) {
        toast.error("Erro ao cadastrar ata: " + error.message);
      }
    },

    // Método para limpar o formulário
    limparFormulario() {
      this.Ata = {
        id: null,
        reuniao: {
          codigoReuniao: null,
        },
        resumo: "",
      };
    },

    // Método para atualizar o objeto Ata com base na prop
    atualizarAtaDTO(ataProp, Ata) {
      if (ataProp?.id != null) {
        return {
          ...Ata,
          id: ataProp.id,
          reuniao: {
            codigoReuniao: ataProp.reuniao?.codigoReuniao ?? null,
          },
          resumo: ataProp.resumo,
        };
      }
      return Ata;
    },
  },
};
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
