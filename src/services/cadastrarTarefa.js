import { apiRequest } from './request'
import { apiIFMeet } from './API'

/**
 * Serviço para manipulação de tarefas acadêmicas
 * @module TarefaService
 */

/**
 * Cadastra uma nova tarefa acadêmica
 * @param {Object} tarefaDTO - DTO contendo os dados da tarefa a ser cadastrada
 * @returns {Promise<Object>} Promise contendo a tarefa cadastrada
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha no cadastro
 */
export const cadastrarTarefa = async (tarefaDTO) => {
  try {
    const response = await apiRequest(apiIFMeet, 'post', '/tarefa/cadastrarTarefa', tarefaDTO);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao cadastrar tarefa");
  }
};

/**
 * Busca todos os trabalhos associados ao orientador
 * @returns {Promise<Array>} Promise contendo a lista de trabalhos
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarTrabalhos = async () => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', '/trabalho/findAllByOrientador');
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar trabalhos");
  }
};

/**
 * Busca todas as reuniões de um orientando específico
 * @param {number} codigoOrientando - ID do orientando para filtrar as reuniões
 * @returns {Promise<Array>} Promise contendo a lista de reuniões
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarReunioesPorOrientando = async (codigoOrientando) => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', `/tarefa/findAll?codigoOrientando=${codigoOrientando}&pageSize=999999&sortDirection=DESC&sortColumn=dataInicio`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar reuniões do orientando");
  }
};

/**
 * Busca todas as reuniões de um orientador específico
 * @param {number} codigoOrientador - ID do orientador para filtrar as reuniões
 * @returns {Promise<Array>} Promise contendo a lista de reuniões
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarReunioesPorOrientador = async (codigoOrientador) => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', `/tarefa/findAll?codigoOrientador=${codigoOrientador}&pageSize=999999&sortDirection=DESC&sortColumn=dataInicio`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar reuniões do orientador");
  }
};

/**
 * Busca uma tarefa específica pelo seu código identificador
 * @param {number} codigoTarefa - ID da tarefa a ser buscada
 * @returns {Promise<Object>} Promise contendo os dados da tarefa encontrada
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarTarefa = async (codigoTarefa) => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', `/tarefa/${codigoTarefa}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar tarefa");
  }
};

/**
 * Busca todas tarefas
 * @returns {Promise<Object>} Promise contendo os dados da tarefas encontrada
 * @throws {Error} Erro retornado pela API ou mensagem padrão caso ocorra falha na busca
 */
export const buscarTarefas = async () => {
  try {
    const response = await apiRequest(apiIFMeet, 'get', `/tarefa/findAll`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar tarefa");
  }
};