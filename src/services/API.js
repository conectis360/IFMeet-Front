import axios from 'axios'

function axiosRequestSuccess(response) {
    return response
}

const timeoutRequests = 600000

export const apiIFMeet = axios.create({
    baseURL: "https://ifmeet.sytes.net:8443/api/v1/",  // Alterado para HTTPS e caminho via Nginx
    timeout: timeoutRequests,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // Mantido para envio de cookies/sessão
})

apiIFMeet.interceptors.response.use(axiosRequestSuccess)