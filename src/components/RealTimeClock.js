import React from 'react';
import Clock from "../components/Clock";

export default class RealTimeClock extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            time: new Date()
        }
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
       
        this.intervalId = window.setInterval(() => {
            const time = new Date();
            this.setState({time});
        }, 100);
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
    }
    render() {
        const { time } = this.state;
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const hours = time.getHours();
    
        return (<div className={`RealTimeClock`}>
            <Clock hours={hours} seconds={seconds} minutes={minutes} />
        </div>);
    }
}
