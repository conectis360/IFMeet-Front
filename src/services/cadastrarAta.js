import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarAta = (ataDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/ata/cadastrarAta', successCallback, errorCallback, finallyCallback, ataDTO)
}

export const buscarReunioes = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/reuniao/findAllByOrientador', successCallback, errorCallback, finallyCallback)
}