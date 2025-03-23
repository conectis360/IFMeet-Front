<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :class="{ show: isOpen }"
    :style="{ display: isOpen ? 'block' : 'none' }"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="exampleModalLabel">{{ titulo }}</h3>
          <button class="btn" @click="fecharModal" aria-label="Fechar">
            <i
              class="fa fa-window-close"
              aria-hidden="true"
              style="size: 10%"
            ></i>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
          <!-- Slot para conteúdo dinâmico -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="fecharModal">
            Fechar
          </button>
          <button type="button" class="btn btn-primary" @click="confirmar">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Backdrop do modal -->
  <div v-if="isOpen" class="modal-backdrop fade show"></div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    titulo: {
      type: String,
      default: "Título do Modal",
    },
  },
  data() {
    return {
      isOpen: false, // Controla a visibilidade do modal
    };
  },
  methods: {
    abrirModal() {
      this.isOpen = true;
    },
    fecharModal() {
      this.isOpen = false;
    },
    confirmar() {
      this.$emit("confirmar");
    },
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
</style>
