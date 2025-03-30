<template>
  <div>
    <CalendarComponent />
  </div>
</template>

<script>
import CalendarComponent from "@/components/basic/Calendar.vue"; // Caminho do componente

export default {
  components: {
    CalendarComponent,
  },
};
</script>
<style>
/* Dentro do componente MeuCalendario.vue (ou em um arquivo CSS global) */

.fc .fc-daygrid-day-number {
  color: var(--calendar-day-number-color);
}

.fc .fc-col-header-cell-cushion {
  color: var(--calendar-header-color);
}

.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  background-color: var(--calendar-button-bg);
  font-weight: bold;
}

.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
  font-weight: bold;
  background-color: var(--calendar-button-bg);
}

.fc .fc-button-group > .fc-button.fc-button-active,
.fc .fc-button-group > .fc-button:active,
.fc .fc-button-group > .fc-button:focus,
.fc .fc-button-group > .fc-button:hover {
  font-weight: bold;
  background-color: var(--calendar-button-active-bg);
}

.fc-toolbar-title {
  color: var(--calendar-title-color);
}

.fc .fc-button-primary:disabled {
  font-weight: bold;
  background-color: var(--calendar-button-disabled-bg);
}

.fc-toolbar-title {
  text-transform: uppercase;
}

.fc-h-event .fc-event-main {
  color: var(--calendar-event-text-color);
}

.fc-v-event .fc-event-title {
  color: var(--calendar-event-text-color);
}

.fc-timegrid-event .fc-event-time {
  font-weight: bold;
  color: var(--calendar-time-text-color);
}

.custom-calendar {
  background-color: var(--calendar-bg-color);
}
</style>
