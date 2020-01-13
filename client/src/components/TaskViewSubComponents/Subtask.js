import React from 'react';

import SubtaskStatus from './SubtaskSubComponents/SubtaskStatus.js';
import SubtaskName from './SubtaskSubComponents/SubtaskName.js';
import SubtaskDescription from './SubtaskSubComponents/SubtaskDescription.js';

class Subtask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            arrIndex: this.props.index,
            name: this.props.task.name,
            status: this.props.task.status,
            description: this.props.task.description,
            editing: false,
            hasBeenEdited: false   
        };
    }

    onNameChange = (e) => {
        this.setState({ name: e.target.value });
        this.registerEdits();
    }

    onStatusChange = (e) => {
        this.setState({ status: e.target.value });
        this.registerEdits();
    }

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
        this.registerEdits();
    }

    registerEdits = () => {
        if (this.state.hasBeenEdited === false) {
            this.setState({ hasBeenEdited: true })   
        }
    }

    updateSubtask = () => {
        const updatedSubtask = {
            name: this.state.name,
            status: this.state.status,
            description: this.state.description
        }
        const arrIndex = this.state.arrIndex
        
        const { commitSubtaskChange } = this.props;
        commitSubtaskChange(arrIndex, updatedSubtask);
    }

    render() {
        const { task, statusesArr } = this.props;
        return(
            <div className='subtask'>
                <div className='task-section-flex'>
                    <SubtaskName name={task.name} onNameChange={this.onNameChange} /> 

                    {this.state.hasBeenEdited ? <button onClick={this.updateSubtask}>Update!</button> : null}

                    <SubtaskStatus status={task.status} statusesArr={statusesArr} onStatusChange={this.onStatusChange} />
                </div>
                <SubtaskDescription description={task.description} onDescriptionChange={this.onDescriptionChange} />
            </div>
        );
    }
}

export default Subtask;