<template>
  <div class="theme-toggle">
    <label class="switch">
      <input type="checkbox" :checked="isDarkMode" @change="toggleTheme" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "ThemeToggle",
  data() {
    return {
      isDarkMode: false,
    };
  },
  mounted() {
    // Verificar o tema salvo no localStorage (opcional)
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      this.setDarkMode();
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        this.setDarkMode();
      } else {
        this.setLightMode();
      }
      // Salvar a preferência no localStorage (opcional)
      localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    },
    setDarkMode() {
      document.body.classList.add("dark-mode");
    },
    setLightMode() {
      document.body.classList.remove("dark-mode");
    },
  },
};
</script>

<style scoped>
/* Estilos para o toggle switch (adapte conforme necessário) */
.theme-toggle {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
