import React from 'react';
import axios from 'axios';

import TaskCard from './TaskCardComponent.js';
import AddTaskCard from './AddTaskCardComponent.js';

class StatusColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnStatus: this.props.columnStatus, //Obj: name & index
            projectID: this.props.projectID,
            projectName: this.props.projectName,
            projectDescription: this.props.projectDescription,
            isEditing: false,
            updatedStatusName: '',
            tasksArr: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log('Called')
        if (props.tasks !== state.tasksArr) {
            return {
                tasksArr: props.tasks
            };
        }
        return null;
    }

    toggleEditing = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    captureNameChange = (e) => {
        this.setState({ updatedStatusName: e.target.value });
    }

    commitNameChange = () => {
        const { commitColumnNameChange } = this.props
        const updatedStatusName = this.state.updatedStatusName;
        const statusIndex = this.state.columnStatus.index;

        commitColumnNameChange(statusIndex, updatedStatusName);
    }

    // Drag Functionality

    // Assign hover effect for drag target.
    dragOver = (e) => {
        e.preventDefault();
        if (e.target.className === 'statusColumn') {
            e.dataTransfer.dropEffect = 'move';
            e.target.className = 'dropzone-hover';
        }
    }

    // Remove hover effect for drag target. 
    dragLeave = (e) => {
        if (e.target.className === 'dropzone-hover') {
            e.preventDefault();
            e.target.className = 'statusColumn';
        }
    }

    // If drop target is a hover target, convert data from string, copy create new array with dropped task, and push to component state. Update DB.
    dragDrop = (e) => {
        e.preventDefault();
        if(e.target.className === 'dropzone-hover') {
            e.target.className = 'statusColumn';
            const data = JSON.parse(e.dataTransfer.getData('object'));
            
            console.log(data);

            const updateTasksArr = this.state.tasksArr;
            updateTasksArr.push(data);
            // this.setState({ taskArr: updateTasksArr });
            
            console.log(data);
            this.pushUpdatedArrayToState(updateTasksArr);
            this.pushDragChangesToDB(data, this.state.columnStatus.name);
        }        
    }

    pushUpdatedArrayToState = (updatedTasksArr) => {
        console.log(updatedTasksArr);
        this.setState({ tasksArr: updatedTasksArr });
    }

    // Recieve task data (object), edit 'status' value, and then update task record in DB.
    pushDragChangesToDB = (taskData, newStatus) => {
        taskData.status = newStatus
        axios.post(`http://localhost:5000/tasks/update/${taskData._id}`, taskData).then(res => console.log(res))
    }

    render() {
        const { tasks } = this.props;
        return (
            <div className='statusColumn' onDrop={this.dragDrop} onDragOver={this.dragOver} onDragLeave={this.dragLeave}>
                
                { 
                    this.state.isEditing
                        ?
                    <div>
                        <textarea defaultValue={this.state.columnStatus.name} onChange={this.captureNameChange}></textarea>
                        <button onClick={this.commitNameChange}>Rename</button>
                        <button onClick={this.toggleEditing}>Cancel</button>
                    </div>
                        :
                    <div>
                        <h3 onClick={this.toggleEditing}>{this.state.columnStatus.name}</h3>
                        <AddTaskCard projectID={this.state.projectID} columnStatus={this.state.columnStatus}/>
                    </div>
                }

                {
                    // loop through task statuses & assign matches.
                    this.state.tasksArr.map((task, i) => {
                        if (task.status === this.state.columnStatus.name) {
                            return <TaskCard task={task} key={i} />
                        } else {
                            return null;
                        }
                    })
                }
            </div>
        );
    }
}

export default StatusColumn;