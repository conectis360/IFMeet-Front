import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarTrabalho = (trabalhoDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/trabalho/cadastrarTrabalho', successCallback, errorCallback, finallyCallback, trabalhoDTO)
}

export const buscarAlunos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/usuario/findAllAlunos', successCallback, errorCallback, finallyCallback)
}

export const buscarOrientadores = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/usuario/findAllOrientadores', successCallback, errorCallback, finallyCallback)
}

export const buscarCursos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/curso/findAll', successCallback, errorCallback, finallyCallback)
}