<template>
    <div class="container">
        <CadastrarTrabalho></CadastrarTrabalho>
</div>
</template>
  
<script>
import CadastrarTrabalho from "./components/orientador/CadastrarTrabalho.vue";
export default {
    name: "Teste",
    components: {
        CadastrarTrabalho
    },
    data() {
        return {
            content: "",
        };
    },
    mounted() {
    },
};
</script>