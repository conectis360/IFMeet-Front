<template>
  <div id="loading">
      <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "Preloader"
};
</script>
<style>
#loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  height: 100vh;
  width: 100vw;
  text-align: center;
  line-height: 100vh;
}
.img {
  position: relative;
  margin: auto;
  margin-top: 20%;
}
</style>