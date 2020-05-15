import React from 'react';
export class TimeBox extends React.Component {
    state = {
        isEditable: false,
    };
    handleEditableChange = () => {
        this.setState(prevState => ({ isEditable: !prevState.isEditable }));
    };
    onTitleChange = (event) => {
        const { onEdit, id, totalTimeInMinutes } = this.props;
        const title = event.target.value;
        onEdit({ title, totalTimeInMinutes, id });
    };
    onTotalTimeMinuteChange = (event) => {
        const { onEdit, id, title } = this.props;
        const totalTimeInMinutes = event.target.value;
        onEdit({ title, totalTimeInMinutes, id });
    };
    render() {
        const { title, totalTimeInMinutes, onDelete } = this.props;
        const { isEditable } = this.state;
        return (<div className="TimeBox">
            {isEditable
                ? (<>
                    <input onChange={this.onTitleChange} value={title} type="text" />
                    <input onChange={this.onTotalTimeMinuteChange} value={totalTimeInMinutes} type="number" />
                </>)
                :
                <h3>{title}-{totalTimeInMinutes}</h3>}
            <button onClick={onDelete}>Usuń</button>
            <button onClick={this.handleEditableChange}> {isEditable ? 'Zatwierdź' : 'Edytuj'}</button>
        </div>);
    }
}
