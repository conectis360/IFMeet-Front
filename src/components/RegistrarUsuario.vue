<template>
  <a href="" class="nav-link" data-toggle="modal" data-target="#modal-default">
    <i class="fa fa-user"></i>
    <p style="padding-left: 10px;">
      Convidar Aluno
    </p>
  </a>

  <form class="login-form" @submit.prevent="enviarEmail">
    <div class="modal fade show" id="modal-default" style="padding-right: 17px;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Enviar convite:</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="emailInput" class="form-label">Nome Aluno</label>
              <input type="text" class="form-control" id="nomeInput" aria-describedby="emailHelp"
                v-model="dadosFormulario.nomeAluno">
            </div>
            <div class="mb-3">
              <label for="emailInput" class="form-label">Email</label>
              <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp"
                v-model="dadosFormulario.emailAluno">
              <div id="emailHelp" class="form-text">Jamais compartilharemos seu e-mail com alguém.</div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
            <input type="submit" class="btn btn-success" value="Enviar E-mail">
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
</style>
<script>
import { enviarConvite } from "@/services/auth.service";
import { useToast } from "vue-toastification";

const toast = useToast()

export default {
  name: "RegistrarUsuario",
  components: {
  },
  data() {
    return {
      email: "",
      fullPage: true,
      dadosFormulario: {
        "nomeAluno": null,
        "emailAluno": null,
        "usuarioResponsavel": {
          "id": 1,
        },
      }
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    enviarEmail() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      enviarConvite(
        this.dadosFormulario,
        (response) => {
          if (response)
          loader.hide()
          toast.success("Email enviado com Sucesso!");
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
