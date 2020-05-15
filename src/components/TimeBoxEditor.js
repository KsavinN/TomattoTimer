import React from 'react';
export class TimeBoxEditor extends React.Component {
    render() {
        const { title, totalTimeInMinutes, onTitleChange, onTotalTimeMinuteChange, onConfirm, isEditable } = this.props;
        return (<div className={`TimeBoxEditor ${isEditable ? "" : "inactive"}`}>
            <label>
                Co robisz?
                        <input value={title} disabled={!isEditable} onChange={onTitleChange} type="text" />
            </label>
            <br />
            <label>Ile minut?
                        <input value={totalTimeInMinutes} disabled={!isEditable} onChange={onTotalTimeMinuteChange} type="text" />
            </label>
            <br />
            <button disabled={!isEditable} onClick={onConfirm}>Zatwierdź zmiany</button>
        </div>);
    }
}
