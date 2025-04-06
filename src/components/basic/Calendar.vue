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
    <!-- Modal melhorado -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ eventData.id ? "Editar Evento" : "Novo Evento" }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="form-group">
          <label>Título</label>
          <input
            v-model="eventData.title"
            placeholder="Digite o título do evento"
            class="form-input"
            @keyup.enter="saveEvent"
          />
        </div>

        <div class="form-group">
          <label>Data</label>
          <input v-model="eventData.date" type="date" class="form-input" />
        </div>

        <!-- Adicione estes novos campos no formulário do modal -->
        <div class="form-group">
          <label>Hora de Início</label>
          <input v-model="eventData.startTime" type="time" class="form-input" />
        </div>

        <div class="form-group">
          <label>Hora de Término</label>
          <input v-model="eventData.endTime" type="time" class="form-input" />
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea
            v-model="eventData.description"
            placeholder="Descrição do evento (opcional)"
            class="form-textarea"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Cor do Evento</label>
          <div class="color-picker">
            <div
              v-for="color in eventColors"
              :key="color"
              :style="{ backgroundColor: color }"
              class="color-option"
              :class="{ selected: eventData.color === color }"
              @click="eventData.color = color"
            ></div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            v-if="eventData.id"
            class="btn btn-danger"
            @click="deleteEvent(eventData.id)"
          >
            Excluir
          </button>
          <button class="btn btn-secondary" @click="closeModal">
            Cancelar
          </button>
          <button class="btn btn-primary" @click="saveEvent">Salvar</button>
        </div>
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
import {
  buscarEventosCalendario,
  saveEventoCalendario,
  updateEventoCalendario,
  deleteEventoCalendario,
} from "@/services/calendarService";

export default {
  components: { FullCalendar },
  setup() {
    //const calendarEvents = ref([]);
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

    const eventColors = [
      "#a8c6fa",
      "#889aa4",
      "#a7e0c5",
      "#ffb3b3",
      "#fff5b3",
      "#b9a2e8",
    ];

    const handleEventClick = (info) => {
      // Preenche os dados do modal com as informações do evento clicado
      const event = info.event;

      eventData.value = {
        id: event.id,
        title: event.title,
        date: event.startStr.split("T")[0],
        startTime: event.startStr.split("T")[1]?.substring(0, 5) || "09:00",
        endTime: event.endStr.split("T")[1]?.substring(0, 5) || "10:00",
        description: event.extendedProps?.description || "",
        color: event.backgroundColor || "#3788d8",
      };

      showModal.value = true;
      info.jsEvent.preventDefault(); // Previne comportamento padrão
    };

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

      eventData.value = {
        id: null,
        title: "",
        date: info.dateStr,
        description: "",
        color: "#3788d8",
      };
      showModal.value = true;
    };

    const saveEvent = async () => {
      try {
        const eventoPayload = {
          title: eventData.value.title,
          start: `${eventData.value.date}T${eventData.value.startTime}:00`, // Mantém os segundos
          end: `${eventData.value.date}T${eventData.value.endTime}:00`, // Mantém os segundos
          description: eventData.value.description,
          backgroundColor: eventData.value.color,
          allDay: false,
        };

        if (eventData.value.id) {
          await updateEventoCalendario(eventData.value.id, eventoPayload);
          toast.success("Evento atualizado com sucesso!");
        } else {
          await saveEventoCalendario(eventoPayload);
          toast.success("Evento criado com sucesso!");
        }

        // Atualiza a lista de eventos após salvar
        await retornaEventosCalendario();
        closeModal();
      } catch (error) {
        toast.error(error.message || "Erro ao salvar evento");
      }
    };

    async function deleteEvent(id) {
      await deleteEventoCalendario(id);
      await retornaEventosCalendario();
      closeModal();
    }

    const closeModal = () => {
      showModal.value = false;
    };

    const calendarOptions = ref({
      locale: "pt-br",
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      titleFormat: { year: "numeric", month: "long" },
      buttonText: {
        today: "Hoje",
        month: "Mês",
        week: "Semana",
        day: "Dia",
        list: "Lista",
      },
      events: [],
      eventClick: handleEventClick,
      dateClick: handleDateClick,
      editable: true,
      eventDisplay: "block",
      nowIndicator: true,
      slotMinTime: "08:00:00",
      slotMaxTime: "24:00:00",
      allDaySlot: true,
      views: {
        dayGridMonth: {
          eventTimeFormat: {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          },
        },
        timeGridWeek: {
          eventTimeFormat: {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          },
        },
        timeGridDay: {
          eventTimeFormat: {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          },
        },
      },
    });

    // Busca usuário logado
    const getUsuarioLogado = () => {
      const usuario = localStorage.getItem("user");
      return usuario ? JSON.parse(usuario) : null;
    };

    // Busca eventos do calendário
    const retornaEventosCalendario = async () => {
      const usuario = getUsuarioLogado();
      console.log(usuario);
      if (!usuario?.id) {
        toast.error("Usuário não autenticado");
        return;
      }
      try {
        const response = await buscarEventosCalendario(usuario.id);

        if (response?.data) {
          console.log(response.data);
          calendarOptions.value.events = [...response.data?.records];
        }
      } catch (error) {
        toast.error(error.message || "Erro ao carregar eventos");
      }
    };

    // Carrega dados salvos
    onMounted(() => {
      retornaEventosCalendario();
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
      deleteEvent,
      saveEvent,
      eventColors,
      closeModal: () => {
        showModal.value = false;
      },
    };
  },
};
</script>

<style scoped>
/* Estilos do calendário */

:deep(.fc-h-event) {
  border: none !important;
}

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

:deep(.fc-event) {
  cursor: pointer;
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

.calendar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.custom-calendar {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #777;
}

.form-group {
  padding: 0 20px 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #3788d8;
  outline: none;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.color-picker {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-option.selected {
  border-color: #2c3e50;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #3788d8;
  color: white;
}

.btn-primary:hover {
  background-color: #2a6fc7;
}

.btn-primary:disabled {
  background-color: #a0c4f3;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-danger {
  background-color: #ff6b6b;
  color: white;
  margin-right: auto;
}

.btn-danger:hover {
  background-color: #e74c3c;
}
</style>
