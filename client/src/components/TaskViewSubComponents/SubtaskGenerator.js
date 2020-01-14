import React from 'react';

import Subtask from './Subtask.js';

class SubtaskGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addingNewSubtask: false,
            newSubtaskName: '',
            newSubtaskStatus: '',
            newSubtaskDescription: ''
        };
    }

    toggleAddingNewSubtask = () => {
        this.setState({ addingNewSubtask: !this.state.addingNewSubtask })
    }

    registerSubtaskName = (e) => {
        this.setState({ newSubtaskName: e.target.value })
    }

    registerSubtaskStatus = (e) => {
        this.setState({ newSubtaskStatus: e.target.value })
    }

    registerSubtaskDescription = (e) => {
        this.setState({ newSubtaskDescription: e.target.value })
    }

    saveNewSubtask = () => {
        const newSubtask = {
            name: this.state.newSubtaskName,
            status: this.state.newSubtaskStatus,
            description: this.state.newSubtaskDescription
        }

        const { saveNewSubtaskToDB } = this.props; 
        saveNewSubtaskToDB(newSubtask);
        this.setState({ addingNewSubtask: false });
    }

    render() {
        const { subtasksArr, commitSubtaskChange, statusesArr } = this.props;

        return(
            <div className='task-section'>
                <h3>Subtasks</h3>
                {
                    subtasksArr.map((task, i) => {
                        return <Subtask index={i} key={i} task={task} commitSubtaskChange={commitSubtaskChange} statusesArr={statusesArr} />
                    })
                }
                
                { 
                    this.state.addingNewSubtask 
                        ? 
                    <div className='new-subtask'>
                        <div className='task-section-flex'>
                            <textarea onChange={this.registerSubtaskName} defaultValue='Subtask Name...'></textarea>
                            <select onChange={this.registerSubtaskStatus}>
                            <option>Select Status</option>
                            {
                                statusesArr.map((status, i) => {
                                    return <option key={i}> {status.name} </option>
                                })
                            }
                            </select>
                        </div>
                        <textarea onChange={this.registerSubtaskDescription} defaultValue='Subtask Description...'></textarea>
                        <button onClick={this.saveNewSubtask}>Save Subtask</button>
                    </div>
                        :
                    <button onClick={this.toggleAddingNewSubtask}>Add New Subtask</button>
                }
            </div>
        );
    }
}

export default SubtaskGenerator;