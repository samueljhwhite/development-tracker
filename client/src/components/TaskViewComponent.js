import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/taskView.css'

class TaskView extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            task: {}, // All queried task data (kept for reference).
            assignedProject: '',
            taskId: '',
            assignedTo: '',
            name: '',
            description: '',
            status: '',
            subtasks: [],
            tags: [],

            projectData: {} // All queried project data
        };
    }

    // Call server, set component state with Task data; then query project data.
    componentDidMount() {
        const taskId = this.props.match.params.id;

        axios.get(`http://localhost:5000/tasks/${taskId}`).then(req => {
            this.setState({
                task: req.data,
                assignedProject: req.data.assignedProject,
                taskId: req.data._id,
                assignedTo: req.data.assignedTo,
                name: req.data.name,
                description: req.data.description,
                status: req.data.status,
                subtasks: req.data.subtasks,
                tags: req.data.tags
            });

            this.getProjectData();
        });
    }

    getProjectData = () => {
        axios.get(`http://localhost:5000/projects/${this.state.assignedProject}`).then(req => {
            this.setState({ projectData: req.data });
        });
    }

    render() {
        const tagsArr = this.state.tags;
        const subtasksArr = this.state.subtasks;
        
        return(
            <div className='task-view'>
                <div className='return-to-project'>
                    <Link to={`/project/${this.state.assignedProject}`} > 
                        ᐸᐸ  Return to the '{this.state.projectData.name}' project board 
                    </Link>
                </div>
                    
                <div className='task-view-content'>
                    <div className='task-header'>
                        <div className='flex-child'>
                            <span>{this.state.name}</span>
                            <p>part of {this.state.projectData.name}</p>
                        </div>
                        <div className='flex-child'>
                            <p>Status: {this.state.status}</p>
                        </div>
                    </div>

                    <div className='task-section-flex'>
                        <div className='flex-child'>
                            <span>Assigned to: {this.state.assignedTo}</span>
                        </div>
                        <div className='flex-child'>
                            <span>Tags:</span>
                            <br></br>
                                {
                                    tagsArr.map((tag, i) => {
                                        return <span key={i}>{tag}</span>
                                    })
                                }
                        </div>
                    </div>

                    <div className='task-section'>
                        <span>Description</span>
                        <br></br>
                        <p>{this.state.description}</p>
                    </div>

                    <div className='task-section'>
                        <span>Subtasks</span>
                        {
                            subtasksArr.map((task, i) => {
                                return(
                                    <div key={i} >
                                        <input type='checkbox' id={task.name} name={task.name} />
                                        <label htmlFor={task.name}> {task.name} </label>
                                    </div>
                                );
                            })
                        }
                        <button>Add New Subtask</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default TaskView;