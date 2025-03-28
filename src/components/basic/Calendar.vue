<template>
  <div>
    <FullCalendar :options="calendarOptions" />

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>{{ eventData.id ? "Editar Evento" : "Adicionar Evento" }}</h3>
        <input v-model="eventData.title" placeholder="Título do evento" />
        <input v-model="eventData.date" type="date" />
        <button @click="saveEvent">Salvar</button>
        <button @click="showModal = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

export default {
  components: { FullCalendar },
  setup() {
    const calendarEvents = ref([]);
    const showModal = ref(false);
    const eventData = ref({ id: null, title: "", date: "" });

    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        calendarEvents.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    const handleDateClick = (info) => {
      eventData.value = { id: null, title: "", date: info.dateStr };
      showModal.value = true;
    };

    const handleEventClick = (info) => {
      eventData.value = {
        id: info.event.id,
        title: info.event.title,
        date: info.event.startStr,
      };
      showModal.value = true;
    };

    const saveEvent = async () => {
      try {
        if (eventData.value.id) {
          await axios.put(`/api/events/${eventData.value.id}`, eventData.value);
        } else {
          await axios.post("/api/events", eventData.value);
        }
        showModal.value = false;
        fetchEvents();
      } catch (error) {
        console.error("Erro ao salvar evento:", error);
      }
    };

    onMounted(fetchEvents);

    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: calendarEvents,
        dateClick: handleDateClick,
        eventClick: handleEventClick,
      },
      showModal,
      eventData,
      saveEvent,
    };
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
