<template>
  <div class="form-group">
    <select
      ref="select"
      class="select2"
      :multiple="multiple"
      :placeholder="placeholder"
      style="width: 100%"
      @change="onSelectChange"
    >
      <option
        v-for="option in options"
        :key="getKey(option)"
        :value="getKey(option)"
        :disabled="isDisabled(option)"
      >
        {{ getValue(option) }}
      </option>
    </select>
  </div>
</template>

<script>
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.css";

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Array],
      default: null,
    },
    label: {
      type: String,
      default: "Select",
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabledOptions: {
      type: Array,
      default: () => [],
    },
    keyName: {
      type: String,
      default: "value", // Nome da propriedade que será usada como chave
    },
    valueName: {
      type: String,
      default: "text", // Nome da propriedade que será usada como valor
    },
  },
  mounted() {
    this.initializeSelect2();
  },
  watch: {
    value: {
      handler() {
        this.updateSelect2Value();
      },
      deep: true,
    },
    options: {
      handler() {
        this.destroySelect2();
        this.initializeSelect2();
      },
      deep: true,
    },
  },
  methods: {
    initializeSelect2() {
      const self = this;
      $(this.$refs.select)
        .select2({
          placeholder: this.placeholder,
        })
        .on("select2:select select2:unselect", function () {
          self.onSelectChange();
        });

      this.updateSelect2Value();
    },
    destroySelect2() {
      if ($(this.$refs.select).data("select2")) {
        $(this.$refs.select).select2("destroy");
      }
    },
    updateSelect2Value() {
      $(this.$refs.select).val(this.value).trigger("change");
    },
    onSelectChange() {
      const selectedValue = $(this.$refs.select).val();
      this.$emit("input", selectedValue); // Emite o valor selecionado para o componente pai
      this.$emit("change", selectedValue); // Emite um evento "change" com o valor selecionado
    },
    isDisabled(option) {
      const key = this.getKey(option);
      return this.disabledOptions.includes(key);
    },
    getKey(option) {
      // Retorna a chave do objeto (ou o próprio valor, se for um array de strings)
      return typeof option === "object" ? option[this.keyName] : option;
    },
    getValue(option) {
      // Retorna o valor do objeto (ou o próprio valor, se for um array de strings)
      return typeof option === "object" ? option[this.valueName] : option;
    },
  },
  beforeUnmount() {
    this.destroySelect2();
  },
};
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
