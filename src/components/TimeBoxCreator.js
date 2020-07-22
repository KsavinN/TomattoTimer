import React from 'react';

export class TimeBoxCreator extends React.Component {
    constructor (props) {
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
        this.form = React.createRef();
    }
    // Controled Component
    // state = {
    //     title: "",
    //     totalTimeInMinutes: 0,
    // };
    // handleTitleChange = (event) => {
    //     this.setState({ title: event.target.value });
    // };
    // handleTotalTimeChange = (event) => {
    //     this.setState({ totalTimeInMinutes: event.target.value });
    // };
    // handleSubmit = (event) => {
    //     const { title, totalTimeInMinutes } = this.state;
    //     event.preventDefault();
    //     this.props.onCreate({ id: uuid.v4(), title, totalTimeInMinutes });
    //     this.setState({ title: "", totalTimeInMinutes: 0 })
    // };
    // Not controlled way
    handleSubmit = (event) => {
        const { title, totalTimeInMinutes } = this.form.current.elements;
        event.preventDefault();
        this.props.onCreate({
            title: title.value,
            totalTimeInMinutes: Number(totalTimeInMinutes.value),
        });
        title.value = "";
        totalTimeInMinutes.value = "";
    };
    render() {
        return (<form ref={this.form} onSubmit={this.handleSubmit} className={`TimeBoxCreator`}>
            <label>
                Co robisz?
                            <input id="title" ref={this.titleInput} type="text" />
            </label>
            <br />
            <label>Ile minut?
                            <input id="totalTimeInMinutes" ref={this.totalTimeInMinutesInput} type="number" />
            </label>
            <br />
            <button>Dodaj timebox</button>
        </form>);
    }
}
