import React from 'react';
import { TimeBoxEditor } from './TimeBoxEditor';
import { CurrentTimeBox } from './CurrentTimeBox';

export default class EditableTimeBox extends React.Component {
    state = {
        title: "Ucze się Reacta",
        isEditable: true,
        totalTimeInMinutes: 15
    };
    handleConfirm = () => {
        this.setState({ isEditable: false });
    };
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    };
    handleTotalTimeMinutesChange = (event) => {
        this.setState({ totalTimeInMinutes: event.target.value });
    };
    handleEdit = () => {
        this.setState({ isEditable: true });
    };
    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (<>
            <TimeBoxEditor title={title} isEditable={isEditable} totalTimeInMinutes={totalTimeInMinutes} onConfirm={this.handleConfirm} onTitleChange={this.handleTitleChange} onTotalTimeMinuteChange={this.handleTotalTimeMinutesChange} />
            <CurrentTimeBox title={title} isEditable={isEditable} onEdit={this.handleEdit} totalTimeInMinutes={totalTimeInMinutes} />
        </>);
    }
}

