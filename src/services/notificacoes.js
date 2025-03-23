import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const cadastrarTrabalho = (trabalhoDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/trabalho/cadastrarTrabalho', successCallback, errorCallback, finallyCallback, trabalhoDTO)
}

export const buscarCountNotificacoes = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/notificacao/count', successCallback, errorCallback, finallyCallback)
}
export const buscarTodasNotificacoes = (page, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/notificacao/findAll?pageSize=' + page.pageSize + '&pageNumber=' + page.pageNumber, successCallback, errorCallback, finallyCallback)
}