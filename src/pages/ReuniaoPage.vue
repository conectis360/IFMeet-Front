<template>
  <div class="calendar-container">
    <DisponibilidadeModal
      :disponibilidade-editando="disponibilidadeEditando"
      @atualizado="carregarDisponibilidades"
    />
    <CalendarComponent ref="calendar" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CalendarComponent from "@/components/basic/Calendar.vue";
import DisponibilidadeModal from "@/components/basic/Disponibilidade.vue";

// Refs
const disponibilidadeEditando = ref(null);
const calendar = ref(null);

// Métodos
const carregarDisponibilidades = () => {
  if (calendar.value) {
    calendar.value.atualizarConfiguracoes();
  }
};

// Lifecycle Hooks
onMounted(() => {});
</script>

<style scoped>
.disponibilidade-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>

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
