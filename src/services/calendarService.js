import { requestGetComposition, apiRequest } from './request'
import { apiIFMeet } from './API'


export const buscarEventosCalendario = async (codigoUsuario) => {
    try {
        const response = await requestGetComposition(apiIFMeet, '/calendario/findAll?codigoUsuario=' + codigoUsuario + '&pageSize=999999');
        return response; // Certifique-se de que está retornando .data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao buscar eventos");
    }
};

export const saveEventoCalendario = async (evento) => {
    // Formata corretamente para o padrão ISO-8601 que o Java espera
    const eventoFormatado = {
        ...evento,
        start: formatDateForJava(evento.start),
        end: formatDateForJava(evento.end)
    };
    return apiRequest(apiIFMeet, 'post', '/calendario', eventoFormatado);
};

// Função auxiliar para formatar datas para o Java
function formatDateForJava(dateTimeStr) {
    if (!dateTimeStr) return null;

    // Remove os segundos se existirem (formato HH:mm:ss -> HH:mm)
    return dateTimeStr.replace(/(:\d{2})(?=Z|$)/, '');
}

// PUT - Atualizar evento
export const updateEventoCalendario = async (id, evento) => {
    return apiRequest(apiIFMeet, 'put', `/calendario/${id}`, evento);
};

// DELETE - Remover evento
export const deleteEventoCalendario = async (id) => {
    return apiRequest(apiIFMeet, 'delete', `/calendario/${id}`);
};