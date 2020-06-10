import React from 'react';
import { TimeBoxCreator } from './TimeBoxCreator';
import { TimeBox } from "./TimeBox";

import * as uuid from 'uuid';
import ErrorBoundary from "./Error";
import { TimeBoxEditor } from './TimeBoxEditor';
import { CurrentTimeBox } from './CurrentTimeBox';

export default class TimeBoxList extends React.Component {
    state = {
        timeboxes: [
            { id: uuid.v4(), title: 'test', totalTimeInMinutes: 10 },
            { id: uuid.v4(), title: 'test2', totalTimeInMinutes: 5 },
            { id: uuid.v4(), title: 'test3', totalTimeInMinutes: 1 },
        ],
        isEditableCurrent: false
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
        console.log(updatedTiemBox);
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

    handleEditCurrentTimeBox = () => {
        this.setState(prevState => ({ isEditableCurrent: true }));
    };

    handleConfirm = () => {
        this.setState(prevState => ({ isEditableCurrent: false }));
    }

    onTitleChange = (e) => {
        const { timeboxes, } = this.state;
        const title = e.target.value;
        this.updateTiemBox({...timeboxes[0],title})
    }

    onTotalTimeMinuteChange = (e) => {
        const { timeboxes, } = this.state;
        const time = e.target.value;
        this.updateTiemBox({...timeboxes[0],time})
        
    }

    render() {
        const { timeboxes, isEditableCurrent } = this.state;
        const { title, totalTimeInMinutes } = timeboxes[0];
        return (
            <ErrorBoundary message={"Cos poszlo nie tak ;("} >
                <TimeBoxCreator onCreate={this.handleCreate} />
                
                {timeboxes.map((timeBox, index) => (<TimeBox onDelete={() => this.removeTimeBox(index)} onEdit={this.updateTiemBox}  key={timeBox.id} id={timeBox.id} title={timeBox.title} totalTimeInMinutes={timeBox.totalTimeInMinutes} />))}
                {isEditableCurrent ?
                    <TimeBoxEditor onTitleChange={this.onTitleChange} onTotalTimeMinuteChange={this.onTotalTimeMinuteChange}  title={title} totalTimeInMinutes={totalTimeInMinutes} onConfirm={this.handleConfirm} isEditable={this.state.isEditableCurrent} />
                    :
                    <CurrentTimeBox isEditable={this.state.isEditableCurrent} onEdit={this.handleEditCurrentTimeBox} title={title} totalTimeInMinutes={totalTimeInMinutes} />}
            </ ErrorBoundary>
        );
    }
    ;
}
