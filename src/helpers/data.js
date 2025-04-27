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
      data = this.formatarDataBackendHelper(data)

      const hoje = new Date();
      const ontem = new Date();
      ontem.setDate(hoje.getDate() - 1);

      const dataEntrada = new Date(data);

      // Verifica se é hoje
      if (dataEntrada.toDateString() === hoje.toDateString()) {
        const horas = String(dataEntrada.getHours()).padStart(2, "0");
        const minutos = String(dataEntrada.getMinutes()).padStart(2, "0");
        return `Hoje às ${horas}:${minutos}`;
      }

      // Verifica se é ontem
      if (dataEntrada.toDateString() === ontem.toDateString()) {
        const horas = String(dataEntrada.getHours()).padStart(2, "0");
        const minutos = String(dataEntrada.getMinutes()).padStart(2, "0");
        return `Ontem às ${horas}:${minutos}`;
      }

      // Verifica se é antes de ontem, mas na mesma semana
      const diffDias = Math.floor((hoje - dataEntrada) / (1000 * 60 * 60 * 24));
      if (diffDias <= 7) {
        const diasSemana = [
          "Domingo",
          "Segunda-feira",
          "Terça-feira",
          "Quarta-feira",
          "Quinta-feira",
          "Sexta-feira",
          "Sábado",
        ];
        const diaSemana = diasSemana[dataEntrada.getDay()];
        const horas = String(dataEntrada.getHours()).padStart(2, "0");
        const minutos = String(dataEntrada.getMinutes()).padStart(2, "0");
        return `${diaSemana} às ${horas}:${minutos}`;
      }

      // Se for de uma semana diferente, exibe o dia e o mês
      const meses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      const dia = dataEntrada.getDate();
      const mes = meses[dataEntrada.getMonth()];
      const horas = String(dataEntrada.getHours()).padStart(2, "0");
      const minutos = String(dataEntrada.getMinutes()).padStart(2, "0");

      // Verifica se o ano é diferente
      if (dataEntrada.getFullYear() !== hoje.getFullYear()) {
        const ano = dataEntrada.getFullYear();
        return `${dia} de ${mes} de ${ano} às ${horas}:${minutos}`;
      }

      return `${dia} de ${mes} às ${horas}:${minutos}`;
    },
  },
}
