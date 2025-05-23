import { apiRequest } from './request'
import { apiIFMeet } from './API'

/**
 * Serviço para manipulação de notificações
 * @module NotificacaoService
 */

/**
 * Cadastra um novo trabalho
 * @param {Object} trabalhoDTO - DTO contendo os dados do trabalho a ser cadastrado
 * @returns {Promise<Object>} Promise contendo o trabalho cadastrado
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha no cadastro
 */
export const cadastrarTrabalho = async (trabalhoDTO) => {
  try {
    const response = await apiRequest(apiIFMeet, 'post', '/trabalho/cadastrarTrabalho', trabalhoDTO);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao cadastrar trabalho");
  }
};

/**
 * Busca a contagem de notificações
 * @returns {Promise<number>} Promise contendo o número total de notificações
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarCountNotificacoes = async () => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', '/notificacao/count');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar contagem de notificações");
  }
};

/**
 * Busca todas as notificações com paginação
 * @param {Object} page - Objeto contendo os parâmetros de paginação
 * @param {number} page.pageSize - Número de itens por página
 * @param {number} page.pageNumber - Número da página atual
 * @returns {Promise<Object>} Promise contendo as notificações paginadas
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarTodasNotificacoes = async (page) => {
  try {
    const response = await apiRequest(
      apiIFMeet,
      'get',
      `/notificacao/findAll?pageSize=${page.pageSize}&pageNumber=${page.pageNumber}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar notificações");
  }
};