import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarDocumentacao = (documentacaoDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/documentacao/cadastrarDocumentacao', successCallback, errorCallback, finallyCallback, documentacaoDTO)
}

export const buscarTrabalhos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/trabalho/findTrabalhoByOrientador', successCallback, errorCallback, finallyCallback)
}