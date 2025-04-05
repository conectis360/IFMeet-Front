<template>
  <div>
    <CalendarComponent ref="calendar" :available-days="availableDays" />
  </div>
</template>

<script>
import CalendarComponent from "@/components/basic/Calendar.vue";
import { ref } from "vue";

export default {
  components: {
    CalendarComponent,
  },
  setup() {
    const availableDays = ref([]);
    const calendar = ref(null);

    const daysOfWeek = [
      { value: 0, label: "Domingo" },
      { value: 1, label: "Segunda" },
      { value: 2, label: "Terça" },
      { value: 3, label: "Quarta" },
      { value: 4, label: "Quinta" },
      { value: 5, label: "Sexta" },
      { value: 6, label: "Sábado" },
    ];

    return {
      availableDays,
      daysOfWeek,
      calendar,
    };
  },
};
</script>

<style>
.availability-controls {
  padding: 15px;
  background: #f8f9fa;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
}

.days-checkbox input {
  cursor: pointer;
  accent-color: #388e3c;
}
</style>
