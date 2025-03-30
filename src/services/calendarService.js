import { requestGetComposition } from './request'
import { apiIFMeet } from './API'


export const buscarEventosCalendario = async (codigoUsuario) => {
    try {
        const response = await requestGetComposition(apiIFMeet, '/calendario/findAll?codigoUsuario=' + codigoUsuario + '&pageSize=999999');
        return response; // Certifique-se de que está retornando .data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao buscar eventos");
    }
};