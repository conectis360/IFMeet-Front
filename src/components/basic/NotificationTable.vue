<template>
  <div class="card">
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Autor</th>
            <th>Conteúdo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notification, index) in notifications" :key="index">
            <td>
              <div class="user-info">
                <img
                  class="img-circle img-sm"
                  :src="notification.avatar || 'default-avatar.png'"
                  alt="User Image"
                />
                <span class="username">{{ notification.author }}</span>
              </div>
            </td>
            <td>{{ notification.content }}</td>
            <td>{{ formatarData(notification.timestamp) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import data from "../../helpers/data";

export default {
  name: "NotificationTable",
  mixins: [data],
  props: {
    notifications: {
      type: Array,
      required: true,
      default: () => [],
      validator: (notifications) =>
        notifications.every(
          (notification) =>
            "author" in notification &&
            "timestamp" in notification &&
            "content" in notification
        ),
    },
  },
  methods: {
    formatarData(data) {
      return this.formatarDataHelper(data);
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.card {
  margin: 20px;
}
.user-info {
  display: flex;
  align-items: center;
}
.img-circle.img-sm {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.username {
  font-weight: bold;
}
</style>
