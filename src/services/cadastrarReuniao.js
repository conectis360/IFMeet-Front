import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarReuniao = (reuniaoDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/reuniao/cadastrarReuniao', successCallback, errorCallback, finallyCallback, reuniaoDTO)
}

export const buscarTrabalhos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/trabalho/findAllByOrientador', successCallback, errorCallback, finallyCallback)
}

export const buscarReunioesPorOrientador = (codigoOrientador, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/reuniao/findAll?codigoOrientador='+ codigoOrientador +'&pageSize=999999&sortDirection=DESC&sortColumn=data', successCallback, errorCallback, finallyCallback)
}

export const buscarReunioesPorOrientando = (codigoOrientando, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/reuniao/findAll?codigoOrientando='+ codigoOrientando +'&pageSize=999999&sortDirection=DESC&sortColumn=data', successCallback, errorCallback, finallyCallback)
}

export const buscarReuniao = (codigoReuniao, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/reuniao/'+ codigoReuniao , successCallback, errorCallback, finallyCallback)
}