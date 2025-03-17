  <template>
      <h1>Visualizar Reuniões</h1>
    <table-component :headers="headers" :data="reuniaoDTO.records">
      <template #column0="{ entity }">
        {{ entity.orientando.nome }}
      </template>
      <template #column1="{ entity }">
        {{ entity.orientador.nome }}
      </template>
      <template #column2="{ entity }">
        {{ entity.trabalho.titulo }}
      </template>
      <template #column3="{ entity }">
        {{ entity.pauta }}
      </template>
      <template #column4="{ entity }">
        {{ entity.data }}
      </template>
      <template #column5="{ entity }">
        {{ entity.aceita == true ? 'SIM' : 'NÃO'}}
      </template>
      <template #column6="{ entity }">
        {{ entity.realizada == true ? 'SIM' : 'NÃO'}}
      </template>
      <template #column7="{ entity }">
        <atualizar-reuniao v-if="entity.realizada == false"
          :reuniao-id="entity.codigoReuniao"
        ></atualizar-reuniao>
      </template>
    </table-component>
  </template>
      
    <script>
    import { buscarReunioesPorOrientador } from "@/services/cadastrarReuniao.js";
    import { useToast } from "vue-toastification";
    import TableComponent from '@/components/Table.vue'
    import AtualizarReuniao from './AtualizarReuniao.vue'
    
    const toast = useToast()
    export default {
        name: "VisualizarReunioes",
        components: {
          TableComponent,
          AtualizarReuniao
        },
        data() {
        return {
          content: "",
          AtaDTO: {
            trabalho: {
                codigoTrabalho: null,
            },
          },
          reuniaoDTO: {},
          headers: [
            'Aluno',
            'Orientador',
            'Trabalho',
            'Pauta',
            'Data',
            'Aceita',
            'Realizada',
            'Editar',
          ],
        };
      },
      mounted() {
        this.retornarReunioes()
      },
      computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
      },
      methods: {
        retornarReunioes() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          buscarReunioesPorOrientador(2, (response) => {
            if (response) {
              loader.hide()
              this.reuniaoDTO = response.data
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