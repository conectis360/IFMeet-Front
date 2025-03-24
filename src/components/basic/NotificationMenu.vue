<template>
  <li class="nav-item dropdown">
    <a class="nav-link" data-toggle="dropdown" href="#">
      <i class="far fa-bell"></i>
      <span v-if="total > 0" class="badge badge-warning navbar-badge">
        {{ total }}
      </span>
    </a>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
      <span class="dropdown-item dropdown-header">
        {{ total }} Notificações
      </span>
      <div class="dropdown-divider"></div>
      <a
        v-for="(notification, index) in notifications"
        :key="index"
        href="#"
        class="dropdown-item"
        @click="handleNotificationClick(notification)"
      >
        <i :class="notification.icone + ' mr-2'"></i>
        {{ notification.tipoNotificacao }}
        <span class="float-right text-muted text-sm">{{
          notification.quantidadeNotificacoes
        }}</span>
      </a>
      <div class="dropdown-divider"></div>
      <a href="#" class="dropdown-item dropdown-footer" @click="handleSeeAll">
        <router-link to="/notificacoes" class="nav-link">
          <i class="far fa-bell"></i> Ver todas Notificações
        </router-link>
      </a>
    </div>
  </li>
</template>

<script>
import { buscarCountNotificacoes } from "../../services/notificacoes";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "NotificationMenu",
  props: {},
  data() {
    return {
      notifications: [], // Estado inicial das notificações
    };
  },
  mounted() {
    this.carregarDados(); // Carrega os dados pela primeira vez
    this.iniciarAtualizacaoAutomatica(); // Inicia a atualização automática
  },
  beforeUnmount() {
    this.pararAtualizacaoAutomatica(); // Para a atualização automática ao destruir o componente
  },
  methods: {
    // Executa a ação da notificação e emite um evento
    handleNotificationClick(notification) {
      if (notification.action && typeof notification.action === "function") {
        notification.action();
      }
      this.$emit("notification-click", notification);
    },
    // Ação para "Ver todas as notificações"
    handleSeeAll() {
      this.$emit("see-all");
    },
    carregarDados() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      buscarCountNotificacoes(
        (response) => {
          if (response) {
            loader.hide();
            this.total = response.data?.total;
            this.notifications = response.data?.quantidadeNotificacoesDtoList;
          }
        },
        (error) => {
          loader.hide();
          toast.error(error);
        },
        () => {}
      );
    },
    // Método para iniciar a atualização automática
    iniciarAtualizacaoAutomatica() {
      this.intervalo = setInterval(() => {
        this.carregarDados();
      }, 300000); // 5 minutos (300.000 milissegundos)
    },
    // Método para parar a atualização automática
    pararAtualizacaoAutomatica() {
      if (this.intervalo) {
        clearInterval(this.intervalo); // Limpa o intervalo
        this.intervalo = null;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados (opcional) */
.nav-item.dropdown {
  cursor: pointer;
}
</style>
