import axios from 'axios';

function axiosRequestSuccess(response) {
    return response;
}

const timeoutRequests = 600000;

export const apiIFMeet = axios.create({
    //baseURL: import.meta.env.VITE_API_BASE_URL, // Pega do .env
    baseURL: "http://ifmeet.sytes.net:8443/api/",
    //baseURL: "http://localhost:9000/v1/",
    withCredentials: true,
    timeout: timeoutRequests,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiIFMeet.interceptors.response.use(axiosRequestSuccess);