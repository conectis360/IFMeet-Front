<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" class="custom-calendar" />

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
            @click="deleteEvent"
          >
            Excluir
          </button>
          <button class="btn btn-secondary" @click="closeModal">
            Cancelar
          </button>
          <button
            class="btn btn-primary"
            @click="saveEvent"
            :disabled="!isFormValid"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  components: { FullCalendar },
  setup() {
    const toast = useToast();
    const calendarEvents = ref([]);
    const showModal = ref(false);
    const eventData = ref({
      id: null,
      title: "",
      date: "",
      description: "",
      color: "#3788d8",
    });

    const eventColors = [
      "#3788d8", // azul padrão
      "#2c3e50", // azul escuro
      "#42b983", // verde
      "#ff6b6b", // vermelho
      "#feca57", // amarelo
      "#5f27cd", // roxo
    ];

    // Validação do formulário
    const isFormValid = computed(() => {
      return eventData.value.title.trim() !== "" && eventData.value.date !== "";
    });

    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        calendarEvents.value = response.data.map((event) => ({
          ...event,
          backgroundColor: event.color || "#3788d8",
        }));
      } catch (error) {
        toast.error("Falha ao carregar eventos");
        console.error("Erro ao buscar eventos:", error);
      }
    };

    const handleDateClick = (info) => {
      eventData.value = {
        id: null,
        title: "",
        date: info.dateStr,
        description: "",
        color: "#3788d8",
      };
      showModal.value = true;
    };

    const handleEventClick = (info) => {
      eventData.value = {
        id: info.event.id,
        title: info.event.title,
        date: info.event.startStr.split("T")[0],
        description: info.event.extendedProps?.description || "",
        color: info.event.backgroundColor || "#3788d8",
      };
      showModal.value = true;
    };

    const saveEvent = async () => {
      if (!isFormValid.value) return;

      try {
        const payload = {
          title: eventData.value.title,
          start: eventData.value.date,
          description: eventData.value.description,
          color: eventData.value.color,
        };

        if (eventData.value.id) {
          await axios.put(`/api/events/${eventData.value.id}`, payload);
          toast.success("Evento atualizado com sucesso!");
        } else {
          await axios.post("/api/events", payload);
          toast.success("Evento criado com sucesso!");
        }

        closeModal();
        await fetchEvents();
      } catch (error) {
        toast.error("Erro ao salvar evento");
        console.error("Erro ao salvar evento:", error);
      }
    };

    const deleteEvent = async () => {
      if (!confirm("Tem certeza que deseja excluir este evento?")) return;

      try {
        await axios.delete(`/api/events/${eventData.value.id}`);
        toast.success("Evento excluído com sucesso!");
        closeModal();
        await fetchEvents();
      } catch (error) {
        toast.error("Erro ao excluir evento");
        console.error("Erro ao excluir evento:", error);
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(fetchEvents);

    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: calendarEvents,
        dateClick: handleDateClick,
        eventClick: handleEventClick,
        editable: true,
        eventDrop: async (info) => {
          try {
            await axios.put(`/api/events/${info.event.id}`, {
              start: info.event.startStr,
            });
            toast.success("Evento movido com sucesso!");
          } catch (error) {
            toast.error("Erro ao mover evento");
            info.revert();
          }
        },
        eventResize: async (info) => {
          try {
            await axios.put(`/api/events/${info.event.id}`, {
              start: info.event.startStr,
              end: info.event.endStr,
            });
            toast.success("Evento atualizado com sucesso!");
          } catch (error) {
            toast.error("Erro ao atualizar evento");
            info.revert();
          }
        },
        eventDisplay: "block",
        eventTimeFormat: {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        },
      },
      showModal,
      eventData,
      eventColors,
      isFormValid,
      saveEvent,
      deleteEvent,
      closeModal,
    };
  },
};
</script>

<style scoped>
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
