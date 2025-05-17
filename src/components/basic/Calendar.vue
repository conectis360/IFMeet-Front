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
          <span class="day-name">{{ getDayName(config.diaSemana) }}:</span>
          <span class="time-range"
            >{{ formatTime(config.horaInicio) }} -
            {{ formatTime(config.horaFim) }}</span
          >
        </div>
      </div>
    </div>

    <!-- Calendário -->
    <FullCalendar
      :options="calendarOptions"
      class="custom-calendar"
      ref="calendarRef"
    />

    <!-- Modal de agendamento -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!-- Cabeçalho -->
        <div class="modal-header">
          <div class="header-content">
            <h3 class="modal-title">
              <i class="bi bi-calendar-event me-2"></i>
              {{ eventData.id ? "Editar Evento" : "Novo Evento" }}
            </h3>
          </div>
        </div>

        <!-- Corpo do Modal -->
        <div class="modal-body">
          <div class="form-grid">
            <!-- Linha 1 -->
            <div class="form-group">
              <label class="form-label">
                <i class="bi bi-pencil-square me-1"></i>
                Título *
              </label>
              <input
                v-model="eventData.title"
                placeholder="Reunião de orientação"
                class="form-input"
                :class="{ 'input-error': !eventData.title }"
                @keyup.enter="saveEvent"
              />
            </div>

            <!-- Linha 2 -->
            <div class="form-group">
              <label class="form-label">
                <i class="bi bi-journal-bookmark me-1"></i>
                Trabalho *
              </label>
              <div class="select-wrapper">
                <select
                  v-model="eventData.trabalho.id"
                  class="form-input"
                  :disabled="!!eventData.id"
                  :class="{ 'input-error': !eventData.trabalho?.id }"
                >
                  <option :value="null">Selecione um trabalho...</option>
                  <option
                    v-for="trabalho in trabalhos"
                    :key="trabalho.codigoTrabalho"
                    :value="trabalho.codigoTrabalho"
                  >
                    {{ trabalho.titulo }}
                  </option>
                </select>
                <i class="bi bi-chevron-down select-arrow"></i>
              </div>
            </div>

            <!-- Linha 3 -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">
                  <i class="bi bi-calendar-date me-1"></i>
                  Data *
                </label>
                <div class="date-picker">
                  <input
                    :value="formatDateToBrazilian(eventData.date)"
                    @input="handleDateInput($event)"
                    placeholder="Selecione a data"
                    class="form-input"
                    :class="{ 'input-error': !eventData.date }"
                  />
                  <i class="bi bi-calendar3 date-icon"></i>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">
                  <i class="bi bi-clock me-1"></i>
                  Horário *
                </label>
                <div class="time-selector">
                  <select
                    v-model="eventData.startTime"
                    class="form-input time-input"
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
              </div>
            </div>

            <!-- Linha 4 -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">
                  <i class="bi bi-tag me-1"></i>
                  Status
                </label>
                <div class="status-badges">
                  <button
                    v-for="status in statusOptions"
                    :key="status.codigoStatus"
                    :value="status.codigoStatus"
                    class="status-badge"
                    :class="{
                      active:
                        eventData.status.codigoStatus === status.codigoStatus,
                    }"
                    @click="eventData.status.codigoStatus = status.codigoStatus"
                  >
                    {{ status.status }}
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">
                  <i class="bi bi-palette me-1"></i>
                  Cor do Evento
                </label>
                <div class="color-picker">
                  <div
                    v-for="color in eventColors"
                    :key="color"
                    class="color-option"
                    :style="{ backgroundColor: color }"
                    :class="{ selected: eventData.color === color }"
                    @click="eventData.color = color"
                  >
                    <i
                      v-if="eventData.color === color"
                      class="bi bi-check-lg color-check"
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Descrição -->
            <div class="form-group">
              <label class="form-label">
                <i class="bi bi-text-paragraph me-1"></i>
                Descrição
              </label>
              <textarea
                v-model="eventData.description"
                placeholder="Adicione detalhes importantes..."
                class="form-textarea"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <div class="footer-actions">
            <button
              v-if="eventData.id"
              class="btn btn-danger"
              @click="deleteEvent(eventData.id)"
            >
              <i class="bi bi-trash me-2"></i>
              Excluir
            </button>
            <button class="btn btn-secondary" @click="closeModal">
              Cancelar
            </button>
            <button class="btn btn-primary" @click="saveEvent">
              <i class="bi bi-save me-2"></i>
              {{ eventData.id ? "Atualizar" : "Salvar" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, defineExpose } from "vue";
import { useToast } from "vue-toastification";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  buscarEventosCalendario,
  saveEventoCalendario,
  updateEventoCalendario,
  deleteEventoCalendario,
  buscarConfiguracoesDisponibilidade,
} from "@/services/calendarService";
import { buscarTrabalhosPorUsuario } from "@/services/cadastrarTrabalho.js";
import { buscarStatus } from "@/services/statusService.js";

