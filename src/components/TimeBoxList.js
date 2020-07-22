import React from 'react';
import { TimeBoxCreator } from './TimeBoxCreator';
import { TimeBox } from "./TimeBox";
import TimeboxesAPI from '../api/AxiosTimeboxesApi';
import ErrorBoundary, { ErrorMessage } from "./Error";
import { TimeBoxEditor } from './TimeBoxEditor';
import { CurrentTimeBox } from './CurrentTimeBox';
import AuthenticationContext from '../contexts/AuthenticationContext';


export default class TimeBoxList extends React.Component {
    state = {
        timeboxes: [],
        isEditableCurrent: false,
        loading: true,
        error: null,
    };

    componentDidMount() {
        TimeboxesAPI.getAllTimeboxes().then(
            timeboxes => this.setState({ timeboxes })
        ).catch(
            (error) => this.setState({ error })
        )
            .finally(
                () => this.setState({ loading: false })
            )
    };


    addTimeBox = (timeBox) => {
        TimeboxesAPI.addTimebox(timeBox).then(addedTimebox => this.setState(prevState => {
            // const timeboxes = [...prevState.timeboxes, timeBox];
            const timeboxes = [...prevState.timeboxes, addedTimebox];
            return { timeboxes };
        }))
    };
    removeTimeBox = (timeboxToRemove) => {
        TimeboxesAPI.removeTimebox(timeboxToRemove).then(() => this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox) => timebox.id !== timeboxToRemove.id);
            return { timeboxes };
        }));
    };
    updateTiemBox = (updatedTiemBox) => {
        TimeboxesAPI.replaceTimebox(updatedTiemBox).then(replacedTimebox => {
            this.setState(prevState => {
                const timeboxes = prevState.timeboxes.map((timebox) => {
                    return timebox.id === replacedTimebox.id ? replacedTimebox : timebox;
                });
                return { timeboxes };
            });
        })

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
        this.updateTiemBox({ ...timeboxes[0], title })
    }

    onTotalTimeMinuteChange = (e) => {
        const { timeboxes, } = this.state;
        const time = e.target.value;
        this.updateTiemBox({ ...timeboxes[0], time })
    }

    render() {
        const { timeboxes, isEditableCurrent, error } = this.state;
        const { title, totalTimeInMinutes } = timeboxes[0] ? timeboxes[0] : [null, null];
        return (
            <ErrorBoundary message={"Cos poszlo nie tak ;("} >

                <TimeBoxCreator onCreate={this.handleCreate} />
                {this.state.loading ? "Loading TimeBoxes..." : null}
                <ErrorMessage hasError={!!error} message={'issue'}>
                    {timeboxes.map((timeBox, index) =>
                        (<TimeBox
                            onDelete={() => this.removeTimeBox(timeBox)}
                            onEdit={this.updateTiemBox}
                            key={timeBox.id}
                            id={timeBox.id}
                            title={timeBox.title}
                            totalTimeInMinutes={timeBox.totalTimeInMinutes}
                        />))}
                    {(title && totalTimeInMinutes) ? (isEditableCurrent ?
                        <TimeBoxEditor onTitleChange={this.onTitleChange} onTotalTimeMinuteChange={this.onTotalTimeMinuteChange} title={title} totalTimeInMinutes={totalTimeInMinutes} onConfirm={this.handleConfirm} isEditable={this.state.isEditableCurrent} />
                        :
                        <CurrentTimeBox isEditable={this.state.isEditableCurrent} onEdit={this.handleEditCurrentTimeBox} title={title} totalTimeInMinutes={totalTimeInMinutes} />)
                        :
                        null
                    }
                </ErrorMessage >
            </ ErrorBoundary>
        );
    }
    ;
}

TimeBoxList.contextType = AuthenticationContext;