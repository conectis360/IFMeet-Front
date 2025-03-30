<template>
  <div>
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
  font-weight: bold;
}

.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
  font-weight: bold;
  background-color: #8dc643;
}

.fc .fc-button-group > .fc-button.fc-button-active,
.fc .fc-button-group > .fc-button:active,
.fc .fc-button-group > .fc-button:focus,
.fc .fc-button-group > .fc-button:hover {
  font-weight: bold;
  background-color: #317b3c;
}

.fc-toolbar-title {
  color: #317b3c;
}

.fc .fc-button-primary:disabled {
  font-weight: bold;
  background-color: #317b3c;
}

.fc-toolbar-title {
  text-transform: uppercase;
}

.fc-h-event .fc-event-main {
  color: #000;
}

.fc-v-event .fc-event-title {
  color: #000;
}

.fc-timegrid-event .fc-event-time {
  font-weight: bold;
  color: #000;
}

.custom-calendar {
  background-color: #f0fff0;
}
</style>
