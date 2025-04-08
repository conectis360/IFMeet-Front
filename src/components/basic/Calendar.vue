<template>
  <div class="calendar-container">
    <!-- Informação sobre disponibilidade -->
    <div class="availability-info" v-if="availabilityConfig.length > 0">
      <h3>Dias e horários disponíveis:</h3>
      <div class="availability-list">
        <div
          v-for="(config, index) in availabilityConfig"
          :key="index"
          class="availability-item"
        >
          <span class="day-name">{{ getDayName(config.dayOfWeek) }}:</span>
          <span class="time-range"
            >{{ formatTime(config.startTime) }} -
            {{ formatTime(config.endTime) }}</span
          >
        </div>
      </div>
    </div>

    <!-- Calendário -->
    <FullCalendar :options="calendarOptions" class="custom-calendar" />

    <!-- Modal de agendamento -->
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
          <input
            v-model="eventData.date"
            type="date"
            class="form-input"
            readonly
          />
        </div>

        <div class="form-group">
          <label>Hora de Início</label>
          <select
            v-model="eventData.startTime"
            class="form-input"
            @change="updateEndTimeOptions"
          >
            <option
              v-for="time in availableStartTimes"
              :key="time"
              :value="time"
            >
              {{ time }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Hora de Término</label>
          <select v-model="eventData.endTime" class="form-input">
            <option v-for="time in availableEndTimes" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
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
  buscarConfiguracoesDisponibilidade, // Novo serviço a ser implementado
} from "@/services/calendarService";

