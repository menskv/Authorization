import axios from "axios";
import { setLogoutState } from "GlobalState";

// Create axios instance with base url and credentials support
export const axiosInstance = axios.create({
    baseURL: "https://top-sistem.ru/api/",
    withCredentials: true,
    credentials: true,
    headers: {
        common: {
            Accept: 'application/json',
        }
    }
});

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
    config.params = config.params || {};
    config.params['token'] = localStorage.getItem('token-admin');
    return config;
}

const onError = (error) => {
    if (error.response.status === 401) {
        setLogoutState()
        localStorage.removeItem('token-admin')
        return
    }
    return Promise.reject(error);
}

axiosInstance.interceptors.request.use(onRequest, null);
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, onError);

export class BaseController {
    instance = axiosInstance
}