<template>
  <div>
    <h1>Meu Calendário</h1>
    <CalendarComponent />
  </div>
</template>

<script>
import CalendarComponent from "./components/basic/Calendar.vue"; // Caminho do componente

export default {
  components: {
    CalendarComponent,
  },
};
</script>
