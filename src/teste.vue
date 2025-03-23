<template>
  <div v-if="registrar" id="formularioRegistrarUsuario">
    <section class="vh-100" style="background-color: #eee">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Registre-se
                    </p>
                    <form class="mx-1 mx-md-4">
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            :value="conviteDTO.nomeAluno"
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            disabled
                          />
                          <label class="form-label" for="form3Example1c"
                            >Nome Completo</label
                          >
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            @input="
                              (event) =>
                                (registrarUsuarioDTO.usuario =
                                  event.target.value)
                            "
                          />
                          <label class="form-label" for="form3Example1c"
                            >Nome de Usuario</label
                          >
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            :value="conviteDTO.emailAluno"
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                            disabled
                          />
                          <label class="form-label" for="form3Example3c"
                            >Email</label
                          >
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            class="form-control"
                            id="password"
                            type="password"
                            v-model="passwordValue"
                            @input="
                              (event) =>
                                (registrarUsuarioDTO.senha = event.target.value)
                            "
                          />
                          <password-meter
                            class="form-control"
                            :password="passwordValue"
                          />
                          <label class="form-label" for="form3Example4c"
                            >Senha</label
                          >
                        </div>
                      </div>

                      <div
                        class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      >
                        <button
                          type="button"
                          class="btn btn-success btn-lg"
                          @click="cadastraUsuario()"
                        >
                          Confirmar e Registrar
                        </button>
                      </div>
                    </form>
                  </div>
                  <div
                    id="logoVertical"
                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                  >
                    <img
                      src="../public/images/logo_vertical.png"
                      class="img-fluid"
                      alt="logo ifsul"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-if="codigoInvalido">
    <div class="container h-100" style="padding-top: 360px">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <h2 style="padding-left: 260px; color: red">
                Seu Código é invalido ou expirou
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
<script>
import { registrarUsuario } from "@/services/auth.service";
import passwordMeter from "vue-simple-password-meter";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "FormularioRegistrarUsuario",
  components: {
    passwordMeter,
  },
  data() {
    return {
      passwordValue: null,
      loading: true,
      codigoInvalido: false,
      registrar: false,
      email: "",
      conviteDTO: {
        codigoConvite: "",
        nomeAluno: "",
        emailAluno: "",
        codigoSecreto: "",
      },
      registrarUsuarioDTO: {
        usuario: "",
        senha: "",
        email: "",
        codigoSecreto: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.verificarCredenciais();
  },
  methods: {
    verificarCredenciais() {
      let codigo = this.$route.query.codigo;
      console.log(codigo);
    },
    bloqueiaCadastro() {
      this.codigoInvalido = true;
      this.registrar = false;
    },
    liberaCadastro() {
      this.codigoInvalido = false;
      this.registrar = true;
    },
    cadastraUsuario() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      this.registrarUsuarioDTO.codigoSecreto = this.conviteDTO.codigoSecreto;
      this.registrarUsuarioDTO.email = this.conviteDTO.emailAluno;
      console.log(this.registrarUsuarioDTO);
      registrarUsuario(
        this.registrarUsuarioDTO,
        (response) => {
          loader.hide();
          toast.success(response);
        },
        (error) => {
          this.message = loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
  },
};
</script>
