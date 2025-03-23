<template>
  <div>
    <NotificationTable :notifications="notifications" />
    <div>
      <MySelect2
        :options="estados"
        v-model="selectedValue"
        label="Escolha uma opção"
        placeholder="Selecione..."
        @change="handleChange"
      />
      <p>Estado Selecionado: {{ estadoSelecionado }}</p>
    </div>
  </div>
</template>

<script>
import NotificationTable from "./components/basic/NotificationTable.vue";
import MySelect2 from "./components/formularios/MySelect2.vue";

export default {
  components: {
    NotificationTable,
    MySelect2,
  },
  data() {
    return {
      notifications: [
        {
          author: "Maria Gonzales",
          timestamp: "2023-10-01T20:03:00",
          content:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          avatar:
            "https://i.pinimg.com/474x/47/17/ce/4717ce89b32aebad31c7c1d343550303.jpg", // URL da imagem do avatar
        },
        {
          author: "Luna Stark",
          timestamp: "2025-03-21T20:03:00",
          content:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          avatar:
            "https://i.pinimg.com/736x/14/64/f5/1464f5cbd3244c9d684c1e5c923cebea.jpg", // URL da imagem do avatar
        },
        {
          author: "Luna Stark",
          timestamp: "2025-03-22T20:03:00",
          content:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          avatar:
            "https://i.pinimg.com/736x/14/64/f5/1464f5cbd3244c9d684c1e5c923cebea.jpg", // URL da imagem do avatar
        },
        {
          author: "Maria Gonzales",
          timestamp: "2025-03-18T20:03:00",
          content:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          avatar:
            "https://i.pinimg.com/474x/47/17/ce/4717ce89b32aebad31c7c1d343550303.jpg", // URL da imagem do avatar
        },
        // Adicione mais notificações aqui
      ],
      estados: [
        { value: "AL", text: "Alabama" },
        { value: "AK", text: "Alaska" },
        { value: "CA", text: "California" },
        { value: "DE", text: "Delaware" },
        { value: "TN", text: "Tennessee" },
        { value: "TX", text: "Texas" },
        { value: "WA", text: "Washington" },
      ],
      estadoSelecionado: null,
    };
  },
  methods: {
    handleChange(value) {
      this.estadoSelecionado = value;
    },
  },
};
</script>

<style>
/* Estilos globais (opcional) */
</style>
