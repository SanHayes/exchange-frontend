// axios
import axios from 'axios'
import config from '@/config';

const request = axios.create({
    baseURL: `${config.domain}`,
    timeout: 5000 // 设置超时时间为5秒
})

request.interceptors.request.use(config => {
        const token = localStorage.getItem("tokenUser")
        if (token) {
            config.headers["Authorization"] = `Bearer ${localStorage.getItem('tokenUser')}`
        }
        return config
    }, (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use((response) => {
        const data = response?.data;
        if (data?.success === 4) {
            localStorage.removeItem("tokenUser");
            window.location.href = window.location.origin + "/login";
            return;
        }
        return response;
    }, (error) => {
        return Promise.reject(error);
    }
);

export default () => {
    return request;
}