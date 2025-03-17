  <template>
      <h1>Visualizar Atas</h1>
    <table-component :headers="headers" :data="atasDTO.records">
      <template #column0="{ entity }">
        {{ entity.reuniao.data }}
      </template>
      <template #column1="{ entity }">
        {{ entity.resumo }}
      </template>
      <template #column2="{ entity }">
        <atualizar-ata
        :ata-id="entity.codigoAta">
      </atualizar-ata>
      </template>
    </table-component>
  </template>
      
    <script>
    import { buscarAtasPorTrabalho } from "@/services/cadastrarAta.js";
    import { useToast } from "vue-toastification";
    import TableComponent from '@/components/Table.vue'
    import AtualizarAta from './AtualizarAta.vue'

    
    const toast = useToast()
    export default {
        name: "VisualizarAtas",
        components: {
          TableComponent,
          AtualizarAta,
        },
        data() {
        return {
          content: "",
          AtaDTO: {
            trabalho: {
                codigoTrabalho: null,
            },
          },
          atasDTO: {},
          headers: [
            'Data',
            'Resumo',
            'Editar',
          ],
        };
      },
      mounted() {
        this.retornarAtas()
      },
      computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
      },
      methods: {
        retornarAtas() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          buscarAtasPorTrabalho(1, (response) => {
            if (response) {
              loader.hide()
              this.atasDTO = response.data
            }
          },
            (error) => {
              loader.hide()
              toast.error(error);
            },
            () => { }
          );
        },
      },
    };
    </script>