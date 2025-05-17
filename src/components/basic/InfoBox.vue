<template>
  <div class="col-md-3 col-sm-6 col-12">
    <div class="info-box">
      <span class="info-box-icon" :class="iconBgClass">
        <i :class="iconClass"></i>
        <slot name="icon-content"></slot>
      </span>

      <div class="info-box-content">
        <span class="info-box-text">{{ title }}</span>
        <span class="info-box-number">{{ subtitle }}</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: "",
    description: "Nome da classe do ícone (ex: fas fa-users)",
  },
  title: {
    type: String,
    default: "",
    description: "Texto do título da info-box",
  },
  subtitle: {
    type: [String, Number],
    default: "",
    description: "Texto ou número do subtítulo da info-box",
  },
  background: {
    type: String,
    default: "info",
    validator: (value) =>
      [
        "info",
        "success",
        "warning",
        "danger",
        "primary",
        "secondary",
        "light",
        "dark",
      ].includes(value),
    description:
      "Cor de fundo da caixa de ícone (corresponde às classes bg-* do Bootstrap)",
  },
});

const iconBgClass = computed(() => `bg-${props.background}`);
const iconClass = computed(() => props.icon);
</script>

<style scoped>
.info-box {
  display: flex;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.125), 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  background-color: #fff;
  padding: 0.5rem;
}

.info-box-icon {
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.875rem;
  text-align: center;
  width: 70px;
  height: 70px;
  color: #fff;
}

.info-box-content {
  padding: 5px 10px;
  flex-grow: 1;
}

.info-box-text {
  display: block;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-box-number {
  display: block;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0.25rem;
}
</style>
