<template>
  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
  <div class="col-md-12 center">
    <div class="col-md-8 card card-container">
      <div id="login">
        <img
          id="profile-img"
          src="~@/assets/img/logo_email.png"
          class="profile-img-card"
        />
        <div class="col-md-8 form-group" id="formUsuario">
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label" for="usuario"
              ><h4>Usuario</h4></label
            >
            <div class="col-sm-5">
              <input
                class="form-control"
                name="username"
                type="text"
                v-model="usuario.username"
              />
            </div>
            <ErrorMessage name="username" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-8 form-group" id="formSenha">
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label" for="password"
              ><h4>Senha</h4></label
            >
            <div class="col-sm-5">
              <input
                class="form-control"
                name="password"
                type="password"
                v-model="usuario.password"
              />
            </div>
          </div>
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="col-md-2 form-group">
          <button
            class="btn btn-success btn-block"
            :disabled="loading"
            @click="realizarLogin()"
          >
            <span>Entrar</span>
          </button>
        </div>
      </div>

      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ErrorMessage } from "vee-validate";
import { realizarLogin } from "@/services/auth.service";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      usuario: {
        username: null,
        password: null,
      },
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    realizarLogin() {
      realizarLogin(
        this.usuario,
        (response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.$router.push("/profile");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        },
        () => {}
      );
    },
  },
};
</script>
<style>
#profile-img {
  width: 80%;
  height: 90%;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 200px;
}

#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#formUsuario, #formSenha {
  padding-left:100px;
  margin-left:70px;
}
</style>
