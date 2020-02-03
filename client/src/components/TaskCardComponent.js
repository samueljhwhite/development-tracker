import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DeleteIcon from '../assets/icons/icon-delete.svg';
import EditIcon from '../assets/icons/icon-edit.svg'
import TagIcon from '../assets/icons/icon-tag.svg'
import SubtasksIcon from '../assets/icons/icon-subtasks.svg'
import GoToIcon from '../assets/icons/icon-goto-arrow.svg';
import SaveIcon from '../assets/icons/icon-save.svg';
import CancelIcon from '../assets/icons/icon-cancel.svg'

class TaskCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            id: '',
            name: '',
            tags: [],
            subtasks: [],
            assignedTo: '',
            description: '',
            status: '',
            assignedProject: ''
        };
    }

    componentDidMount() {
        this.setState({
            id: this.props.task._id,
            name: this.props.task.name,
            tags: this.props.task.tags,
            subtasks: this.props.task.subtasks,
            assignedTo: this.props.task.assignedTo,
            description: this.props.task.description,
            status: this.props.task.status,
            assignedProject: this.props.task.assignedProject,
        });
    }

    toggleEdit = () => {
        this.setState({ editing: !this.state.editing })
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    saveNameChange = () => {
        const updatedTask = {
            name: this.state.name,
            assignedTo: this.state.assignedTo,
            description: this.state.description,
            status: this.state.status,
            tags: this.state.tags,
            subtasks: this.state.subtasks
        }

        axios.post(`http://localhost:5000/tasks/update/${this.state.id}`, updatedTask);

        setTimeout(() => {
            window.location = `/project/${this.state.assignedProject}`
        }, 800);
    }

    deleteTask = () => {
        const deleteString = prompt(`This action will delete this task, and all associated data. \n \n Enter task name (${this.state.name}) to confirm deletion.`)
        
        if (deleteString === this.state.name) {
            axios.delete(`http://localhost:5000/tasks/delete/${this.state.id}`).then(res => console.log(res));
            alert('Task Deleted');

            setTimeout(() => {
                window.location = `/project/${this.state.assignedProject}`
            }, 800);

        } else {
            alert('Incorrect, task will not be deleted.');
        }
    }

    // Drag Functionality

    // Assign data transfer (component state - object), store as string, and set drop effect.
    dragStart = (e) => {
        const task = {
            id: this.state.id,
            name: this.state.name,
            assignedTo: this.state.assignedTo,
            description: this.state.description,
            status: this.state.status,
            tags: this.state.tags,
            subtasks:this.state.subtasks
        }
        e.dataTransfer.setData('object', JSON.stringify(task));
        e.dataTransfer.dropEffect = 'move';
    }


    render() {
        const { task } = this.props;
        const numTags = this.state.tags.length.toString();
        const numSubtasks = this.state.subtasks.length.toString();

        return(
            <div className='task-card' id={this.state.id} draggable='true' onDragStart={this.dragStart} >
                    {
                        this.state.editing 
                                ? 
                        <div className='task-card-child-title'>
                            <div className='title-text'>
                                <textarea onChange={this.handleNameChange} defaultValue={this.state.name}></textarea>
                            </div>
                            <div className='title-controls'>
                                <button onClick={this.saveNameChange} className='title-button'> <img src={SaveIcon} className='icon' alt='save'></img> </button>
                                <button onClick={this.toggleEdit} className='title-button'> <img src={CancelIcon} className='icon' alt='cancel'></img> </button>
                            </div>
                        </div>
                                : 
                        <div className='task-card-child-title'>
                            <div className='title-text'>
                                <strong>{task.name}</strong> 
                            </div>
                            <div className='title-controls'>
                                <Link to={`/task/${task._id}`}>
                                    <button className='title-button'> <img src={GoToIcon} className='icon' alt='go to task'></img> </button>
                                </Link>
                            </div>
                        </div>
                    }
    
                    <div className='task-card-child'>
                        <span>
                            <img src={TagIcon} className='icon' alt='number of tags'></img> {numTags} Tag(s) 
                        </span>
                        <span>
                            <img src={SubtasksIcon} className='icon' alt='number of subtasks'></img> {numSubtasks} Subtask(s)
                        </span>
                    </div>

                    <div className='task-card-child-controls'>
                        <button onClick={this.toggleEdit}>
                            <img src={EditIcon} className='icon' alt='edit task name'></img> Edit Name
                        </button>
                        <button onClick={this.deleteTask} >
                            <img src={DeleteIcon} className='icon' alt='delete task'></img> Delete
                        </button>
                    </div>
            </div>
        );
    }
}

export default TaskCard;