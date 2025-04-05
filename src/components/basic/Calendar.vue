<template>
  <div class="calendar-container">
    <!-- Controles de disponibilidade -->
    <div class="availability-controls">
      <h3>Selecione os dias disponíveis:</h3>
      <div class="days-checkbox">
        <label v-for="day in daysOfWeek" :key="day.value">
          <input
            type="checkbox"
            v-model="availableDays"
            :value="day.value"
            @change="updateCalendar"
          />
          {{ day.label }}
        </label>
      </div>
    </div>

    <!-- Calendário -->
    <FullCalendar :options="calendarOptions" class="custom-calendar" />

    <!-- Modal de agendamento -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Modal de Teste</h2>
        <p>O modal está funcionando!</p>
        <button @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useToast } from "vue-toastification";

export default {
  components: { FullCalendar },
  setup() {
    const toast = useToast();
    const showModal = ref(false);
    const availableDays = ref([]);

    // Dados do evento
    const eventData = ref({
      title: "",
      date: "",
      startTime: "09:00",
      endTime: "10:00",
    });

    // Dias da semana
    const daysOfWeek = [
      { value: 0, label: "Domingo" },
      { value: 1, label: "Segunda" },
      { value: 2, label: "Terça" },
      { value: 3, label: "Quarta" },
      { value: 4, label: "Quinta" },
      { value: 5, label: "Sexta" },
      { value: 6, label: "Sábado" },
    ];

    const updateCalendar = async () => {
      await nextTick();
      const days = document.querySelectorAll(".fc-day");

      days?.forEach((day) => {
        const dateStr = day.getAttribute("data-date");
        if (!dateStr) return;

        try {
          // Corrigindo a forma de criar a data
          const dateParts = dateStr.split("-");
          const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
          const dayOfWeek = date.getDay(); // 0 (Domingo) a 6 (Sábado)

          day.classList.remove("day-available", "day-blocked");

          if (availableDays.value.includes(dayOfWeek)) {
            day.classList.add("day-available");
          } else {
            day.classList.add("day-blocked");
          }
        } catch (e) {
          console.error("Erro ao processar data:", dateStr, e);
        }
      });
    };

    // Manipulador de clique em data - CORREÇÃO AQUI
    const handleDateClick = (info) => {
      const date = new Date(info.date);
      const dayOfWeek = date.getDay(); // 0 (Domingo) a 6 (Sábado)

      // Verifica se o dia da semana está nos disponíveis
      const isAvailable = availableDays.value.includes(dayOfWeek);

      if (!isAvailable) {
        toast.error("Este dia não está disponível para agendamento");
        return;
      }

      // Preenche os dados do modal
      eventData.value = {
        ...eventData.value,
        date: info.dateStr.split("T")[0],
        title: "",
      };
      showModal.value = true;
    };

    // Configurações do FullCalendar
    const calendarOptions = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      selectable: false, // Desativamos a seleção por arrasto
      dateClick: handleDateClick,
      locale: "pt-br",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      events: [],
    });

    // Carrega dados salvos
    onMounted(() => {
      const savedDays = localStorage.getItem("availableDays");
      if (savedDays) {
        availableDays.value = JSON.parse(savedDays);
      }
      updateCalendar();
    });

    return {
      showModal,
      eventData,
      availableDays,
      daysOfWeek,
      calendarOptions,
      updateCalendar,
      closeModal: () => {
        showModal.value = false;
      },
    };
  },
};
</script>

<style scoped>
/* Estilos do calendário */
.calendar-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.availability-controls {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.days-checkbox {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.days-checkbox label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

/* Estilos para os dias do calendário */
:deep(.fc-day) {
  transition: background-color 0.3s;
}

:deep(.day-available) {
  background-color: #e8f5e9 !important; /* Verde claro para dias disponíveis */
  cursor: pointer;
}

:deep(.day-blocked) {
  background-color: #ffebee !important; /* Vermelho claro para dias indisponíveis */
  opacity: 0.7;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}
</style>
