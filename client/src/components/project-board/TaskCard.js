import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DeleteIcon from '../../assets/icons/icon-delete.svg';
import EditIcon from '../../assets/icons/icon-edit.svg'
import TagIcon from '../../assets/icons/icon-tag.svg'
import SubtasksIcon from '../../assets/icons/icon-subtasks.svg'
import GoToIcon from '../../assets/icons/go-to-white.svg';
import SaveIcon from '../../assets/icons/confirm-white.svg';
import CancelIcon from '../../assets/icons/cancel-white.svg'

class TaskCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            name: ''
        };
    }

    componentDidMount() {
        this.setState({
            name: this.props.task.name,
        })
    }

    toggleEdit = () => {
        this.setState({ editing: !this.state.editing })
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    saveNameChange = () => {
        const { task } = this.props; 
        const updatedTask = {
            name: this.state.name,
            assignedTo: task.assignedTo,
            description: task.description,
            status: task.status,
            tags: task.tags,
            subtasks: task.subtasks
        }

        axios.post(`http://localhost:5000/tasks/update/${task._id}`, updatedTask);

        setTimeout(() => {
            window.location = `/project/${task.assignedProject}`
        }, 800);
    }

    deleteTask = () => {
        const { task } = this.props;
        const deleteString = prompt(`This action will delete this task, and all associated data. \n \n Enter task name (${task.name}) to confirm deletion.`)
        
        if (deleteString === task.name) {
            axios.delete(`http://localhost:5000/tasks/delete/${task._id}`).then(res => console.log(res));
            alert('Task Deleted');

            setTimeout(() => {
                window.location = `/project/${task.assignedProject}`
            }, 800);

        } else {
            alert('Incorrect, task will not be deleted.');
        }
    }

    // Drag Functionality
    // Assign data transfer (component state - object), store as string, and set drop effect.
    dragStart = (e) => {
        const { task } = this.props;
        console.log(task);
        const dragTask = {
            _id: task._id,
            name: task.name,
            assignedTo: task.assignedTo,
            description: task.description,
            status: task.status,
            tags: task.tags,
            subtasks: task.subtasks,
            assignedProject: task.assignedProject
        }
        e.dataTransfer.setData('object', JSON.stringify(dragTask));
        e.dataTransfer.dropEffect = 'move';
    }


    render() {
        const { task } = this.props;
        const numTags = task.tags.length.toString();
        const numSubtasks = task.subtasks.length.toString();

        return(
            <div className='task-card' id={this.state._id} draggable='true' onDragStart={this.dragStart} >
                    {
                        this.state.editing 
                                ? 
                        <div className='task-card-child-title'>
                            <div className='title-text'>
                                <textarea onChange={this.handleNameChange} defaultValue={task.name}></textarea>
                            </div>
                            <div className='title-controls'>
                                <button onClick={this.saveNameChange} className='title-button'> <img src={SaveIcon} className='icon' alt='save'></img> </button>
                                <button onClick={this.toggleEdit} className='title-button'> <img src={CancelIcon} className='icon' alt='cancel'></img> </button>
                            </div>
                        </div>
                                : 
                        <div className='task-card-child-title'>
                            <div className='title-text'>
                                <h6>{task.name}</h6> 
                            </div>
                            <div className='title-controls'>
                                <Link to={`/task/${task._id}`}>
                                    <img src={GoToIcon} className='icon' alt='go to task'></img>
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
                            <img src={EditIcon} className='icon' alt='edit task name'></img>
                        </button>
                        <button onClick={this.deleteTask} >
                            <img src={DeleteIcon} className='icon' alt='delete task'></img>
                        </button>
                    </div>
            </div>
        );
    }
}

export default TaskCard;