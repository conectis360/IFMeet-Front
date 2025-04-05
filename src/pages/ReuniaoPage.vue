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
            @dateClick="handleDateClick"
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
import { useToast } from "vue-toastification";
const toast = useToast();

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

    const handleDateClick = (info) => {
      const date = new Date(info.date);
      const dayOfWeek = date.getDay();

      if (!availableDays.value.includes(dayOfWeek)) {
        toast.warning("Este dia não está disponível para agendamento");
        info.dayEl.style.pointerEvents = "none";
        return false; // Impede a abertura do modal
      }

      // Permite a abertura do modal para dias disponíveis
      return true;
    };

    const updateCalendar = () => {
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
        day.classList.remove("day-available", "day-blocked");
        const dateStr = day.getAttribute("data-date");
        if (!dateStr) return;

        try {
          const date = new Date(dateStr);
          const dayOfWeek = date.getDay();

          if (availableDays.value.includes(dayOfWeek)) {
            day.classList.add("day-available");
          } else {
            day.classList.add("day-blocked");
            day.style.pointerEvents = "none";
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
          availableDays.value = JSON.parse(savedDays);
        }
      } catch (e) {
        console.error("Erro ao carregar dias:", e);
        availableDays.value = [];
      }

      setTimeout(updateCalendar, 100);
    });

    if (calendar.value?.$el) {
      const observer = new MutationObserver(() => {
        updateCalendar();
      });

      observer.observe(calendar.value.$el, {
        childList: true,
        subtree: true,
      });
    }

    return {
      availableDays,
      daysOfWeek,
      calendar,
      updateCalendar,
      handleDateClick,
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

/* Estilos para dias bloqueados */
.fc-day.day-blocked {
  background-color: rgba(200, 200, 200, 0.3) !important;
  cursor: not-allowed !important;
}

.fc-day.day-blocked .fc-daygrid-day-number {
  color: #999 !important;
  text-decoration: line-through;
  opacity: 0.7;
}

.fc-day.day-blocked a,
.fc-day.day-blocked button,
.fc-day.day-blocked [role="button"] {
  pointer-events: none !important;
  cursor: not-allowed !important;
  opacity: 0.5;
}
</style>
