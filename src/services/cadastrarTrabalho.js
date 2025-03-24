import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarTrabalho = (trabalhoDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/trabalho', successCallback, errorCallback, finallyCallback, trabalhoDTO)
}

export const buscarAlunos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/usuario/findAll?codigoTipoUsuario=3&pageSize=99999', successCallback, errorCallback, finallyCallback)
}

export const buscarOrientadores = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/usuario/findAll?codigoTipoUsuario=2&pageSize=99999', successCallback, errorCallback, finallyCallback)
}

export const buscarCursos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/curso/findAll', successCallback, errorCallback, finallyCallback)
}

export const buscarTrabalhos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/trabalho/findAll', successCallback, errorCallback, finallyCallback)
}

export const buscarTrabalho = (codigoTrabalho, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, 'trabalho/findAll?codigoTrabalho=' + codigoTrabalho, successCallback, errorCallback, finallyCallback)
}