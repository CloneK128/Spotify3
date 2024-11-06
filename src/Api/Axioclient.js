import axios from 'axios';
import { getToken } from '../Service/Localtokenservice';
const axiosclient = axios.create(
    {
        baseURL:'http://localhost:8888/api/v1',
        headers:{
            'Content-Type': 'application/json'
        }
    }
)
axiosclient.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)

)
export default axiosclient;