<template>
    <li class="nav-item dropdown">
      <a class="nav-link" data-toggle="dropdown" href="#">
        <i class="far fa-bell"></i>
        <span v-if="notifications.length > 0" class="badge badge-warning navbar-badge">
          {{ notifications.length }}
        </span>
      </a>
      <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span class="dropdown-item dropdown-header">
          {{ notifications.length }} Notifications
        </span>
        <div class="dropdown-divider"></div>
        <a
          v-for="(notification, index) in notifications"
          :key="index"
          href="#"
          class="dropdown-item"
          @click="handleNotificationClick(notification)"
        >
          <i :class="notification.icon + ' mr-2'"></i> {{ notification.message }}
          <span class="float-right text-muted text-sm">{{ notification.time }}</span>
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item dropdown-footer" @click="handleSeeAll">
          See All Notifications
        </a>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    name: "NotificationMenu",
    props: {
      notifications: {
        type: Array,
        required: true,
        default: () => [],
        validator: (notifications) =>
          notifications.every(
            (notification) =>
              "icon" in notification &&
              "message" in notification &&
              "time" in notification
          ),
      },
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
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados (opcional) */
  .nav-item.dropdown {
    cursor: pointer;
  }
  </style>