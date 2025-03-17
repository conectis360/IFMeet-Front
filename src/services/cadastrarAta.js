import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarAta = (ataDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/ata/cadastrarAta', successCallback, errorCallback, finallyCallback, ataDTO)
}

export const buscarReunioes = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/reuniao/findAllByOrientador', successCallback, errorCallback, finallyCallback)
}

export const buscarAtasPorReuniao = (codigoReuniao, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/ata/findAll?codigoReuniao='+ codigoReuniao +'&pageSize=999999&sortDirection=DESC&sortColumn=id', successCallback, errorCallback, finallyCallback)
}

export const buscarAtasPorTrabalho = (codigoTrabalho, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/ata/findAll?codigoTrabalho='+ codigoTrabalho +'&pageSize=999999&sortDirection=DESC&sortColumn=id', successCallback, errorCallback, finallyCallback)
}

export const buscarAta = (codigoAta, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/ata/' + codigoAta, successCallback, errorCallback, finallyCallback)
}