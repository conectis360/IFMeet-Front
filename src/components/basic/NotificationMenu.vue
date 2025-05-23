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
        {{ notification.icone }}
        {{ notification.tipoNotificacao }}
        <span class="float-right text-muted text-sm">{{
          notification.quantidadeNotificacoes
        }}</span>
      </a>
      <div class="dropdown-divider"></div>
      <router-link
        :to="{ name: 'Notificacoes' }"
        class="dropdown-item dropdown-footer"
        @click="handleSeeAll"
      >
        <i class="far fa-bell"></i> Ver todas Notificações
      </router-link>
    </div>
  </li>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import { buscarCountNotificacoes } from "../../services/notificacoes";

export default {
  name: "NotificationMenu",
  emits: ["notification-click", "see-all"],
  setup(_, { emit }) {
    const toast = useToast();
    const notifications = ref([]);
    const total = ref(0);
    const intervalo = ref(null);

    const handleNotificationClick = (notification) => {
      if (notification.action && typeof notification.action === "function") {
        notification.action();
      }
      emit("notification-click", notification);
    };

    const handleSeeAll = () => {
      emit("see-all");
    };

    const carregarDados = async () => {
      try {
        const response = await buscarCountNotificacoes();

        if (response) {
          total.value = response.total || 0;
          notifications.value = response.quantidadeNotificacoesDtoList || [];
        }
      } catch (error) {
        toast.error(error.message || "Erro ao carregar notificações");
      }
    };

    const iniciarAtualizacaoAutomatica = () => {
      intervalo.value = setInterval(carregarDados, 300000);
    };

    const pararAtualizacaoAutomatica = () => {
      if (intervalo.value) {
        clearInterval(intervalo.value);
        intervalo.value = null;
      }
    };

    onMounted(() => {
      carregarDados();
      iniciarAtualizacaoAutomatica();
    });

    onUnmounted(pararAtualizacaoAutomatica);

    return {
      notifications,
      total,
      handleNotificationClick,
      handleSeeAll,
    };
  },
};
</script>

<style scoped>
.nav-item.dropdown {
  cursor: pointer;
}

.dropdown-item.dropdown-footer {
  padding: 0;
}

.dropdown-item.dropdown-footer .nav-link {
  color: inherit;
  padding: 0.5rem 1.5rem;
}
</style>
