import axios from 'axios';


const axiosInstance = axios.create ({
    baseURL: 'http://localhost:8080',
    headers: {"ngrok-skip-browser-warning":"true",
        }
})

export default axiosInstance
