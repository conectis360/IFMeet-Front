import { apiRequest } from './request'
import { apiIFMeet } from './API'

/**
 * Serviço para manipulação de trabalhos acadêmicos
 * @module TrabalhoService
 */

/**
 * Busca todos os trabalhos associados a um usuário específico
 * @param {number} codigoUsuario - ID do usuário para filtrar os trabalhos
 * @returns {Promise<Object>} Promise contendo a lista de trabalhos do usuário
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na requisição
 */
export const buscarTrabalhosPorUsuario = async (codigoUsuario) => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', 'trabalho/findAll?codigoUsuario=' + codigoUsuario + '&pageSize=999999');
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Cadastra um novo trabalho acadêmico
 * @param {Object} trabalhoDTO - DTO contendo os dados do trabalho a ser cadastrado
 * @returns {Promise<Object>} Promise contendo o trabalho cadastrado
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha no cadastro
 */
export const cadastrarTrabalho = async (trabalhoDTO) => {
  try {
    const response = await apiRequest(apiIFMeet, 'post', '/trabalho', trabalhoDTO);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Busca todos os alunos cadastrados no sistema
 * @returns {Promise<Array>} Promise contendo a lista de alunos
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarAlunos = async () => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', '/usuario/findAll?codigoTipoUsuario=3&pageSize=99999');
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Busca todos os orientadores cadastrados no sistema
 * @returns {Promise<Array>} Promise contendo a lista de orientadores
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarOrientadores = async () => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', '/usuario/findAll?codigoTipoUsuario=2&pageSize=99999');
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Busca todos os cursos disponíveis no sistema
 * @returns {Promise<Array>} Promise contendo a lista de cursos
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarCursos = async () => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', '/curso/findAll');
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Busca um trabalho específico pelo seu código identificador
 * @param {number} codigoTrabalho - ID do trabalho a ser buscado
 * @returns {Promise<Object>} Promise contendo os dados do trabalho encontrado
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarTrabalho = async (codigoTrabalho) => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', 'trabalho/findAll?codigoTrabalho=' + codigoTrabalho);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const buscarTrabalhos = async () => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', '/trabalho/findAll');
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};