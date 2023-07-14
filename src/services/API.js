import axios from 'axios'

function axiosRequestSuccess (response) {
    return response
}
const timeoutRequests = 600000
export const apiIFMeet = axios.create({
    baseURL: "http://localhost:9000/v1/",
    timeout: timeoutRequests,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
    },
    withCredentials: false,
})

apiIFMeet.interceptors.response.use(axiosRequestSuccess)

