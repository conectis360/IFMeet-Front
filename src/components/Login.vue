<template>
  <div class="login-container">
    <span v-show="loading" class="spinner-border spinner-border-sm"></span>

    <div class="login-card">
      <div class="login-content">
        <img
          src="~@/assets/img/logo_email.png"
          class="login-logo"
          alt="Logo do sistema"
        />

        <div class="form-group">
          <label for="username">Usuário</label>
          <input
            id="username"
            class="form-control"
            name="username"
            type="text"
            v-model="usuario.username"
            placeholder="Digite seu usuário"
          />
          <ErrorMessage name="username" class="error-feedback" />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            id="password"
            class="form-control"
            name="password"
            type="password"
            v-model="usuario.password"
            placeholder="Digite sua senha"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <button
          class="btn btn-primary login-button"
          :disabled="loading"
          @click="login"
        >
          <span v-if="!loading">Entrar</span>
          <span v-else class="spinner-border spinner-border-sm"></span>
        </button>

        <div v-if="message" class="alert alert-danger mt-3" role="alert">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ErrorMessage } from "vee-validate";
import { realizarLogin } from "@/services/auth.service";

const router = useRouter();
const store = useStore();

// Refs reativas
const usuario = ref({
  username: null,
  password: null,
});

const loading = ref(false);
const message = ref("");

// Computed properties
const loggedIn = computed(() => store.state.auth.status.loggedIn);

// Lifecycle hooks
onMounted(() => {
  if (loggedIn.value) {
    router.push("IFMeet/profile");
  }
});

const login = () => {
  loading.value = true;
  realizarLogin(
    usuario.value,
    (response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("IFMeet/profile");
      window.location.reload();
    },
    (error) => {
      loading.value = false;
      message.value =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  );
};
</script>

<style scoped>
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
#formUsuario,
#formSenha {
  padding-left: 100px;
  margin-left: 70px;
}
</style>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f8f9fa;
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.login-logo {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 0 auto 2rem;
  display: block;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.login-button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
}

.error-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Responsividade para telas menores */
@media (max-width: 576px) {
  .login-card {
    padding: 1.5rem;
  }

  .login-logo {
    max-width: 100%;
    margin-bottom: 1.5rem;
  }
}
</style>
