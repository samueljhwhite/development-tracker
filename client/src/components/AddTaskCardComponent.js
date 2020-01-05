import React from 'react';
import axios from 'axios';

class AddTaskCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                // Toggle
            active: false,
                // Task submission details
            taskName: '',
            assignedProject: '', // ID Taken from parent
            assignedTo: 'SW', // Temporary default
            // description: '', NOT CURRENTLY USED
            status: '' // Taken from parent
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
    submitNewTask = (e) => {
        e.preventDefault();

        const newTask = {
            name: this.state.taskName,
            assignedProject: this.state.assignedProject,
            assignedTo: this.state.assignedTo,
            // description: this.state.description,
            status: this.state.status,
        };

        axios.post('http://localhost:5000/tasks/add', newTask).then(res => console.log(res.data));

        window.location = `/project/${this.state.assignedProject}`;
    }

    // Toggle-able new task form. Registered with status based on status column.
    render() {
       if (this.state.active === false) {
           return(
               <button onClick={this.toggleActive} >Add Task To Column</button>
           );
       } else {
           return (
                <form className='newTaskSubmission' onSubmit={this.submitNewTask}>
                    <textarea id='taskName' placeholder='Enter task name' onChange={this.updateTaskName}></textarea>
                    <div className='newTaskSubmissionOptions'>
                        <button onClick={this.submitNewTask}>Add Task</button>
                        <button onClick={this.toggleActive} >Cancel</button>
                    </div>
                </form>
           );
       }
    }
}

export default AddTaskCard;