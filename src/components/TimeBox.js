import React from 'react';
import PropTypes from "prop-types";

export class TimeBox extends React.Component {
    state = {
        isEditable: false,
        title: "",
        totalTimeInMinutes:0
    };
   
    componentDidMount() {
        const { title, totalTimeInMinutes } = this.props;
        this.setState({ title, totalTimeInMinutes });
    }

    handleEditableChange = (editable) => {
        if (editable) {
            const { onEdit, id } = this.props;
            const { title, totalTimeInMinutes } = this.state;
            onEdit({ title, totalTimeInMinutes, id });
        }
        this.setState(prevState => ({isEditable:!prevState.isEditable}));
       
    };
    onTitleChange = (event) => {
        const title = event.target.value;
        this.setState({ title });
    };
    onTotalTimeMinuteChange = (event) => {
        const totalTimeInMinutes = event.target.value;
        if(totalTimeInMinutes <= 0) {
            throw new Error();
        }
        this.setState({ totalTimeInMinutes });
    };
    render() {
        const { onDelete } = this.props;
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (<div className="TimeBox">
            {isEditable
                ? (<>
                    <input onChange={this.onTitleChange} value={title} type="text" />
                    <input onChange={this.onTotalTimeMinuteChange} value={totalTimeInMinutes} type="number" />
                </>)
                :
                <h3>{title}-{totalTimeInMinutes}</h3>}
            <button onClick={onDelete}>Usuń</button>
            <button onClick={() => this.handleEditableChange(isEditable)}> {isEditable ? 'Zatwierdź' : 'Edytuj'}</button>
        </div>);
    }
}

TimeBox.defaultProps = {
    onDelete: (event) => { console.log('on Delete', event) },
    onEdit: (input) => { console.log('on Edit',input) }
}


TimeBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    totalTimeInMinutes: PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}