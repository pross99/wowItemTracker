import axios from 'axios';


const axiosInstance = axios.create ({
    baseURL: 'https://springtransmogapi5-714423430443.europe-west1.run.app',
    headers: {"ngrok-skip-browser-warning":"true",
        }
})

export default axiosInstance
