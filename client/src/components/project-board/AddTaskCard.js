import React from 'react';
import axios from 'axios';

import AddTaskCardIcon from '../../assets/icons/icon-add-task-card.svg';
import CancelAdditionIcon from '../../assets/icons/icon-cancel-addition.svg';

class AddTaskCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                // Toggle
            active: false,
                // Task submission details
            taskName: 'untitled',
            assignedProject: '', // ID Taken from parent
            // assignedTo: 'SW', // Temporary default
            // description: '', NOT CURRENTLY USED
            status: {} // Obj name & index
        };
    }

    componentDidMount() {
        const { columnStatus, projectID } = this.props;
        this.setState({ 
            status: columnStatus,
            assignedProject: projectID
        });
    }

    toggleActive = () => {
        this.setState({ active: !this.state.active });
    }

    updateTaskName = (e) => {
        this.setState({ taskName: e.target.value });
    }

    // Create new task with details from component state, post with axios, and refresh window.
    submitNewTask = () => {
        const newTask = {
            name: this.state.taskName,
            assignedProject: this.state.assignedProject,
            // assignedTo: this.state.assignedTo,
            status: this.state.status.name,
        };

        axios.post(`https://aqueous-garden-71653.herokuapp.com/tasks/add`, newTask).then(res => console.log(res.data));

        window.location = `/project/${this.state.assignedProject}`;
    }

    // Toggle-able new task form. New task registered with status based on status column.
    render() {
       if (this.state.active === false) {
           return(
               <button onClick={this.toggleActive} > <img height='16px' width='16px' src={AddTaskCardIcon} alt='add a card'></img> </button>
           );
       } else {
           return (
                <form className='new-task-submission'>
                    <textarea placeholder='Enter new task title' onChange={this.updateTaskName}></textarea>
                    <div className='submission-options'>
                        <button onClick={this.submitNewTask}> <img height='16px' width='16px' src={AddTaskCardIcon} alt='add a card'></img> </button>
                        <button onClick={this.toggleActive}><img height='16px' width='16px' src={CancelAdditionIcon} alt='cancel new card'></img></button>
                    </div>
                </form>
           );
       }
    }
}

export default AddTaskCard;