<template>
  <div>
    <div class="availability-controls">
      <h3>Selecione os dias disponíveis:</h3>
      <div class="days-checkbox">
        <label v-for="day in daysOfWeek" :key="day.value">
          <input
            type="checkbox"
            v-model="availableDays"
            :value="day.value === 0 ? 6 : day.value - 1"
            @change="updateCalendar"
          />
          {{ day.label }}
        </label>
      </div>
    </div>

    <CalendarComponent ref="calendar" />
  </div>
</template>

<script>
import CalendarComponent from "@/components/basic/Calendar.vue";
import { ref, onMounted } from "vue";

export default {
  components: {
    CalendarComponent,
  },
  setup() {
    const availableDays = ref([]);
    const calendar = ref(null);

    // Dias da semana com valores corretos (0=Domingo, 1=Segunda,...,6=Sábado)
    const daysOfWeek = [
      { value: 0, label: "Domingo" },
      { value: 1, label: "Segunda" },
      { value: 2, label: "Terça" },
      { value: 3, label: "Quarta" },
      { value: 4, label: "Quinta" },
      { value: 5, label: "Sexta" },
      { value: 6, label: "Sábado" },
    ];

    const updateCalendar = () => {
      console.log(availableDays.value);
      if (!Array.isArray(availableDays.value)) {
        availableDays.value = [];
      }

      localStorage.setItem(
        "availableDays",
        JSON.stringify(availableDays.value)
      );

      const days = document.querySelectorAll(".fc-day");
      if (!days) return;

      days.forEach((day) => {
        day.classList.remove("day-available");
        const dateStr = day.getAttribute("data-date");
        if (!dateStr) return;

        try {
          const date = new Date(dateStr);
          // getDay() retorna 0-6 (0=Domingo, 1=Segunda,...,6=Sábado)
          const dayOfWeek = date.getDay();

          // Verifica se o dia da semana está na lista de disponíveis
          if (availableDays.value.includes(dayOfWeek)) {
            day.classList.add("day-available");
          }
        } catch (e) {
          console.error("Erro ao processar data:", e);
        }
      });
    };

    onMounted(() => {
      try {
        const savedDays = localStorage.getItem("availableDays");
        if (savedDays) {
          const parsed = JSON.parse(savedDays);
          availableDays.value = Array.isArray(parsed) ? parsed : [];
        }
      } catch (e) {
        console.error("Erro ao carregar dias:", e);
        availableDays.value = [];
      }

      setTimeout(updateCalendar, 100);

      if (calendar.value?.calendar) {
        calendar.value.calendar.on("datesSet", updateCalendar);
      }
    });

    return {
      availableDays,
      daysOfWeek,
      calendar,
      updateCalendar,
    };
  },
};
</script>

<style>
/* Estilos dos dias disponíveis */
.fc-day.day-available {
  background-color: rgba(56, 142, 60, 0.15) !important;
}

.fc-day.day-available .fc-daygrid-day-number {
  color: #388e3c !important;
  font-weight: bold;
}

.fc-day.day-available:hover {
  background-color: rgba(56, 142, 60, 0.25) !important;
}

/* Estilos dos controles */
.availability-controls {
  padding: 15px;
  background: #f8f9fa;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.availability-controls h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.1rem;
}

.days-checkbox {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.days-checkbox label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 10px;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #ddd;
  transition: all 0.2s;
}

.days-checkbox label:hover {
  background: #f0f0f0;
}

.days-checkbox input {
  cursor: pointer;
  accent-color: #388e3c;
}

/* Mantém os estilos originais do calendário */
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
