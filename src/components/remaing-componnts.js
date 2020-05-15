import React from 'react';

import * as uuid from 'uuid';

import Clock from "../components/Clock";


function ProgressBar({ className = "", percent = 0, trackRemaining = false }) {
    percent = (trackRemaining) ? 100 - percent : percent
    return (

      <div className={`ProgressBar ${className} ${trackRemaining ? 'reverse' : ''}`}>
        <div style={{ width: `${percent}%` }}></div>
      </div>
    )
  }

  class TimeBoxEditor extends React.Component {
    render() {
      const { title, totalTimeInMinutes, onTitleChange, onTotalTimeMinuteChange, onConfirm, isEditable } = this.props;
      return (
        <div className={`TimeBoxEditor ${isEditable ? "" : "inactive"}`}>
          <label>
            Co robisz?
                        <input
              value={title}
              disabled={!isEditable}
              onChange={onTitleChange}
              type="text" />
          </label>
          <br />
          <label>Ile minut?
                        <input
              value={totalTimeInMinutes}
              disabled={!isEditable}
              onChange={onTotalTimeMinuteChange}
              type="text" />
          </label>
          <br />
          <button
            disabled={!isEditable}
            onClick={onConfirm}
          >Zatwierdź zmiany</button>
        </div>
      )
    }
  }

  class TimeBoxCreator extends React.Component {

    constructor(props) {
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
        id: uuid.v4(),
        title: title.value,
        totalTimeInMinutes: totalTimeInMinutes.value,
      });
      title.value = "";
      totalTimeInMinutes.value = "";
    };

    render() {
      return (
        <form ref={this.form} onSubmit={this.handleSubmit} className={`TimeBoxCreator`}>
          <label>
            Co robisz?
                            <input
              id="title"
              ref={this.titleInput}
              type="text" />
          </label>
          <br />
          <label>Ile minut?
                            <input
              id="totalTimeInMinutes"
              ref={this.totalTimeInMinutesInput}
              type="number" />
          </label>
          <br />
          <button>Dodaj timebox</button>
        </form>
      )
    }
  }

  class TimeBoxList extends React.Component {

    state = {
      timeboxes: [
        { id: uuid.v4(), title: 'test', totalTimeInMinutes: 10 },
        { id: uuid.v4(), title: 'test2', totalTimeInMinutes: 5 },
        { id: uuid.v4(), title: 'test3', totalTimeInMinutes: 1 },
      ]
    }

    addTimeBox = (timeBox) => {
      this.setState(prevState => {
        // const timeboxes = [...prevState.timeboxes, timeBox];
        const timeboxes = prevState.timeboxes.concat([timeBox]);
        return { timeboxes };
      })
    }

    removeTimeBox = (indexOfTimeBox) => {
      this.setState(prevState => {
        // const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexOfTimeBox);
        const timeboxes = prevState.timeboxes;
        timeboxes.splice(indexOfTimeBox, 1);
        return { timeboxes };
      })
    }

    updateTiemBox = (updatedTiemBox) => {
      this.setState(prevState => {
        const timeboxes = prevState.timeboxes.map((timebox) => {
          return timebox.id === updatedTiemBox.id ? updatedTiemBox : timebox;
        });
        return { timeboxes };
      })
    }

    handleCreate = (timeBoxCreated) => {
      this.addTimeBox(timeBoxCreated)
    }



    render() {
      const { timeboxes } = this.state;
      return (
        <>
          <TimeBoxCreator onCreate={this.handleCreate} />
          {timeboxes.map((timeBox, index) =>
            (<TimeBox
              onDelete={() => this.removeTimeBox(index)}
              onEdit={this.updateTiemBox}
              key={timeBox.id}
              id={timeBox.id}
              title={timeBox.title}
              totalTimeInMinutes={timeBox.totalTimeInMinutes} />
            )
          )}


        </>
      )
    };
  }

  class CurrentTimeBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isRunning: false,
        isPaused: false,
        pasueCount: 0,
        elapsedTimeInSeconds: 0
      }
      this.handleStop = this.handleStop.bind(this);
    }

    handleStart(event) {
      this.setState(
        {
          isRunning: true
        }
      )
      this.startTimer()
    }

    togglePause(event) {
      this.setState(
        function (prevState) {
          const isPaused = !prevState.isPaused;
          if (isPaused) {
            this.stopTimer();
          } else {
            this.startTimer();
          }
          return {
            isPaused,
            pasueCount: isPaused ? prevState.pasueCount + 1 : prevState.pasueCount
          }
        }
      )
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
      this.intervalId = window.setInterval(
        () => {
          this.setState(
            (prevState) => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.01 })
          )
        }, 10
      )
    }



    stopTimer() {
      window.clearInterval(this.intervalId);
    }

    render() {
      const { isRunning, isPaused, pasueCount, elapsedTimeInSeconds } = this.state;
      const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
      const totalTimeInSeconds = totalTimeInMinutes * 60;
      const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
      const minutes = Math.floor(timeLeftInSeconds / 60);
      const seconds = Math.floor(timeLeftInSeconds % 60);
      const progressInPercent = elapsedTimeInSeconds / totalTimeInSeconds * 100;

      if (timeLeftInSeconds < 0) {
        this.handleStop();
      }






      return (
        <div className={`TimeBox ${isEditable ? "inactive" : ""}`}>
          <h1>{title}</h1>
          <Clock seconds={seconds} minutes={minutes} className={isPaused ? 'inactive' : ''} />
          <ProgressBar percent={progressInPercent} className={isPaused ? 'inactive' : ''} />
          <button onClick={onEdit} disabled={isEditable} >Edytuj</button>
          <button onClick={() => this.handleStart()} disabled={isRunning} >Start</button>
          <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
          <button onClick={() => this.togglePause()} disabled={!isRunning}>{(isPaused) ? 'Wznów' : 'Pauza'}</button>
                    liczba przerw: {pasueCount}
        </div>
      )
    }
  }


  class EditableTimeBox extends React.Component {

    state = {
      title: "Ucze się Reacta",
      isEditable: true,
      totalTimeInMinutes: 15
    }

    handleConfirm = () => {
      this.setState({ isEditable: false })
    }

    handleTitleChange = (event) => {
      this.setState({ title: event.target.value })
    }

    handleTotalTimeMinutesChange = (event) => {
      this.setState({ totalTimeInMinutes: event.target.value })
    }

    handleEdit = () => {
      this.setState({ isEditable: true })
    }

    render() {
      const { title, totalTimeInMinutes, isEditable } = this.state;
      return (
        <>
          <TimeBoxEditor
            title={title}
            isEditable={isEditable}
            totalTimeInMinutes={totalTimeInMinutes}
            onConfirm={this.handleConfirm}
            onTitleChange={this.handleTitleChange}
            onTotalTimeMinuteChange={this.handleTotalTimeMinutesChange} />
          <CurrentTimeBox
            title={title}
            isEditable={isEditable}
            onEdit={this.handleEdit}
            totalTimeInMinutes={totalTimeInMinutes}
          />
        </>
      )
    }
  }

  class TimeBox extends React.Component {

    state = {
      isEditable: false,
    };

    handleEditableChange = () => {
      this.setState(prevState => ({ isEditable: !prevState.isEditable }))
    }

    onTitleChange = (event) => {
      const { onEdit, id, totalTimeInMinutes } = this.props;
      const title = event.target.value;
      onEdit({ title, totalTimeInMinutes, id });
    }

    onTotalTimeMinuteChange = (event) => {
      const { onEdit, id, title } = this.props;
      const totalTimeInMinutes = event.target.value;
      onEdit({ title, totalTimeInMinutes, id });
    }

    render() {
      const { title, totalTimeInMinutes, onDelete } = this.props;
      const { isEditable } = this.state;
      return (
        <div className="TimeBox">
          {isEditable
            ? (<>
              <input onChange={this.onTitleChange} value={title} type="text" />
              <input onChange={this.onTotalTimeMinuteChange} value={totalTimeInMinutes} type="number" />
            </>)
            :
            <h3>{title}-{totalTimeInMinutes}</h3>}
          <button onClick={onDelete}>Usuń</button>
          <button onClick={this.handleEditableChange}> {isEditable ? 'Zatwierdź' : 'Edytuj'}</button>
        </div>
      )
    }
  }


export { TimeBoxList, EditableTimeBox, TimeBoxEditor };