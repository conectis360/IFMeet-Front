<template>
  <div class="theme-toggle">
    <label class="switch">
      <input type="checkbox" :checked="isDarkMode" @change="toggleTheme" />
      <span
        class="slider round"
        :style="isDarkMode ? darkSliderStyle : lightSliderStyle"
      >
        <span class="emoji" :style="{ opacity: isDarkMode ? 1 : 0 }">💻</span>
        <span class="emoji" :style="{ opacity: isDarkMode ? 0 : 1 }">🍅</span>
      </span>
    </label>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ThemeToggle",
  setup() {
    const isDarkMode = ref(false);

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      if (isDarkMode.value) {
        setDarkMode();
      } else {
        setLightMode();
      }
      localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
    };

    const setDarkMode = () => {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    };

    const setLightMode = () => {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    };

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      isDarkMode.value = true;
      setDarkMode();
    }

    return {
      isDarkMode,
      toggleTheme,
      lightSliderStyle: {
        backgroundColor: "#8ec543",
        justifyContent: "flex-start",
        paddingLeft: "2px",
        paddingBottom: "2px",
      },
      darkSliderStyle: {
        backgroundColor: "#a8d5ad",
        justifyContent: "flex-end",
        paddingRight: "2px",
        paddingBottom: "2px",
      },
    };
  },
};
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  margin-top: 15%;
  display: inline-block;
  width: 60px;
  height: 20px;
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
  transition: 0.4s;
  border-radius: 34px;
  display: flex;
  align-items: center;
}

.slider.round {
  border-radius: 34px;
}

.emoji {
  font-size: 1.4em;
  transition: opacity 0.4s;
}
</style>