export default {
  components: { FullCalendar },
  setup() {
    const toast = useToast();
    const showModal = ref(false);
    const availableDays = ref([]);
    const availabilityConfig = ref([]);
    const availableStartTimes = ref([]);
    const availableEndTimes = ref([]);

    // Dados do evento
    const eventData = ref({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      color: "#3788d8",
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

    // Função para obter o nome do dia a partir do valor
    const getDayName = (dayValue) => {
      const day = daysOfWeek.find((d) => d.value === dayValue);
      return day ? day.label : "";
    };

    // Função para formatar hora
    const formatTime = (timeStr) => {
      return timeStr;
    };

    // Função para gerar opções de horário em intervalos de 30 minutos
    const generateTimeOptions = (startTime, endTime) => {
      const times = [];
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);

      // Subtrai 30 minutos do final para garantir que o evento tenha pelo menos 30 min
      end.setMinutes(end.getMinutes() - 30);

      const current = new Date(start);

      while (current <= end) {
        const hours = current.getHours().toString().padStart(2, "0");
        const minutes = current.getMinutes().toString().padStart(2, "0");
        times.push(`${hours}:${minutes}`);

        // Avança 30 minutos
        current.setMinutes(current.getMinutes() + 30);
      }

      return times;
    };

    // Atualiza as opções de horário de término com base no horário de início selecionado
    const updateEndTimeOptions = () => {
      if (!eventData.value.date) return;

      const date = new Date(eventData.value.date);
      const dayOfWeek = date.getDay();

      // Encontra a configuração para o dia da semana
      const dayConfig = availabilityConfig.value.find(
        (config) => config.dayOfWeek === dayOfWeek
      );

      if (!dayConfig) return;

      // Gera opções de horário de término a partir do horário de início selecionado
      const startTime = eventData.value.startTime;
      const endTimeOptions = [];

      // Começa 30 minutos após o horário de início
      const start = new Date(`2000-01-01T${startTime}`);
      start.setMinutes(start.getMinutes() + 30);

      const end = new Date(`2000-01-01T${dayConfig.endTime}`);

      const current = new Date(start);

      while (current <= end) {
        const hours = current.getHours().toString().padStart(2, "0");
        const minutes = current.getMinutes().toString().padStart(2, "0");
        endTimeOptions.push(`${hours}:${minutes}`);

        // Avança 30 minutos
        current.setMinutes(current.getMinutes() + 30);
      }

      availableEndTimes.value = endTimeOptions;

      // Define o primeiro horário disponível como padrão
      if (endTimeOptions.length > 0) {
        eventData.value.endTime = endTimeOptions[0];
      }
    };

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

      // Atualiza as opções de horário disponíveis para o dia selecionado
      updateTimeOptions(new Date(eventData.value.date));

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
          const dateParts = dateStr.split("-");
          const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
          const dayOfWeek = date.getDay(); // 0 (Domingo) a 6 (Sábado)

          day.classList.remove("day-available", "day-blocked");

          // Verifica se o dia da semana está configurado como disponível
          const isDayAvailable = availabilityConfig.value.some(
            (config) => config.dayOfWeek === dayOfWeek
          );

          if (isDayAvailable) {
            day.classList.add("day-available");
          } else {
            day.classList.add("day-blocked");
          }
        } catch (e) {
          console.error("Erro ao processar data:", dateStr, e);
        }
      });
    };

    // Atualiza as opções de horário disponíveis para o dia selecionado
    const updateTimeOptions = (date) => {
      const dayOfWeek = date.getDay();

      // Encontra a configuração para o dia da semana
      const dayConfig = availabilityConfig.value.find(
        (config) => config.dayOfWeek === dayOfWeek
      );

      if (!dayConfig) {
        availableStartTimes.value = [];
        availableEndTimes.value = [];
        return;
      }

      // Gera opções de horário de início
      availableStartTimes.value = generateTimeOptions(
        dayConfig.startTime,
        dayConfig.endTime
      );

      // Define o primeiro horário disponível como padrão
      if (availableStartTimes.value.length > 0) {
        eventData.value.startTime = availableStartTimes.value[0];
        updateEndTimeOptions();
      }
    };

    // Manipulador de clique em data
    const handleDateClick = (info) => {
      const date = new Date(info.date);
      const dayOfWeek = date.getDay();

      // Verifica se o dia da semana está configurado como disponível
      const dayConfig = availabilityConfig.value.find(
        (config) => config.dayOfWeek === dayOfWeek
      );

      if (!dayConfig) {
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

      // Atualiza as opções de horário disponíveis para o dia selecionado
      updateTimeOptions(date);

      showModal.value = true;
    };

    const saveEvent = async () => {
      try {
        // Validação básica
        if (!eventData.value.title.trim()) {
          toast.error("O título do evento é obrigatório");
          return;
        }

        const eventoPayload = {
          title: eventData.value.title,
          start: `${eventData.value.date}T${eventData.value.startTime}:00`,
          end: `${eventData.value.date}T${eventData.value.endTime}:00`,
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
      try {
        await deleteEventoCalendario(id);
        toast.success("Evento excluído com sucesso!");
        await retornaEventosCalendario();
        closeModal();
      } catch (error) {
        toast.error(error.message || "Erro ao excluir evento");
      }
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

    // Busca configurações de disponibilidade
    const buscarConfiguracoes = async () => {
      try {
        const usuario = getUsuarioLogado();
        if (!usuario?.id) {
          toast.error("Usuário não autenticado");
          return;
        }

        const response = await buscarConfiguracoesDisponibilidade(usuario.id);

        if (response?.data) {
          availabilityConfig.value = response.data;

          // Extrai os dias da semana disponíveis
          availableDays.value = availabilityConfig.value.map(
            (config) => config.dayOfWeek
          );

          // Atualiza o calendário com os dias disponíveis
          updateCalendar();
        }
      } catch (error) {
        toast.error("Erro ao carregar configurações de disponibilidade");
        console.error(error);
      }
    };

    // Busca eventos do calendário
    const retornaEventosCalendario = async () => {
      const usuario = getUsuarioLogado();
      if (!usuario?.id) {
        toast.error("Usuário não autenticado");
        return;
      }
      try {
        const response = await buscarEventosCalendario(usuario.id);

        if (response?.data) {
          calendarOptions.value.events = [...response.data?.records];
        }
      } catch (error) {
        toast.error(error.message || "Erro ao carregar eventos");
      }
    };

    // Carrega dados
    onMounted(async () => {
      // Busca configurações de disponibilidade do back-end
      await buscarConfiguracoes();

      // Busca eventos do calendário
      await retornaEventosCalendario();
    });

    return {
      showModal,
      eventData,
      availableDays,
      daysOfWeek,
      calendarOptions,
      availabilityConfig,
      availableStartTimes,
      availableEndTimes,
      updateCalendar,
      deleteEvent,
      saveEvent,
      eventColors,
      getDayName,
      formatTime,
      updateEndTimeOptions,
      closeModal: () => {
        showModal.value = false;
      },
    };
  },
};
</script>

<style>
/* Importa o arquivo de tema externo */
@import "@/assets/css/calendar-theme.css";

/* Estilos específicos do componente que não estão no tema */
:deep(.fc-h-event) {
  border: none !important;
}

.availability-info {
  margin-bottom: 20px;
  padding: 15px;
  background: var(--calendar-controls-bg);
  border-radius: var(--calendar-border-radius);
}

.availability-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.availability-item {
  background: var(--content-bg);
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.day-name {
  font-weight: bold;
  margin-right: 8px;
  color: var(--calendar-primary-color);
}

.time-range {
  color: var(--text-color);
}
</style>
