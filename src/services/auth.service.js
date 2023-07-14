import axios from 'axios';
import { requestGetSemAutorizacao, requestPost } from './request'
import { apiIFMeet } from './API'

const API_URL = 'http://localhost:9000/v1/autenticacao/';


export const realizarLogin = (usuario, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, 'autenticacao/login', successCallback, errorCallback, finallyCallback, usuario)
}

export const registrarUsuario = (registrarUsuarioDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/registrarUsuario', successCallback, errorCallback, finallyCallback, registrarUsuarioDTO)
}

export const enviarCredenciais = (codigo, successCallback, errorCallback, finallyCallback) => {
  return requestGetSemAutorizacao(apiIFMeet, '/registrarUsuario/verificarCredenciais/' + codigo, successCallback, errorCallback, finallyCallback)
}

export const enviarConvite = (convite, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/registrarUsuario/enviarConvite', successCallback, errorCallback, finallyCallback, convite)
}

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'registrarUsuario', {
      username: user.username,
      email: user.email,
      nome: user.nome,
      sobrenome: user.sobrenome,
      password: user.password
    });
  }
}

export default new AuthService();