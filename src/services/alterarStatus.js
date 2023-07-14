import { requestGet, requestPost } from './request'
import { apiIFMeet } from './API'

export const alterarStatus = (statusDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/status/alterarStatus', successCallback, errorCallback, finallyCallback, statusDTO)
}

export const buscarStatus = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/status/findAll', successCallback, errorCallback, finallyCallback)
}