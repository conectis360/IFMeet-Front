export const getToken = () => {
    if (localStorage.getItem('user')) {
      var userData = JSON.parse(localStorage.getItem('user'))
      // validar o tempo de expiracao do token. Se for < 15 minutos, gerar um novo.
      // atualmente o token tem validade de 60 minutos
      var timeNow = (new Date()).getTime()
      var time15min = 900000
      var timeLeft = (userData.validade - timeNow)
      if (timeLeft < time15min) {
        return ''
      }
      return userData.token
    } else {
      return ''
    }
  }