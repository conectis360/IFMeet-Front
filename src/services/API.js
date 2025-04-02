import axios from 'axios'

function axiosRequestSuccess(response) {
    return response
}
const timeoutRequests = 600000
export const apiIFMeet = axios.create({
    baseURL: "https://ifmeet.sytes.net:8443/api",
    withCredentials: true,
    timeout: timeoutRequests,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiIFMeet.interceptors.response.use(axiosRequestSuccess)