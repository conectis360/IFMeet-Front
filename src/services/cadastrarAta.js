import { apiRequest } from './request'
import { apiIFMeet } from './API'

/**
 * Serviço para manipulação de atas de reunião
 * @module AtaService
 */

/**
 * Cadastra uma nova ata de reunião
 * @param {Object} ataDTO - DTO contendo os dados da ata a ser cadastrada
 * @returns {Promise<Object>} Promise contendo a ata cadastrada
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha no cadastro
 */
export const cadastrarAta = async (ataDTO) => {
  try {
    const response = await apiRequest(apiIFMeet, 'post', '/ata/cadastrarAta', ataDTO);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao cadastrar ata");
  }
};

/**
 * Busca todas as atas
 * @returns {Promise<Object>} Promise contendo os dados da ata encontrada
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarAtas = async () => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', `/ata/findAll`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar atas");
  }
};

/**
 * Busca uma ata específica pelo seu código identificador
 * @param {number} codigoAta - ID da ata a ser buscada
 * @returns {Promise<Object>} Promise contendo os dados da ata encontrada
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarAta = async (codigoAta) => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', `/ata/${codigoAta}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar ata");
  }
};

/**
 * Atualiza uma ata existente
 * @param {number} codigoAta - ID da ata a ser atualizada
 * @param {Object} ataDTO - DTO contendo os dados atualizados da ata
 * @returns {Promise<Object>} Promise contendo a ata atualizada
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na atualização
 */
export const atualizarAta = async (codigoAta, ataDTO) => {
  try {
    const response = await apiRequest(apiIFMeet, 'put', `/ata/${codigoAta}`, ataDTO);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar ata");
  }
};

/**
 * Remove uma ata existente
 * @param {number} codigoAta - ID da ata a ser removida
 * @returns {Promise<Object>} Promise vazia em caso de sucesso
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na remoção
 */
export const excluirAta = async (codigoAta) => {
  try {
    const response = await apiRequest(apiIFMeet, 'delete', `/ata/${codigoAta}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao excluir ata");
  }
};