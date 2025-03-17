<template>
  <button type="button" data-toggle="modal" data-target="#modal-update-reuniao" class="btn btn-primary" @click="updateReuniao()">
    <i class="fa fa-pen"></i>
  </button>

  <form class="login-form" @submit.prevent="enviarEmail">
    <div class="modal fade show modalAtualizar" id="modal-update-reuniao" style="padding-right: 17px;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Atualizar Reunião:</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="emailInput" class="form-label">REUNIAO:</label><br>
              <label for="emailInput" class="form-label" v-if="reuniaoDTO.aceita == true">Data: {{ reuniaoDTO.data }}</label><br>
              <label for="emailInput" class="form-label" v-if="reuniaoDTO.aceita == false">Data Proposta: {{ reuniaoDTO.data }}</label><br>
              <label for="emailInput" class="form-label">Orientador: {{ reuniaoDTO.orientador.nome }}</label><br>
              <label for="emailInput" class="form-label">Pauta: {{ reuniaoDTO.pauta }}</label><br>

            </div>
            <div class="mb-3" v-if="reuniaoDTO.aceita == false">
              <label for="emailInput" class="form-label">Aceitar Reunião:</label><br>
              <div>
                <input type="radio" id="dewey" name="drone" value="dewey" />
                <label for="dewey">SIM</label>
              </div>
              <div>
                <input type="radio" id="dewey" name="drone" value="dewey" />
                <label for="dewey">NÃO</label>
              </div>
            </div>
            <div class="mb-3" v-if="reuniaoDTO.aceita == true">
              <label for="emailInput" class="form-label">Realizada:</label><br>
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
            <input type="submit" class="btn btn-success" v-if="reuniaoDTO.aceita == false" value="Aceitar">
            <input type="submit" class="btn btn-success" v-if="reuniaoDTO.aceita == true" value="Atualizar">
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
import { buscarReuniao } from "@/services/cadastrarReuniao.js";
import { useToast } from "vue-toastification";

const toast = useToast()

export default {
  name: "RegistrarUsuario",
  components: {
  },
  props: {
    reuniaoId: Number,
  },
  data() {
    return {
      email: "",
      fullPage: true,
      reuniaoDTO: {
        "data": null,
          "pauta": null,
          "orientador": {
            "nome": "",
          },
          "orientando": {
            "nome": "",
          },
      }
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    updateReuniao() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
        console.log('reuniao id: ' + this.reuniaoId)
        buscarReuniao(this.reuniaoId, (response) => {
            if (response) {
              loader.hide()
              this.reuniaoDTO = response.data
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
