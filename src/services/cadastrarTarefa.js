import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarTarefa = (tarefaDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/tarefa/cadastrarTarefa', successCallback, errorCallback, finallyCallback, tarefaDTO)
}

export const buscarTrabalhos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/trabalho/findAllByOrientador', successCallback, errorCallback, finallyCallback)
}