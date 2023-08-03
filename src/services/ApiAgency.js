// axios
import axios from 'axios'
import config from '@/config';

export default () => {
    return axios.create({
        baseURL: `${config.domain}`,
        timeout: 5000, // 设置超时时间为5秒
        headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenAgency')}`
        }
    })
}