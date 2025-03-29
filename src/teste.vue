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
<style>
.fc .fc-daygrid-day-number {
  color: #317b3c;
}

.fc .fc-col-header-cell-cushion {
  color: #317b3c;
}

.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  background-color: #8dc643;
}

.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
  background-color: #8dc643;
}

.fc .fc-button-group > .fc-button.fc-button-active,
.fc .fc-button-group > .fc-button:active,
.fc .fc-button-group > .fc-button:focus,
.fc .fc-button-group > .fc-button:hover {
  background-color: #317b3c;
}

.fc-toolbar-title {
  color: #317b3c;
}

.fc .fc-button-primary:disabled {
  background-color: #317b3c;
}
</style>
