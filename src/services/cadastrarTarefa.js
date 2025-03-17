import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarTarefa = (tarefaDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/tarefa/cadastrarTarefa', successCallback, errorCallback, finallyCallback, tarefaDTO)
}

export const buscarTrabalhos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/trabalho/findAllByOrientador', successCallback, errorCallback, finallyCallback)
}

export const buscarReunioesPorOrientando = (codigoOrientando, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/tarefa/findAll?codigoOrientando='+ codigoOrientando +'&pageSize=999999&sortDirection=DESC&sortColumn=dataInicio', successCallback, errorCallback, finallyCallback)
}

export const buscarReunioesPorOrientador = (codigoOrientador, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/tarefa/findAll?codigoOrientador='+ codigoOrientador +'&pageSize=999999&sortDirection=DESC&sortColumn=dataInicio', successCallback, errorCallback, finallyCallback)
}

export const buscarTarefa = (codigoTarefa, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/tarefa/' + codigoTarefa, successCallback, errorCallback, finallyCallback)
}