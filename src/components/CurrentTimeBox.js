import React from 'react';
import Clock from "../components/Clock";
import { ProgressBar } from './ProgressBar';
import { getMinutesAndSecondsFromDurationInSeconds } from '../lib/time';
import { ProgressArc } from './ProgresArc';
export class CurrentTimeBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pasueCount: 0,
            elapsedTimeInSeconds: 0
        };
        this.handleStop = this.handleStop.bind(this);
        this.intervalId = null;
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    handleStart(event) {
        this.setState({
            isRunning: true
        });
        this.startTimer();
    }
    togglePause(event) {
        this.setState(function (prevState) {
            const isPaused = !prevState.isPaused;
            if (isPaused) {
                this.stopTimer();
            }
            else {
                this.startTimer();
            }
            return {
                isPaused,
                pasueCount: isPaused ? prevState.pasueCount + 1 : prevState.pasueCount
            };
        });
        this.stopTimer();
    }
    handleStop() {
        this.stopTimer();
        this.setState({
            isRunning: false,
            isPaused: false,
            pasueCount: 0,
            elapsedTimeInSeconds: 0
        });
    }
    startTimer() {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(() => {
                this.setState((prevState) => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.01 }));
            }, 10);
        }
    }
    stopTimer() {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
    }
    render() {
        const { isRunning, isPaused, pasueCount, elapsedTimeInSeconds } = this.state;
        const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const [minutes, seconds] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
        const progressInPercent = elapsedTimeInSeconds / totalTimeInSeconds * 100;
        if (timeLeftInSeconds < 0) {
            this.handleStop();
        }
        return (<div className={`TimeBox ${isEditable ? "inactive" : ""}`}>
            <h1 data-testid="title">{title}</h1>
            <Clock seconds={seconds} minutes={minutes} className={isPaused ? 'inactive' : ''} />
            <ProgressArc percent={progressInPercent} color='blue' className={isPaused ? 'inactive' : ''} />
            <ProgressBar percent={progressInPercent} color='blue' className={isPaused ? 'inactive' : ''} />
            <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
            <button onClick={() => this.handleStart()} disabled={isRunning}>Start</button>
            <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
            <button onClick={() => this.togglePause()} disabled={!isRunning}>{(isPaused) ? 'Wznów' : 'Pauza'}</button>
                    liczba przerw: {pasueCount}
        </div>);
    }
}
