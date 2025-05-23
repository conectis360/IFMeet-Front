/* eslint-disable no-unused-vars */
export default {
  methods: {
    formatarDataBackendHelper: function converterData(dataString) {
      // Divide a string em partes
      const [data, hora] = dataString.split(' ');
      const [dia, mes, ano] = data.split('/');

      // Cria uma nova string no formato ISO 8601
      const dataISO = `${ano}-${mes}-${dia}T${hora}`;

      // Retorna um objeto Date
      return new Date(dataISO);
    },

    formatarDataHelper: function (data) {
      data = this.formatarDataBackendHelper(data);

      const timeZone = 'America/Sao_Paulo';
      const dataEntrada = new Date(data);
      const agora = new Date();

      // Configurações de localização para o Brasil
      const localeOpts = {
        timeZone,
        hour12: false,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };

      // Formata datas para comparações
      const formatarParaComparacao = (date) => {
        return new Date(date).toLocaleDateString('pt-BR', {
          timeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      };

      // Formata horas no padrão brasileiro (24h)
      const formatarHoraBrasil = (date) => {
        return date.toLocaleTimeString('pt-BR', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      };

      // Datas formatadas para comparação
      const hojeStr = formatarParaComparacao(agora);
      const ontem = new Date(agora);
      ontem.setDate(agora.getDate() - 1);
      const ontemStr = formatarParaComparacao(ontem);
      const dataEntradaStr = formatarParaComparacao(dataEntrada);

      // Diferença de dias
      const diffTempo = agora.getTime() - dataEntrada.getTime();
      const diffDias = Math.floor(diffTempo / (1000 * 3600 * 24));

      // Verifica se é hoje
      if (dataEntradaStr === hojeStr) {
        return `Hoje às ${formatarHoraBrasil(dataEntrada)}`;
      }

      // Verifica se é ontem
      if (dataEntradaStr === ontemStr) {
        return `Ontem às ${formatarHoraBrasil(dataEntrada)}`;
      }

      // Verifica se é na mesma semana
      if (diffDias <= 7) {
        const diaSemana = dataEntrada.toLocaleDateString('pt-BR', {
          timeZone,
          weekday: 'long'
        });
        return `${diaSemana} às ${formatarHoraBrasil(dataEntrada)}`;
      }

      // Formatação para datas mais antigas
      const mes = dataEntrada.toLocaleDateString('pt-BR', {
        timeZone,
        month: 'short'
      }).replace('.', '');

      let dataFormatada = dataEntrada.toLocaleDateString('pt-BR', {
        timeZone,
        day: '2-digit',
        month: 'short'
      });

      // Adiciona o ano se for diferente
      if (dataEntrada.getFullYear() !== agora.getFullYear()) {
        dataFormatada += ` de ${dataEntrada.getFullYear()}`;
      }

      return `${dataFormatada} às ${formatarHoraBrasil(dataEntrada)}`;
    }
  }
}
