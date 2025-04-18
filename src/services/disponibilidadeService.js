import { requestGetComposition, apiRequest } from './request'
import { apiIFMeet } from './API'


// GET - Todas Disponibilidades por usuário
export const buscarConfiguracoesDisponibilidade = async (codigoUsuario) => {
    try {
        const response = await requestGetComposition(apiIFMeet, '/disponibilidade/findAll?codigoUsuario=' + codigoUsuario + '&pageSize=999999');
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao buscar disponibilidade");
    }
};

// POST - Nova Disponibilidade
export const saveDisponibilidade = async (disponibilidade) => {
    return apiRequest(apiIFMeet, 'post', '/disponibilidade', disponibilidade);
};

// PUT - Atualizar Disponibilidade
export const updateDisponibilidade = async (id, disponibilidade) => {
    return apiRequest(apiIFMeet, 'put', `/disponibilidade`, disponibilidade);
};

// DELETE - Remover Disponibilidade
export const deleteDisponibilidade = async (id) => {
    return apiRequest(apiIFMeet, 'delete', `/disponibilidade/${id}`);
};