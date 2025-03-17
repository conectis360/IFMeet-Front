<template>
  <button type="button" data-toggle="modal" data-target="#modal-update-ata" class="btn btn-primary" @click="updateAta()">
    <i class="fa fa-pen"></i>
  </button>

  <form class="login-form modalAtualizar" @submit.prevent="updateAta">
    <div class="modal fade show" id="modal-update-ata" style="padding-right: 17px;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Atualizar Ata:</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="emailInput" class="form-label">Reunião</label> <br>
              <label for="emailInput" class="form-label">Data: {{ this.ataDTO.reuniao.data }}</label><br>
              <label for="emailInput" class="form-label">Orientador: {{ this.ataDTO.reuniao.orientador.nome }}</label><br>
              <label for="emailInput" class="form-label">Orientando: {{ this.ataDTO.reuniao.orientando.nome }}</label><br>
              <label for="emailInput" class="form-label">Pauta: {{ this.ataDTO.reuniao.pauta }}</label><br>
            </div>
            <div class="mb-3">
              <label for="emailInput" class="form-label">Resumo:</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="ataDTO.resumo"></textarea>
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
import { buscarAta } from "@/services/cadastrarAta.js";
import { useToast } from "vue-toastification";

const toast = useToast()

export default {
  name: "AtualizarAta",
  components: {
  },
  props: {
    ataId: Number,
  },
  data() {
    return {
      email: "",
      fullPage: true,
      ataDTO: {
        "reuniao": {
          "data": null,
          "pauta": null,
          "orientador": {
            "nome": "",
          },
          "orientando": {
            "nome": "",
          },
        },
      }
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    updateAta() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
        console.log('ata id: ' + this.ataId)
        buscarAta(this.ataId, (response) => {
            if (response) {
              loader.hide()
              this.ataDTO = response.data
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
