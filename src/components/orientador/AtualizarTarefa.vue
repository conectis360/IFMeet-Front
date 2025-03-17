<template>
  <button type="button" data-toggle="modal" data-target="#modal-update-reuniao" class="btn btn-primary" @click="updateTarefa()">
    <i class="fa fa-pen"></i>
  </button>

  <form class="login-form" @submit.prevent="enviarEmail">
    <div class="modal fade show modalAtualizar" id="modal-update-reuniao" style="padding-right: 17px;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Atualizar Tarefa:</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="emailInput" class="form-label">Tarefa:</label><br>
              <label for="emailInput" class="form-label">Data: {{ tarefaDTO.dataInicio }}</label><br>
              <label for="emailInput" class="form-label">Descrição: {{ tarefaDTO.descricao }}</label><br>

            </div>
            <div class="mb-3">
              <label for="emailInput" class="form-label">Finalizada:</label><br>
              <div>
                <input type="radio" id="dewey" name="drone" value="dewey" />
                <label for="dewey">SIM</label>
              </div>
              <div>
                <input type="radio" id="dewey" name="drone" value="dewey" />
                <label for="dewey">NÃO</label>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
            <input type="submit" class="btn btn-success" value="Atualizar">
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<style>
.modal-backdrop {
  display: none;
}
.modalAtualizar {
  color: black;
}
</style>
<script>
import { buscarTarefa } from "@/services/cadastrarTarefa.js";
import { useToast } from "vue-toastification";

const toast = useToast()

export default {
  name: "AtualizarTarefa",
  components: {
  },
  props: {
    tarefaId: Number,
  },
  data() {
    return {
      email: "",
      fullPage: true,
      tarefaDTO: {
        "dataInicio": null,
        "descricao": null,
        "finalizada": null,
      }
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    updateTarefa() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarTarefa(this.tarefaId, (response) => {
            if (response) {
              loader.hide()
              this.tarefaDTO = response.data
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
