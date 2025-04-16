import { requestGet, requestPost } from './request'
import { requestGetComposition } from './request'
import { apiIFMeet } from './API'

export const cadastrarTrabalho = (trabalhoDTO, successCallback, errorCallback, finallyCallback) => {
  return requestPost(apiIFMeet, '/trabalho', successCallback, errorCallback, finallyCallback, trabalhoDTO)
}

export const buscarAlunos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/usuario/findAll?codigoTipoUsuario=3&pageSize=99999', successCallback, errorCallback, finallyCallback)
}

export const buscarOrientadores = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/usuario/findAll?codigoTipoUsuario=2&pageSize=99999', successCallback, errorCallback, finallyCallback)
}

export const buscarCursos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/curso/findAll', successCallback, errorCallback, finallyCallback)
}

export const buscarTrabalhos = (successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, '/trabalho/findAll', successCallback, errorCallback, finallyCallback)
}

export const buscarTrabalho = (codigoTrabalho, successCallback, errorCallback, finallyCallback) => {
  return requestGet(apiIFMeet, 'trabalho/findAll?codigoTrabalho=' + codigoTrabalho, successCallback, errorCallback, finallyCallback)
}

export const buscarTrabalhosPorUsuario = async (codigoUsuario) => {
  try {
    const response = await requestGetComposition(apiIFMeet, 'trabalho/findAll?codigoUsuario=' + codigoUsuario + '&pageSize=999999');
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar eventos");
  }
};