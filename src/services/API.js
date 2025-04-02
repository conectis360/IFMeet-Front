import axios from 'axios'

function axiosRequestSuccess(response) {
    return response
}
const timeoutRequests = 600000
export const apiIFMeet = axios.create({
    baseURL: "http://ifmeet.sytes.net:9000/v1/",
    timeout: timeoutRequests,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

apiIFMeet.interceptors.response.use(axiosRequestSuccess)