import React from 'react';
import axios from 'axios';

import TaskCard from './TaskCard.js';
import AddTaskCard from './AddTaskCard.js';
import DeleteIcon from '../../assets/icons/icon-delete.svg';

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
            tasksArr: [],
            sortBy: '',
        };
    }

        // Column Management
    toggleEditing = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    captureNameChange = (e) => {
        this.setState({ updatedStatusName: e.target.value });
    }

    commitNameChange = () => {
        const { commitColumnNameChange } = this.props // from StatusColumnsGenerator
        const oldStatusName = this.state.columnStatus.name;
        const updatedStatusName = this.state.updatedStatusName;
        
        commitColumnNameChange(updatedStatusName, oldStatusName);
    }

    deleteColumnAndTasks = () => { // Delete all tasks associated with status value, then call deleteStatusColumnFromDB (StatusColumnsGenerator), to delete data at Project level.
        const deleteString = prompt(`WARNING! Deleting this column will permanently remove this column and all related tasks. \n \n Type "${this.state.columnStatus.name}" to confirm deletion`);

        if (deleteString === this.state.columnStatus.name) {
            axios.delete(`https://aqueous-garden-71653.herokuapp.com/tasks/project/${this.state.projectID}/status/${this.state.columnStatus.name}`).then(res => console.log(res));
            
            const { deleteStatusColumnFromDB } = this.props;
            deleteStatusColumnFromDB(this.state.columnStatus.name);
            
            alert('Correct, column and associated tasks deleted.');
        } else {
            alert('Incorrect column name, tasks and columns will not be deleted.');
        }
    }

        // Drag&Drop Functionality
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
        e.preventDefault();
        if (e.target.className === 'dropzone-hover') {
            e.target.className = 'statusColumn';
        }
    }

    // If drop target is a hover target, convert data from string, create new array with dropped task, and commit changes to parent*2 (ProjectBoard) component.
    dragDrop = (e) => {
        e.preventDefault();
        if(e.target.className === 'dropzone-hover') {
            e.target.className = 'statusColumn';
            const data = JSON.parse(e.dataTransfer.getData('object')); // Data from TaskCard.
            // Update column categorisation
            data.status = this.state.columnStatus.name;
            // Update DB
            this.pushDragChangesToDB(data);

            // Get existing array order.
            const { orderedTasks } = this.props;
            const existingTasksArr = orderedTasks;

            // Find dragged task obj within existing array
            const oldArrIndex = existingTasksArr.findIndex(obj => obj._id === data._id);
            // Create new array with existing array removed (splice doesn't work here).
            const updatedTasksArr = existingTasksArr.slice(0, oldArrIndex).concat(existingTasksArr.slice(oldArrIndex + 1));
            // Push task with updated status into modified array.
            updatedTasksArr.push(data);

            // Commit array changes to ProjectBoard state. 
            const { editTasksArrOnDrop } = this.props; // From ProjectBoard
            editTasksArrOnDrop(updatedTasksArr);
        }        
    }

    // Recieves task data with modified status. 
    pushDragChangesToDB = (taskData) => {
        axios.post(`https://aqueous-garden-71653.herokuapp.com/tasks/update/${taskData._id}`, taskData).then(res => console.log(res))
    }

    render() {
        const { orderedTasks } = this.props; // Props from ProjectBoard

        return (
            <div className='statusColumn' onDrop={this.dragDrop} onDragOver={this.dragOver} onDragLeave={this.dragLeave}>
                
                { 
                    this.state.isEditing
                        ? // Toggle edit mode
                    <div className='rename-col'>
                        <textarea defaultValue={this.state.columnStatus.name} onChange={this.captureNameChange}></textarea>
                        <div>
                            <button onClick={this.commitNameChange}>Rename</button>
                            <button onClick={this.toggleEditing}>Cancel</button>
                        </div>
                    </div>
                        :
                    <div className='col-details'>
                        <div className='col-details-header'>
                            <h3 onClick={this.toggleEditing}>{this.state.columnStatus.name}</h3>
                            <button onClick={this.deleteColumnAndTasks} className='delete-status-column'><img src={DeleteIcon} height='12px' alt='delete column'></img></button>
                        </div>
                        <div className='col-controls'>
                            <AddTaskCard projectID={this.state.projectID} columnStatus={this.state.columnStatus}/>
                        </div>
                    </div>
                }

                {
                    // loop through task statuses & assign matches.
                    orderedTasks.map((task, i) => {
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