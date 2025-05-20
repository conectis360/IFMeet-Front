import { requestGetComposition, apiRequest } from './request'
import { apiIFMeet } from './API'


/**
 * Busca todos os eventos do calendário.
 * @returns {Promise} Retorna uma Promise com os eventos do calendário
 * @throws Error Caso ocorra erro ao buscar os eventos
 */
export const buscarEventosCalendario = async () => {
    try {
        const response = await requestGetComposition(apiIFMeet, '/calendario/findAll?pageSize=999999');
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao buscar eventos");
    }
};

/**
 * Busca as configurações de disponibilidade para um usuário específico.
 * @param {number} codigoUsuario O código do usuário
 * @returns {Promise} Retorna uma Promise com as configurações de disponibilidade
 * @throws Error Caso ocorra erro ao buscar as configurações
 */
export const buscarConfiguracoesDisponibilidade = async (codigoUsuario) => {
    try {
        const response = await requestGetComposition(apiIFMeet, `/disponibilidade/findAll?codigoUsuario=${codigoUsuario}&pageSize=999999`);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao buscar disponibilidade");
    }
};

/**
 * Salva um novo evento no calendário.
 * @param {Object} evento O objeto do evento a ser salvo
 * @returns {Promise} Retorna uma Promise com a resposta da API
 * @throws Error Caso ocorra erro ao salvar o evento
 */
export const saveEventoCalendario = async (evento) => {
    // Formata corretamente para o padrão ISO-8601 que o Java espera
    const eventoFormatado = {
        ...evento,
        start: formatDateForJava(evento.start),
        end: formatDateForJava(evento.end)
    };

    return apiRequest(apiIFMeet, 'post', '/calendario', eventoFormatado);
};

/**
 * Formata uma string de data/hora para o padrão ISO-8601 esperado pelo backend.
 * @param {string} dateTimeStr A string de data/hora a ser formatada
 * @returns {string|null} Retorna a string formatada ou null caso não haja dados
 */
function formatDateForJava(dateTimeStr) {
    if (!dateTimeStr) return null;

    // Remove os segundos se existirem (formato HH:mm:ss -> HH:mm)
    return dateTimeStr.replace(/(:\d{2})(?=Z|$)/, '');
}

/**
 * Atualiza um evento no calendário.
 * @param {Object} evento O objeto com as novas informações do evento
 * @returns {Promise} Retorna uma Promise com a resposta da API
 * @throws Error Caso ocorra erro ao atualizar o evento
 */
export const updateEventoCalendario = async (evento) => {
    return apiRequest(apiIFMeet, 'put', `/calendario`, evento);
};

/**
 * Remove um evento do calendário.
 * @param {number} id O ID do evento a ser removido
 * @returns {Promise} Retorna uma Promise com a resposta da API
 * @throws Error Caso ocorra erro ao remover o evento
 */
export const deleteEventoCalendario = async (id) => {
    return apiRequest(apiIFMeet, 'delete', `/calendario/${id}`);
};

/**
 * Busca todos os eventos do calendário View.
 * @returns {Promise} Retorna uma Promise com os eventos do calendário
 * @throws Error Caso ocorra erro ao buscar os eventos
 */
export const buscarReunioesView = async () => {
    try {
        const response = await requestGetComposition(apiIFMeet, '/calendario/findAllView?pageSize=999999');
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao buscar reuniões");
    }
};