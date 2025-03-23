<template>
  <div class="card card-default">
    <div class="card-header">
      <div class="card-tools">
        <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
        </button>
        <button type="button" class="btn btn-tool" data-card-widget="remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label>{{ label }}</label>
        <select
          ref="select"
          class="select2"
          :multiple="multiple"
          :data-placeholder="placeholder"
          style="width: 100%"
          @change="onSelectChange"
        >
          <option
            v-for="option in options"
            :key="option.value || option"
            :value="option.value || option"
            :disabled="isDisabled(option)"
          >
            {{ option.text || option }}
          </option>
        </select>
      </div>
    </div>
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
      if (option.value) {
        return this.disabledOptions.includes(option.value);
      }
      return this.disabledOptions.includes(option);
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
