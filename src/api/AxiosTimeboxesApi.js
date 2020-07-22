import axios from 'axios';

const BASE_URL = 'http://localhost:4000/timeboxes';

const getHeader = () => {
    const token = window.localStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    }
};

const FetchTimeboxesAPI = {
    async addTimebox(timeboxToAdd) {
        const response = await axios.post(BASE_URL, timeboxToAdd,getHeader());
        return response.data;
    },
    async getAllTimeboxes() {
        const response = await axios.get(BASE_URL,getHeader());
        const timeboxes = response.data;
        return timeboxes;
    },
    async replaceTimebox(timeboxToRepalce) {
        const response = await axios.put(`${BASE_URL}/${timeboxToRepalce.id}`, timeboxToRepalce,getHeader());
        const replacedTimeboxe = response.data;
        return replacedTimeboxe;
    },
    async removeTimebox(timeboxToRemove) {
        await axios.delete(`${BASE_URL}/${timeboxToRemove.id}`,getHeader());
         
    }
}

export default FetchTimeboxesAPI;