const toast = useToast();
const calendarRef = ref(null);
const showModal = ref(false);
const availabilityConfig = ref([]);
const availableStartTimes = ref([]);
const trabalhos = ref([]);
const statusOptions = ref([]);

// Dados do evento
const eventData = ref({
  title: "",
  date: "",
  startTime: "",
  endTime: "",
  description: "",
  color: "#3788d8",
  trabalho: { id: 0 },
  status: { codigoStatus: 0 },
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

// Funções auxiliares
const getDayName = (dayValue) => {
  const day = daysOfWeek.find((d) => d.value === dayValue);
  return day ? day.label : "";
};

const formatTime = (timeStr) => {
  return timeStr;
};

const getToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
};

const generateTimeOptions = (startTime, endTime) => {
  const times = [];
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  end.setMinutes(end.getMinutes() - 30);

  const current = new Date(start);

  while (current <= end) {
    const hours = current.getHours().toString().padStart(2, "0");
    const minutes = current.getMinutes().toString().padStart(2, "0");
    times.push(`${hours}:${minutes}`);
    current.setMinutes(current.getMinutes() + 30);
  }

  return times;
};

const updateEndTimeOptions = () => {
  if (!eventData.value.startTime) return;
  eventData.value.endTime = calculateEndTime(eventData.value.startTime);

  const dayOfWeek = new Date(eventData.value.date).getDay();
  const dayConfig = availabilityConfig.value.find(
    (config) => config.diaSemana === dayOfWeek
  );

  if (dayConfig) {
    const endTimeDate = new Date(`2000-01-01T${eventData.value.endTime}`);
    const maxEndTimeDate = new Date(`2000-01-01T${dayConfig.horaFim}`);

    if (endTimeDate > maxEndTimeDate) {
      eventData.value.endTime = dayConfig.horaFim;
      const [hours, minutes] = dayConfig.horaFim.split(":").map(Number);
      const adjustedStart = new Date();
      adjustedStart.setHours(hours, minutes - 30, 0, 0);
      eventData.value.startTime = `${adjustedStart
        .getHours()
        .toString()
        .padStart(2, "0")}:${adjustedStart
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }
  }
};

// Funções principais
const updateCalendar = () => {
  if (!calendarRef.value) return;

  const calendarApi = calendarRef.value.getApi();
  const availableDays = availabilityConfig.value.map(
    (config) => config.diaSemana
  );

  const { activeStart, activeEnd } = calendarApi.view;
  const current = new Date(activeStart);

  while (current <= activeEnd) {
    const dateStr = current.toISOString().split("T")[0];
    const dayEls = document.querySelectorAll(`.fc-day[data-date="${dateStr}"]`);

    const dayOfWeek = current.getDay();
    const isAvailable = availableDays.includes(dayOfWeek);

    dayEls.forEach((el) => {
      el.classList.toggle("day-blocked", !isAvailable);
      el.classList.toggle("day-available", isAvailable);
      el.style.pointerEvents = isAvailable ? "" : "none";
    });

    current.setDate(current.getDate() + 1);
  }
};

const updateTimeOptions = (date) => {
  const dayOfWeek = date.getDay() + 1;

  const dayConfig = availabilityConfig.value.find(
    (config) => config.diaSemana === dayOfWeek
  );

  if (!dayConfig) {
    availableStartTimes.value = [];
    eventData.value.startTime = ""; // Garanta que limpe se não houver opções
    eventData.value.endTime = "";
    return;
  }

  const allPossibleTimes = generateTimeOptions(
    dayConfig.horaInicio,
    dayConfig.horaFim
  );

  availableStartTimes.value = allPossibleTimes.filter((time) => {
    const timeDate = new Date(`2000-01-01T${time}`);
    const endDate = new Date(`2000-01-01T${dayConfig.horaFim}`);
    endDate.setMinutes(endDate.getMinutes() - 30); // Regra de negócio
    const passesFilter = timeDate <= endDate;
    return passesFilter;
  });

  if (availableStartTimes.value.length > 0) {
    eventData.value.startTime = availableStartTimes.value[0];
    eventData.value.endTime = calculateEndTime(eventData.value.startTime);
  } else {
    eventData.value.startTime = ""; // Limpa se não houver opções
    eventData.value.endTime = "";
  }
};

const calculateEndTime = (startTime) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const endTime = new Date();
  endTime.setHours(hours, minutes + 30, 0, 0);
  return `${endTime.getHours().toString().padStart(2, "0")}:${endTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

const handleEventClick = (info) => {
  const selectedDate = new Date(info.event.startStr);
  const today = getToday();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    toast.error("Não é possível editar eventos no passado.");
    return;
  }

  const event = info.event;

  eventData.value = {
    id: event.id,
    title: event.title,
    date: event.startStr.split("T")[0],
    startTime: event.startStr.split("T")[1]?.substring(0, 5) || "09:00",
    endTime: event.endStr.split("T")[1]?.substring(0, 5) || "10:00",
    description: event.extendedProps?.description || "",
    color: event.backgroundColor || "#3788d8",
    trabalho: { id: event.extendedProps.trabalho.codigoTrabalho },
    status: event.extendedProps.status,
  };

  updateTimeOptions(new Date(eventData.value.date));
  showModal.value = true;
  info.jsEvent.preventDefault();
};

const handleDateClick = (info) => {
  const selectedDate = new Date(info.date);
  const today = getToday();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    toast.error("Não há como marcar uma reunião no passado.");
    return;
  }

  const dayOfWeek = info.date.getDay();
  const isAvailable = availabilityConfig.value.some(
    (config) => config.diaSemana === dayOfWeek
  );

  if (!isAvailable) {
    toast.error("Este dia não está disponível para agendamento");
    return;
  }

  const dayConfig = availabilityConfig.value.find(
    (config) => config.diaSemana === dayOfWeek
  );

  if (!dayConfig) {
    toast.error("Este dia não está disponível para agendamento");
    return;
  }

  eventData.value = {
    id: null,
    title: "",
    date: info.dateStr,
    startTime: "",
    endTime: "",
    description: "",
    trabalho: { id: null },
    color: "#3788d8",
    status: { codigoStatus: 0 },
  };

  updateTimeOptions(new Date(eventData.value.date)); // A data é passada aqui
  showModal.value = true;
};

const formatDateToBrazilian = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

const parseBrazilianDate = (dateStr) => {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const handleDateInput = (event) => {
  console.log(event);
};

const saveEvent = async () => {
  try {
    if (!eventData.value.trabalho?.id) {
      toast.error("Selecione um trabalho");
      return;
    }

    const isoDate = eventData.value.date.includes("/")
      ? parseBrazilianDate(eventData.value.date)
      : eventData.value.date;

    const eventDate = new Date(isoDate);
    const today = getToday();
    today.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      toast.error("Não é possível agendar eventos no passado.");
      return;
    }

    if (!eventData.value.title.trim()) {
      toast.error("O título do evento é obrigatório");
      return;
    }

    if (!eventData.value.endTime) {
      eventData.value.endTime = calculateEndTime(eventData.value.startTime);
    }

    const eventoPayload = {
      id: null,
      title: eventData.value.title,
      start: `${isoDate}T${eventData.value.startTime}:00`,
      end: `${isoDate}T${eventData.value.endTime}:00`,
      description: eventData.value.description,
      backgroundColor: eventData.value.color,
      trabalho: { codigoTrabalho: eventData.value.trabalho?.id },
      status: { codigoStatus: eventData.value.status?.codigoStatus },
      allDay: false,
    };

    if (eventData.value.id) {
      eventoPayload.id = eventData.value.id;
      await updateEventoCalendario(eventoPayload);
      toast.success("Evento atualizado com sucesso!");
    } else {
      await saveEventoCalendario(eventoPayload);
      toast.success("Evento criado com sucesso!");
    }

    await retornaEventosCalendario();
    closeModal();
  } catch (error) {
    toast.error(error.message || "Erro ao salvar evento");
  }
};

const deleteEvent = async (id) => {
  try {
    await deleteEventoCalendario(id);
    toast.success("Evento excluído com sucesso!");
    await retornaEventosCalendario();
    closeModal();
  } catch (error) {
    toast.error(error.message || "Erro ao excluir evento");
  }
};

const closeModal = () => {
  showModal.value = false;
};

const getUsuarioLogado = () => {
  const usuario = localStorage.getItem("user");
  return usuario ? JSON.parse(usuario) : null;
};

const buscarConfiguracoes = async () => {
  try {
    const usuario = getUsuarioLogado();
    if (!usuario?.id) {
      toast.error("Usuário não autenticado");
      availabilityConfig.value = []; // Garanta que seja um array em caso de erro precoce
      return;
    }

    const response = await buscarConfiguracoesDisponibilidade(usuario.id);

    if (response?.data?.records) {
      // Verifique se 'records' existe e é um array
      availabilityConfig.value = response.data.records;
      await nextTick();
      updateCalendar();
    } else {
      availabilityConfig.value = []; // Defina como array vazio se os dados não vierem como esperado
    }
  } catch (error) {
    toast.error("Erro ao carregar configurações de disponibilidade");
    availabilityConfig.value = []; // Defina como array vazio em caso de exceção
  }
};

const buscarTrabalhos = async () => {
  try {
    const usuario = getUsuarioLogado();
    if (!usuario?.id) return;

    const response = await buscarTrabalhosPorUsuario(usuario.id);
    trabalhos.value = response.data?.records || [];
  } catch (error) {
    toast.error("Erro ao carregar trabalhos");
    console.error(error);
  }
};

const retornarStatus = async () => {
  try {
    const response = await buscarStatus();
    statusOptions.value = response.data?.records || [];
  } catch (error) {
    toast.error("Erro ao carregar status");
    console.error(error);
  }
};

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

// Configurações do calendário
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
  eventDidMount: (info) => {
    const status = info.event.extendedProps.status.codigoStatus || 0;
    info.el.classList.add(status);
  },
  events: [],
  datesSet: updateCalendar,
  dayCellClassNames: ({ date }) => {
    const dayOfWeek = date.getDay();
    const isAvailable = availabilityConfig.value.some(
      (config) => config.diaSemana === dayOfWeek
    );
    return isAvailable ? "day-available" : "day-blocked";
  },
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

const atualizarConfiguracoes = async () => {
  buscarConfiguracoes();
  updateCalendar();
};

// Expor métodos para o componente pai
defineExpose({
  atualizarConfiguracoes,
});

// Lifecycle hooks
onMounted(async () => {
  await buscarConfiguracoes();
  await retornaEventosCalendario();
  await buscarTrabalhos();
  await retornarStatus();
});
</script>

<style>
@import "@/assets/css/calendar-theme.css";
</style>
