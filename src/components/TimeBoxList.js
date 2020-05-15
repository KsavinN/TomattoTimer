import React from 'react';
import { TimeBoxCreator } from './TimeBoxCreator';
import { TimeBox } from "./TimeBox";

import * as uuid from 'uuid';

export default class TimeBoxList extends React.Component {
    state = {
        timeboxes: [
            { id: uuid.v4(), title: 'test', totalTimeInMinutes: 10 },
            { id: uuid.v4(), title: 'test2', totalTimeInMinutes: 5 },
            { id: uuid.v4(), title: 'test3', totalTimeInMinutes: 1 },
        ]
    };
    addTimeBox = (timeBox) => {
        this.setState(prevState => {
            // const timeboxes = [...prevState.timeboxes, timeBox];
            const timeboxes = prevState.timeboxes.concat([timeBox]);
            return { timeboxes };
        });
    };
    removeTimeBox = (indexOfTimeBox) => {
        this.setState(prevState => {
            // const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexOfTimeBox);
            const timeboxes = prevState.timeboxes;
            timeboxes.splice(indexOfTimeBox, 1);
            return { timeboxes };
        });
    };
    updateTiemBox = (updatedTiemBox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox) => {
                return timebox.id === updatedTiemBox.id ? updatedTiemBox : timebox;
            });
            return { timeboxes };
        });
    };
    handleCreate = (timeBoxCreated) => {
        this.addTimeBox(timeBoxCreated);
    };
    render() {
        const { timeboxes } = this.state;
        return (<>
            <TimeBoxCreator onCreate={this.handleCreate} />
            {timeboxes.map((timeBox, index) => (<TimeBox onDelete={() => this.removeTimeBox(index)} onEdit={this.updateTiemBox} key={timeBox.id} id={timeBox.id} title={timeBox.title} totalTimeInMinutes={timeBox.totalTimeInMinutes} />))}


        </>);
    }
    ;
}
