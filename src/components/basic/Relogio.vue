<template>
  <div class="datetime-widget" :class="{ inline: inline }">
    <div class="date-time-container">
      <div class="day-of-week">{{ dayOfWeek }}</div>
      <div class="date">{{ day }} de {{ month }} de {{ year }}</div>
      <div class="time">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, computed } from "vue";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const props = defineProps({
  inline: {
    type: Boolean,
    default: false,
    description: "Define se a data e hora devem ser exibidas na mesma linha.",
  },
});

const isInline = computed(() => props.inline);

const dayOfWeek = ref("");
const day = ref("");
const month = ref("");
const year = ref("");
const formattedTime = ref("");
const intervalId = ref(null);

const updateDateTime = () => {
  const now = new Date();
  dayOfWeek.value = format(now, "EEEE", { locale: ptBR });
  day.value = format(now, "dd");
  month.value = format(now, "MMMM", { locale: ptBR });
  year.value = format(now, "yyyy");
  formattedTime.value = format(now, "HH:mm:ss");
  isInline;
};

onMounted(() => {
  updateDateTime();
  intervalId.value = setInterval(updateDateTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<style scoped>
.datetime-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.datetime-widget.inline {
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
}

.day-of-week {
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.datetime-widget.inline .day-of-week {
  margin-bottom: 0;
  margin-right: 1rem;
}

.date-time-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.datetime-widget.inline .date-time-container {
  flex-direction: row;
  align-items: baseline;
}

.date {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.datetime-widget.inline .date {
  margin-bottom: 0;
  margin-right: 0.5rem;
}

.time {
  font-size: 1.2rem;
  color: #28a745;
  font-weight: bold;
}
</style>
