// import * as uuid from 'uuid';

const BASE_URL = 'http://localhost:4000/timeboxes';

const FetchTimeboxesAPI = {
   

    async addTimebox(timeboxToAdd) {
        const response = await makeRequest(BASE_URL,"POST",timeboxToAdd)
        const timeboxes = await response.json();
        return timeboxes;
    },
    async getAllTimeboxes() {
        const response = await makeRequest(BASE_URL, "GET");
        const timeboxes = await response.json();
        return timeboxes;
    },
    async replaceTimebox(timeboxToRepalce) {
        const response = await makeRequest(`${BASE_URL}/${timeboxToRepalce.id}`,"PUT",timeboxToRepalce)
        const replacedTimeboxe = await response.json();
        return replacedTimeboxe;
    },
    async removeTimebox(timeboxToRemove) {
            if (!timeboxToRemove.id) {
                throw new Error('Timebox has wrong id');
            }
            await makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE");
    }
}

export default FetchTimeboxesAPI;


async  function makeRequest(url, method, body) {
    const jsonBody = body ? JSON.stringify(body) : undefined
    const response = await window.fetch(url,
    {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonBody
    }
);
if (!response.ok) {
    throw new Error("Something go wrong");
}
    return await response;
};