<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">Cadastro de Usuário</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="usuario" class="form-label">Nome de Usuário</label>
                <input
                  id="usuario"
                  v-model.trim="formData.usuario"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.usuario }"
                  required
                  minlength="3"
                />
                <div v-if="errors.usuario" class="invalid-feedback">
                  {{ errors.usuario }}
                </div>
              </div>

              <div class="mb-3">
                <label for="nome" class="form-label">Nome Completo</label>
                <input
                  id="nome"
                  v-model.trim="formData.nome"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.nome }"
                  required
                />
                <div v-if="errors.nome" class="invalid-feedback">
                  {{ errors.nome }}
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input
                  id="email"
                  v-model.trim="formData.email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors.email }"
                  required
                />
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>

              <div class="mb-3">
                <label for="senha" class="form-label">Senha</label>
                <div class="input-group">
                  <input
                    id="senha"
                    v-model.trim="formData.senha"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    :class="{ 'is-invalid': errors.senha }"
                    required
                    minlength="4"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="showPassword = !showPassword"
                  >
                    {{ showPassword ? "👁️" : "👁️‍🗨️" }}
                  </button>
                </div>
                <div v-if="errors.senha" class="invalid-feedback">
                  {{ errors.senha }}
                </div>
              </div>

              <div class="mb-4">
                <label for="tipoUsuario" class="form-label"
                  >Tipo de Usuário</label
                >
                <select
                  id="tipoUsuario"
                  v-model="formData.tipoUsuario"
                  class="form-select"
                  :class="{ 'is-invalid': errors.tipoUsuario }"
                  required
                >
                  <option value="">Selecione um tipo</option>
                  <option value="ORIENTANDO">Orientando 🎓</option>
                  <option value="ORIENTADOR">Orientador 👨‍🏫</option>
                  <option value="ADMINISTRADOR">Administrador 🖥️</option>
                </select>
                <div v-if="errors.tipoUsuario" class="invalid-feedback">
                  {{ errors.tipoUsuario }}
                </div>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="submit"
                  class="btn btn-primary me-md-2"
                  :disabled="isSubmitting"
                >
                  <span
                    v-if="isSubmitting"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {{ isSubmitting ? "Cadastrando..." : "Cadastrar" }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="resetForm"
                >
                  Limpar
                </button>
              </div>

              <div v-if="submitError" class="alert alert-danger mt-3 mb-0">
                {{ submitError }}
              </div>
              <div v-if="submitSuccess" class="alert alert-success mt-3 mb-0">
                Cadastro realizado com sucesso!
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "CadastroForm",

  setup() {
    const formData = reactive({
      usuario: "",
      nome: "",
      email: "",
      senha: "",
      tipoUsuario: "",
    });

    const errors = reactive({
      usuario: "",
      nome: "",
      email: "",
      senha: "",
      tipoUsuario: "",
    });

    const showPassword = ref(false);
    const isSubmitting = ref(false);
    const submitError = ref("");
    const submitSuccess = ref(false);

    const validateForm = () => {
      let isValid = true;

      // Reset errors
      Object.keys(errors).forEach((key) => (errors[key] = ""));

      // Simple validation
      if (!formData.usuario.trim()) {
        errors.usuario = "Nome de usuário é obrigatório";
        isValid = false;
      } else if (formData.usuario.length < 3) {
        errors.usuario = "Mínimo de 3 caracteres";
        isValid = false;
      }

      if (!formData.nome.trim()) {
        errors.nome = "Nome completo é obrigatório";
        isValid = false;
      }

      if (!formData.email.trim()) {
        errors.email = "E-mail é obrigatório";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "E-mail inválido";
        isValid = false;
      }

      if (!formData.senha) {
        errors.senha = "Senha é obrigatória";
        isValid = false;
      } else if (formData.senha.length < 4) {
        errors.senha = "Mínimo de 4 caracteres";
        isValid = false;
      }

      if (!formData.tipoUsuario) {
        errors.tipoUsuario = "Selecione um tipo de usuário";
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      isSubmitting.value = true;
      submitError.value = "";
      submitSuccess.value = false;

      try {
        // Simular chamada API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Reset form on success
        resetForm();
        submitSuccess.value = true;
      } catch (error) {
        submitError.value = "Erro ao cadastrar. Tente novamente.";
      } finally {
        isSubmitting.value = false;
      }
    };

    const resetForm = () => {
      Object.keys(formData).forEach((key) => (formData[key] = ""));
      Object.keys(errors).forEach((key) => (errors[key] = ""));
      submitSuccess.value = false;
      submitError.value = "";
      showPassword.value = false;
    };

    return {
      formData,
      errors,
      showPassword,
      isSubmitting,
      submitError,
      submitSuccess,
      handleSubmit,
      resetForm,
    };
  },
};
</script>

<style scoped>
/* Estilos opcionais para ajustes específicos */
.card {
  border-radius: 15px;
}

.form-select {
  cursor: pointer;
}

.toggle-password {
  cursor: pointer;
}
</style>
