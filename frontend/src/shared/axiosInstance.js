import axios from 'axios'
import { getHeaders } from './headers'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: getHeaders()
});

axiosInstance.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

axiosInstance.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
});

export default axiosInstance;