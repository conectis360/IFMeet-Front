  <template>
      <h1>Visualizar Tarefas</h1>
    <table-component :headers="headers" :data="tarefasDTO.records">
      <template #column0="{ entity }">
        {{ entity.trabalho.aluno.nome }}
      </template>
      <template #column1="{ entity }">
        {{ entity.trabalho.orientador.nome }}
      </template>
      <template #column2="{ entity }">
        {{ entity.trabalho.titulo }}
      </template>
      <template #column3="{ entity }">
        {{ entity.dataInicio }}
      </template>
      <template #column4="{ entity }">
        {{ entity.dataFim }}
      </template>
      <template #column5="{ entity }">
        {{ entity.finalizada == true ? 'SIM' : 'NÃO'}}
      </template>
      <template #column6="{ entity }">
        <atualizar-tarefa v-if="entity.finalizada == false"
          :tarefa-id="entity.codigoTarefa"
        ></atualizar-tarefa>
      </template>
    </table-component>
  </template>
      
    <script>
    import { buscarReunioesPorOrientador } from "@/services/cadastrarTarefa.js";
    import { useToast } from "vue-toastification";
    import TableComponent from '@/components/Table.vue'
    import AtualizarTarefa from './AtualizarTarefa.vue'
    
    const toast = useToast()
    export default {
        name: "VisualizarTarefas",
        components: {
          TableComponent,
          AtualizarTarefa
        },
        data() {
        return {
          content: "",
          AtaDTO: {
            trabalho: {
                codigoTrabalho: null,
            },
          },
          tarefasDTO: {},
          headers: [
            'Aluno',
            'Orientador',
            'Trabalho',
            'Data Inicio',
            'Data Fim',
            'Finalizada',
            'Editar',
          ],
        };
      },
      mounted() {
        this.retornarTarefas()
      },
      computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
      },
      methods: {
        retornarTarefas() {
          let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
          });
          buscarReunioesPorOrientador(2, (response) => {
            if (response) {
              loader.hide()
              this.tarefasDTO = response.data
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