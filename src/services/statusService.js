import { requestGetComposition } from './request'
import { apiIFMeet } from './API'


export const buscarStatus = async () => {
    try {
        const response = await requestGetComposition(apiIFMeet, '/status/findAll' + '?pageSize=999999');
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao buscar status");
    }
};