import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarReuniao = (reuniaoDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/reuniao/cadastrarReuniao', successCallback, errorCallback, finallyCallback, reuniaoDTO)
}

export const buscarTrabalhos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/trabalho/findAllByOrientador', successCallback, errorCallback, finallyCallback)
}