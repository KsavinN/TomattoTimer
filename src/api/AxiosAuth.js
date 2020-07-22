import axios from 'axios';

const BASE_URL = 'http://localhost:4000/login';

const AxiosTimeboxesAPI = {
    login(credentail) {
        return axios.post(BASE_URL, credentail);
    }
}

export default AxiosTimeboxesAPI;

