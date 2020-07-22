import * as uuid from 'uuid';

function wait(ms = 1000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}


const FakeTimeboxesAPI = {
    timeboxes : [
        { id: '1', title: 'test', totalTimeInMinutes: 1 },
        { id: '2', title: 'test2', totalTimeInMinutes: 5 },
        { id: '3', title: 'test3', totalTimeInMinutes: 1 },
    ],

    async addTimebox(timeboxToAdd) {
        await wait(1000);
        const addedTimebox = { ...timeboxToAdd, id:uuid.v4()}
        this.timeboxes.push(addedTimebox);
        console.log("PUT", this.timeboxes);
        return addedTimebox;
    },
    async getAllTimeboxes() {
        await wait(2000);
        console.log("GET", this.timeboxes);
        return [...this.timeboxes]
    },
    async replaceTimebox(timeboxToRepalce) {
        await wait(2000);
        if (!timeboxToRepalce.id) {
            throw Error('timebox dont have id');
        }
        const index = this.timeboxes.findIndex(timebox => timeboxToRepalce.id === timebox.id);
        const replacedTimebox = { ...timeboxToRepalce };
        this.timeboxes[index] = replacedTimebox;
        console.log("PUT", this.timeboxes);
        return replacedTimebox;
    },
    async removeTimebox(timeboxToRemove) {
        await wait(2000);
        if (!timeboxToRemove.id) {
            throw Error('timebox dont have id');
        }
        const index = this.timeboxes.findIndex(timebox => timeboxToRemove.id === timebox.id);
        this.timeboxes.splice(index, 1);
        console.log("DELETE", this.timeboxes);
        return timeboxToRemove;
    }
}

export default FakeTimeboxesAPI;